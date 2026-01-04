
import React from 'react';
import { SiteContent, Page } from '../types';
import EditableText from '../components/EditableText';

interface HomeProps {
  content: SiteContent;
  isEditMode: boolean;
  updateContent: (key: keyof SiteContent, value: any) => void;
  setCurrentPage: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ content, isEditMode, updateContent, setCurrentPage }) => {
  const { hero, artists, releases, news } = content;

  const handleHeroChange = (field: keyof typeof hero, val: string) => {
    updateContent('hero', { ...hero, [field]: val });
  };

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src={hero.backgroundImage} 
            alt="Hero Background" 
            className="w-full h-full object-contain opacity-40 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-8xl font-heading font-black text-white mb-6 tracking-tight leading-[0.9]">
            <EditableText 
              text={hero.title} 
              isEditMode={isEditMode} 
              onSave={(val) => handleHeroChange('title', val)} 
            />
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 font-light max-w-2xl mx-auto">
            <EditableText 
              text={hero.subtitle} 
              isEditMode={isEditMode} 
              onSave={(val) => handleHeroChange('subtitle', val)}
              multiline
            />
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setCurrentPage('artists')}
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 active:scale-95 tracking-wide text-sm uppercase shadow-[0_0_30px_rgba(234,179,8,0.3)]"
            >
              {hero.cta}
            </button>
            <button 
              onClick={() => setCurrentPage('releases')}
              className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-10 rounded-full transition-all backdrop-blur-sm text-sm uppercase border border-white/20"
            >
              Ver Lançamentos
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Featured Artists Summary */}
      <section className="py-24 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-heading font-bold text-white mb-2 uppercase tracking-tighter italic">Destaques</h2>
              <div className="h-1 w-20 bg-yellow-500" />
            </div>
            <button 
              onClick={() => setCurrentPage('artists')}
              className="text-yellow-500 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors"
            >
              Ver todos os artistas &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {artists.slice(0, 3).map((artist) => (
              <div key={artist.id} className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-6 ring-1 ring-white/10">
                  <img 
                    src={artist.imageUrl} 
                    alt={artist.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="bg-yellow-500 text-black px-6 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform">Ver Perfil</button>
                  </div>
                </div>
                <h3 className="text-2xl font-heading font-bold text-white group-hover:text-yellow-500 transition-colors">{artist.name}</h3>
                <p className="text-gray-400 font-medium text-sm mt-1 uppercase tracking-widest">{artist.genre}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Releases Grid */}
      <section className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-heading font-bold text-white mb-4 uppercase">Novidades</h2>
            <p className="text-gray-400 max-w-lg mx-auto">Fique por dentro dos últimos lançamentos que estão impactando vidas em todo o país.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {releases.map((release) => (
              <div key={release.id} className="group">
                <div className="relative aspect-square overflow-hidden rounded-lg mb-4 shadow-2xl ring-1 ring-white/10">
                  <img src={release.coverUrl} alt={release.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-4">
                    <button className="p-2 bg-white/10 hover:bg-yellow-500 hover:text-black rounded-full transition-all">
                       <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/></svg>
                    </button>
                  </div>
                </div>
                <h4 className="font-bold text-white truncate">{release.title}</h4>
                <p className="text-gray-500 text-sm">{release.artistName}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 px-6 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/3 h-full bg-yellow-500/5 blur-[120px] -z-10" />
         <div className="max-w-4xl mx-auto text-center">
            <span className="text-yellow-500 font-bold uppercase tracking-[0.3em] text-xs mb-8 block">Sobre Nós</span>
            <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-8 leading-tight">
              <EditableText 
                text={content.about.title} 
                isEditMode={isEditMode} 
                onSave={(val) => updateContent('about', { ...content.about, title: val })} 
              />
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed font-light">
              <EditableText 
                text={content.about.description} 
                isEditMode={isEditMode} 
                onSave={(val) => updateContent('about', { ...content.about, description: val })} 
                multiline
              />
            </p>
         </div>
      </section>
    </div>
  );
};

export default Home;
