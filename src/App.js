// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";// Switch, Link, Redirect 
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Register from "./pages/components/Register";
import Login from "./pages/components/Login";
import { AuthProvider } from "./AuthContext.js";

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
          <Route path="/register"element={<Register />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
