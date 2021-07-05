import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAF4YbOWEy9WeFGu7mkY9oPloOY9HytjIM",
  authDomain: "whatsapp-4cd3d.firebaseapp.com",
  projectId: "whatsapp-4cd3d",
  storageBucket: "whatsapp-4cd3d.appspot.com",
  messagingSenderId: "747280431096",
  appId: "1:747280431096:web:44c2cb54ac6e4b5968c80d"
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
