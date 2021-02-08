import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyDd7Y4MmGRdcOnt9Uymnmb7yyf3uBRdjwE",
  authDomain: "chat-app-apoguru.firebaseapp.com",
  projectId: "chat-app-apoguru",
  storageBucket: "chat-app-apoguru.appspot.com",
  messagingSenderId: "641669282612",
  appId: "1:641669282612:web:e97aa55361dbde11a08361",
};

firebase.initializeApp(config);
