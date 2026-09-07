import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes/AppRoutes';
import './styles/index.css';
import './styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

<<<<<<< HEAD
function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
            {/* 🌟 PREMIUM TOAST STYLING */}
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                theme="colored"
                hideProgressBar={true}
            />
        </BrowserRouter>
    );
}

export default App;
=======



function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </BrowserRouter>
  );
}

export default App;
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
