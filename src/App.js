import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import from 'react-router-dom'

import RegistrationForm from './Registration/Registration';
import Login from './Login/Login';
import ProductManager from './Products/Products';
import ForgotPassword from './Forgot-Password/Forgot_Password';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product" element={<ProductManager />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />


          {/* Define other routes using Route */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
