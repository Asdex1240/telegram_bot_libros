import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDyL7OdbKkWWlWxHrOv8hgDUPKykCe-VPk",
    authDomain: "telegram-bot-c1690.firebaseapp.com",
    projectId: "telegram-bot-c1690",
    storageBucket: "telegram-bot-c1690.appspot.com",
    messagingSenderId: "292449925602",
    appId: "1:292449925602:web:e25a4c856cb7e3c23661bb",
    measurementId: "G-Y9PG7RD52F"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

module.export = { app, analytics };