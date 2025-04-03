// 1

// import React, { useState } from 'react';
// import LoginForm from './components/auth/LoginForm';
// import RegisterForm from './components/auth/RegisterForm';
// import authService from './services/authService';

// function App() {
//   const [user, setUser] = useState(authService.getCurrentUser());
//   const [showLogin, setShowLogin] = useState(true); // login form first open

//   const handleLoginSuccess = (userData) => { // login success
//     setUser(userData);
//     setShowLogin(false); 
    
//   };

//   const handleRegisterSuccess = (userData) => { // register success
//     setUser(userData);
//     setShowLogin(false); 
//   };

//   const handleLogout = () => {
//     authService.logout();
//     setUser(null);
//     setShowLogin(true); // logout and enter loging form
//   };

//   return (
//     <div>
//       {user ? (
//         <div>
//           <p>Welcome, {user.role}!</p>
//           <button onClick={handleLogout}>Logout</button>



//           {/*other option in my parts */}
//         </div>
//       ) : (
//         <div>
//           {showLogin ? (
//             <LoginForm onLoginSuccess={handleLoginSuccess} />
//           ) : (
//             <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
//           )}
//           <button onClick={() => setShowLogin(!showLogin)}>
//             {showLogin ? 'Go to Register' : 'Go to Login'}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;



















// ok check


// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
// import LoginForm from './components/auth/LoginForm';
// import RegisterForm from './components/auth/RegisterForm';
// import authService from './services/authService';
// import Profile from './components/auth/Profile';
// import UserManagement from './components/Admin/UserManagement';
// import Navbar from './components/Layout/Navbar';
// import PostsList from './components/Posts/PostsList';
// import CreatePost from './components/Posts/CreatePost';
// import EditPost from './components/Posts/EditPost';
// import PostDetails from './components/Posts/PostDetails';

// function App() {
//   const [user, setUser] = useState(null); // Initialize user as null
//   const navigate = useNavigate();

//   useEffect(() => {
//     const currentUser = authService.getCurrentUser();
//     setUser(currentUser);
//   }, []);

//   const handleLoginSuccess = (userData) => {
//     setUser(userData);
//     navigate('/profile');
//   };

//   const handleRegisterSuccess = (userData) => {
//     setUser(userData);
//     navigate('/profile');
//   };

//   const handleLogout = () => {
//     authService.logout();
//     setUser(null);
//     navigate('/login');
//   };

//   const PrivateRoute = ({ children }) => {
//     const currentUser = authService.getCurrentUser();
//     return currentUser ? children : <Navigate to="/login" />;
//   };

//   return (
//     <div>
//       <Navbar user={user} onLogout={handleLogout} />
//       <Routes>
//         <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
//         <Route path="/register" element={<RegisterForm onRegisterSuccess={handleRegisterSuccess} />} />
//         <Route path="/profile" element={<PrivateRoute><Profile user={user} /></PrivateRoute>} />
//         <Route path="/admin/users" element={<PrivateRoute><UserManagement user={user} /></PrivateRoute>} />
//         <Route path="/" element={<PostsList />} />
//         <Route path="/posts" element={<PostsList />} />
//         <Route path="/posts/create" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
//         <Route path="/posts/edit/:id" element={<PrivateRoute><EditPost /></PrivateRoute>} />
//         <Route path="/posts/:id" element={<PostDetails />} />
//       </Routes>
//     </div>
//   );
// }

// function AppWrapper() {
//   return (
//     <Router>
//       <App />
//     </Router>
//   );
// }

// export default AppWrapper;




// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
// import LoginForm from './components/auth/LoginForm';
// import RegisterForm from './components/auth/RegisterForm';
// import authService from './services/authService';
// import Profile from './components/auth/Profile';
// import UserManagement from './components/Admin/UserManagement';
// import Navbar from './components/Layout/Navbar';
// import PostsList from './components/Posts/PostsList';
// import CreatePost from './components/Posts/CreatePost';
// import EditPost from './components/Posts/EditPost';
// import PostDetails from './components/Posts/PostDetails';

// function App() {
//   const [user, setUser] = useState(null); // Initialize user as null
//   const navigate = useNavigate();

//   useEffect(() => {
//     const currentUser = authService.getCurrentUser();
//     setUser(currentUser);
//   }, []);

//   const handleLoginSuccess = (userData) => {
//     setUser(userData);
//     navigate('/profile');
//   };

//   const handleRegisterSuccess = (userData) => {
//     setUser(userData);
//     navigate('/profile');
//   };

