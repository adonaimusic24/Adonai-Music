

// --- CONFIGURAÇÃO E ESTADO ---
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Adicionando declarações globais para evitar erros de TypeScript no objeto window
declare global {
  interface Window {
    nav: (page: string) => void;
    toggleEdit: () => void;
    updateHero: (field: string, val: string) => void;
    updateArtist: (id: string, field: string, val: string) => void;
    updateArtistSocial: (id: string, platform: string, val: string) => void;
    aiBio: (id: string) => Promise<void>;
  }
}

const INITIAL_CONTENT = {
    hero: {
        title: "O LOUVOR QUE TOCA O CÉU",
        subtitle: "A Adonai Music é mais que uma gravadora, é um ministério dedicado a levar a palavra através da música.",
        cta: "Conheça nossos artistas",
        backgroundImage: "https://raw.githubusercontent.com/L-S-D-S/img/main/adonai_bg.png"
    },
    about: {
        title: "Nossa Missão",
        description: "Nascida no coração de Deus, a Adonai Music foca na excelência da produção musical cristã."
    },
    artists: [
        { id: "1", name: "Ana Vitória", genre: "Pentecostal", bio: "Voz potente da nova geração.", imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800", socials: { instagram: "#", spotify: "#", youtube: "#" } },
        { id: "2", name: "Clécia Matos", genre: "Worship", bio: "Adoração profética profunda.", imageUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=800", socials: { instagram: "#", spotify: "#", youtube: "#" } }
    ],
    releases: [
        { id: "101", title: "Sem Ti", artist: "Jon Gabriel", cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=600", links: { spotify: "#", youtube: "#" } }
    ],
    news: [
        { id: "201", title: "Novo DVD Gravado", date: "24 Mai 2024", content: "Uma noite inesquecível de adoração.", imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800" }
    ]
};

let state = {
    currentPage: 'home',
    isEditMode: false,
    content: JSON.parse(localStorage.getItem('adonai_v3_data') || 'null') || INITIAL_CONTENT
};

// --- FUNÇÕES DE NAVEGAÇÃO E ESTADO ---
function setState(newState) {
    state = { ...state, ...newState };
    localStorage.setItem('adonai_v3_data', JSON.stringify(state.content));
    render();
}

function navigate(page) {
    window.scrollTo(0, 0);
    setState({ currentPage: page });
}

function toggleEdit() {
    setState({ isEditMode: !state.isEditMode });
}

// --- SERVIÇOS DE IA ---
async function generateBio(artistName, genre) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `Escreva uma biografia inspiradora e curta (max 150 caracteres) para o artista gospel ${artistName} de estilo ${genre}.`
        });
        return response.text;
    } catch (e) { return "Erro ao gerar bio."; }
}

// --- COMPONENTES DE RENDERIZAÇÃO ---
function renderNavbar() {
    return `
    <nav class="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div class="flex items-center space-x-2 cursor-pointer" onclick="window.nav('home')">
                <div class="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center font-heading font-black text-black text-xl">A</div>
                <span class="font-heading font-bold text-xl tracking-tighter uppercase">ADONAI <span class="text-yellow-500">MUSIC</span></span>
            </div>
            <div class="hidden md:flex items-center space-x-8">
                ${['home', 'artists', 'releases', 'news', 'contact'].map(p => `
                    <button onclick="window.nav('${p}')" class="text-sm font-bold uppercase tracking-widest transition-colors ${state.currentPage === p ? 'text-yellow-500' : 'text-gray-400 hover:text-white'}">
                        ${p === 'home' ? 'Início' : p === 'artists' ? 'Artistas' : p === 'releases' ? 'Lançamentos' : p === 'news' ? 'Blog' : 'Contato'}
                    </button>
                `).join('')}
                <button onclick="window.toggleEdit()" class="px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${state.isEditMode ? 'bg-red-600 text-white animate-pulse' : 'bg-white/10 text-white hover:bg-white/20'}">
                    ${state.isEditMode ? 'Sair da Edição' : 'Modo Edição'}
                </button>
            </div>
        </div>
    </nav>`;
}

function renderHome() {
    const { hero, artists, about } = state.content;
    return `
    <div class="page-fade">
        <section class="relative h-[90vh] flex items-center justify-center bg-black">
            <div class="absolute inset-0 opacity-40">
                <img src="${hero.backgroundImage}" class="w-full h-full object-contain mix-blend-screen">
                <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
            </div>
            <div class="relative z-10 text-center px-6">
                <h1 class="text-5xl md:text-8xl font-heading font-black text-white mb-6 leading-none" 
                    contenteditable="${state.isEditMode}" onblur="window.updateHero('title', this.innerText)">${hero.title}</h1>
                <p class="text-xl text-gray-300 max-w-2xl mx-auto mb-10"
                    contenteditable="${state.isEditMode}" onblur="window.updateHero('subtitle', this.innerText)">${hero.subtitle}</p>
                <button onclick="window.nav('artists')" class="bg-yellow-500 text-black font-black px-12 py-4 rounded-full uppercase text-sm hover:scale-105 transition-transform shadow-2xl shadow-yellow-500/20">
                    ${hero.cta}
                </button>
            </div>
        </section>

        <section class="py-24 px-6 max-w-7xl mx-auto">
            <h2 class="text-3xl font-heading font-black text-white mb-12 uppercase italic border-l-4 border-yellow-500 pl-4">Artistas em Destaque</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
                ${artists.slice(0, 3).map(a => `
                    <div class="group cursor-pointer" onclick="window.nav('artists')">
                        <div class="aspect-[3/4] overflow-hidden rounded-2xl mb-4 border border-white/10">
                            <img src="${a.imageUrl}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                        </div>
                        <h3 class="text-2xl font-bold">${a.name}</h3>
                        <p class="text-yellow-500 text-xs font-black uppercase tracking-widest">${a.genre}</p>
                    </div>
                `).join('')}
            </div>
        </section>
    </div>`;
}

