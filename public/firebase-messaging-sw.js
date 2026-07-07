// Firebase Messaging Service Worker
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDHSY_vGko5FendFFVqnv5q4MdmnKrLi-g",
  authDomain: "wam2026-8d969.firebaseapp.com",
  projectId: "wam2026-8d969",
  storageBucket: "wam2026-8d969.firebasestorage.app",
  messagingSenderId: "658568660162",
  appId: "1:658568660162:android:a61a72f574440f54fd275b"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/favicon.svg'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
