import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ui/ProtectedRoute';

// Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import GroupListPage from './pages/groups/GroupListPage';
import GroupDetailPage from './pages/groups/GroupDetailPage';
import CreateGroupPage from './pages/groups/CreateGroupPage';
import EditGroupPage from './pages/groups/EditGroupPage';
import JoinGroupPage from './pages/memberships/JoinGroupPage';
import LeaveGroupPage from './pages/memberships/LeaveGroupPage';
import MemberListPage from './pages/memberships/MemberListPage';
import EditMemberRolePage from './pages/memberships/EditMemberRolePage';
import UserGroupsPage from './pages/user/UserGroupsPage';
import UserProfilePage from './pages/user/UserProfilePage';

// Styles
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              < Route path="/dashboard" element={<ProtectedRoute><DashboardPage/></ProtectedRoute>} />

              <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path="/groups" element={<GroupListPage />} />
              <Route path="/groups/:id" element={<GroupDetailPage />} />
              <Route path="/groups/:id/members" element={<MemberListPage />} />
              <Route path="/groups" element={<GroupListPage />} />
              <Route path="/groups/:id/join" element={<JoinGroupPage />} />
              <Route path="/groups/:id/leave" element={<LeaveGroupPage />} />
              <Route path="/groups/:id/members/:memberId/edit" element={<EditMemberRolePage />} />
              <Route path="/groups/:id/edit" element={<EditGroupPage />} /> {/* Add this line */}

              
              <Route path="/groups/new" element={<ProtectedRoute><CreateGroupPage /></ProtectedRoute>} />
              <Route path="/groups/:id/edit" element={<ProtectedRoute><EditGroupPage /></ProtectedRoute>} />
              <Route path="/groups/:id/join" element={<ProtectedRoute><JoinGroupPage /></ProtectedRoute>} />
              <Route path="/groups/:id/leave" element={<ProtectedRoute><LeaveGroupPage /></ProtectedRoute>} />
              <Route path="/groups/:id/members/:memberId/edit" element={<ProtectedRoute><EditMemberRolePage /></ProtectedRoute>} />
              <Route path="/groups/:id/edit" element={<ProtectedRoute><EditGroupPage /></ProtectedRoute>} />
              
              <Route path="/my-groups" element={<ProtectedRoute><UserGroupsPage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;



