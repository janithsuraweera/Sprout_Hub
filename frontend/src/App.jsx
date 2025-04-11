import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import PostsList from './components/Posts/PostsList';
import CreatePost from './components/Posts/CreatePost';
import EditPost from './components/Posts/EditPost';
import PostDetails from './components/Posts/PostDetails';
import TutorialsList from './components/Tutorials/TutorialsList';
import CreateTutorial from './components/Tutorials/CreateTutorial';
import EditTutorial from './components/Tutorials/EditTutorial';
import TutorialDetails from './components/Tutorials/TutorialDetails';
import ForumList from './components/Forum/ForumList';
import CreateForumPost from './components/Forum/CreateForumPost';
import EditForumPost from './components/Forum/EditForumPost';
import ForumPostDetails from './components/Forum/ForumPostDetails';
import MarketplaceList from './components/Marketplace/MarketplaceList';
import CreateProduct from './components/Marketplace/CreateProduct';
import EditProduct from './components/Marketplace/EditProduct';
import ProductDetails from './components/Marketplace/ProductDetails';
import Login from './components/auth/LoginForm';
import Register from './components/auth/RegisterForm';
import Profile from './components/auth/Profile';
import UserManagement from './components/Admin/UserManagement';
import HomePage from './components/Layout/HomePage';
import ResetPassword from './components/ResetPassword';
import ForgotPassword from './components/ForgotPassword';

function App() {

    
  return (

    
    <Router>
      <Navbar />

      <div className="container">
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />


          <Route path="/posts" element={<PostsList />} />
          <Route path="/posts/create" element={<CreatePost />} />
          <Route path="/posts/edit/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />

          <Route path="/tutorials" element={<TutorialsList />} />
          <Route path="/tutorials/create" element={<CreateTutorial />} />
          <Route path="/tutorials/edit/:id" element={<EditTutorial />} />
          <Route path="/tutorials/:id" element={<TutorialDetails />} />

          <Route path="/forum" element={<ForumList />} />
          <Route path="/forum/create" element={<CreateForumPost />} />
          <Route path="/forum/edit/:id" element={<EditForumPost />} />
          <Route path="/forum/:id" element={<ForumPostDetails />} />

          <Route path="/marketplace" element={<MarketplaceList />} />
          <Route path="/marketplace/create" element={<CreateProduct />} />
          <Route path="/marketplace/edit/:id" element={<EditProduct />} />
          <Route path="/marketplace/:id" element={<ProductDetails />} />


          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />


          <Route path="/admin/users" element={<UserManagement />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;













// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Layout/Navbar';
// import Footer from './components/Layout/Footer';
// import LoginForm from './components/auth/LoginForm';
// import RegisterForm from './components/auth/RegisterForm';
// import Profile from './components/auth/Profile';

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <div className="container mx-auto px-4 py-8">
//         <Routes>
//           <Route path="/" element={<LoginForm />} />
//           <Route path="/login" element={<LoginForm />} />
//           <Route path="/register" element={<RegisterForm />} />
//           <Route path="/profile" element={<Profile />} />
//         </Routes>
//       </div>
//       <Footer />
//     </Router>
//   );
// }

// export default App;



































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

// const handleLoginSuccess = (userData) => {
//   setUser(userData);
//   console.log('Navigating to /profile');
//   navigate('/profile');
// };

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

// function AppWrapper() {
//   return (
//     <Router>
//       <App />
//     </Router>
//   );
// }

// export default AppWrapper;




