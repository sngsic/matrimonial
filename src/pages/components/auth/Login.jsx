import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../Header.jsx";
import NaviBar from '../NaviBar.jsx';
import "../cssfiles/register.css";
// import { auth } from '../../../firebase.js';
import Form from "react-bootstrap/Form";
import { Button } from 'react-bootstrap';
import signin from './dbmanager.js';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        signin(e, email, password);
        localStorage.setItem("email", email);
        navigate("/home")
        // e.preventDefault();

        // try {
        //     await auth.signInWithEmailAndPassword(email, password);
        //     navigate('/home');
        // } catch (error) {
        //     alert("Invalid credentials");
        // }
    }

    return (
        <div>
            <Header title="Login" />
            <NaviBar />
            <div>
                <div className='login-container'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} required onChange={(e) => setEmail(e.target.value)} />

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            <Form.Text className="text-muted">
                                We'll never share your email and password with anyone.
                            </Form.Text></Form.Group>

                        <Button type='submit'>Log In</Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Login;
