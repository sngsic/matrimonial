import React, { useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "./Header.jsx";
import NaviBar from './NaviBar.jsx';
import "./cssfiles/register.css";
import { auth } from '../../firebase.js';
import AuthContext from '../../AuthContext.js';


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setIsLogged} = useContext(AuthContext);
    
    
    const handleSubmit =async (e) =>{
        e.preventDefault();

        try{
            await auth.signInWithEmailAndPassword(email,password);
            setIsLogged(true);
            navigate('/home');
        }catch(error){
            alert("Invalid credentials");
        }
    }

    return (
        <div>
            <Header title="Login" />
            <NaviBar />
            <div>
                <div className='login-container'>
                    <form onSubmit={handleSubmit}>
                        <div className='name'>
                            <label>Email :</label>
                            <input onChange={(e) => setEmail(e.target.value)} 
                            value={email} type='email' required 
                            placeholder='Email' /><br></br>
                        </div>
                        <div className='password'>
                            <label>Password :</label>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} type='password' placeholder='Password' />
                        </div>
                        <button type='submit'>Login</button>
                        <br />
                        <label id='info'>Nil</label>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default Login;
