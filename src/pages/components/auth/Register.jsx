import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import NaviBar from "../NaviBar" //'../components/NaviBar';
import Header from "../Header";
// import Footer from './components/footer';
// import "./components/cssfiles/footer.css";
import { firestore, auth } from '../../../firebase.js';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [forwho, setForwho] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [religion, setReligion] = useState('');
  const [caste, setCaste] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [district, setDistrict] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      forwho.trim() === '' ||
      name.trim() === '' ||
      gender.trim() === '' ||
      dob.trim() === '' ||
      maritalStatus.trim() === '' ||
      religion.trim() === '' ||
      caste.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      district.trim() === ''
    ) {
      alert('Please fill in all the fields.');
      return;
    }

    const emailx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailx.test(email)) {
      alert('Invalid email address.');
      return;
    }

    if (password.length < 6) {
      alert('Password should be at least 6 characters long.');
      return;
    }
    if (name.trim().length < 2) {
      alert('Name should be at least 2 characters long.');
      return;
    }


    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const isMale = gender === 'Male';
  
    if ((isMale && age <= 22) || (!isMale && age <= 18)) {
      alert(`Age should be ${isMale ? 'greater than 22' : 'greater than 18'} for the selected gender.`);
      return;
    }
    

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      if (user) {
        await firestore.collection('users').doc(user.uid).set({
          forwho: forwho,
          name: name,
          gender: gender,
          maritalStatus: maritalStatus,
          religion: religion,
          caste: caste,
          email: email,
          dob: dob,
          password: password,
          district: district,
        });
        navigate('/login');
      }
    } catch (error) {
      alert(error.message);
    }
  };


  return (
    <div>
      <Header title="Register Now" />
      <NaviBar />
      <div className="container">
        <Form onSubmit={handleSubmit}>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLUx1aPDg3Tei2_2-d_Br_LVOFBqmSq3vGBg&usqp=CAU' className='img-fluid shadow-4' alt='...' />
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>For</Form.Label>
              <Form.Select value={forwho} defaultValue="Choose..." onChange={(e) => setForwho(e.target.value)}>
                <option>--SELECT--</option>
                <option>Myself</option>
                <option>Daughter</option>
                <option>Son</option>
                <option>Relative</option>
                <option>Friend</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="First name" required onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Gender</Form.Label>
              <Form.Select required defaultValue="Choose..." onChange={(e) => setGender(e.target.value)}>
                <option>--SELECT--</option>
                <option>Male</option>
                <option>Female</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId='validationCudtom01'>
              <Form.Label>District</Form.Label>
              <Form.Control required type='text' onChange={(e)=>setDistrict(e.target.value)} />
            </Form.Group>
            <Form.Group as={Col} controlId="validationCustom02">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control required type="date" placeholder="Day" onChange={(e) => setDob(e.target.value)} />
            </Form.Group>
            <Form.Group as={Col} controlId='validationCustom03'>
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control required type='tel' pattern="[0-9]{10}" placeholder="Mobile" onChange={(e) => setDob(e.target.value)}/>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Marital Status</Form.Label>
              <Form.Select required defaultValue="Choose..." onChange={(e) => setMaritalStatus(e.target.value)}>
                <option>--SELECT--</option>
                <option>Divorced</option>
                <option>Widowed</option>
                <option>Un-Married</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Religion</Form.Label>
              <Form.Select required defaultValue="Choose..." onChange={(e) => setReligion(e.target.value)}>
                <option>--SELECT--</option>
                <option>Hindu</option>
                <option>Christian</option>
                <option>Muslim</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Caste</Form.Label>
              <Form.Select required defaultValue="Choose..." onChange={(e) => setCaste(e.target.value)}>
                <option>--SELECT--</option>
                <option>Prefer Not to Say</option>
                <option>Ezhava</option>
                <option>Thiyya</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <br />
          <h3>Register</h3>
          <br />
          <Row>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control required type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>
              I agree to the terms and conditions
              <Form.Check required feedback="You must agree before submitting." feedbackType="invalid" />
            </Form.Label>
          </Form.Group>
          <Button type="submit">Register Now</Button>
        </Form>
      </div>
      <br />
      <br />
      {/* <Footer title="&copy;SBSY" /> */}
    </div>
  );
}

export default Register;































// import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
// import NaviBar from './components/NaviBar';
// import Header from "./components/Header";
// import Footer from './components/footer';
// import "./components/cssfiles/footer.css";
// import { firestore, auth } from '../firebase.js';
// import { useNavigate } from 'react-router-dom';

