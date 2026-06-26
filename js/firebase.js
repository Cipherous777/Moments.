// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 export const firebaseConfig = {
    apiKey: "AIzaSyCZtLG7W4GspVdVJ5nKrOyOWoltI9RKLBs",
    authDomain: "moments-f08ba.firebaseapp.com",
    projectId: "moments-f08ba",
    storageBucket: "moments-f08ba.firebasestorage.app",
    messagingSenderId: "145541145048",
    appId: "1:145541145048:web:3a7f4bada4efc5266752ad",
    measurementId: "G-NDFJD22NKS"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);