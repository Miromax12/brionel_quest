
import React from 'react';
import { Trophy, Medal, Crown, TrendingUp, Filter } from 'lucide-react';

const MOCK_LEADERS = [
  { id: 1, name: 'Олена Ковальчук', xp: 5240, streak: 45, level: 12, avatar: 'https://picsum.photos/100/100?random=11' },
  { id: 2, name: 'Дмитро Кравченко', xp: 4890, streak: 32, level: 11, avatar: 'https://picsum.photos/100/100?random=12' },
  { id: 3, name: 'Анна Сидорчук', xp: 4560, streak: 12, level: 10, avatar: 'https://picsum.photos/100/100?random=13' },
  { id: 4, name: 'Марія Козак', xp: 3200, streak: 21, level: 8, avatar: 'https://picsum.photos/100/100?random=14' },
  { id: 5, name: 'Вікторія Ткач', xp: 2950, streak: 7, level: 7, avatar: 'https://picsum.photos/100/100?random=15' },
];

const Leaderboard: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900">Рейтинг лідерів</h2>
          <p className="text-slate-500 mt-1">Топ учасників BRIONEL Quest за цей тиждень.</p>
        </div>
        <button className="flex items-center gap-2 bg-white border px-4 py-2 rounded-xl text-sm font-semibold hover:shadow-md transition-shadow">
          <Filter size={16} className="text-slate-400" />
          <span>Фільтри</span>
        </button>
      </header>

      {/* Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pb-8">
        {/* 2nd Place */}
        <div className="hidden md:flex flex-col items-center animate-in slide-in-from-bottom-8 duration-500 [animation-delay:0.1s]">
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-full border-4 border-slate-200 overflow-hidden shadow-xl">
              <img src={MOCK_LEADERS[1].avatar} alt="" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-black shadow-lg">2</div>
          </div>
          <div className="bg-white rounded-3xl p-4 w-full text-center border border-slate-100 shadow-sm">
            <p className="font-bold text-sm truncate">{MOCK_LEADERS[1].name}</p>
            <p className="text-emerald-500 font-black text-lg">{MOCK_LEADERS[1].xp} XP</p>
          </div>
        </div>

        {/* 1st Place */}
        <div className="flex flex-col items-center animate-in slide-in-from-bottom-8 duration-500">
          <div className="relative mb-6">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-amber-400 animate-bounce">
              <Crown size={48} className="fill-current" />
            </div>
            <div className="w-28 h-28 rounded-full border-4 border-amber-400 overflow-hidden shadow-2xl">
              <img src={MOCK_LEADERS[0].avatar} alt="" />
            </div>
            <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg ring-4 ring-white">1</div>
          </div>
          <div className="bg-white rounded-3xl p-6 w-full text-center border-2 border-amber-100 shadow-xl shadow-amber-50">
            <p className="font-black text-lg truncate">{MOCK_LEADERS[0].name}</p>
            <p className="text-emerald-600 font-black text-2xl">{MOCK_LEADERS[0].xp} XP</p>
            <div className="flex items-center justify-center gap-1 mt-2 text-orange-500 font-bold text-xs bg-orange-50 py-1 px-2 rounded-full w-fit mx-auto">
              <TrendingUp size={12} /> {MOCK_LEADERS[0].streak} днів
            </div>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="hidden md:flex flex-col items-center animate-in slide-in-from-bottom-8 duration-500 [animation-delay:0.2s]">
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-full border-4 border-amber-600/30 overflow-hidden shadow-xl">
              <img src={MOCK_LEADERS[2].avatar} alt="" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-600/30 rounded-full flex items-center justify-center text-amber-800 font-black shadow-lg">3</div>
          </div>
          <div className="bg-white rounded-3xl p-4 w-full text-center border border-slate-100 shadow-sm">
            <p className="font-bold text-sm truncate">{MOCK_LEADERS[2].name}</p>
            <p className="text-emerald-500 font-black text-lg">{MOCK_LEADERS[2].xp} XP</p>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b bg-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Топ 100 учасників</h3>
          <span className="text-xs font-medium text-slate-400">Оновлено 5 хв. тому</span>
        </div>
        <div className="divide-y">
          {MOCK_LEADERS.map((leader, idx) => (
            <div key={leader.id} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
              <div className="w-8 text-center font-black text-slate-300">{idx + 1}</div>
              <img src={leader.avatar} className="w-12 h-12 rounded-xl" alt="" />
              <div className="flex-1">
                <p className="font-bold text-sm">{leader.name}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold">LEVEL {leader.level}</span>
                  <span className="text-[10px] text-orange-500 font-bold flex items-center gap-1">🔥 {leader.streak}дн</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-emerald-600">{leader.xp}</p>
                <p className="text-[10px] text-slate-400 font-bold">XP</p>
              </div>
            </div>
          ))}
          <div className="p-4 bg-emerald-50 flex items-center gap-4 ring-2 ring-emerald-200 ring-inset">
             <div className="w-8 text-center font-black text-emerald-600">42</div>
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-bold text-emerald-600 border border-emerald-200">Ви</div>
              <div className="flex-1">
                <p className="font-bold text-sm">Анна Шевченко (Ви)</p>
                <p className="text-[10px] text-emerald-500 font-bold">До топ-10: ще 1400 XP</p>
              </div>
              <div className="text-right">
                <p className="font-black text-emerald-600">120</p>
                <p className="text-[10px] text-slate-400 font-bold">XP</p>
              </div>
          </div>
        </div>
        <div className="p-4 text-center">
           <button className="text-sm font-bold text-slate-400 hover:text-emerald-500 transition-colors">Показати більше</button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
