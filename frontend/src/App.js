import React, { useState } from 'react';
import VerbPractice from './components/VerbPractice';
import Menu from './components/Menu';
import ImportVerbs from './components/ImportVerbs';
import VerbManagement from './components/VerbManagement';
import './App.css';

function App() {
  const [view, setView] = useState('practice');

  return (
    <div className="App">
      <Menu currentView={view} setView={setView} />
      {view === 'practice' && <VerbPractice />}
      {view === 'import' && <ImportVerbs />}
      {view === 'manage' && <VerbManagement />}
    </div>
  );
}

export default App;