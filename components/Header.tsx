
import React, { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0A192F]/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <HashLink to="/#" className="text-2xl font-bold text-white transition-colors hover:text-[#00B4D8]">
              J. Doe, P.E.
            </HashLink>
          </div>
          <nav className="hidden md:flex space-x-8">
            <HashLink smooth to="/#about" className="text-slate-300 hover:text-[#00B4D8] transition-colors font-medium">About</HashLink>
            <HashLink smooth to="/#expertise" className="text-slate-300 hover:text-[#00B4D8] transition-colors font-medium">Expertise</HashLink>
            <HashLink smooth to="/#projects" className="text-slate-300 hover:text-[#00B4D8] transition-colors font-medium">Projects</HashLink>
            <HashLink smooth to="/#map" className="text-slate-300 hover:text-[#00B4D8] transition-colors font-medium">Map</HashLink>
            <HashLink smooth to="/#insights" className="text-slate-300 hover:text-[#00B4D8] transition-colors font-medium">Insights</HashLink>
            <HashLink smooth to="/#contact" className="text-slate-300 hover:text-[#00B4D8] transition-colors font-medium">Contact</HashLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
