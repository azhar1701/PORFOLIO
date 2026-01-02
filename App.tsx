import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';

const App: React.FC = () => {
  return (
     <div className="bg-[#0A192F] text-slate-300 antialiased selection:bg-[#00B4D8] selection:text-[#0A192F]">
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
    </div>
  );
};

export default App;