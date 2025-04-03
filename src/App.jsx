import './App.css'
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {HomePage}  from './pages/HomePage';

function App() {
  const [user, loading] = useAuthState(auth);

  if(loading) return <div>Loading ...</div>
  return (
    <BrowserRouter>
      <Routes>
      <Route 
          path="/" 
          // element={user ? <HomePage /> : <Navigate to="/auth" />} 
          element= {<HomePage/>}
        />
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
