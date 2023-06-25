import React from "react";
// import './cssfiles/proimg.css'
import "./components/cssfiles/proimg.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import NaviBar from './components/NaviBar';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Header from "./components/Header";


function UserProfile() {
  return (
    <div className="container">
      <Header title="Home" />
      <NaviBar />
      <div >
        <div>
          <Form>
            <Row>
              <Row>
                <Card style={{ width: '18rem', marginTop: "50PX", marginBottom: '20px', background: 'transparent', border: 'none' }}>
                  <Card.Body>
                    <Card.Img className="myimg container" variant="top" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" />
                  </Card.Body>
                </Card>
              </Row>
            </Row>

            <h3>Vaishnav KP</h3>
            <hr />
            <h3>Personal Details</h3>
            <Form.Group as={Row} className="mb-3" controlId="">
              <Form.Label column sm={2}>
                Occupation Field
              </Form.Label>
              <Col sm={10}>
                <Form.Select defaultValue="Choose...">
                  <option>--SELECT--</option>
                  <option>Divorced</option>
                  <option>Widowed</option>
                  <option>Un-Married</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="">
              <Form.Label column sm={2}>
                Occupation
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="" placeholder="Your JOB" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="">
              <Form.Label column sm={2}>
                Annual Income
              </Form.Label>
              <Col sm={10}>
                <Form.Select defaultValue="Choose...">
                  <option>--SELECT--</option>
                  <option>Divorced</option>
                  <option>Widowed</option>
                  <option>Un-Married</option>
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="">
              <Form.Label column sm={2}>
                Working Place:
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="" placeholder="Country/State/District/major city" />
              </Col>
            </Form.Group>

            <hr />
            <h3>More Info</h3>
            <Form.Group as={Row} className="mb-3" controlId="">
              <Form.Label column sm={2}>
                Height
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="" placeholder="in cm" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="">
              <Form.Label column sm={2}>
                Weight
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="" placeholder="in KG" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="">
              <Form.Label column sm={2}>
                Physical Disability
              </Form.Label>
              <Col sm={10}>
                <Form.Select defaultValue="Choose...">
                  <option>--SELECT--</option>
                  <option>Yes</option>
                  <option>No</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <Button type="submit">Next</Button>

          </Form>
        </div>
      </div>
    </div>
  );

}







export default UserProfile;