// import React from "react";
// import "./cssfiles/navbar.css";
// import { Link } from "react-router-dom";

// function Nav(props) {
//     return (
//         <nav>
//             <ul>
//                 {props.ishome !== "true" && <li><Link to="/"><button>Home</button></Link></li>}
//                 <li><Link to="/about"><li><button>About</button></li></Link></li>
//                 {props.islogin !== "true" && <li className="login"><Link to="/login"><button>Login</button></Link></li>}
//             </ul>
//         </nav>
//     );
// }

// export default Nav;

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NaviBar() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Matrimonial</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NaviBar;