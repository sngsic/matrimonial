import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyArMtazRCjrKwZhYun65bQNQz2DPQck4u4",
  authDomain: "matrimonuy.firebaseapp.com",
  projectId: "matrimonuy",
  storageBucket: "matrimonuy.appspot.com",
  messagingSenderId: "905749598066",
  appId: "1:905749598066:web:e782f113f0c17ec10657eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Firestore = getFirestore(app);
export {app,Firestore};