
import React, { useState, useEffect } from 'react';
import { SiteContent, Page, Artist, Release, NewsItem } from './types';
import { INITIAL_CONTENT } from './constants';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ArtistsPage from './pages/Artists';
import ReleasesPage from './pages/Releases';
import NewsPage from './pages/News';
import ContactPage from './pages/Contact';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isEditMode, setIsEditMode] = useState(false);
  const [content, setContent] = useState<SiteContent>(() => {
    const saved = localStorage.getItem('adonai_music_content');
    return saved ? JSON.parse(saved) : INITIAL_CONTENT;
  });

  useEffect(() => {
    localStorage.setItem('adonai_music_content', JSON.stringify(content));
  }, [content]);

  const updateContent = (key: keyof SiteContent, value: any) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home 
            content={content} 
            isEditMode={isEditMode} 
            updateContent={updateContent} 
            setCurrentPage={setCurrentPage}
          />
        );
      case 'artists':
        return <ArtistsPage content={content} isEditMode={isEditMode} updateContent={updateContent} />;
      case 'releases':
        return <ReleasesPage content={content} isEditMode={isEditMode} updateContent={updateContent} />;
      case 'news':
        return <NewsPage content={content} isEditMode={isEditMode} updateContent={updateContent} />;
      case 'contact':
        return <ContactPage />;
      default:
        return <Home content={content} isEditMode={isEditMode} updateContent={updateContent} setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        isEditMode={isEditMode}
        toggleEditMode={() => setIsEditMode(!isEditMode)}
      />
      
      <main className="pt-20">
        {renderPage()}
      </main>

      <footer className="bg-black border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center font-heading font-black text-black text-lg">
                A
              </div>
              <span className="font-heading font-bold text-xl tracking-tighter">ADONAI MUSIC</span>
            </div>
            <p className="text-gray-400 max-w-sm mb-6">
              Excelência na produção de música cristã. Levando a palavra através do louvor para todas as nações.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors group">
                <svg className="w-5 h-5 group-hover:text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors group">
                <svg className="w-5 h-5 group-hover:text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-heading font-bold text-white mb-6 uppercase tracking-widest text-sm">Links Úteis</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><button onClick={() => setCurrentPage('artists')} className="hover:text-yellow-500 transition-colors">Artistas</button></li>
              <li><button onClick={() => setCurrentPage('releases')} className="hover:text-yellow-500 transition-colors">Discografia</button></li>
              <li><button onClick={() => setCurrentPage('news')} className="hover:text-yellow-500 transition-colors">Blog Adonai</button></li>
              <li><button onClick={() => setCurrentPage('contact')} className="hover:text-yellow-500 transition-colors">Fale Conosco</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-bold text-white mb-6 uppercase tracking-widest text-sm">Escritório</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Av. Paulista, 1000 - Bela Vista<br />
              São Paulo - SP, 01310-100<br />
              contato@adonaimusic.com.br
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-gray-600 text-xs">
          &copy; 2024 ADONAI MUSIC. Desenvolvido com excelência para o Reino.
        </div>
      </footer>
    </div>
  );
};

export default App;
