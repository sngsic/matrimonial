// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";// Switch, Link, Redirect 
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Register1 from "./pages/Register1.jsx";
import Login from "./pages/Login.jsx";
import { AuthProvider } from "./AuthContext.js";
import Profile from "./pages/Profile.jsx";


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path="/register" element={<Register1 />} />
          <Route path="/profiles" element={<Profile />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
