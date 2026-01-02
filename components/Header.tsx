
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0A192F]/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <a href="#" className="text-2xl font-bold text-white transition-colors hover:text-[#00B4D8]">
              J. Doe, P.E.
            </a>
          </div>
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection('about')} className="text-slate-300 hover:text-[#00B4D8] transition-colors font-medium">About</button>
            <button onClick={() => scrollToSection('expertise')} className="text-slate-300 hover:text-[#00B4D8] transition-colors font-medium">Expertise</button>
            <button onClick={() => scrollToSection('projects')} className="text-slate-300 hover:text-[#00B4D8] transition-colors font-medium">Projects</button>
            <button onClick={() => scrollToSection('map')} className="text-slate-300 hover:text-[#00B4D8] transition-colors font-medium">Map</button>
            <button onClick={() => scrollToSection('insights')} className="text-slate-300 hover:text-[#00B4D8] transition-colors font-medium">Insights</button>
            <button onClick={() => scrollToSection('contact')} className="text-slate-300 hover:text-[#00B4D8] transition-colors font-medium">Contact</button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
