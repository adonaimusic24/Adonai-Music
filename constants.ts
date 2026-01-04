
import { SiteContent } from './types';

export const INITIAL_CONTENT: SiteContent = {
  hero: {
    title: "O LOUVOR QUE TOCA O CÉU",
    subtitle: "A Adonai Music é mais que uma gravadora, é um ministério dedicado a levar a palavra através da música.",
    cta: "Conheça nossos artistas",
    backgroundImage: "https://instagram.fios4-1.fna.fbcdn.net/v/t51.2885-19/494644162_543181445253676_6182807947334369587_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fios4-1.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QHtfQ8FLr8iJZrXMVnIqw6YA-UkP40n968JQgeGq2gGVvd3gvoZVixV-znu9YyX2lSLNsUyTduTvw2ISSXoIsaG&_nc_ohc=cldeDs1Cc9AQ7kNvwFLPH3T&_nc_gid=pFUgoFMdFuIuAy8sfPoE4g&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfpFPE4Y_O3TyysUOAQGL7teneNhnkt3raELxtZz_E3LLg&oe=696065D1&_nc_sid=7a9f4b" },
  about: {
    title: "Nossa Missão",
    description: "Nascida no coração de Deus, a Adonai Music foca na excelência da produção musical cristã, oferecendo suporte completo para levitas e ministros de louvor em todo o Brasil."
  },
  artists: [
    {
      id: "1",
      name: "Ana Vitória",
      bio: "Uma das vozes mais potentes da nova geração da música pentecostal.",
      imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800",
      genre: "Pentecostal",
      socials: { instagram: "#", youtube: "#", spotify: "#" }
    },
    {
      id: "2",
      name: "Clécia Matos",
      bio: "Adoração profética e profunda que tem impactado igrejas por todo o país. Uma voz que clama e exalta ao Rei.",
      imageUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=800",
      genre: "Worship",
      socials: { instagram: "#", youtube: "#", spotify: "#" }
    },
    {
      id: "3",
      name: "Elisa Téofilo",
      bio: "Compositor e intérprete com letras focadas na graça e restauração.",
      imageUrl: "https://instagram.fios4-1.fna.fbcdn.net/v/t51.2885-19/501183644_17891619579250092_558120264222103204_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fios4-1.fna.fbcdn.net&_nc_cat=100&_nc_oc=Q6cZ2QEDEpIUWl23STradrwvXNsmNUgg1YXJL1tqRqmEwnn3qFfWESNsffmUqAnmJmNyEJG7lgsD5j9lXieiIAcKaNde&_nc_ohc=ar0gO_hlF5AQ7kNvwHjCF_M&_nc_gid=kDIBAUstcwdw8sO8-EPwqg&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfpPcs9bObsaJY7H1DGXCUg-hgJXBhNYIft4npLGWu9t1g&oe=69604B85&_nc_sid=7a9f4b",
      genre: "Pentecostal",
      socials: { instagram: "#", youtube: "#", spotify: "#" }
    },
    {
      id: "4",
      name: "Jon Gabriel",
      bio: "Explorando novas sonoridades no cenário cristão com mensagens de fé.",
      imageUrl: "https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?auto=format&fit=crop&q=80&w=800",
      genre: "Trap Gospel",
      socials: { instagram: "#", youtube: "#", spotify: "#" }
    },
    {
      id: "5",
      name: "Nathan Gomes",
      bio: "Juventude e talento a serviço do Reino.",
      imageUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=800",
      genre: "Pop Cristão",
      socials: { instagram: "#", youtube: "#", spotify: "#" }
    },
    {
      id: "6",
      name: "Thais Gomes",
      bio: "Voz doce e ungida que traz paz aos corações.",
      imageUrl: "https://images.unsplash.com/photo-1517230814606-2e3d004bb7bd?auto=format&fit=crop&q=80&w=800",
      genre: "Pop Cristão",
      socials: { instagram: "#", youtube: "#", spotify: "#" }
    }
  ],
  releases: [
    {
      id: "101",
      title: "Sem Ti",
      artistId: "4",
      artistName: "Jon Gabriel",
      coverUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=600",
      releaseDate: "2024-05-15",
      platformLinks: { youtube: "https://www.youtube.com/watch?v=MlLn6fldrDI", spotify: "#" }
    },
    {
      id: "102",
      title: "Coração Rasgado",
      artistId: "2",
      artistName: "Clécia Matos",
      coverUrl: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=600",
      releaseDate: "2024-04-20",
      platformLinks: { spotify: "#", deezer: "#" }
    }
  ],
  news: [
    {
      id: "201",
      title: "Gravação do Novo DVD",
      excerpt: "Adonai Music anuncia gravação de projeto ao vivo em São Paulo.",
      content: "Um grande marco para nossa história. Preparem o coração para uma noite de adoração inesquecível.",
      date: "21 de Dezembro, 2024",
      imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800"
    }
  ]
};
