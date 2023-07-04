import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import './cssfiles/navbar.css';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.css';


function NaviBar() {
    const navigate = useNavigate();
    // const currrUser = localStorage.getItem("email");
    const handleLogout = async () => {
        await auth.signOut();
        navigate('/profiles');
        localStorage.clear();
    };

    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            }
            else {
                setAuthUser(null);
            }
        })
    }, [])

    return (
        <Navbar sticky='top' className='nav' bg="light" expand="lg">
                <Navbar.Brand href="/home">Matrimonial</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/profiles">Profiles</Nav.Link>
                    </Nav>
                    <Nav>
                        {authUser ?
                        <>
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                                <Nav.Link>
                                    {/* <Navbar.Brand href="/user"> */}
                                        <img
                                            src="https://cdn3.iconfinder.com/data/icons/user-interface-2343/256/profile_photo.png"
                                            width="30"
                                            height="30"
                                            className="d-inline-block align-top"
                                            alt="React Bootstrap logo"
                                        />Profile
                                    {/* </Navbar.Brand> */}
                                </Nav.Link>
                        </>
                            :
                            <>
                                <Nav.Link href="/login" className='sign-in-link'>Sign-In</Nav.Link>
                                <Nav.Link href='/register' className='sign-up-link'>Sign Up</Nav.Link>
                            </>
                        }


                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    );
}

export default NaviBar;