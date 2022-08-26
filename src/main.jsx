import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ManagerRoutes } from './routes/ManagerRoutes';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <ManagerRoutes/>
  </Router>
)
