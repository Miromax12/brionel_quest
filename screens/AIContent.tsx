
import React, { useState } from 'react';
import { Sparkles, MessageSquare, Image as ImageIcon, Search, Layout, Lightbulb, Copy, Check } from 'lucide-react';
import { generateContentIdeas } from '../geminiService';

const AIContent: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    try {
      const ideas = await generateContentIdeas(prompt);
      setResult(ideas || null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900">AI-асистент контенту</h2>
          <p className="text-slate-500 mt-1">Твій персональний копірайтер та стратег у кишені.</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-sm font-bold border border-emerald-100">
          <Sparkles size={16} />
          <span>Преміум доступ</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Lightbulb size={18} className="text-amber-500" /> Швидкі дії
            </h3>
            <div className="space-y-3">
              <QuickActionButton icon={<MessageSquare size={18} />} label="Пост на сьогодні" onClick={() => setPrompt("Пост про мій шлях у BRIONEL")} />
              <QuickActionButton icon={<ImageIcon size={18} />} label="Ідея для сторіс" onClick={() => setPrompt("5 ідей для сторіс про продукцію")} />
              <QuickActionButton icon={<Search size={18} />} label="Аналіз профілю" onClick={() => setPrompt("Аналіз мого Instagram профілю")} />
              <QuickActionButton icon={<Layout size={18} />} label="Сценарій Reels" onClick={() => setPrompt("Сценарій для Reels про переваги мережевого бізнесу")} />
            </div>
          </section>

          <section className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-slate-200">
            <h3 className="font-bold mb-2">Готові шаблони</h3>
            <p className="text-xs text-slate-400 mb-4">Використовуй перевірені структури від лідерів.</p>
            <div className="space-y-2">
              {['AIDA', 'PAS', 'Storytelling', 'Before-After'].map(template => (
                <div key={template} className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-colors">
                  <span className="text-sm font-medium">{template}</span>
                  <Sparkles size={14} className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col min-h-[400px]">
            <div className="mb-6">
              <label className="text-sm font-bold text-slate-700 block mb-2">Про що написати?</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Наприклад: Пост про користь детокс-програми"
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none transition-all"
                />
                <button 
                  onClick={handleGenerate}
                  disabled={isLoading || !prompt.trim()}
                  className="quest-gradient text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:shadow-lg disabled:opacity-50 transition-all whitespace-nowrap"
                >
                  {isLoading ? 'Генерую...' : <><Sparkles size={18} /> Створити</>}
                </button>
              </div>
            </div>

            <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-100 p-6 relative">
              {result ? (
                <>
                  <button 
                    onClick={copyToClipboard}
                    className="absolute top-4 right-4 p-2 bg-white border rounded-xl text-slate-500 hover:text-emerald-500 transition-colors shadow-sm"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                  <div className="prose prose-sm max-w-none text-slate-700 whitespace-pre-wrap">
                    {result}
                  </div>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center py-10">
                  <Sparkles size={48} className="mb-4 opacity-20" />
                  <p className="text-sm">Тут з'являться твої ідеї.<br/>Введи запит вище.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const QuickActionButton: React.FC<{ icon: React.ReactNode, label: string, onClick: () => void }> = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 text-sm font-semibold hover:bg-emerald-50 hover:border-emerald-100 hover:text-emerald-600 transition-all group"
  >
    <span className="text-slate-400 group-hover:text-emerald-500 transition-colors">{icon}</span>
    {label}
  </button>
);

export default AIContent;