//   const handleLogout = () => {
//     authService.logout();
//     setUser(null);
//     navigate('/login');
//   };

//   const PrivateRoute = ({ children }) => {
//     const currentUser = authService.getCurrentUser();
//     return currentUser ? children : <Navigate to="/login" />;
//   };

//   return (
//     <div>
//       <Navbar user={user} onLogout={handleLogout} />
//       <Routes>
//         <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
//         <Route path="/register" element={<RegisterForm onRegisterSuccess={handleRegisterSuccess} />} />
//         <Route path="/profile" element={<PrivateRoute><Profile user={user} /></PrivateRoute>} />
//         <Route path="/admin/users" element={<PrivateRoute><UserManagement user={user} /></PrivateRoute>} />
//         <Route path="/" element={<PostsList />} />
//         <Route path="/posts" element={<PostsList />} />
//         <Route path="/posts/create" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
//         <Route path="/posts/edit/:id" element={<PrivateRoute><EditPost /></PrivateRoute>} />
//         <Route path="/posts/:id" element={<PostDetails />} />
//       </Routes>
//     </div>
//   );
// }

// function AppWrapper() {
//   return (
//     <Router>
//       <App />
//     </Router>
//   );
// }

// export default AppWrapper;















// ok2
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
// import LoginForm from './components/auth/LoginForm';
// import RegisterForm from './components/auth/RegisterForm';
// import authService from './services/authService';
// import Profile from './components/auth/Profile';
// import UserManagement from './components/Admin/UserManagement';
// import Navbar from './components/Layout/Navbar';
// import PostsList from './components/Posts/PostsList';
// import CreatePost from './components/Posts/CreatePost';
// import EditPost from './components/Posts/EditPost';
// import PostDetails from './components/Posts/PostDetails';


// function App() {
//   const [user, setUser] = useState(authService.getCurrentUser());
//   const navigate = useNavigate();

//   useEffect(() => {
//     setUser(authService.getCurrentUser());
//   }, []);

//   const handleLoginSuccess = (userData) => {
//     setUser(userData);
//     navigate('/profile');
//   };

//   const handleRegisterSuccess = (userData) => {
//     setUser(userData);
//     navigate('/profile');
//   };

//   const handleLogout = () => {
//     authService.logout();
//     setUser(null);
//     navigate('/login');
//   };

//   const PrivateRoute = ({ children }) => {
//     return user ? children : <Navigate to="/login" />;
//   };

//   return (
//     <div>
//       <Navbar user={user} onLogout={handleLogout} />
//       <Routes>
//         <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
//         <Route path="/register" element={<RegisterForm onRegisterSuccess={handleRegisterSuccess} />} />
//         <Route path="/profile" element={<PrivateRoute><Profile user={user} /></PrivateRoute>} />
//         <Route path="/admin/users" element={<PrivateRoute><UserManagement user={user} /></PrivateRoute>} />
//         <Route path="/" element={<PostsList />} />
//         <Route path="/posts" element={<PostsList />} />
//         <Route path="/posts/create" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
//         <Route path="/posts/edit/:id" element={<PrivateRoute><EditPost /></PrivateRoute>} />
//         <Route path="/posts/:id" element={<PostDetails />} />

//       </Routes>
//     </div>
//   );
// }

// export default App;




import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import authService from './services/authService';
import Profile from './components/auth/Profile';
import UserManagement from './components/Admin/UserManagement';
import Navbar from './components/Layout/Navbar';
import PostsList from './components/Posts/PostsList';
import CreatePost from './components/Posts/CreatePost';
import EditPost from './components/Posts/EditPost';
import PostDetails from './components/Posts/PostDetails';

function App() {
  const [user, setUser] = useState(authService.getCurrentUser());
  const navigate = useNavigate();

  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, []);

const handleLoginSuccess = (userData) => {
  setUser(userData);
  console.log('Navigating to /profile');
  navigate('/profile');
};

  const handleRegisterSuccess = (userData) => {
    setUser(userData);
    navigate('/profile');
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate('/login');
  };

  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={<RegisterForm onRegisterSuccess={handleRegisterSuccess} />} />
        <Route path="/profile" element={<PrivateRoute><Profile user={user} /></PrivateRoute>} />
        <Route path="/admin/users" element={<PrivateRoute><UserManagement user={user} /></PrivateRoute>} />
        <Route path="/" element={<PostsList />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/create" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
        <Route path="/posts/edit/:id" element={<PrivateRoute><EditPost /></PrivateRoute>} />
        <Route path="/posts/:id" element={<PostDetails />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;