import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { AppTheme } from './theme/AppTheme';
import {BrowserRouter} from "react-router-dom";
import { AppRouter } from './router/AppRouter.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppTheme>
        <AppRouter />
      </AppTheme>
    </BrowserRouter>
  </React.StrictMode>,
)