function renderArtists() {
    return `
    <div class="py-20 px-6 max-w-7xl mx-auto page-fade">
        <h1 class="text-5xl font-heading font-black mb-16 uppercase">Nosso Cast</h1>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
            ${state.content.artists.map(a => `
                <div class="bg-white/5 rounded-3xl overflow-hidden border border-white/5 p-6 hover:border-yellow-500/30 transition-colors">
                    <img src="${a.imageUrl}" class="w-full aspect-square object-cover rounded-2xl mb-6">
                    <h3 class="text-3xl font-bold mb-1" contenteditable="${state.isEditMode}" onblur="window.updateArtist('${a.id}', 'name', this.innerText)">${a.name}</h3>
                    <p class="text-yellow-500 text-xs font-bold uppercase mb-4" contenteditable="${state.isEditMode}" onblur="window.updateArtist('${a.id}', 'genre', this.innerText)">${a.genre}</p>
                    <p class="text-gray-400 text-sm italic mb-6 leading-relaxed" contenteditable="${state.isEditMode}" onblur="window.updateArtist('${a.id}', 'bio', this.innerText)">${a.bio}</p>
                    
                    ${state.isEditMode ? `
                        <div class="space-y-2 mb-4">
                            <input type="text" placeholder="Link Instagram" value="${a.socials.instagram}" onchange="window.updateArtistSocial('${a.id}', 'instagram', this.value)" class="w-full bg-black/40 border border-white/10 rounded p-2 text-xs">
                            <input type="text" placeholder="Link Spotify" value="${a.socials.spotify}" onchange="window.updateArtistSocial('${a.id}', 'spotify', this.value)" class="w-full bg-black/40 border border-white/10 rounded p-2 text-xs">
                            <button onclick="window.aiBio('${a.id}')" class="w-full bg-white/5 text-[10px] font-bold py-2 uppercase rounded border border-white/10 hover:bg-yellow-500 hover:text-black transition-colors">✨ Gerar Bio com IA</button>
                        </div>
                    ` : `
                        <div class="flex gap-4">
                            ${a.socials.spotify !== '#' ? `<a href="${a.socials.spotify}" class="text-[10px] font-black uppercase text-green-500">Spotify</a>` : ''}
                            ${a.socials.instagram !== '#' ? `<a href="${a.socials.instagram}" class="text-[10px] font-black uppercase text-pink-500">Instagram</a>` : ''}
                        </div>
                    `}
                </div>
            `).join('')}
        </div>
    </div>`;
}

// --- ENGINE DE RENDERIZAÇÃO ---
function render() {
    const root = document.getElementById('app');
    if (!root) return;

    let pageContent = '';
    switch (state.currentPage) {
        case 'home': pageContent = renderHome(); break;
        case 'artists': pageContent = renderArtists(); break;
        case 'releases': pageContent = `<div class="p-20 text-center h-screen uppercase font-bold text-gray-500">Discografia em breve...</div>`; break;
        case 'news': pageContent = `<div class="p-20 text-center h-screen uppercase font-bold text-gray-500">Notícias em breve...</div>`; break;
        case 'contact': pageContent = `<div class="p-20 text-center h-screen uppercase font-bold text-gray-500">Página de Contato em breve...</div>`; break;
    }

    root.innerHTML = `
        <div class="min-h-screen ${state.isEditMode ? 'edit-active' : ''}">
            ${renderNavbar()}
            <main class="pt-20">
                ${pageContent}
            </main>
            <footer class="bg-black border-t border-white/5 py-12 px-6 text-center text-gray-600 text-xs font-bold uppercase tracking-widest">
                &copy; 2024 ADONAI MUSIC - Pure Vanilla Experience
            </footer>
        </div>
    `;
}

// --- EXPOSIÇÃO GLOBAL PARA O HTML ---
// Assign functions to window and ensure TypeScript recognizes them
window.nav = navigate;
window.toggleEdit = toggleEdit;
window.updateHero = (field, val) => {
    state.content.hero[field as keyof typeof state.content.hero] = val;
    localStorage.setItem('adonai_v3_data', JSON.stringify(state.content));
};
window.updateArtist = (id, field, val) => {
    const artist = state.content.artists.find(a => a.id === id);
    if (artist) (artist as any)[field] = val;
    localStorage.setItem('adonai_v3_data', JSON.stringify(state.content));
};
window.updateArtistSocial = (id, platform, val) => {
    const artist = state.content.artists.find(a => a.id === id);
    if (artist) (artist.socials as any)[platform] = val;
    localStorage.setItem('adonai_v3_data', JSON.stringify(state.content));
};
window.aiBio = async (id) => {
    const artist = state.content.artists.find(a => a.id === id);
    if (artist) {
        const newBio = await generateBio(artist.name, artist.genre);
        artist.bio = newBio;
        render();
    }
};

// Início
render();
