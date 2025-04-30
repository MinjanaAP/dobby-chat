import './App.css';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import UserSearchPage from './pages/UserSearchPage';
import LoadingPage from './components/LoadingPage';
import { ChatPage } from './pages/ChatPage';

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <LoadingPage/>; 

  return (
    <BrowserRouter>
      <Routes>

        <Route 
          path="/" 
          element={<HomePage user={user}/>}
        />

        <Route 
          path="/login" 
          element={!user ? <LoginPage user={user} /> : <Navigate to="/" />} 
        />
        

        <Route 
          path="/signup" 
          element={!user ? <SignUpPage user={user} /> : <Navigate to="/" />} 
        />
        
        <Route 
          path="/search-users" 
          element={user ? <UserSearchPage user={user}/> : <Navigate to="/login" />} 
        />

        <Route
          path='/conversations'
          element={user ? <ChatPage user={user}/> : <Navigate to="/login" />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
