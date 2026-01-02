
import React from 'react';
import type { ExpertiseItem } from '../types';
import AnimatedSection from './AnimatedSection';

// Icon Components
const WaterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#00B4D8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A8.003 8.003 0 0117.657 18.657z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1014.12 11.88l-4.242 4.242z" />
  </svg>
);
const MapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#00B4D8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m-6 10V7m0 0L9 4m0 0l6 3m-6-3l6 3" />
  </svg>
);
const CloudIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#00B4D8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
);
const LeafIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#00B4D8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);

const icons: { [key: string]: React.ReactNode } = {
  WaterIcon: <WaterIcon />,
  MapIcon: <MapIcon />,
  CloudIcon: <CloudIcon />,
  LeafIcon: <LeafIcon />,
};

const ExpertiseCard: React.FC<{ item: ExpertiseItem }> = ({ item }) => (
  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 flex flex-col items-start hover:-translate-y-2 transition-transform duration-300 cursor-pointer shadow-lg hover:shadow-cyan-500/10">
    {icons[item.iconName] || null}
    <h3 className="text-xl font-bold text-white mt-4">{item.title}</h3>
    <p className="text-slate-400 mt-2 font-mono text-sm">{item.tools}</p>
  </div>
);

const ExpertiseGrid: React.FC<{ items: ExpertiseItem[] }> = ({ items }) => {
  return (
    <AnimatedSection>
      <section id="expertise" className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Technical Expertise</h2>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
              Specialized in a comprehensive suite of industry-standard modeling and design software.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {items.map((item, index) => (
              <ExpertiseCard key={index} item={item} />
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};

export default ExpertiseGrid;
