import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AuthContext from '../../AuthContext';
import { useContext } from 'react';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import './cssfiles/navbar.css';


function NaviBar() {
    const navigate = useNavigate();
    const { isLogged, setIsLogged } = useContext(AuthContext);
    const handleLogout = async () => {
        await auth.signOut();
        setIsLogged(false);
        navigate('/home');
    };

    return (
        <Navbar className='nav' bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/home">Matrimonial</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/profiles">Profiles</Nav.Link>
                    </Nav>
                    <Nav>
                        {isLogged ? <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            : (
                                <>
                                    <Nav.Link href="/login" className='sign-in-link'>Sign-In</Nav.Link>
                                    <Nav.Link href='/register' className='sign-up-link'>Sign Up</Nav.Link>
                                </>
                            )}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NaviBar;