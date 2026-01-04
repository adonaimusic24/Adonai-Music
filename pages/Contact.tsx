
import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="py-20 px-6 min-h-screen flex items-center justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <h1 className="text-6xl font-heading font-black text-white mb-8 leading-none">VAMOS<br />CONVERSAR?</h1>
          <p className="text-gray-400 text-xl mb-12 font-light">
            Tem um ministério e busca uma gravadora parceira? Ou quer apenas tirar dúvidas sobre distribuição? Estamos prontos para te ouvir.
          </p>
          
          <div className="space-y-8">
            <div>
              <h4 className="text-yellow-500 font-bold uppercase tracking-widest text-xs mb-2">WhatsApp</h4>
              <p className="text-white text-2xl font-medium">+55 (73) 93300-4990</p>
            </div>
            <div>
              <h4 className="text-yellow-500 font-bold uppercase tracking-widest text-xs mb-2">E-mail Comercial</h4>
              <p className="text-white text-2xl font-medium">adonaimusicofi@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 p-10 rounded-3xl border border-white/10">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-500 text-xs font-bold uppercase mb-2">Nome</label>
                <input type="text" className="w-full bg-black/30 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-yellow-500" placeholder="Seu nome" />
              </div>
              <div>
                <label className="block text-gray-500 text-xs font-bold uppercase mb-2">E-mail</label>
                <input type="email" className="w-full bg-black/30 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-yellow-500" placeholder="seu@email.com" />
              </div>
            </div>
            <div>
              <label className="block text-gray-500 text-xs font-bold uppercase mb-2">Assunto</label>
              <select className="w-full bg-black/30 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-yellow-500 appearance-none">
                <option>Enviar meu material (Demo)</option>
                <option>Dúvidas sobre distribuição</option>
                <option>Contratação de Artista</option>
                <option>Imprensa</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-500 text-xs font-bold uppercase mb-2">Mensagem</label>
              <textarea rows={4} className="w-full bg-black/30 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-yellow-500" placeholder="Conte-nos um pouco sobre seu projeto..."></textarea>
            </div>
            <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-4 rounded-xl transition-all uppercase tracking-widest text-sm">
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
