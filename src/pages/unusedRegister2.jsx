
// import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import NaviBar from './components/NaviBar';
import Header from "./components/Header";
import Footer from './components/footer';
import "./components/cssfiles/footer.css";

function Register2() {

  return (
    <div>
      <Header title="Register Now" />
      <NaviBar />
      <div className="container">


        <Form>
          <br />

          <h3>Education Details</h3>
          <br />
          <Form.Group as={Row} className="mb-3" controlId="">
            <Form.Label column sm={2}>
              Education Level
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

          <br />
          <hr />
          <br />

          <h3>Occupation Details</h3>
          <br />
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

          <br />
          <hr />
          <br />
          <h3>Physical Details</h3>
          <br />
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
      <br />
      <br />
      <Footer title="&copy;SBSY" />
    </div>

  );
}

export default Register2;