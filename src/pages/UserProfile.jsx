import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import "./components/cssfiles/proimg.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import NaviBar from './components/NaviBar';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Header from "./components/Header";
import firebase from "../firebase";


function UserProfile() {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userinfo, setUserInfo] = useState({});
  const [inputValues, setInputValues] = useState({}); // Add state to store input field values

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem('email');
        const querySnapshot = await firebase.firestore().collection("user-details").where("Email", "==", email).get();
        let data = '';
        querySnapshot.forEach((doc) => {
          data = doc.data();
        });
        setUserInfo(data);
        setInputValues(data); // Set the initial input field values to the user data
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if input field values match the values in userData
    let valuesMatch = true;
    for (const key in inputValues) {
      if (inputValues[key] !== userinfo[key]) {
        valuesMatch = false;
        break;
      }
    }

    if (valuesMatch) {
      // document.getElementById("user-form").setAttribute("disabled","true");
      // document.getElementById("submit-btn").style.display = 'none';
      // document.getElementById("edit-btn").style.display = '';
      alert("Nochanges. Data saved");
      
    } else {
      try {
        const email = localStorage.getItem('email');
        firebase.firestore().collection("user-details").where("Email", "==", email).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update(inputValues);
          });
        });
        setUserInfo(inputValues);
        // document.getElementById("user-form").setAttribute("disabled", "true")
        // document.getElementById("submit-btn").style.display = 'none';
        // document.getElementById("edit-btn").style.display = '';
        alert("Database updated successfully");
      } catch (error) {
        alert("Error updating database:", error);
      }
    }
    
  };

  function doEdit(){
    // document.getElementById("submit-btn").style.display = "";
    // document.getElementById("edit-btn").style.display = "none";
    // document.getElementById("name").setAttribute("disabled", "false")
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header title="Home" />
      <NaviBar />
      <div>
        <div className="container">
          <Form id='user-form' onSubmit={handleSubmit}>
            <Row>
              <Card>
                <Card.Body>
                  <Card.Img className="myimg container" variant="top" src={userinfo.DownloadURL} />
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control type="file" accept="image/*" />
                  </Form.Group>
                </Card.Body>
              </Card>
            </Row>
            <br />



            <Form.Group as={Row}  className="mb-3" controlId="">
              <Form.Label column sm={2}>Name</Form.Label>
              <Col sm={10}>
                <Form.Control
                  type='text'
                  name="Name"
                  value={inputValues.Name}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="">
              <Form.Label column sm={2}>Gender</Form.Label>
              <Col sm={10}>
                <Form.Control
                  type='text'
                  name="Gender"
                  value={inputValues.Gender}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="">
              <Form.Label column sm={2}>DoB</Form.Label>
              <Col sm={10}>
                <Form.Control
                  type='text'
                  name="DoB"
                  value={inputValues.DoB}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="">
              <Form.Label column sm={2}>Occupation</Form.Label>
              <Col sm={10}>
                <Form.Control
                  type='text'
                  name="Occupation"
                  value={inputValues.Occupation}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="">
              <Form.Label column sm={2}>Caste</Form.Label>
              <Col sm={10}>
                <Form.Control
                  type='text'
                  name="Caste"
                  value={inputValues.Caste}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="">
              <Form.Label column sm={2}>Email</Form.Label>
              <Col sm={10}>
                <Form.Control
                  type='text'
                  name="Email"
                  value={inputValues.Email}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="">
              <Form.Label column sm={2}>District</Form.Label>
              <Col sm={10}>
                <Form.Control
                  type='text'
                  name="District"
                  value={inputValues.District}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>

            <Button id='submit-btn' style={{display:"none"}}type="submit">Save</Button>
            {/* <Button id="edit-btn" onClick={doEdit}>Edit</Button> */}
          </Form>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
