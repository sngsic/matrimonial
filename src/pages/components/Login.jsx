import { useState, } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from './firebase.js';
import "./cssfiles/login.css";

const auth = getAuth(app);


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password).then(value => alert("success"));
  }
  return (
    <div className='login-container'>
      <form>
        <div className='name'>
          <label>Username </label>
          <input onChange={(e) => setEmail(e.target.value)} value={email} type='text' placeholder='Email' required /><br></br>
        </div>
        <div className='password'>
          <label>Password </label>
          <input onChange={(e) => setPassword(e.target.value)} value={password} type='password' placeholder='password' />
        </div>
        <button onClick={createUser}>Login</button>
      </form>
    </div>

  );
}

export default Login;