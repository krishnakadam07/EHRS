import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes/AppRoutes';
import './styles/index.css';
import './styles/global.css';
import 'react-toastify/dist/ReactToastify.css';




function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </BrowserRouter>
  );
}

export default App;
