
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  MessageSquare, 
  Sparkles, 
  Trophy, 
  User, 
  Flame, 
  ChevronRight,
  Menu,
  X,
  Bell
} from 'lucide-react';
import Dashboard from './screens/Dashboard';
import QuestMap from './screens/QuestMap';
import Simulator from './screens/Simulator';
import AIContent from './screens/AIContent';
import Leaderboard from './screens/Leaderboard';
import Profile from './screens/Profile';
import { UserProfile, UserStatus } from './types';
import { STATUS_THRESHOLDS } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile>({
    id: 'u1',
    name: 'Анна Шевченко',
    email: 'anna@example.com',
    xp: 120,
    level: 2,
    streak: 12,
    status: UserStatus.ACTIVE,
    avatar: 'https://picsum.photos/200/200?random=1',
    badges: ['Перший крок', 'Серійник']
  });

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Update status based on XP
    const currentStatus = [...STATUS_THRESHOLDS].reverse().find(t => user.xp >= t.minXp);
    if (currentStatus && currentStatus.status !== user.status) {
      setUser(prev => ({ ...prev, status: currentStatus.status }));
    }
  }, [user.xp, user.status]);

  const addXP = (amount: number) => {
    setUser(prev => ({ ...prev, xp: prev.xp + amount }));
  };

  return (
    <HashRouter>
      <div className="flex min-h-screen bg-slate-50 text-slate-900">
        {/* Desktop Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200 lg:translate-x-0 lg:static ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <div className="p-6 flex items-center gap-3">
              <div className="w-10 h-10 quest-gradient rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">B</div>
              <h1 className="text-xl font-extrabold tracking-tight text-emerald-900">BRIONEL <span className="text-emerald-500">Quest</span></h1>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1">
              <SidebarItem to="/" icon={<LayoutDashboard size={20} />} label="Головна" onClick={() => setSidebarOpen(false)} />
              <SidebarItem to="/quest" icon={<MapIcon size={20} />} label="Квест-карта" onClick={() => setSidebarOpen(false)} />
              <SidebarItem to="/simulator" icon={<MessageSquare size={20} />} label="Симулятор" onClick={() => setSidebarOpen(false)} />
              <SidebarItem to="/ai-assistant" icon={<Sparkles size={20} />} label="AI-асистент" onClick={() => setSidebarOpen(false)} />
              <SidebarItem to="/leaderboard" icon={<Trophy size={20} />} label="Рейтинг" onClick={() => setSidebarOpen(false)} />
              <SidebarItem to="/profile" icon={<User size={20} />} label="Мій профіль" onClick={() => setSidebarOpen(false)} />
            </nav>

            <div className="p-6 border-t bg-slate-50/50">
              <div className="flex items-center gap-3 mb-4">
                <img src={user.avatar} className="w-10 h-10 rounded-full border-2 border-emerald-100 shadow-sm" alt="avatar" />
                <div className="overflow-hidden">
                  <p className="font-bold text-sm truncate">{user.name}</p>
                  <p className="text-xs text-slate-500 font-medium">{user.status}</p>
                </div>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full quest-gradient" style={{ width: '45%' }}></div>
              </div>
              <p className="text-[10px] mt-1 text-slate-500 text-right">XP: {user.xp} / 500</p>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Top Navbar */}
          <header className="h-16 bg-white border-b flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40">
            <button className="lg:hidden p-2 text-slate-600" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>

            <div className="flex-1 lg:flex-none"></div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full font-bold text-sm border border-orange-100 shadow-sm">
                <Flame size={16} className="fill-current" />
                <span>{user.streak} днів</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full font-bold text-sm border border-emerald-100 shadow-sm">
                <Trophy size={16} />
                <span>{user.xp} XP</span>
              </div>
              <button className="p-2 text-slate-400 hover:text-emerald-500 transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
            </div>
          </header>

          {/* Screen Content */}
          <main className="flex-1 overflow-y-auto p-4 lg:p-8">
            <Routes>
              <Route path="/" element={<Dashboard user={user} addXP={addXP} />} />
              <Route path="/quest" element={<QuestMap addXP={addXP} />} />
              <Route path="/simulator" element={<Simulator addXP={addXP} />} />
              <Route path="/ai-assistant" element={<AIContent />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/profile" element={<Profile user={user} />} />
            </Routes>
          </main>
        </div>
        
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
        )}
      </div>
    </HashRouter>
  );
};

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, label, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        isActive 
          ? 'bg-emerald-50 text-emerald-600 font-bold shadow-sm' 
          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <span className={`${isActive ? 'text-emerald-500' : 'text-slate-400 group-hover:text-slate-600'}`}>{icon}</span>
      <span className="text-sm">{label}</span>
      {isActive && <ChevronRight size={14} className="ml-auto" />}
    </Link>
  );
};

export default App;
