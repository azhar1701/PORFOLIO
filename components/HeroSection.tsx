
import React from 'react';

const HeroSection: React.FC = () => {

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://picsum.photos/seed/hero/1920/1080')" }}></div>
      <div className="absolute inset-0 bg-[#0A192F]/80"></div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 md:p-12 shadow-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Water Resource Engineering & <span className="text-[#00B4D8]">Hydraulic Modeling</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
              Solving complex hydrological challenges with advanced modeling for FEMA flood risk, urban stormwater, and sustainable drainage systems.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={scrollToProjects} 
                className="w-full sm:w-auto bg-[#00B4D8] text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 shadow-lg">
                View Technical Projects
              </button>
              <a 
                href="#"
                className="w-full sm:w-auto bg-transparent text-[#00B4D8] font-semibold py-3 px-8 rounded-lg text-lg border-2 border-[#00B4D8] hover:bg-[#00B4D8] hover:text-white transition-all duration-300 transform hover:scale-105">
                Download P.E. Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
