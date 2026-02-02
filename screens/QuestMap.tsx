
import React, { useState } from 'react';
import { INITIAL_STAGES } from '../constants';
import { CheckCircle2, Lock, ChevronRight, Star, Target, Circle } from 'lucide-react';
import { QuestStage } from '../types';

interface QuestMapProps {
  addXP: (amount: number) => void;
}

const QuestMap: React.FC<QuestMapProps> = ({ addXP }) => {
  const [stages, setStages] = useState<QuestStage[]>(INITIAL_STAGES);

  const toggleMission = (weekIndex: number, missionId: string) => {
    setStages(prev => {
      const newStages = [...prev];
      const mission = newStages[weekIndex].missions.find(m => m.id === missionId);
      
      if (mission && !mission.isCompleted) {
        mission.isCompleted = true;
        addXP(mission.xpReward);
      } else if (mission && mission.isCompleted) {
        // Toggle off for demo purposes, but don't subtract XP in a real app usually
        mission.isCompleted = false;
      }
      
      return newStages;
    });
  };

  const calculateWeekProgress = (stage: QuestStage) => {
    const completed = stage.missions.filter(m => m.isCompleted).length;
    return (completed / stage.missions.length) * 100;
  };

  return (
    <div className="max-w-4xl mx-auto py-4 animate-in fade-in duration-500 pb-20">
      <header className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Шлях до успіху</h2>
        <p className="text-slate-500">Покроковий план розвитку вашого бізнесу в мережі</p>
      </header>

      <div className="relative">
        {/* Connection path (vertical line) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-1 bg-slate-200 rounded-full hidden md:block"></div>

        <div className="space-y-16 relative">
          {stages.map((stage, idx) => {
            const progress = calculateWeekProgress(stage);
            const isCompleted = progress === 100;

            return (
              <div key={stage.week} className="relative">
                <div className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Stage Indicator */}
                  <div className="z-10 bg-white p-2 rounded-full shadow-lg">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-xl shadow-inner transition-all duration-500 ${isCompleted ? 'bg-emerald-500' : progress > 0 ? 'quest-gradient' : 'bg-slate-300'}`}>
                      {isCompleted ? <Star size={24} className="fill-current" /> : stage.week}
                    </div>
                  </div>

                  {/* Stage Card */}
                  <div className={`flex-1 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 w-full md:w-auto relative group hover:shadow-md transition-all ${progress > 0 ? 'border-emerald-200 ring-2 ring-emerald-50' : 'opacity-90'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-wider">Тиждень {stage.week}</span>
                        <h3 className="text-xl font-extrabold text-slate-800 mt-1">{stage.title}</h3>
                      </div>
                      <div className="flex flex-col items-end">
                        <Target className={progress > 0 ? 'text-emerald-500' : 'text-slate-300'} size={24} />
                        <span className="text-[10px] font-bold text-slate-400 mt-1">{Math.round(progress)}%</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {stage.missions.map(mission => (
                        <div 
                          key={mission.id} 
                          onClick={() => toggleMission(idx, mission.id)}
                          className={`flex items-start gap-3 p-3 rounded-2xl transition-all cursor-pointer ${
                            mission.isCompleted 
                              ? 'bg-emerald-50 border border-emerald-100 shadow-inner' 
                              : 'bg-slate-50 border border-slate-100 hover:border-emerald-200'
                          }`}
                        >
                          <div className="mt-0.5 transition-colors">
                            {mission.isCompleted ? (
                              <CheckCircle2 size={18} className="text-emerald-500" />
                            ) : (
                              <div className="w-[18px] h-[18px] rounded-full border-2 border-slate-300 group-hover:border-emerald-300"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className={`text-sm font-bold transition-all ${mission.isCompleted ? 'text-emerald-900 line-through opacity-60' : 'text-slate-700'}`}>
                              {mission.title}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">{mission.description}</p>
                          </div>
                          <div className={`text-[10px] font-black px-2 py-1 rounded-lg border shadow-sm self-center whitespace-nowrap ${mission.isCompleted ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-white text-slate-600'}`}>
                            +{mission.xpReward} XP
                          </div>
                        </div>
                      ))}
                    </div>

                    {progress < 100 && (
                      <div className="mt-6 pt-4 border-t border-slate-50">
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full quest-gradient transition-all duration-1000" 
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Bonus Final Stage */}
          <div className="relative flex flex-col items-center opacity-50">
             <div className="z-10 bg-slate-100 p-2 rounded-full">
                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-slate-400 font-black text-xl">
                  8
                </div>
              </div>
              <div className="mt-4 text-center">
                 <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Фінальний Бонус</p>
                 <h4 className="text-slate-400 font-bold">Автоматизація та делегування</h4>
              </div>
          </div>
        </div>
      </div>
      
      {/* Toast Notification for XP (optional concept) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <p className="bg-emerald-600 text-white px-6 py-2 rounded-full font-bold shadow-2xl opacity-0 animate-pulse transition-opacity">
          Місію виконано! +XP
        </p>
      </div>
    </div>
  );
};

export default QuestMap;
