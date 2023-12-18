import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'
import ReactDOM  from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
        <App/>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);


