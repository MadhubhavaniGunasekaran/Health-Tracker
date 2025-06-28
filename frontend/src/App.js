// frontend/src/App.js
import React from 'react';
import Form from './components/Form';
import HealthData from './components/HealthData';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Health Tracker</h1>
      <Form />
      <HealthData />
    </div>
  );
}

export default App;
