import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import Axios from "axios";
import { Link } from "react-router-dom";

export const Signin = (props) => {
  const [signin, setSignin] = useState({});

  let onChangeInput = ({ target: { name, value } }) => {
    setSignin({ ...signin, [name]: value });
  };
  useEffect(() => {
    console.log(signin);
  });

  let onSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8001/user/signin", signin)
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          props.userSignin();
          props.history.push("/home");
        } else {
          console.log("email or password not correct");
        }
      })
      .catch((err) => console.log(err));
  };

  let onChange = (e) => {
    Axios.post("http://localhost:8001/user/forgot")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    };

    return (
      <>
        <Form className="mt-5">
          <Row className="justify-content-center mt-5">
            <Col md={8}>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={(e) => onChangeInput(e)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => onChangeInput(e)}
                  />
                </Form.Group>
              </Form.Row>
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => onSubmit(e)}
              >
                Submit
              </Button>
              <Button
                as={Link}
                to={"/forgot"}
                variant="primary"
                type="submit"
                onClick={(e) => onChange(e)}
              >
                Forgot Password?
              </Button>
            </Col>
          </Row>
        </Form>
      </>
    );
  };

