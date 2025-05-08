// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
apiKey: 'AIzaSyB5VyBvvJ6SZnPS5UKrAS-RegpU6sPbKic',
authDomain: "live-chat-dd075.firebaseapp.com",
projectId: "live-chat-dd075",
messagingSenderId: "565759435762",
appId:"1:565759435762:web:9c0839174a9a2351d7416b"
});

const messaging = firebase.messaging();

//* Handle Foreground Notifications
messaging.onMessage((payload) => {
    console.log('[Service Worker] Foreground message received:', payload);
    
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image || '../src/assets/images/logo.png',
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

//* Handle Background Notifications
messaging.onBackgroundMessage((payload) => {
    console.log('[Service Worker] Background message received:', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image || '../src/assets/images/logo.png',
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

//* Handle  Notifications Work Even When App is Fully Closed
self.addEventListener('push', (event) => {
    console.log('[Service Worker] Push event received:', event);

    if (!event.data) {
        console.error('[Service Worker] Push event has no data.');
        return;
    }

    const data = event.data.json();
    const notificationTitle = data.notification.title || 'New Notification';
    const notificationOptions = {
        body: data.notification.body || '',
        icon: data.notification.image || '../src/assets/images/logo.png',
    };

    event.waitUntil(
        self.registration.showNotification(notificationTitle, notificationOptions)
    );
});
