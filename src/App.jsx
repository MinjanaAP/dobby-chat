import './App.css'
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {HomePage}  from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  const [user, loading] = useAuthState(auth);

  if(loading) return <div>Loading ...</div>
  return (
    <BrowserRouter>
      <Routes>
      <Route 
          path="/" 
          element={<HomePage/>}
        />
        <Route 
          path="/login" 
          element={!user ? <LoginPage/> : <Navigate to="/" />} 
        />
        <Route 
          path="/signup" 
          element={!user ? <SignUpPage/> : <Navigate to="/" />} 
        />
        <Route 
          path="/Home" 
          // element={user ? <HomePage /> : <Navigate to="/login" />} 
          element={<HomePage/>}
        />
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
