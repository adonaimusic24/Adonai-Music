
export interface Artist {
  id: string;
  name: string;
  bio: string;
  imageUrl: string;
  genre: string;
  socials: {
    instagram?: string;
    youtube?: string;
    spotify?: string;
  };
}

export interface Release {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  coverUrl: string;
  releaseDate: string;
  platformLinks: {
    spotify?: string;
    youtube?: string;
    deezer?: string;
  };
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  imageUrl: string;
}

export interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    backgroundImage: string;
  };
  about: {
    title: string;
    description: string;
  };
  artists: Artist[];
  releases: Release[];
  news: NewsItem[];
}

export type Page = 'home' | 'artists' | 'releases' | 'news' | 'contact' | 'admin';
