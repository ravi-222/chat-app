import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDd7Y4MmGRdcOnt9Uymnmb7yyf3uBRdjwE",
  authDomain: "chat-app-apoguru.firebaseapp.com",
  projectId: "chat-app-apoguru",
  storageBucket: "chat-app-apoguru.appspot.com",
  messagingSenderId: "641669282612",
  appId: "1:641669282612:web:e97aa55361dbde11a08361",
};

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, storage, provider };
export default db;
