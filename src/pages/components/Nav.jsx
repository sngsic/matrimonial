import React from "react";
import "./cssfiles/navbar.css";
import { Link } from "react-router-dom";

function Nav(props) {
    return (
        <nav>
            <ul>
                {props.ishome !== "true" && <li><Link to="/"><button>Home</button></Link></li>}
                <li><Link to="/about"><li><button>About</button></li></Link></li>
                {props.islogin !== "true" && <li className="login"><Link to="/login"><button>Login</button></Link></li>}
            </ul>
        </nav>
    );
}

export default Nav;