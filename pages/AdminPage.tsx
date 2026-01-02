import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import type { PortfolioData, Project, ExpertiseItem, Credential, Testimonial, BlogPost } from '../types';
import ProjectEditor from '../components/ProjectEditor';
import GenericEditorModal from '../components/GenericEditorModal';
import { getEditorFields } from '../utils/editorUtils';

const ADMIN_PASSWORD = 'password123';
const LOCAL_STORAGE_KEY = 'portfolioDataAdmin';

export type AdminTab = 'Projects' | 'Expertise' | 'Credentials' | 'Testimonials' | 'Blog Posts';
export type EditableItem = Project | ExpertiseItem | Credential | Testimonial | BlogPost;
type EditingState = { section: AdminTab; item: EditableItem | 'new' } | null;

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState<PortfolioData | null>(null);
  const [editingItem, setEditingItem] = useState<EditingState>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>('Projects');
  const [isDirty, setIsDirty] = useState(false);
  
  const loadData = useCallback(async () => {
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        setData(JSON.parse(savedData));
      } else {
        const response = await fetch('/portfolio-data.json');
        const initialData = await response.json();
        setData(initialData);
      }
    } catch (err) {
      console.error("Failed to load data", err);
      setError("Failed to load portfolio data.");
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, loadData]);
  
  // This effect now only marks the data as dirty, avoiding a re-save loop
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);


  const saveData = (newData: PortfolioData) => {
    setData(newData);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData, null, 2));
    if (!isDirty) setIsDirty(true);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password.');
    }
  };
  
  const handleSaveItem = (section: AdminTab, itemToSave: EditableItem) => {
    if (!data) return;

    const sectionKey = (section.charAt(0).toLowerCase() + section.slice(1).replace(' ', '')) as keyof PortfolioData;
    const items = data[sectionKey] as any[];
    
    // Check if it's a new item or an update
    // @ts-ignore
    const existingIndex = itemToSave.id ? items.findIndex(i => i.id === itemToSave.id) : -1;

    let newItems;
    if (existingIndex > -1) {
      // Update existing
      newItems = [...items];
      newItems[existingIndex] = itemToSave;
    } else {
      // Add new item (with a new ID if it doesn't have one)
      // @ts-ignore
      const newItem = itemToSave.id ? itemToSave : { ...itemToSave, id: Date.now() };
      newItems = [...items, newItem];
    }

    saveData({ ...data, [sectionKey]: newItems });
    setEditingItem(null);
  };

 const handleDeleteItem = (section: AdminTab, itemToDelete: EditableItem) => {
    if (!data || !window.confirm(`Are you sure you want to delete this item?`)) return;

    const sectionKey = (section.charAt(0).toLowerCase() + section.slice(1).replace(' ', '')) as keyof PortfolioData;
    let items = data[sectionKey] as any[];

    // @ts-ignore
    const identifier = itemToDelete.id || itemToDelete.title || itemToDelete.name || itemToDelete.author;
    // @ts-ignore
    const idKey = itemToDelete.id ? 'id' : (itemToDelete.title ? 'title' : (itemToDelete.name ? 'name' : 'author'));

    const newItems = items.filter(item => item[idKey] !== identifier);
    saveData({ ...data, [sectionKey]: newItems });
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
    setIsDirty(false);
  };

  const handleReset = () => {
    if(window.confirm("Are you sure you want to discard all local changes and reset to the default data?")) {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setIsDirty(false);
        loadData();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="w-full max-w-sm p-8 bg-slate-800 rounded-lg shadow-xl border border-slate-700">
            <h1 className="text-2xl font-bold text-white text-center mb-4">Admin Login</h1>
            <form onSubmit={handleLogin}>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-[#00B4D8] focus:outline-none" />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <button type="submit" className="mt-4 w-full bg-[#00B4D8] text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-80 transition-all">Login</button>
            </form>
            <p className="text-xs text-slate-500 mt-4 text-center">Default password: password123</p>
        </div>
      </div>
    );
  }
  
  if (!data) return <div className="min-h-screen flex items-center justify-center text-white">Loading data...</div>;

  const renderEditor = () => {
    if (!editingItem) return null;
    
    if (editingItem.section === 'Projects') {
      return <ProjectEditor 
        project={editingItem.item === 'new' ? null : editingItem.item as Project} 
        onSave={(p) => handleSaveItem('Projects', p)} 
        onCancel={() => setEditingItem(null)} 
      />
    }

    return <GenericEditorModal
      item={editingItem.item}
      section={editingItem.section}
      fields={getEditorFields(editingItem.section)}
      onSave={(item) => handleSaveItem(editingItem.section, item)}
      onCancel={() => setEditingItem(null)}
    />
  };
  
  if (editingItem && editingItem.section === 'Projects') {
      return renderEditor();
  }
  
  const renderList = (items: any[], section: AdminTab, titleKey: string, subtitleKey?: string) => (
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={item.id || item[titleKey] || index} className="bg-slate-700 p-4 rounded-md flex justify-between items-center">
            <div>
                <p className="text-white font-medium">{item[titleKey]}</p>
                {subtitleKey && <p className="text-slate-400 text-sm">{item[subtitleKey]}</p>}
            </div>
            <div className="space-x-4 flex-shrink-0">
              <button onClick={() => setEditingItem({ section, item })} className="text-yellow-400 hover:text-yellow-300 font-semibold">Edit</button>
              <button onClick={() => handleDeleteItem(section, item)} className="text-red-500 hover:text-red-400 font-semibold">Delete</button>
            </div>
          </div>
        ))}
      </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'Projects': return renderList(data.projects, 'Projects', 'title', 'category');
      case 'Expertise': return renderList(data.expertiseItems, 'Expertise', 'title', 'tools');
      case 'Credentials': return renderList(data.credentials, 'Credentials', 'name');
      case 'Testimonials': return renderList(data.testimonials, 'Testimonials', 'author', 'quote');
      case 'Blog Posts': return renderList(data.blogPosts, 'Blog Posts', 'title');
      default: return <div className="text-slate-400">Select a section to manage.</div>;
    }
  }

  const tabs: AdminTab[] = ['Projects', 'Expertise', 'Credentials', 'Testimonials', 'Blog Posts'];

  return (
    <div className="min-h-screen bg-slate-900 p-4 sm:p-8">
      {renderEditor()}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Portfolio CMS</h1>
          <div className="flex items-center gap-4">
            <button onClick={handleReset} className="text-sm text-slate-400 hover:text-white transition">Reset Changes</button>
            <Link to="/" className="text-sm text-cyan-400 hover:underline">← Back to Portfolio</Link>
          </div>
        </div>
        
        <div className="mb-6 flex justify-center">
             <div className="bg-slate-800 border border-slate-700 p-4 rounded-lg w-full">
                <h2 className="text-xl font-bold text-white mb-2">Save Progress</h2>
                <p className="text-sm text-slate-400 mb-4">Your changes are auto-saved to this browser. When you're finished, download the JSON file and replace it in your project.</p>
                <button onClick={downloadJson} className="w-full bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-500 transition-all shadow-lg flex items-center justify-center gap-2 disabled:bg-green-800 disabled:opacity-70" disabled={!isDirty}>
                    {isDirty ? 'Save & Download portfolio-data.json' : 'No new changes to save'}
                    {isDirty && <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span></span>}
                </button>
            </div>
        </div>

        <div className="bg-slate-800 p-4 sm:p-6 rounded-lg border border-slate-700">
          <div className="border-b border-slate-700 mb-4">
            <nav className="flex flex-wrap -mb-px" aria-label="Tabs">
              {tabs.map(tab => (
                 <button key={tab} onClick={() => setActiveTab(tab)} className={`${activeTab === tab ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white hover:border-slate-500'} whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm transition-colors`}> {tab} </button>
              ))}
            </nav>
          </div>
           <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-white">{activeTab}</h2>
              <button onClick={() => setEditingItem({ section: activeTab, item: 'new' })} className="bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-cyan-600 transition-all">Add New {activeTab.slice(0, -1)}</button>
           </div>
           {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
