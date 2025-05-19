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
import { useEffect, useState } from 'react';
import { db, rtdb } from './firebase.js';
import { onDisconnect, onValue, ref, serverTimestamp, set } from 'firebase/database';
import { doc, serverTimestamp as fsTimestamp, updateDoc } from 'firebase/firestore';
import ProfilePage from './pages/ProfilePage.jsx';
import { isSupported } from 'firebase/messaging';
import SnackBarAlert from './components/SnackBarAlert.jsx';

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPIDKEY;

export const setupPresence = (user) => {
  if (!user) return;

  const userStatusDBRef = ref(rtdb, `/status/${user.uid}`);
  const userDocRef = doc(db, "users", user.uid);

  const isOffline = {
    state: "offline",
    lastActive: serverTimestamp(),
  }

  const isOnline = {
    state: "online",
    lastActive: serverTimestamp(),
  }

  const isOfflineForFirestore = {
    status: "offline",
    lastActive: fsTimestamp(),
  };

  const isOnlineForFirestore = {
    status: "online",
    lastActive: fsTimestamp(),
  };

  const connectedRef = ref(rtdb, ".info/connected");
  onValue(connectedRef, async (snapshot) => {
    if (snapshot.val() === false) {
      await updateDoc(userDocRef, isOfflineForFirestore);
      return;
    }
  });

  onDisconnect(userStatusDBRef).set(isOffline).then(async () => {
    await set(userStatusDBRef, isOnline);
    await updateDoc(userDocRef, isOnlineForFirestore);
  })
}


function App() {
  const [permissionAlert, setPermissionAlert] =  useState(false);
  const [alertMessage, setAlertMessage] = useState(false);

useEffect(() => {
  let unsubscribe;

  const setupMessaging = async () => {
    const supported = await isSupported();

    if (!supported) {
      console.warn("Firebase Messaging is not supported on this browser.");
      setPermissionAlert(true);
      setAlertMessage(
        "Dobby ~ Chat is not fully supported on this browser.\nPlease try Safari or Chrome on Android/Windows."
      );
      return;
    }

    try {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
          const token = await getToken(messaging, { vapidKey: VAPID_KEY });

          if (token) {
            console.log("FCM Token:", token);
            localStorage.setItem("fcmToken", token);
          } else {
            console.log("No FCM Registration token available.");
          }

          //? Foreground message listener
          unsubscribe = onMessage(messaging, (payload) => {
            console.log("Message received in foreground:", payload);
            const { title, body, image } = payload.notification;

            new Notification(title, {
              body,
              icon: image || './assets/images/logo.png',
            });
          });
        } else {
          console.warn("Notification permission denied.");
        }
      } else {
        console.warn("Notifications are not supported in this browser.");
        setPermissionAlert(true);
        setAlertMessage(
          "This browser does not support notifications from Dobby~Chat.\nPlease try Chrome or Safari on Android/Windows."
        );
      }
    } catch (err) {
      console.error("Messaging setup failed:", err);
      setPermissionAlert(true);
      setAlertMessage(
        "An error occurred while enabling notifications.\nPlease try another browser."
      );
    }
  };

  setupMessaging();

  return () => {
    if (unsubscribe) unsubscribe();
  };
}, []);



  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      setupPresence(user);
    }
  }, [user]);


  if (loading) return <LoadingPage />;

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<HomePage user={user} />}
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
          element={user ? <UserSearchPage user={user} /> : <Navigate to="/login" />}
        />

        <Route
          path='/conversations'
          element={user ? <ChatPage user={user} /> : <Navigate to="/login" />}
        />

        <Route
          path='/profile'
          element={user ? <ProfilePage user={user} /> : <Navigate to="/login" />}
        />
      </Routes>
        <SnackBarAlert
        open={permissionAlert}
        onClose={() => setPermissionAlert(false)}
        severity='warning'
        message={alertMessage}
        />
    </BrowserRouter>
  );
}

export default App;
