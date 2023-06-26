import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import NaviBar from "../NaviBar"
import Header from "../Header";
import { useNavigate } from 'react-router-dom';
import { signup } from './dbmanager';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import firebase from '../../../firebase';
import "firebase/storage"

function Register() {
  const navigate = useNavigate();

  const [forwho, setForwho] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [occupation, setOccupation] = useState('');
  const [caste, setCaste] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [district, setDistrict] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      forwho.trim() === '' ||
      name.trim() === '' ||
      gender.trim() === '' ||
      dob.trim() === '' ||
      maritalStatus.trim() === '' ||
      occupation.trim() === '' ||
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

    if ((isMale && age <= 21) || (!isMale && age <= 18)) {
      alert(`Age should be ${isMale ? 'greater than 22' : 'greater than 18'} for the selected gender.`);
      return;
    }

    handleImageUpload((downloadURL) => {
      signup(
        e,
        forwho,
        name,
        dob,
        email,
        password,
        district,
        caste,
        maritalStatus,
        gender,
        occupation,
        downloadURL
      );
      localStorage.setItem("email", email);
      navigate('/home');
    });
  };

  const handleImageUpload = (callback) => {
    if (selectedImage) {
      const storageRef = firebase.storage().ref();
      let folder = {email} + "profile-pic";
      const imagesRef = storageRef.child(folder);

      const uploadTask = imagesRef.child(selectedImage.name).put(selectedImage);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // You can update the progress bar or display messages to the user
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // The uploaded image can now be accessed using its download URL
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            callback(downloadURL);
          });
        }
      );
    }
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  return (
    <div>
      <Header title="Register Now" />
      <NaviBar />
      <div className="container">
        <Form onSubmit={handleSubmit}>
          <br />
          <h3>Register</h3>
          <br />
          <Row>
            <Card>
              <Card.Body>
                <Card.Img className="myimg container" variant="rounded" src={selectedImage ? URL.createObjectURL(selectedImage) : ""} />
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control type="file" accept="image/*" onChange={handleImageSelect} />
                </Form.Group>
              </Card.Body>
            </Card>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" required onChange={(e) => setName(e.target.value)} />
            </Form.Group>
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
              <Form.Control required type='text' onChange={(e) => setDistrict(e.target.value)} />
            </Form.Group>
            <Form.Group as={Col} controlId="validationCustom02">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control required type="date" onChange={(e) => setDob(e.target.value)} />
            </Form.Group>
            <Form.Group as={Col} controlId='validationCustom03'>
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control required type='tel' pattern="[0-9]{10}" onChange={(e) => setDob(e.target.value)} />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Occupation</Form.Label>
              <Form.Control required onChange={(e) => setOccupation(e.target.value)} />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Marital Status</Form.Label>
              <Form.Select required defaultValue="Choose..." onChange={(e) => setMaritalStatus(e.target.value)}>
                <option>--SELECT--</option>
                <option>Divorced</option>
                <option>Widowed</option>
                <option>Un-Married</option>
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
          <br /><hr />
          <Row>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control required type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>
              I agree to the terms and conditions
              <Form.Check required feedback="You must agree before submitting." feedbackType="invalid" />
            </Form.Label>
          </Form.Group>
          <hr />
          <Button type="submit">Register Now</Button><br />
          <p>Already have an account? <Link style={{textDecoration : "none"}} to="/login">Login</Link></p>
        </Form>
      </div>
      <br />
      <br />
      <hr />
      
      {/* <Footer title="&copy;SBSY" /> */}
    </div>
  );
}

export default Register;

