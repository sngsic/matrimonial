import React from "react";
import NaviBar from "./components/NaviBar";
import Header from "./components/Header";
import Footer from "./components/footer";
import "./components/cssfiles/footer.css";

function About(){
    return(
        <div>
            <Header title="About" />
            <NaviBar/>
            <Footer />
        </div>
    );
}

export default About;