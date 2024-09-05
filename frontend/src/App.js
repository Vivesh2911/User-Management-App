import React from 'react';
import { Route, Routes } from 'react-router-dom';
import User from './Components/User';
import Users from './Components/Users';
import EditUser from './Components/EditUser';
import './App.css'
import CreateUser from './Components/CreateUser';
// import { QueryClientProvider } from '@tanstack/react-query';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/users/:id" element={<User />} />
        <Route path="/" element={<Users />} /> 
        <Route path="/edit-user/:id" element={<EditUser />} /> 
        <Route path="/createUser" element={<CreateUser/>} /> 

      </Routes>
    </div>

  );
};

export default App;