// function Register1() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [forwho, setForwho] = useState("");
//   // const [, set] = useState("");
//   // const [, set] = useState("");


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const { user } = await auth.createUserWithEmailAndPassword(email, password);

//       await firestore.collection('users').doc(user.uid).set({
//         email: email,
//         password: password
//       });

//       setEmail('');
//       setPassword('');
//       navigate('/login');

//     } catch (error) {
//       alert(error);
//     }
//   };


//   return (
//     <div>
//       <Header title="Register Now" />
//       <NaviBar />
//       <div className="container">

//         <Form onSubmit={handleSubmit}>
//           <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLUx1aPDg3Tei2_2-d_Br_LVOFBqmSq3vGBg&usqp=CAU' className='img-fluid shadow-4' alt='...' />
//           <Row className="mb-3">
//             <Form.Group as={Col} md="4" controlId="validationCustom01">

//               <Form.Label>For</Form.Label>
//               <Form.Select value={forwho} defaultValue="Choose...">
//                 <option>--SELECT--</option>
//                 <option>Myself</option>
//                 <option>Daughter</option>
//                 <option>Son</option>
//                 <option>Relative</option>
//                 <option>Friend</option>
//               </Form.Select>

//             </Form.Group>
//             <Form.Group as={Col} md="4" controlId="validationCustom02">
//               <Form.Label>Name</Form.Label>
//               <Form.Control type="text" placeholder="First name" required
//               />

//             </Form.Group>
//             <Form.Group as={Col} md="4" controlId="validationCustomUsername">


//               <Form.Label>Gender</Form.Label>
//               <Form.Select defaultValue="Choose...">
//                 <option>--SELECT--</option>
//                 <option>Male</option>
//                 <option>Female</option>
//               </Form.Select>

//             </Form.Group>
//           </Row>
//           <Row className="mb-3">
//             <Form.Label>DOB</Form.Label>
//             <Form.Group as={Col} controlId="validationCustom03">

//               <Form.Control type="text" placeholder="Day" required />

//             </Form.Group>
//             <Form.Group as={Col} controlId="validationCustom04">

//               <Form.Control type="text" placeholder="Month" required />

//             </Form.Group>
//             <Form.Group as={Col} controlId="validationCustom05">

//               <Form.Control type="text" placeholder="Year" required />

//             </Form.Group>

//           </Row>
//           <Row className="mb-3">
//             <Form.Group as={Col} md="4" controlId="validationCustom01">
//               <Form.Label>Marital Status</Form.Label>
//               <Form.Select defaultValue="Choose...">
//                 <option>--SELECT--</option>
//                 <option>Divorced</option>
//                 <option>Widowed</option>
//                 <option>Un-Married</option>
//               </Form.Select>

//             </Form.Group>
//             <Form.Group as={Col} md="4" controlId="validationCustom02">
//               <Form.Label>Religion</Form.Label>
//               <Form.Select defaultValue="Choose...">
//                 <option>--SELECT--</option>
//                 <option>Hindu</option>
//                 <option>Christian</option>
//                 <option>Muslim</option>
//               </Form.Select>

//             </Form.Group>
//             <Form.Group as={Col} md="4" controlId="validationCustomUsername">
//               <Form.Label>Caste</Form.Label>
//               <Form.Select defaultValue="Choose...">
//                 <option>--SELECT--</option>
//                 <option>Prefer Not to Say</option>
//                 <option>Ezhava</option>
//                 <option>Thiyya</option>
//               </Form.Select>

//             </Form.Group>
//           </Row>
//           <br />
//           <h3>Register</h3>
//           <br />
//           <Row>
//             <Form.Group className="mb-3" controlId="formBasicEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control type="email" placeholder="Enter email" />
//               <Form.Text className="text-muted">
//                 We'll never share your email with anyone else.
//               </Form.Text>
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formBasicPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control type="password" placeholder="Password" />
//             </Form.Group>
//           </Row>

//           <Form.Group className="mb-3">
//             <Form.Label>I agree to the terms and conditions<Form.Check
//               required

//               feedback="You must agree before submitting."
//               feedbackType="invalid"
//             /></Form.Label>

//           </Form.Group>
//           <Button type="submit" >Register Now</Button>
//         </Form>
//       </div>
//       <br />
//       <br />
//       <Footer title="&copy;SBSY" />
//     </div>

//   );
// }

// export default Register1;