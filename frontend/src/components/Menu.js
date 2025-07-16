import React from 'react';

const Menu = ({ currentView, setView }) => (
  <nav className="flex space-x-4 bg-blue-100 p-4 rounded mb-6">
    <button
      className={`px-4 py-2 rounded ${currentView === 'practice' ? 'bg-blue-500 text-white' : 'bg-white text-blue-700'}`}
      onClick={() => setView('practice')}
    >
      Practice
    </button>
    <button
      className={`px-4 py-2 rounded ${currentView === 'manage' ? 'bg-blue-500 text-white' : 'bg-white text-blue-700'}`}
      onClick={() => setView('manage')}
    >
      Manage Verbs
    </button>
    <button
      className={`px-4 py-2 rounded ${currentView === 'import' ? 'bg-blue-500 text-white' : 'bg-white text-blue-700'}`}
      onClick={() => setView('import')}
    >
      Import
    </button>
    <button
      className={`px-4 py-2 rounded ${currentView === 'stats' ? 'bg-blue-500 text-white' : 'bg-white text-blue-700'}`}
      onClick={() => setView('stats')}
    >
      Statistics
    </button>
  </nav>
);

export default Menu;
