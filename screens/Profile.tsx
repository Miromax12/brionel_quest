
import React from 'react';
import { UserProfile } from '../types';
import { Settings, Shield, Mail, Instagram, Facebook, Camera, LogOut } from 'lucide-react';

interface ProfileProps {
  user: UserProfile;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="relative bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Banner */}
        <div className="h-32 quest-gradient opacity-80"></div>
        
        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-6 flex items-end justify-between">
            <div className="relative group">
              <img 
                src={user.avatar} 
                className="w-32 h-32 rounded-3xl border-4 border-white shadow-xl object-cover" 
                alt="avatar" 
              />
              <button className="absolute bottom-2 right-2 p-2 bg-emerald-500 text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={18} />
              </button>
            </div>
            <div className="flex gap-2">
              <button className="p-3 bg-slate-50 text-slate-500 rounded-2xl hover:bg-slate-100 transition-colors">
                <Settings size={20} />
              </button>
              <button className="flex items-center gap-2 bg-red-50 text-red-500 px-4 py-2 rounded-2xl font-bold text-sm hover:bg-red-100 transition-colors">
                <LogOut size={18} />
                <span>Вийти</span>
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-3xl font-black text-slate-900">{user.name}</h2>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full text-xs">{user.status}</span>
              <span className="text-slate-400 text-sm">• Рівень {user.level}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <StatCard label="Усього XP" value={user.xp.toString()} />
            <StatCard label="Дні поспіль" value={user.streak.toString()} />
            <StatCard label="Місій виконано" value="14" />
            <StatCard label="Статус" value="Активний" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-6">Досягнення</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {user.badges.map((badge, i) => (
                <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 group hover:scale-105 transition-transform cursor-pointer">
                  <div className="w-16 h-16 quest-gradient rounded-full flex items-center justify-center text-white shadow-lg">
                    <Shield size={24} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 text-center">{badge}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-6">Активність</h3>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-500 shadow-sm">
                    <CheckCircle2 size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold">Місія виконана: Оптимізація шапки</p>
                    <p className="text-xs text-slate-400">Вчора о 14:30</p>
                  </div>
                  <span className="text-xs font-black text-emerald-600">+50 XP</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-6">Контакти</h3>
            <div className="space-y-4">
              <ContactItem icon={<Mail size={18} />} label="Email" value={user.email} />
              <ContactItem icon={<Instagram size={18} />} label="Instagram" value="@anna_shevchenko" />
              <ContactItem icon={<Facebook size={18} />} label="Facebook" value="anna.shev" />
            </div>
            <button className="w-full mt-6 text-sm font-bold text-emerald-600 py-3 border border-emerald-100 rounded-2xl hover:bg-emerald-50 transition-colors">
              Редагувати профіль
            </button>
          </section>

          <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 text-center">
            <p className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-widest">Твій код запрошення</p>
            <div className="bg-slate-50 p-4 rounded-2xl border-2 border-dashed border-slate-200 font-mono text-2xl font-black text-emerald-600 mb-4 select-all">
              BRION-77X
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">Поділіться цим кодом з потенційним партнером, щоб він міг отримати демо-доступ.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
    <p className="text-xl font-black text-slate-800">{value}</p>
  </div>
);

const ContactItem: React.FC<{ icon: React.ReactNode, label: string, value: string }> = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 group">
    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-emerald-500 transition-colors">
      {icon}
    </div>
    <div className="overflow-hidden">
      <p className="text-[10px] font-bold text-slate-400 uppercase">{label}</p>
      <p className="text-sm font-bold text-slate-800 truncate">{value}</p>
    </div>
  </div>
);

const CheckCircle2 = ({ size }: { size: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default Profile;
