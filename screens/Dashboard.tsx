
import React, { useState } from 'react';
/* Added Link from react-router-dom and missing icons from lucide-react */
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Circle, 
  Flame, 
  ArrowUpRight, 
  Plus, 
  ExternalLink, 
  Image as ImageIcon,
  Trophy,
  MessageSquare,
  Map as MapIcon,
  ChevronRight
} from 'lucide-react';
import { UserProfile, DailyTask } from '../types';
import { DAILY_CHECKLIST } from '../constants';

interface DashboardProps {
  user: UserProfile;
  addXP: (amount: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, addXP }) => {
  const [tasks, setTasks] = useState<DailyTask[]>(DAILY_CHECKLIST);

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId && !t.completed) {
        addXP(t.xp);
        return { ...t, completed: true };
      }
      return t;
    }));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = (completedCount / tasks.length) * 100;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900">Вітаємо, {user.name.split(' ')[0]}! 👋</h2>
          <p className="text-slate-500 mt-1">Твій сьогоднішній план дій для росту бізнесу.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border px-4 py-2 rounded-xl text-sm font-semibold hover:shadow-md transition-shadow">
            <ImageIcon size={16} className="text-blue-500" />
            <span>Звіт за вчора</span>
          </button>
          <button className="flex items-center gap-2 quest-gradient text-white px-4 py-2 rounded-xl text-sm font-bold hover:shadow-lg transition-all shadow-emerald-200">
            <Plus size={16} />
            <span>Додати дію</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead Flow Game Section */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                  <Flame size={20} className="fill-current" />
                </div>
                <h3 className="text-lg font-bold">Lead Flow Game</h3>
              </div>
              <span className="text-sm font-medium text-slate-400">{completedCount} з {tasks.length} виконано</span>
            </div>

            <div className="mb-8">
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-emerald-600">Денний прогрес</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full quest-gradient transition-all duration-500" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-3">
              {tasks.map((task) => (
                <div 
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer group ${
                    task.completed 
                      ? 'bg-emerald-50/50 border-emerald-100' 
                      : 'bg-white border-slate-100 hover:border-emerald-200 hover:shadow-sm'
                  }`}
                >
                  <div className={task.completed ? 'text-emerald-500' : 'text-slate-300 group-hover:text-emerald-300'}>
                    {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold text-sm ${task.completed ? 'text-emerald-900 line-through opacity-70' : 'text-slate-700'}`}>
                      {task.title}
                    </p>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">Подтвердження: Посилання або Скріншот</p>
                  </div>
                  <div className={`text-xs font-bold px-2 py-1 rounded-lg ${task.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                    +{task.xp} XP
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-3">
              <div className="text-amber-500 mt-0.5">💡</div>
              <p className="text-xs text-amber-800 leading-relaxed">
                Порада дня: Кожна реальна дія приносить результат. Система рахує тільки вчинки, а не перегляди. Зроби "Ідеальний день" та отримай +50 XP бонусу!
              </p>
            </div>
          </section>
        </div>

        {/* Stats and Achievements sidebar */}
        <div className="space-y-6">
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold mb-4">Твої досягнення</h3>
            <div className="grid grid-cols-2 gap-3">
              {user.badges.map((badge, idx) => (
                <div key={idx} className="flex flex-col items-center p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-2 shadow-inner">
                    <Trophy size={20} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 leading-tight">{badge}</span>
                </div>
              ))}
              <div className="flex flex-col items-center p-3 rounded-2xl border-2 border-dashed border-slate-200 text-center justify-center min-h-[100px] opacity-40">
                <Plus size={20} className="text-slate-400 mb-1" />
                <span className="text-[10px] font-medium text-slate-400">Нова мета</span>
              </div>
            </div>
            <button className="w-full mt-4 text-sm font-bold text-emerald-600 py-2 border border-emerald-100 rounded-xl hover:bg-emerald-50 transition-colors">
              Переглянути всі
            </button>
          </section>

          <section className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-6 text-white shadow-xl shadow-indigo-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Мій статус</h3>
              <ArrowUpRight size={18} className="opacity-60" />
            </div>
            <div className="text-2xl font-black mb-1">{user.status}</div>
            <p className="text-xs text-indigo-100 mb-6 opacity-80">До наступного рангу: 380 XP</p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Flame size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-white/60 font-medium">Серія днів</p>
                  <p className="text-sm font-bold">{user.streak} днів поспіль</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <MessageSquare size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-white/60 font-medium">Діалогів проведено</p>
                  <p className="text-sm font-bold">42 контакти</p>
                </div>
              </div>
            </div>
          </section>
          
          <Link to="/quest" className="block p-5 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
                  <MapIcon size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm">Прогрес Квесту</p>
                  <p className="text-xs text-slate-400">Тиждень 1: 65%</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
