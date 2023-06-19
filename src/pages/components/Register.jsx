import React, { useState } from 'react';
import Header from "./Header.jsx";
import NaviBar from './NaviBar.jsx';
import "./cssfiles/register.css";
import { firestore, auth } from '../../firebase.js';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      await firestore.collection('users').doc(user.uid).set({
        email: email,
        password: password
      });

      setEmail('');
      setPassword('');
      navigate('/login');

    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <Header title="Register" />
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
              <input onChange={(e) => setPassword(e.target.value)}
                value={password} type='password'
                placeholder='Password' />
            </div>
            <button type='submit'>Register</button>
            <br />
            <label id='info'>Nil</label>
          </form>

        </div>
      </div>
    </div>
  );
}

export default Register;
