import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import NaviBar from "./components/NaviBar";
import CarouselContainer from "./components/CarouselContainer"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";


function Home() {
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

  if (authUser) {
    return (
      <div>
        <Header title="Home" />
        <NaviBar />
        <CarouselContainer />
        {/* <Footer title="&copy;SBSY" /> */}
      </div>
    );
  } else {
      return(
        <div>
          <center><Header title="Login to continue"/></center>
          <NaviBar />
        </div>
      )
  }
}
export default Home;
