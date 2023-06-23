import React, {useState,useEffect} from "react";
import Header from "./components/Header";
import { useNavigate } from "react-router-dom";
import NaviBar from "./components/NaviBar";
import Footer from "./components/footer";
import CarouselContainer from "./components/CarouselContainer"
import "./components/cssfiles/home.css"
import "./components/cssfiles/footer.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";


function Home() {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user)
      }
      else {
        setAuthUser(null);
      }
    })
  }, [])

  if (authUser) {
    return (
      <div>
        <Header title="Home" />
        <NaviBar />
        <CarouselContainer />
        <Footer title="&copy;SBSY" />
      </div>
    );
  }
  else{
    navigate('/login')
  }
}
export default Home;
