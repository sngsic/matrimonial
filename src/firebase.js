import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBYWcdCy-p4jUKRLsrxV2aSw6dnF5VCZHU",
  authDomain: "matrimonial-db944.firebaseapp.com",
  projectId: "matrimonial-db944",
  storageBucket: "matrimonial-db944.appspot.com",
  messagingSenderId: "508758390103",
  appId: "1:508758390103:web:3563079c3c68add5c0fa12"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBkR_28Yk07B5Pt5IzjeDacsOg_uvbS1pk",
//   authDomain: "matrimony-110a0.firebaseapp.com",
//   projectId: "matrimony-110a0",
//   storageBucket: "matrimony-110a0.appspot.com",
//   messagingSenderId: "662069758132",
//   appId: "1:662069758132:web:3bdc4098b5e86397efefe1"
// };

firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
export const auth = firebase.auth()
export default firebase;