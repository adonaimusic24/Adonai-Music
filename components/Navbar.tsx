
import React from 'react';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isEditMode: boolean;
  toggleEditMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage, isEditMode, toggleEditMode }) => {
  const navItems: { label: string; value: Page }[] = [
    { label: 'Início', value: 'home' },
    { label: 'Artistas', value: 'artists' },
    { label: 'Lançamentos', value: 'releases' },
    { label: 'Notícias', value: 'news' },
    { label: 'Contato', value: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => setCurrentPage('home')}
        >
          <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center font-heading font-black text-black text-xl">
            A
          </div>
          <span className="font-heading font-bold text-xl tracking-tighter">ADONAI <span className="text-yellow-500">MUSIC</span></span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => setCurrentPage(item.value)}
              className={`text-sm font-medium transition-colors hover:text-yellow-500 ${
                currentPage === item.value ? 'text-yellow-500' : 'text-gray-400'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={toggleEditMode}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              isEditMode 
                ? 'bg-red-600 text-white animate-pulse' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {isEditMode ? 'Sair do Modo Edição' : 'Modo Edição'}
          </button>
        </div>

        <button className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
