import './App.css';
import { auth, getToken, messaging, onMessage } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import UserSearchPage from './pages/UserSearchPage';
import LoadingPage from './components/LoadingPage';
import { ChatPage } from './pages/ChatPage';
import { useEffect } from 'react';

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPIDKEY;

function App() {
  useEffect(() => {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        getToken(messaging, { vapidKey: VAPID_KEY })
          .then((currentToken) => {
            if (currentToken) {
              console.log("FCM Token:", currentToken);
              localStorage.setItem("fcmToken", currentToken);
            }else{
              console.log("NO FCM Registration token available.")
            }
          })
          .catch((err) => {
            console.error("An error occurred while retrieving FCM token. ", err);
          });

          onMessage(messaging, (payload) => {
            console.log("Message received in foreground:", payload);
          })
      }
    })
  },[])
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
