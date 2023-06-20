import React from "react";
import Header from "./components/Header";
import NaviBar from "./components/NaviBar";
import CarouselContainer from "./components/CarouselContainer"
import "./components/cssfiles/home.css"

function Home() {
  return (
    <div>
      <Header title="Home" />
      <NaviBar />
      <CarouselContainer />
    </div>
  );
}

export default Home;
