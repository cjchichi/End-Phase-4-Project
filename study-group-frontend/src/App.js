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
*

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
        <Route path="/groups/:id/edit" element={<EditGroupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
*/

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import GroupListPage from './pages/GroupListPage';
import GroupDetailPage from './pages/GroupDetailPage';
import EditGroupPage from './pages/EditGroupPage';
import MyGroups from './pages/MyGroups';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 font-sans">
         <div className="container mt-5">
    </div>
          <Navbar />
          <main className="p-4">
            <Routes>
              <Route path="/" element={<GroupListPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/groups" element={<GroupListPage />} />
              <Route path="/groups/:id" element={<GroupDetailPage />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/groups/:id/edit"
                element={
                  <PrivateRoute>
                    <EditGroupPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/my-groups"
                element={
                  <PrivateRoute>
                    <MyGroups />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

