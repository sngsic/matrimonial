import React from "react";
import "./cssfiles/card.css";

const Card = (props) =>{
    return (
        <div className="card">
            <h1 className= {props.class}>
                {props.title}
            </h1>
        </div>
    );
};

export default Card;