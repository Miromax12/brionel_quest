
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, ChevronLeft, Award, Sparkles, RefreshCw } from 'lucide-react';
import { CANDIDATES } from '../constants';
import { CandidateProfile, ChatMessage } from '../types';
import { startSimulationSession, evaluateResponse } from '../geminiService';

interface SimulatorProps {
  addXP: (amount: number) => void;
}

const Simulator: React.FC<SimulatorProps> = ({ addXP }) => {
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateProfile | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [evaluation, setEvaluation] = useState<{score: number, feedback: string[]} | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const startSession = (candidate: CandidateProfile) => {
    setSelectedCandidate(candidate);
    setChatHistory([{ role: 'assistant', content: `Вітаю! Мене звати ${candidate.name}. Я побачила ваш пост про бізнес. Чим саме ви займаєтесь?` }]);
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading || !selectedCandidate) return;

    const userMsg = inputValue;
    setInputValue('');
    setChatHistory(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const aiResponse = await startSimulationSession(selectedCandidate.type, userMsg, chatHistory);
      setChatHistory(prev => [...prev, { role: 'assistant', content: aiResponse || 'Вибачте, сталася помилка.' }]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const endSession = async () => {
    setIsLoading(true);
    try {
      const dialogue = chatHistory.map(m => `${m.role === 'user' ? 'Партнер' : 'Кандидат'}: ${m.content}`).join('\n');
      const evalResult = await evaluateResponse(dialogue);
      setEvaluation(evalResult);
      if (evalResult.score >= 7) {
        addXP(30);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (evaluation) {
    return (
      <div className="max-w-2xl mx-auto py-10 animate-in zoom-in-95 duration-500">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 text-center">
          <div className="w-24 h-24 quest-gradient rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-emerald-100">
            <Award size={48} />
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-2">Тренування завершено!</h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-5xl font-black text-emerald-600">{evaluation.score}</span>
            <span className="text-xl font-bold text-slate-400">/ 10</span>
          </div>
          
          <div className="bg-slate-50 rounded-2xl p-6 text-left mb-8 space-y-4">
            <h4 className="font-bold text-slate-700 flex items-center gap-2">
              <Sparkles size={18} className="text-amber-500" /> Поради AI-ментора:
            </h4>
            <ul className="space-y-3">
              {evaluation.feedback.map((f, i) => (
                <li key={i} className="text-sm text-slate-600 flex gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => {setEvaluation(null); setSelectedCandidate(null); setChatHistory([]);}}
              className="flex-1 bg-slate-100 text-slate-700 font-bold py-4 rounded-2xl hover:bg-slate-200 transition-colors"
            >
              До вибору
            </button>
            <button 
               onClick={() => {setEvaluation(null); startSession(selectedCandidate!);}}
              className="flex-1 quest-gradient text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-100 hover:scale-[1.02] transition-transform"
            >
              Спробувати ще раз
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedCandidate) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
        <header className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Симулятор діалогів</h2>
          <p className="text-slate-500">Оберіть типаж кандидата для тренування навичок спілкування.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CANDIDATES.map(candidate => (
            <div 
              key={candidate.id}
              onClick={() => startSession(candidate)}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                  <User size={28} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  candidate.difficulty === 'EASY' ? 'bg-emerald-100 text-emerald-600' :
                  candidate.difficulty === 'MEDIUM' ? 'bg-amber-100 text-amber-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  {candidate.difficulty}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-800">{candidate.name}</h3>
              <p className="text-xs font-bold text-emerald-600 mt-1 uppercase tracking-tighter">{candidate.type}</p>
              <p className="text-sm text-slate-500 mt-3 leading-relaxed">{candidate.description}</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Оцінка від AI доступна</span>
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <ChevronLeft size={20} className="rotate-180" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto h-[calc(100vh-160px)] flex flex-col animate-in slide-in-from-right-8 duration-500">
      <div className="bg-white rounded-t-3xl border-x border-t p-4 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => setSelectedCandidate(null)} className="p-2 text-slate-400 hover:text-slate-600">
            <ChevronLeft size={24} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
              {selectedCandidate.name[0]}
            </div>
            <div>
              <p className="font-bold text-sm leading-none">{selectedCandidate.name}</p>
              <p className="text-[10px] text-emerald-500 font-bold mt-1">Кандидат • Online</p>
            </div>
          </div>
        </div>
        <button 
          onClick={endSession}
          className="bg-emerald-50 text-emerald-600 text-xs font-bold px-4 py-2 rounded-xl hover:bg-emerald-100 transition-colors"
        >
          Завершити
        </button>
      </div>

      <div className="flex-1 bg-white border-x overflow-y-auto p-4 space-y-4">
        {chatHistory.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-emerald-500 text-white rounded-tr-none' 
                : 'bg-slate-50 text-slate-700 rounded-tl-none border border-slate-100'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none border border-slate-100 flex gap-1">
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="bg-white rounded-b-3xl border p-4 shadow-lg z-10">
        <form 
          onSubmit={(e) => {e.preventDefault(); handleSend();}}
          className="flex items-center gap-2 bg-slate-50 p-1 rounded-2xl border border-slate-200 focus-within:ring-2 focus-within:ring-emerald-200 transition-all"
        >
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Напишіть відповідь..."
            className="flex-1 bg-transparent px-4 py-2 text-sm outline-none"
          />
          <button 
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="p-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 disabled:opacity-50 disabled:bg-slate-300 transition-all shadow-md shadow-emerald-100"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Simulator;
