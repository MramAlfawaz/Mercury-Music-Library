import React, { Component } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import Axios from "axios";

export default class Forgot extends Component {
  state = {
    email: "",
  };
  Submit = (e) => {
    e.preventDefault();
    Axios.post(`http://localhost:8001/user/forgetPass`, {
      email: this.state.email,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  change = (e) => {
    console.log(this.props.location);
    this.setState({ ...this.state, email: e.target.value });
  };

  render() {
    console.log(this.props.history.location);
    return (
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <legend>Forgot Password</legend>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label for="email">Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your email"
              name="email"
              required
              autofocus
              onChange={this.change}
              // value={this.state.email}
            />
          </Form.Group>
          <Form.Group>
            <Button
              class="btn btn-primary"
              value="Reset Password"
              onClick={(e) => this.Submit(e)}
            >
              Submit
            </Button>
          </Form.Group>
        </Col>
      </Row>
    );
  }
}
