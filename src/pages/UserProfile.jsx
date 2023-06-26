import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userinfo, setUserInfo] = useState({});
  const [inputValues, setInputValues] = useState({}); // Add state to store input field values

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem('email');
        const querySnapshot = await firebase.firestore().collection("users").where("Email", "==", email).get();
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
      alert("Nochanges. Data saved");
      document.getElementById("user-form").setAttribute("disabled",'true')
      document.getElementById('submit-btn').style.display = 'none';
      document.getElementById("edit-btn").style.display = '';
    } else {
      try {
        const email = localStorage.getItem('email');
        firebase.firestore().collection("users").where("Email", "==", email).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update(inputValues);
          });
        });
        setUserInfo(inputValues);
        alert("Database updated successfully");
      } catch (error) {
        alert("Error updating database:", error);
      }
    }
  };

  function enableEdit(){
    document.getElementById("user-form").setAttribute("disabled","false");
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
            <Form.Group as={Row} className="mb-3" controlId="">
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

            <Button id='submit-btn' type="submit">Save</Button>
            <Button id="edit-btn" style={{display:"none"}} onClick={enableEdit}>Edit</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;








// import React, { useState, useEffect } from 'react';
// import "./components/cssfiles/proimg.css";
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import NaviBar from './components/NaviBar';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
// import Header from "./components/Header";
// import firebase from "../firebase";

// function UserProfile() {
//   const [loading, setLoading] = useState(true);
//   const [userinfo, setUserInfo] = useState({});
  
//   // const [selectedImage, setSelectedImage] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const email = localStorage.getItem('email');
//         const querySnapshot = await firebase.firestore().collection("users").where("Email", "==", email).get();
//         let data = '';
//         querySnapshot.forEach((doc) => {
//           data = doc.data();
//         });
//         setUserInfo(data);
//         setLoading(false);
//       } catch (error) {
//         console.log("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // const collectionName = firebase.collection("user-details");
//   // const docName = collectionName.doc(userinfo.Name);
  
  

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <Header title="Home" />
//       <NaviBar />
//       <div>
//         <div className="container">
//           <Form  disabled>
//             <Row>
//               <Card>
//                 <Card.Body>
//                   <Card.Img className="myimg container" variant="top" src={userinfo.DownloadURL} />
//                   <Form.Group controlId="formFile" className="mb-3">
//                     <Form.Label>Upload Image</Form.Label>
//                     <Form.Control type="file" accept="image/*" />{/*onChange={} />*/}
//                   </Form.Group>
//                 </Card.Body>
//               </Card>
//             </Row>
//             <br />
//             <Form.Group as={Row} className="mb-3" controlId="">
//               <Form.Label column sm={2}>   Name </Form.Label>
//               <Col sm={10}><Form.Control type='text' value={userinfo.Name} /></Col>
//             </Form.Group>

//             <Form.Group as={Row} className="mb-3" controlId="">
//               <Form.Label column sm={2}>    Gender    </Form.Label>
//               <Col sm={10}><Form.Control type='text' value={userinfo.Gender} /></Col>
//             </Form.Group>

//             <Form.Group as={Row} className="mb-3" controlId="">
//               <Form.Label column sm={2}>    DoB    </Form.Label>
//               <Col sm={10}><Form.Control type='text' value={userinfo.DoB} /></Col>
//             </Form.Group>

//             <Form.Group as={Row} className="mb-3" controlId="">
//               <Form.Label column sm={2}>    Occupation    </Form.Label>
//               <Col sm={10}><Form.Control type='text' value={userinfo.Occupation} /></Col>
//             </Form.Group>

//             <Form.Group as={Row} className="mb-3" controlId="">
//               <Form.Label column sm={2}>   Caste     </Form.Label>
//               <Col sm={10}><Form.Control type='text' value={userinfo.Caste} /></Col>
//             </Form.Group>

//             <Form.Group as={Row} className="mb-3" controlId="">
//               <Form.Label column sm={2}>    Email     </Form.Label>
//               <Col sm={10}><Form.Control type='text' value={userinfo.Email} /></Col>
//             </Form.Group>

//             <Form.Group as={Row} className="mb-3" controlId="">
//               <Form.Label column sm={2}>    District     </Form.Label>
//               <Col sm={10}><Form.Control type='text' value={userinfo.District} /></Col>
//             </Form.Group>

//             <Button type="submit">Next</Button>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserProfile;










// import React, { useState, useEffect } from 'react';
// import "./components/cssfiles/proimg.css";
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import NaviBar from './components/NaviBar';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
// import Header from "./components/Header";
// import firebase from "../firebase";

// function UserProfile() {
//   const [loading, setLoading] = useState(true);
//   const [userinfo, setUserInfo] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const email = localStorage.getItem('email');
//         const querySnapshot = await firebase.firestore().collection("users").where("email", "==", email).get();
//         let data = '';
//         querySnapshot.forEach((doc) => {
//           data = doc.data();
//         });
//         setUserInfo(data);
//         setLoading(false);
//       } catch (error) {
//         console.log("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);


//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div >
//       <Header title="Home" />
//       <NaviBar />
//       <div >
//         <div className="container">
//           <Form >
//             <Row>

//               <Card>{/* style={{ width: '18rem', marginTop: "50PX", marginBottom: '20px', background: 'transparent', border: 'none' }}>*/}
//                 <Card.Body>
//                   <Card.Img className="myimg container" variant="top" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" />
//                 </Card.Body>
//               </Card>


//               <Card className='left'>
//                 <Card.Body>
//                   <Card.Text>
//                     Name          : {userinfo.name} <br />
//                     Status        : {userinfo.maritalStatus}<br />
//                     Religion      : {userinfo.religion}<br />
//                     District      : {userinfo.district}
//                   </Card.Text>
//                 </Card.Body>
//               </Card>
//             </Row>
//             <hr />
//             <h3>Personal Details</h3>

//             <Form.Group as={Row} className="mb-3" controlId="">
//               <Form.Label column sm={2}>
//                 Occupation Field
//               </Form.Label>
//               <Col sm={10}>
//                 <Form.Select defaultValue="Choose...">
//                   <option>1</option>
//                   <option>2</option>
//                   <option>2</option>
//                 </Form.Select>
//               </Col>
//             </Form.Group>
//             <Form.Group as={Row} className="mb-3" controlId="">
//               <Form.Label column sm={2}>
//                 Occupation
//               </Form.Label>
//               <Col sm={10}>
//                 <Form.Control type="" placeholder="" />
//               </Col>
//             </Form.Group>

//             <Form.Group as={Row} className="mb-3" controlId="">
//               <Form.Label column sm={2}>
//                 Annual Income
//               </Form.Label>
//               <Col sm={10}>
//                 <Form.Select defaultValue="Choose...">
//                   <option>1</option>
//                   <option>2</option>
//                   <option>3</option>
//                 </Form.Select>
//               </Col>
//             </Form.Group>

//             <Form.Group as={Row} className="mb-3" controlId="">
//               <Form.Label column sm={2}>
//                 Working Place:
//               </Form.Label>
//               <Col sm={10}>
//                 <Form.Control type="" placeholder="Country/State/District/major city" />
//               </Col>
//             </Form.Group>

//             <hr />
//             <h3>More Info</h3>
//             <Form.Group as={Row} className="mb-3" controlId="">
//               <Form.Label column sm={2}>
//                 Height
//               </Form.Label>
//               <Col sm={10}>
//                 <Form.Control type="" placeholder="in cm" />
//               </Col>
//             </Form.Group>

//             <Form.Group as={Row} className="mb-3" controlId="">
//               <Form.Label column sm={2}>
//                 Weight
//               </Form.Label>
//               <Col sm={10}>
//                 <Form.Control type="" placeholder="in KG" />
//               </Col>
//             </Form.Group>
//             <Form.Group as={Row} className="mb-3" controlId="">
//               <Form.Label column sm={2}>
//                 Physical Disability
//               </Form.Label>
//               <Col sm={10}>
//                 <Form.Select defaultValue="Choose...">
//                   <option>Yes</option>
//                   <option>No</option>
//                 </Form.Select>
//               </Col>
//             </Form.Group>
//             <Button type="submit">Next</Button>

//           </Form>
//         </div>
//       </div>
//     </div>
//   );

// }

// export default UserProfile;