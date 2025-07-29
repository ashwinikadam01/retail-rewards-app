import React from 'react';
import './App.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Dashboard from './pages/Dashboard';
import './css/Custom.css';


function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dashboard />
    </LocalizationProvider>
  );
}

export default App;