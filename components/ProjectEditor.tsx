
import React, { useState } from 'react';
import type { Project, ProjectCategory } from '../types';
import { PROJECT_CATEGORIES } from '../constants';

interface ProjectEditorProps {
    project: Project | null;
    onSave: (project: Project) => void;
    onCancel: () => void;
}

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input {...props} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-[#00B4D8] focus:outline-none" />
);

const TextArea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea {...props} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-[#00B4D8] focus:outline-none" />
);

const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
     <select {...props} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-[#00B4D8] focus:outline-none" />
);

const ProjectEditor: React.FC<ProjectEditorProps> = ({ project, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Omit<Project, 'id' | 'coordinates' | 'kpis'> & { technologies: string, lat: number, lon: number }>({
        title: project?.title || '',
        category: project?.category || 'Hydraulic Modeling',
        imageUrl: project?.imageUrl || '',
        year: project?.year || new Date().getFullYear(),
        description: project?.description || '',
        technologies: project?.technologies?.join(', ') || '',
        caseStudyUrl: project?.caseStudyUrl || '#projects',
        chartTitle: project?.chartTitle || '',
        chartData: project?.chartData || [],
        lat: project?.coordinates[0] || 0,
        lon: project?.coordinates[1] || 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const isNumber = type === 'number';
        setFormData(prev => ({ ...prev, [name]: isNumber ? Number(value) : value }));
    };

    const handleChartDataChange = (index: number, field: 'name' | 'value' | 'unit', value: string | number) => {
        const newChartData = [...(formData.chartData || [])];
        newChartData[index] = { ...newChartData[index], [field]: value };
        setFormData(prev => ({ ...prev, chartData: newChartData }));
    };

    const addChartDataPoint = () => {
        const newChartData = [...(formData.chartData || []), { name: '', value: 0, unit: '' }];
        setFormData(prev => ({ ...prev, chartData: newChartData }));
    };

    const removeChartDataPoint = (index: number) => {
        const newChartData = [...(formData.chartData || [])];
        newChartData.splice(index, 1);
        setFormData(prev => ({ ...prev, chartData: newChartData }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalProject: Project = {
            ...formData,
            id: project?.id || Date.now(),
            technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
            coordinates: [formData.lat, formData.lon],
            kpis: [], // KPIs are now derived from chart data or managed elsewhere
        };
        onSave(finalProject);
    };

    return (
        <div className="min-h-screen bg-slate-900 p-8">
            <div className="max-w-4xl mx-auto bg-slate-800 p-6 rounded-lg border border-slate-700">
                <h1 className="text-2xl font-bold text-white mb-6">{project ? 'Edit Project' : 'Add New Project'}</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="text-slate-300 block mb-1">Title</label><Input name="title" value={formData.title} onChange={handleChange} required/></div>
                        <div><label className="text-slate-300 block mb-1">Year</label><Input name="year" type="number" value={formData.year} onChange={handleChange} required/></div>
                    </div>
                     <div><label className="text-slate-300 block mb-1">Image URL</label><Input name="imageUrl" value={formData.imageUrl} onChange={handleChange} required/></div>
                    <div><label className="text-slate-300 block mb-1">Description</label><TextArea name="description" value={formData.description} onChange={handleChange} rows={4} required/></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-slate-300 block mb-1">Category</label>
                          <Select name="category" value={formData.category} onChange={handleChange}>
                            {PROJECT_CATEGORIES.filter(c => c !== 'All').map(cat => <option key={cat} value={cat}>{cat}</option>)}
                          </Select>
                        </div>
                        <div><label className="text-slate-300 block mb-1">Technologies (comma-separated)</label><Input name="technologies" value={formData.technologies} onChange={handleChange} /></div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="text-slate-300 block mb-1">Latitude</label><Input name="lat" type="number" step="any" value={formData.lat} onChange={handleChange} required/></div>
                        <div><label className="text-slate-300 block mb-1">Longitude</label><Input name="lon" type="number" step="any" value={formData.lon} onChange={handleChange} required/></div>
                    </div>
                    
                    {/* Chart Data Editor */}
                    <div className="pt-4 border-t border-slate-700">
                        <h2 className="text-xl font-semibold text-white">Chart Data</h2>
                        <div><label className="text-slate-300 block mb-1">Chart Title</label><Input name="chartTitle" value={formData.chartTitle} onChange={handleChange}/></div>
                        <div className="space-y-2 mt-2">
                          {(formData.chartData || []).map((point, index) => (
                              <div key={index} className="grid grid-cols-4 gap-2 items-center">
                                  <Input placeholder="Name (e.g., 'Yr 1')" value={point.name} onChange={e => handleChartDataChange(index, 'name', e.target.value)} />
                                  <Input type="number" placeholder="Value" value={point.value} onChange={e => handleChartDataChange(index, 'value', Number(e.target.value))} />
                                  <Input placeholder="Unit (e.g., '%')" value={point.unit} onChange={e => handleChartDataChange(index, 'unit', e.target.value)} />
                                  <button type="button" onClick={() => removeChartDataPoint(index)} className="text-red-500 hover:text-red-400 font-bold">Remove</button>
                              </div>
                          ))}
                        </div>
                        <button type="button" onClick={addChartDataPoint} className="mt-2 text-cyan-400 hover:text-cyan-300 text-sm font-semibold">+ Add Data Point</button>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t border-slate-700">
                        <button type="button" onClick={onCancel} className="bg-slate-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-500 transition-all">Cancel</button>
                        <button type="submit" className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-500 transition-all">Save Project</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectEditor;
