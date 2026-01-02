
import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderPage = () => {
    switch (route) {
      case '#/admin':
        return <AdminPage />;
      default:
        return <HomePage />;
    }
  };

  return (
     <div className="bg-[#0A192F] text-slate-300 antialiased selection:bg-[#00B4D8] selection:text-[#0A192F]">
      {renderPage()}
    </div>
  );
};

export default App;
