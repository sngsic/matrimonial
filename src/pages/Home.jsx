import React from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import CarouselContainer from "./components/CarouselContainer"
import "./components/cssfiles/home.css"


function Home() {
  return (
    <div>
      <Header title="Home" />
      <Nav ishome="true" />
      <CarouselContainer />
    </div>
  );
};

export default Home;
