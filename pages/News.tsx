
import React, { useState } from 'react';
import { SiteContent, NewsItem } from '../types';
import EditableText from '../components/EditableText';
import { generateNewsArticle } from '../services/gemini';

interface NewsPageProps {
  content: SiteContent;
  isEditMode: boolean;
  updateContent: (key: keyof SiteContent, value: any) => void;
}

const NewsPage: React.FC<NewsPageProps> = ({ content, isEditMode, updateContent }) => {
  const [generating, setGenerating] = useState(false);

  const handleUpdateNews = (id: string, field: keyof NewsItem, val: any) => {
    const updated = content.news.map(n => n.id === id ? { ...n, [field]: val } : n);
    updateContent('news', updated);
  };

  const addNewPost = async () => {
    const topic = prompt('Sobre o que é a notícia?');
    if (!topic) return;

    setGenerating(true);
    const aiData = await generateNewsArticle(topic);
    
    const newPost: NewsItem = {
      id: Date.now().toString(),
      title: aiData.title || "Nova Notícia",
      excerpt: "Breve resumo da novidade.",
      content: aiData.content || "Conteúdo completo aqui...",
      date: new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }),
      imageUrl: "https://picsum.photos/1200/800"
    };
    
    updateContent('news', [newPost, ...content.news]);
    setGenerating(false);
  };

  const deleteNews = (id: string) => {
    if (confirm('Excluir notícia?')) {
      updateContent('news', content.news.filter(n => n.id !== id));
    }
  };

  return (
    <div className="py-20 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="mb-20 flex justify-between items-center">
          <div>
            <h1 className="text-6xl font-heading font-black text-white mb-2 tracking-tighter uppercase italic">Blog Adonai</h1>
            <p className="text-yellow-500 font-bold tracking-[0.4em] text-xs">MÚSICA • VIDA • FÉ</p>
          </div>
          {isEditMode && (
            <button 
              onClick={addNewPost}
              disabled={generating}
              className="bg-white text-black px-8 py-3 rounded-full font-bold text-sm uppercase hover:bg-yellow-500 transition-all disabled:opacity-50"
            >
              {generating ? 'Gerando com IA...' : 'Criar Notícia ✨'}
            </button>
          )}
        </header>

        <div className="space-y-32">
          {content.news.map((item, idx) => (
            <article key={item.id} className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>
              <div className="w-full md:w-1/2 relative group">
                <div className="aspect-[16/9] overflow-hidden rounded-2xl">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
                </div>
                {isEditMode && (
                  <button 
                    onClick={() => deleteNews(item.id)}
                    className="absolute top-4 right-4 bg-black/80 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                )}
              </div>

              <div className="w-full md:w-1/2">
                <span className="text-yellow-500 font-bold text-xs uppercase mb-4 block tracking-widest">{item.date}</span>
                <h2 className="text-4xl font-heading font-bold text-white mb-6 leading-tight">
                  <EditableText 
                    text={item.title} 
                    isEditMode={isEditMode} 
                    onSave={(val) => handleUpdateNews(item.id, 'title', val)} 
                  />
                </h2>
                <div className="text-gray-400 text-lg leading-relaxed mb-8">
                  <EditableText 
                    text={item.content} 
                    isEditMode={isEditMode} 
                    onSave={(val) => handleUpdateNews(item.id, 'content', val)} 
                    multiline
                  />
                </div>
                <button className="flex items-center gap-2 text-white font-bold uppercase text-xs border-b border-yellow-500 pb-2 hover:text-yellow-500 transition-colors">
                  Ler matéria completa
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
