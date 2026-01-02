
import React from 'react';
import type { Project } from '../types';
import ProjectChart from './ProjectChart';

interface ProjectModalProps {
  project: Project | null;
  projects: Project[];
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const ProjectModal: React.FC<ProjectModalProps> = ({ project, projects, onClose, onSelectProject }) => {
  if (!project) return null;

  const relatedProjects = projects
    .filter(p => p.category === project.category && p.id !== project.id)
    .slice(0, 3);

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="bg-slate-900 border border-slate-700 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative group overflow-hidden rounded-t-lg">
            <img
                src={project.imageUrl.replace('/600/400', '/1200/800')}
                alt={project.title}
                className="w-full h-64 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors z-10"
                aria-label="Close project details"
            >
                <CloseIcon />
            </button>
        </div>
        <div className="p-8">
          <div className="flex justify-between items-baseline mb-2">
            <p className="text-sm font-semibold text-[#00B4D8] uppercase tracking-wider">{project.category}</p>
            {project.year && (
              <span className="text-sm font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded">
                {project.year}
              </span>
            )}
          </div>
          <h2 id="project-modal-title" className="text-3xl font-bold text-white">{project.title}</h2>
          
          {project.chartData && project.chartTitle && (
              <div className="my-6">
                  <ProjectChart
                      data={project.chartData}
                      title={project.chartTitle}
                      unit={project.chartData[0]?.unit || ''}
                  />
              </div>
          )}

          <p className="text-slate-300 text-base leading-relaxed">{project.description}</p>
          
          {project.caseStudyUrl && (
            <div className="mt-6">
              <a 
                href={project.caseStudyUrl}
                onClick={onClose}
                className="inline-flex items-center justify-center bg-transparent text-[#00B4D8] font-semibold py-2 px-6 rounded-lg border-2 border-[#00B4D8] hover:bg-[#00B4D8] hover:text-white transition-all duration-300"
              >
                  View Full Case Study
                  <ExternalLinkIcon />
              </a>
            </div>
          )}

          {project.technologies && project.technologies.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white">Technologies Used</h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {project.technologies.map(tech => (
                  <span key={tech} className="bg-slate-800 text-cyan-400 text-sm font-mono px-3 py-1 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {relatedProjects.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-700">
              <h3 className="text-lg font-semibold text-white">Related Projects</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                {relatedProjects.map(related => (
                  <button
                    key={related.id}
                    onClick={() => onSelectProject(related)}
                    className="group relative overflow-hidden rounded-md aspect-video block border-2 border-slate-700 hover:border-[#00B4D8] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                    aria-label={`View project: ${related.title}`}
                  >
                    <img
                      src={related.imageUrl}
                      alt={related.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-2">
                      <p className="text-white text-xs font-bold leading-tight text-left group-hover:text-[#00B4D8] transition-colors">
                        {related.title}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-up {
          from { transform: translateY(20px) scale(0.95); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
        .animate-scale-up {
          animation: scale-up 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ProjectModal;
