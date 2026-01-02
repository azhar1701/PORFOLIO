
import React from 'react';
import AnimatedSection from './AnimatedSection';

const AboutSection: React.FC = () => {
  return (
    <AnimatedSection>
      <section id="about" className="py-20 sm:py-32 bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-2">
              <div className="relative w-full max-w-sm mx-auto">
                <div className="absolute -inset-2 border-2 border-[#00B4D8]/50 rounded-lg transform -rotate-3"></div>
                <img
                  src="https://picsum.photos/seed/headshot/500/600"
                  alt="Professional Headshot of J. Doe"
                  className="relative w-full h-auto object-cover rounded-lg shadow-2xl"
                />
              </div>
            </div>
            <div className="lg:col-span-3 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Driven by Data, Dedicated to Resilience
              </h2>
              <p className="mt-6 text-lg text-slate-300 leading-relaxed">
                As a Professional Engineer, my focus is on the intersection of civil engineering and computational hydrology. I believe the most robust solutions to today's water resource challenges are found through a combination of rigorous, data-driven analysis and a forward-looking approach to environmental resilience.
              </p>
              <p className="mt-4 text-lg text-slate-300 leading-relaxed">
                From developing precise hydraulic models for FEMA flood insurance studies to designing sustainable urban drainage systems, my goal is to deliver not just technically sound projects, but also outcomes that safeguard communities and ecosystems for the future.
              </p>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};

export default AboutSection;
