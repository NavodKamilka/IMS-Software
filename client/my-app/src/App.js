import React from 'react';
import { Routes, Route ,BrowserRouter } from "react-router-dom";
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Guardian from './Pages/Guardian';
import Student from './Pages/Student';
//import PrivateRoute from './';

function App() {
  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/allStudent" element={ <Student/> } />
            <Route path="/allGuardian" element={ <Guardian/> } />
            <Route path="/dashboard" element={ <Dashboard/> } />
            <Route path="/" element={ <Login/> } />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
