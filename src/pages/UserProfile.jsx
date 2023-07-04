import React, { useState, useEffect } from 'react';
import "./components/cssfiles/userprofile.css";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import NaviBar from './components/NaviBar';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Header from "./components/Header";
import firebase from "../firebase";
import "bootstrap/dist/css/bootstrap.css";

function UserProfile() {
  const [loading, setLoading] = useState(true);
  const [userinfo, setUserInfo] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [image, setImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [isDisabled,setIsDisabled] = useState(true);

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
        setInputValues(data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (updateStatus) {
      const updateUserProfile = async () => {
        try {
          const email = localStorage.getItem('email');
          const userRef = firebase.firestore().collection('user-details').where('Email', '==', email);

          if (newImage) {
            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(`${email}/profile-image`);

            // Replace the existing image with the new one
            await fileRef.put(newImage);

            const downloadURL = await fileRef.getDownloadURL();

            // Update the image URL in the database
            userRef.get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                doc.ref.update({
                  DownloadURL: downloadURL,
                });
              });
            });

            setUserInfo((prevState) => ({
              ...prevState,
              DownloadURL: downloadURL,
            }));
          }

          // Update other input values in the database
          userRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.update(inputValues);
            });
          });

          setUserInfo(inputValues);

          // Show success message
          alert('Changes Saved');
        } catch (error) {
          // Handle the error
          alert('Error updating data:', error);
        }

        setUpdateStatus(false);
        setIsDisabled(true);
      };

      updateUserProfile();
    }
  }, [updateStatus, inputValues, newImage]);

  const handleInputChange = (e) => {
    if (e.target.name === 'image') {
      setNewImage(e.target.files[0]);
      // Update the image tag preview (optional)
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setInputValues((prevInputValues) => ({
        ...prevInputValues,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdateStatus(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  function disableEdit(){
    document.getElementById('save-btn').style.display = 'none';
    document.getElementById('edit-btn').style.display = '';
  }
  function allowEdit(){
    setIsDisabled(false);
    document.getElementById('save-btn').style.display = '';
    document.getElementById('edit-btn').style.display = 'none';
  }

  return (
    <div>
      <Header title="Home" />
      <NaviBar />
      <div>
        <div className="container">
          <Form id='user-form' onSubmit={handleSubmit}>
            <Row className='pic-container'>
              <Image className='rounded-circle img-fluid profile-pic' variant='top' src={newImage ? URL.createObjectURL(newImage) : userinfo.DownloadURL} />
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control disabled={isDisabled} type="file" accept="image/*" name='image' onChange={handleInputChange} />
              </Form.Group>
            </Row>
            <br />

            <Form.Group as={Row} className="mb-3" controlId="">
              <Form.Label column sm={2}>Name</Form.Label>
              <Col sm={10}>
                <Form.Control
                  type='text'
                  name="Name"
                  disabled={isDisabled}
                  value={inputValues.Name || ''}
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
                  disabled={isDisabled}
                  value={inputValues.Gender || ''}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="">
              <Form.Label column sm={2}>DoB</Form.Label>
              <Col sm={10}>
                <Form.Control
                  type='date'
                  name="DoB"
                  disabled={isDisabled}
                  value={inputValues.DoB || ''}
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
                  disabled={isDisabled}
                  value={inputValues.Occupation || ''}
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
                  disabled={isDisabled}
                  value={inputValues.Caste || ''}
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
                  value={inputValues.Email || ''}
                  onChange={handleInputChange}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="">
              <Form.Label column sm={2}>District</Form.Label>
              <Col sm={10}>
                <Form.Control
                  type='text'
                  name="District"
                  disabled={isDisabled}
                  value={inputValues.District || ''}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>

            <Button type="submit" id='save-btn' disabled={isDisabled} style={{display:'none'}}>Save</Button>
            <Button onClick={allowEdit}  id='edit-btn'  >Edit</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

