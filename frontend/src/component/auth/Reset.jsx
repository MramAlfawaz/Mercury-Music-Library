import React, { Component } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";

export default class Reset extends Component {
  render() {
    return (
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <legend>Reset Password Password</legend>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label for="password">New Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value=""
              placeholder="New password"
              autofocus="autofocus"
              required
            />
          </Form.Group>
          <Form.Group>
            <Button
              type="submit"
              class="btn btn-primary"
              value="Reset Password"
            >
              Update Password
            </Button>
          </Form.Group>
        </Col>
      </Row>
    );
  }
}
