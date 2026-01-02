import React, { useState, useMemo } from 'react';
import { PROJECT_CATEGORIES } from '../constants';
import type { Project, ProjectCategory } from '../types';
import AnimatedSection from './AnimatedSection';
import { ResponsiveContainer, BarChart, Bar, Tooltip, XAxis } from 'recharts';

// Utility to generate dynamic KPIs from chart data
const generateKpisFromChartData = (project: Project): { label: string; value: string }[] => {
  if (!project.chartData || project.chartData.length < 2) {
    // Fallback to static KPIs if they exist, otherwise return empty
    return project.kpis || [];
  }

  const first = project.chartData[0];
  const last = project.chartData[project.chartData.length - 1];
  const unit = last.unit || '';
  const kpis = [];

  // KPI 1: Final Value or Outcome
  kpis.push({
    label: `Final Outcome (${last.name})`,
    value: `${last.value.toLocaleString()}${unit}`
  });

  // KPI 2: Overall Change or Improvement
  if (first.value > 0) {
    const change = ((last.value - first.value) / first.value) * 100;
    const isReduction = change < 0;
    const changeLabel = isReduction ? 'Reduction' : 'Improvement';
    kpis.push({
      label: `Overall ${changeLabel}`,
      value: `${Math.abs(change).toFixed(1)}%`
    });
  }
  
  return kpis;
};

const ProjectCard: React.FC<{ project: Project; onSelect: (project: Project) => void }> = ({ project, onSelect }) => {
  const dynamicKpis = generateKpisFromChartData(project);

  return (
    <button onClick={() => onSelect(project)} className="group relative overflow-hidden rounded-lg shadow-2xl text-left w-full h-full block aspect-[3/2]">
      <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white">{project.title}</h3>
          <div className="mt-4 border-t border-cyan-500/50 pt-4 h-16 relative">
            {/* KPI Text */}
            <div className="transition-opacity duration-300 opacity-100 group-hover:opacity-0">
              {dynamicKpis.slice(0, 2).map(kpi => (
                <div key={kpi.label} className="flex justify-between text-sm text-slate-200">
                  <span className="font-medium">{kpi.label}</span>
                  <span className="font-mono font-bold text-[#00B4D8]">{kpi.value}</span>
                </div>
              ))}
            </div>
            {/* Mini Chart */}
            {project.chartData && (
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={project.chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                        <XAxis dataKey="name" hide />
                        <Tooltip
                            cursor={{ fill: 'rgba(0, 180, 216, 0.1)' }}
                            contentStyle={{
                                background: 'rgba(10, 25, 47, 0.8)',
                                borderColor: '#00B4D8',
                                color: '#cbd5e1',
                                borderRadius: '0.5rem',
                                backdropFilter: 'blur(4px)'
                            }}
                            itemStyle={{ color: '#00B4D8' }}
                        />
                        <Bar dataKey="value" fill="#00B4D8" />
                    </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

interface CaseStudyGalleryProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

const CaseStudyGallery: React.FC<CaseStudyGalleryProps> = ({ projects, onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('All');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projects;
    }
    return projects.filter(p => p.category === activeFilter);
  }, [activeFilter, projects]);

  return (
    <AnimatedSection>
      <section id="projects" className="py-20 sm:py-32 bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Case Study Gallery</h2>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
              A selection of projects demonstrating quantitative results and technical proficiency.
            </p>
          </div>

          <div className="flex justify-center flex-wrap gap-2 sm:gap-4 my-12">
            {PROJECT_CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-[#00B4D8] text-white shadow-lg'
                    // FIX: Removed a stray hyphen that was causing a syntax error.
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} onSelect={onSelectProject} />
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};

export default CaseStudyGallery;