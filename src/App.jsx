import './App.css';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import UserSearchPage from './pages/UserSearchPage';

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Loading ...</div>; 

  return (
    <BrowserRouter>
      <Routes>

        <Route 
          path="/" 
          element={user ? <HomePage user={user}/> : <Navigate to="/login" />} 
        />

        <Route 
          path="/login" 
          element={!user ? <LoginPage /> : <Navigate to="/" />} 
        />
        

        <Route 
          path="/signup" 
          element={!user ? <SignUpPage /> : <Navigate to="/" />} 
        />
        
        <Route 
          path="/search-users" 
          element={user ? <UserSearchPage user={user}/> : <Navigate to="/login" />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
