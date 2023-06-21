import React from "react";
import Header from "./components/Header";
import NaviBar from "./components/NaviBar";
import Footer from "./components/footer";
import CarouselContainer from "./components/CarouselContainer"
import "./components/cssfiles/home.css"
import "./components/cssfiles/footer.css";


function Home() {
  return (
    <div>
      <Header title="Home" />
      <NaviBar />
      <CarouselContainer />
      <Footer title="&copy;SBSY" />
    </div>
  );
};

export default Home;
