import React from "react";
import "./cssfiles/head.css";

function Header(props) {
  return (
    <div>
      <header>
      <h1 className= {props.class}>{props.title}</h1>
      </header>
    </div>
  );
}

export default Header;