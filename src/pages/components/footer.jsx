import React from "react";
import "./cssfiles/footer.css";

function Footer(props) {
  return (
    <div>
      <footer>
      <h1 className= {props.class}>{props.title}</h1>
      </footer>
    </div>
  );
}

export default Footer;