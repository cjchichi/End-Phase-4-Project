/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import GroupList from './pages/GroupList';
import GroupDetail from './pages/GroupDetail';
import CreateGroupForm from './pages/CreateGroupForm';
import Dashboard from './pages/Dashboard';
import RegisterForm from './pages/RegisterForm';
import LoginForm from './pages/LoginForm';
import MyGroups from './pages/MyGroups';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/groups" element={<GroupList />} />
        <Route path="/groups/:id" element={<GroupDetail />} />
        <Route path="/create-group" element={<CreateGroupForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/my-groups" element={<MyGroups />} />
      </Routes>
    </Router>
  );
}

export default App;

