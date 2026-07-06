import React, { useState } from 'react';
import NoteExercise from './components/exercises/NoteExercise';
import ScaleExercise from './components/exercises/ScaleExercise';
import "./App.css";

type Tab = 'notes' | 'scales';

function App() {
  const [activeTab, setActiveTab]  = useState<Tab>('notes');

  return (
    <div className="App">
      <nav>
        <button 
          onClick={() => setActiveTab('notes')}
          className={activeTab === 'notes' ? 'active' : ''}
        >
          Note Recognition Exercise
        </button>
        <button
          onClick={() => setActiveTab('scales')}
          className={activeTab === 'scales' ? 'active' : ''}
        >
          Scales
        </button>
      </nav>

      { activeTab === 'notes' && <NoteExercise /> }
      { activeTab === 'scales' && <ScaleExercise /> }
    </div>
  );
}

export default App;
