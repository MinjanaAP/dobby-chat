// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
apiKey: "AIzaSyBuENN_rqlfS-750as7z0cD_bCcPNHzPV8",
authDomain: "dobby-chat-59438.firebaseapp.com",
projectId: "dobby-chat-59438",
messagingSenderId: "626668202461",
appId: "1:626668202461:web:7c1113efe1d3a1aaae2e34"
});

const messaging = firebase.messaging();

//* Handle Foreground Notifications
// messaging.onMessage((payload) => {
//     console.log('[Service Worker] Foreground message received:', payload);
    
//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//         body: payload.notification.body,
//         icon: payload.notification.image || '../src/assets/images/logo.png',
//     };

//     self.registration.showNotification(notificationTitle, notificationOptions);
// });

//* Handle Background Notifications
messaging.onBackgroundMessage((payload) => {
    console.log('[Service Worker] Background message received:', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image || 'https://res.cloudinary.com/dtv1nvsx9/image/upload/v1743941152/dobby-logo-enhanced_t5mdxk.png',
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

//* Handle  Notifications Work Even When App is Fully Closed
// self.addEventListener('push', (event) => {
//     console.log('[Service Worker] Push event received:', event);

//     if (!event.data) {
//         console.error('[Service Worker] Push event has no data.');
//         return;
//     }

//     const data = event.data.json();
//     const notificationTitle = data.notification.title || 'New Notification';
//     const notificationOptions = {
//         body: data.notification.body || '',
//         icon: data.notification.image || '../src/assets/images/logo.png',
//     };

//     event.waitUntil(
//         self.registration.showNotification(notificationTitle, notificationOptions)
//     );
// });

//?  Handle notification click
self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click received:', event);

  event.notification.close();

  //! Open the link specified in the notification
  const clickAction = event.notification?.data?.FCM_MSG?.notification?.click_action 
                   || event.notification?.data?.link 
                   || 'https://dobby-chat.vercel.app/conversations'; // fallback

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      // If site is already open, focus it
      for (let client of clientList) {
        if (client.url === clickAction && 'focus' in client) {
          return client.focus();
        }
      }

      // Otherwise open a new tab
      if (clients.openWindow) {
        return clients.openWindow(clickAction);
      }
    })
  );
});