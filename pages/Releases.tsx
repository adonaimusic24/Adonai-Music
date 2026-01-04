
import React from 'react';
import { SiteContent, Release } from '../types';
import EditableText from '../components/EditableText';

interface ReleasesPageProps {
  content: SiteContent;
  isEditMode: boolean;
  updateContent: (key: keyof SiteContent, value: any) => void;
}

const ReleasesPage: React.FC<ReleasesPageProps> = ({ content, isEditMode, updateContent }) => {
  const handleUpdateRelease = (id: string, field: keyof Release, val: any) => {
    const updated = content.releases.map(r => r.id === id ? { ...r, [field]: val } : r);
    updateContent('releases', updated);
  };

  const handleUpdateLink = (id: string, platform: keyof Release['platformLinks'], val: string) => {
    const updated = content.releases.map(r => {
      if (r.id === id) {
        return { ...r, platformLinks: { ...r.platformLinks, [platform]: val } };
      }
      return r;
    });
    updateContent('releases', updated);
  };

  const addNewRelease = () => {
    const newRelease: Release = {
      id: Date.now().toString(),
      title: "Novo Lançamento",
      artistId: content.artists[0]?.id || "1",
      artistName: content.artists[0]?.name || "Artista",
      coverUrl: "https://picsum.photos/600/600",
      releaseDate: new Date().toISOString().split('T')[0],
      platformLinks: { spotify: "", youtube: "", deezer: "" }
    };
    updateContent('releases', [...content.releases, newRelease]);
  };

  const deleteRelease = (id: string) => {
    if (confirm('Deseja remover este lançamento?')) {
      updateContent('releases', content.releases.filter(r => r.id !== id));
    }
  };

  return (
    <div className="py-20 px-6 min-h-screen animate-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-heading font-black text-white mb-2 uppercase">Discografia</h1>
            <div className="h-1.5 w-32 bg-yellow-500" />
          </div>
          {isEditMode && (
            <button 
              onClick={addNewRelease}
              className="bg-yellow-500 text-black px-6 py-3 rounded-full font-bold text-sm uppercase hover:bg-yellow-400 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
              Adicionar Lançamento
            </button>
          )}
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.releases.map((release) => (
            <div key={release.id} className="group flex flex-col">
              <div className="relative aspect-square mb-6 overflow-hidden rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:-translate-y-2">
                <img src={release.coverUrl} alt={release.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-4">
                  {release.platformLinks.youtube && (
                    <a href={release.platformLinks.youtube} target="_blank" rel="noopener noreferrer" className="p-3 bg-yellow-500 text-black rounded-full hover:scale-110 transition-transform shadow-xl">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/></svg>
                    </a>
                  )}
                </div>
                {isEditMode && (
                  <button 
                    onClick={() => deleteRelease(release.id)}
                    className="absolute top-2 right-2 p-1.5 bg-red-600 rounded-full text-white"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                )}
              </div>
              
              <h3 className="text-xl font-heading font-bold text-white mb-1">
                <EditableText 
                  text={release.title} 
                  isEditMode={isEditMode} 
                  onSave={(val) => handleUpdateRelease(release.id, 'title', val)} 
                />
              </h3>
              <p className="text-gray-400 font-medium mb-3">
                <EditableText 
                  text={release.artistName} 
                  isEditMode={isEditMode} 
                  onSave={(val) => handleUpdateRelease(release.id, 'artistName', val)} 
                />
              </p>
              
              <div className="mt-auto">
                {isEditMode ? (
                  <div className="space-y-1 pt-2 border-t border-white/5">
                    <input 
                      type="text" 
                      placeholder="Spotify URL" 
                      value={release.platformLinks.spotify || ''} 
                      onChange={(e) => handleUpdateLink(release.id, 'spotify', e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded px-2 py-1 text-[10px] focus:outline-none focus:border-yellow-500"
                    />
                    <input 
                      type="text" 
                      placeholder="YouTube URL" 
                      value={release.platformLinks.youtube || ''} 
                      onChange={(e) => handleUpdateLink(release.id, 'youtube', e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded px-2 py-1 text-[10px] focus:outline-none focus:border-yellow-500"
                    />
                  </div>
                ) : (
                  <div className="flex gap-4 opacity-60 group-hover:opacity-100 transition-opacity">
                    {release.platformLinks.spotify && (
                      <a href={release.platformLinks.spotify} target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors">
                        <span className="text-[10px] font-bold">SPOTIFY</span>
                      </a>
                    )}
                    {release.platformLinks.youtube && (
                      <a href={release.platformLinks.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">
                        <span className="text-[10px] font-bold">YOUTUBE</span>
                      </a>
                    )}
                    {release.platformLinks.deezer && (
                      <a href={release.platformLinks.deezer} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                        <span className="text-[10px] font-bold">DEEZER</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReleasesPage;
