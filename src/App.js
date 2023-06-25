// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";// Switch, Link, Redirect 
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Register from "./pages/components/auth/Register.jsx";
import Login from "./pages/components/auth/Login.jsx";
import Profile from "./pages/Profile.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import { useEffect,useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";


function App() {
  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user)
      }
      else {
        setAuthUser(null);
      }
    })
  }, [])
  return (
    <div className="App">
        <BrowserRouter>
        <Routes>
          <Route path='/login'    element={!authUser ? <Login /> : <Home />}  />
          <Route path="/"         element={!authUser ? <Login /> : <Home />} />
          <Route path="/register" element={!authUser ? <Register /> : <Home />} />
          <Route path="/home"     element={<Home />} />
          <Route path="/about"    element={<About />} />
          <Route path="/profiles" element={<Profile />} />
          <Route path="/user"     element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
