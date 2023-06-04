import React from "react";
import "./cssfiles/navbar.css";
import { Link } from "react-router-dom";

function Nav() {
    return (
        <nav>
            <ul>
                <li className="about"><Link to="/about"><li><button>About</button></li></Link></li>
                <li className="login"><Link to="/login"><button>Login</button></Link></li>
            </ul>
        </nav>
    );
}

export default Nav;