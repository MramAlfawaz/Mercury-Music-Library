import React, { Component } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import Axios from "axios";
import { withRouter } from "react-router-dom";

class Reset extends Component {
  state = {
    password: "",
  };

  Submit = (e) => {
    e.preventDefault();
    Axios.post(
      `http://localhost:8001/user/reset/${this.props.match.params.token}`,
      {
        password: this.state.password,
      }
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  change = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    console.log(this.state.password);
    return (
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <legend>Reset Password Password</legend>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label for="password">New Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="New password"
              onChange={(e) => this.change(e)}
              autofocus="autofocus"
              required
            />
          </Form.Group>
          <Form.Group>
            <Button
              class="btn btn-primary"
              value="Reset Password"
              onClick={(e) => this.Submit(e)}
            >
              Update Password
            </Button>
          </Form.Group>
        </Col>
      </Row>
    );
  }
}
export default withRouter(Reset);
