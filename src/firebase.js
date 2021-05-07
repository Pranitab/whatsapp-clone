import firebase from 'firebase/app';
import 'firebase/firestore'; 
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB46OQdXAVfpcFL-rHs5JLRDF9fIzPGjz4",
    authDomain: "whatsapp-clone-ec7c3.firebaseapp.com",
    projectId: "whatsapp-clone-ec7c3",
    storageBucket: "whatsapp-clone-ec7c3.appspot.com",
    messagingSenderId: "815694774907",
    appId: "1:815694774907:web:fd8177198780da6e4958de",
    measurementId: "G-Z5EQYTGP99"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;
