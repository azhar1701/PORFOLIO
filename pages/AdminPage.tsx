
import React, { useState, useEffect } from 'react';
import type { PortfolioData, Project } from '../types';
import ProjectEditor from '../components/ProjectEditor';

// In a real application, this should be a more secure authentication method.
const ADMIN_PASSWORD = 'password123';

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState<PortfolioData | null>(null);
  const [editingProject, setEditingProject] = useState<Project | 'new' | null>(null);
  
  useEffect(() => {
    if (isAuthenticated) {
      fetch('/portfolio-data.json')
        .then(res => res.json())
        .then(setData)
        .catch(err => console.error("Failed to load data", err));
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password.');
    }
  };
  
  const handleSaveProject = (projectToSave: Project) => {
    if (!data) return;

    let updatedProjects;
    if (editingProject === 'new') {
      const newProject = { ...projectToSave, id: Date.now() };
      updatedProjects = [...data.projects, newProject];
    } else {
      updatedProjects = data.projects.map(p => p.id === projectToSave.id ? projectToSave : p);
    }
    
    setData({ ...data, projects: updatedProjects });
    setEditingProject(null);
  };

  const handleDeleteProject = (projectId: number) => {
    if (!data || !window.confirm("Are you sure you want to delete this project?")) return;
    setData({
      ...data,
      projects: data.projects.filter(p => p.id !== projectId)
    });
  };

  const downloadJson = () => {
    if (!data) return;
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="w-full max-w-sm p-8 bg-slate-800 rounded-lg shadow-xl border border-slate-700">
            <h1 className="text-2xl font-bold text-white text-center mb-4">Admin Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-[#00B4D8] focus:outline-none"
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <button type="submit" className="mt-4 w-full bg-[#00B4D8] text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-80 transition-all">Login</button>
            </form>
            <p className="text-xs text-slate-500 mt-4 text-center">Default password: password123</p>
        </div>
      </div>
    );
  }
  
  if (!data) {
      return <div className="min-h-screen flex items-center justify-center text-white">Loading data...</div>
  }

  if (editingProject) {
      return <ProjectEditor 
        project={editingProject === 'new' ? null : editingProject} 
        onSave={handleSaveProject} 
        onCancel={() => setEditingProject(null)} 
      />
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Portfolio Content Manager</h1>
          <a href="/#" className="text-sm text-cyan-400 hover:underline">← Back to Portfolio</a>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
           <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-white">Projects</h2>
              <button onClick={() => setEditingProject('new')} className="bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-cyan-600 transition-all">Add New Project</button>
           </div>
           
           <div className="space-y-3">
            {data.projects.map(project => (
              <div key={project.id} className="bg-slate-700 p-4 rounded-md flex justify-between items-center">
                <p className="text-white font-medium">{project.title}</p>
                <div className="space-x-2">
                  <button onClick={() => setEditingProject(project)} className="text-yellow-400 hover:text-yellow-300">Edit</button>
                  <button onClick={() => handleDeleteProject(project.id)} className="text-red-500 hover:text-red-400">Delete</button>
                </div>
              </div>
            ))}
           </div>
        </div>

        <div className="mt-8 text-center">
          <button onClick={downloadJson} className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-700 transition-all shadow-lg">Save & Download portfolio-data.json</button>
          <p className="text-sm text-slate-500 mt-2">After downloading, replace the existing `portfolio-data.json` file in the project and redeploy.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
