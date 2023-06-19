import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBkR_28Yk07B5Pt5IzjeDacsOg_uvbS1pk",
  authDomain: "matrimony-110a0.firebaseapp.com",
  projectId: "matrimony-110a0",
  storageBucket: "matrimony-110a0.appspot.com",
  messagingSenderId: "662069758132",
  appId: "1:662069758132:web:3bdc4098b5e86397efefe1"
};

firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
export const auth = firebase.auth(); // Export the auth module

export default firebase;