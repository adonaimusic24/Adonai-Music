
import React, { useState } from 'react';
import { SiteContent, Artist } from '../types';
import EditableText from '../components/EditableText';
import { generateArtistBio } from '../services/gemini';

interface ArtistsPageProps {
  content: SiteContent;
  isEditMode: boolean;
  updateContent: (key: keyof SiteContent, value: any) => void;
}

const ArtistsPage: React.FC<ArtistsPageProps> = ({ content, isEditMode, updateContent }) => {
  const [loadingBio, setLoadingBio] = useState<string | null>(null);

  const handleUpdateArtist = (id: string, field: keyof Artist, val: any) => {
    const updated = content.artists.map(a => a.id === id ? { ...a, [field]: val } : a);
    updateContent('artists', updated);
  };

  const handleUpdateSocial = (id: string, platform: keyof Artist['socials'], val: string) => {
    const updated = content.artists.map(a => {
      if (a.id === id) {
        return { ...a, socials: { ...a.socials, [platform]: val } };
      }
      return a;
    });
    updateContent('artists', updated);
  };

  const handleGenerateBio = async (artist: Artist) => {
    setLoadingBio(artist.id);
    const newBio = await generateArtistBio(artist.name, artist.genre);
    handleUpdateArtist(artist.id, 'bio', newBio);
    setLoadingBio(null);
  };

  const addNewArtist = () => {
    const newArtist: Artist = {
      id: Date.now().toString(),
      name: "Novo Artista",
      bio: "Breve descrição do ministério.",
      imageUrl: "https://picsum.photos/800/1000",
      genre: "Gospel",
      socials: { instagram: "", youtube: "", spotify: "" }
    };
    updateContent('artists', [...content.artists, newArtist]);
  };

  const deleteArtist = (id: string) => {
    if (confirm('Deseja realmente remover este artista?')) {
      updateContent('artists', content.artists.filter(a => a.id !== id));
    }
  };

  return (
    <div className="py-20 px-6 min-h-screen animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-heading font-black text-white mb-2 uppercase">Cast de Artistas</h1>
            <div className="h-1.5 w-32 bg-yellow-500" />
          </div>
          {isEditMode && (
            <button 
              onClick={addNewArtist}
              className="bg-yellow-500 text-black px-6 py-3 rounded-full font-bold text-sm uppercase flex items-center gap-2 hover:bg-yellow-400 transition-colors shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
              Adicionar Artista
            </button>
          )}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {content.artists.map((artist) => (
            <div key={artist.id} className="relative group bg-white/5 rounded-3xl overflow-hidden border border-white/5 transition-all hover:border-white/10 hover:shadow-2xl">
              {isEditMode && (
                <button 
                  onClick={() => deleteArtist(artist.id)}
                  className="absolute top-4 right-4 z-20 bg-red-600/80 p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              )}
              
              <div className="aspect-[3/4] overflow-hidden relative">
                <img src={artist.imageUrl} alt={artist.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-3xl font-heading font-black text-white">
                      <EditableText 
                        text={artist.name} 
                        isEditMode={isEditMode} 
                        onSave={(val) => handleUpdateArtist(artist.id, 'name', val)} 
                      />
                    </h3>
                    <p className="text-yellow-500 font-bold uppercase tracking-widest text-xs">
                      <EditableText 
                        text={artist.genre} 
                        isEditMode={isEditMode} 
                        onSave={(val) => handleUpdateArtist(artist.id, 'genre', val)} 
                      />
                    </p>
                  </div>
                </div>
                
                <div className="relative">
                  <p className="text-gray-400 leading-relaxed mb-6 italic">
                    <EditableText 
                      text={artist.bio} 
                      isEditMode={isEditMode} 
                      onSave={(val) => handleUpdateArtist(artist.id, 'bio', val)} 
                      multiline
                    />
                  </p>
                  {isEditMode && (
                    <button 
                      onClick={() => handleGenerateBio(artist)}
                      disabled={loadingBio === artist.id}
                      className="text-[10px] uppercase font-bold text-yellow-500 hover:text-white transition-colors flex items-center gap-1 mb-4 disabled:opacity-50"
                    >
                      {loadingBio === artist.id ? (
                        <>Gerando...</>
                      ) : (
                        <>✨ Gerar Bio com IA</>
                      )}
                    </button>
                  )}
                </div>

                <div className="pt-4 border-t border-white/5">
                  {isEditMode ? (
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-500 uppercase font-bold w-16">Instagram:</span>
                        <input 
                          type="text" 
                          placeholder="Link"
                          value={artist.socials.instagram || ''} 
                          onChange={(e) => handleUpdateSocial(artist.id, 'instagram', e.target.value)}
                          className="flex-1 bg-black/20 border border-white/10 rounded px-2 py-1 text-xs focus:outline-none focus:border-yellow-500"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-500 uppercase font-bold w-16">Spotify:</span>
                        <input 
                          type="text" 
                          placeholder="Link"
                          value={artist.socials.spotify || ''} 
                          onChange={(e) => handleUpdateSocial(artist.id, 'spotify', e.target.value)}
                          className="flex-1 bg-black/20 border border-white/10 rounded px-2 py-1 text-xs focus:outline-none focus:border-yellow-500"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-500 uppercase font-bold w-16">YouTube:</span>
                        <input 
                          type="text" 
                          placeholder="Link"
                          value={artist.socials.youtube || ''} 
                          onChange={(e) => handleUpdateSocial(artist.id, 'youtube', e.target.value)}
                          className="flex-1 bg-black/20 border border-white/10 rounded px-2 py-1 text-xs focus:outline-none focus:border-yellow-500"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex space-x-6">
                      {artist.socials.spotify && artist.socials.spotify !== '#' && (
                        <a href={artist.socials.spotify} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-500 transition-colors">
                          <span className="text-[10px] font-black uppercase tracking-widest">Spotify</span>
                        </a>
                      )}
                      {artist.socials.youtube && artist.socials.youtube !== '#' && (
                        <a href={artist.socials.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-red-500 transition-colors">
                          <span className="text-[10px] font-black uppercase tracking-widest">YouTube</span>
                        </a>
                      )}
                      {artist.socials.instagram && artist.socials.instagram !== '#' && (
                        <a href={artist.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-500 transition-colors">
                          <span className="text-[10px] font-black uppercase tracking-widest">Instagram</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistsPage;
