import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import axios from "axios";

const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
};

function Signup() {
    const [userCredentials, setUserCredentials] = useState(initialState);
    const [passwordMismatchAlert, setPasswordMismatchAlert] = useState(false);

    const handleInput = ({ target }) => {
        setUserCredentials({ ...userCredentials, [target.name]: target.value });
    };

    const handleSignupAction = (event) => {
        event.preventDefault();

        axios
            .post("http://localhost:3004/auth/signup", userCredentials)
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
    };

    // check weather password is matched
    useEffect(() => {
        userCredentials.password !== userCredentials.confirmPassword
            ? setPasswordMismatchAlert(true)
            : setPasswordMismatchAlert(false);
    }, [userCredentials.confirmPassword]);

    return (
        <div className="container">
            <div
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}>
                <Card className="w-100" style={{ minWidth: "400px" }}>
                    <Card.Body>
                        <h2 className="text-center mb-4">Sign up</h2>
                        <Form onSubmit={handleSignupAction}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    name="email"
                                    type="email"
                                    placeholder="Please enter email"
                                    onChange={handleInput}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mt-2" id="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    name="username"
                                    type="text"
                                    placeholder="Please enter username"
                                    onChange={handleInput}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mt-2" id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    name="password"
                                    type="password"
                                    placeholder="Please enter password"
                                    onChange={handleInput}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mt-2" id="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Please re-enter password"
                                    onChange={handleInput}
                                    required
                                />
                            </Form.Group>
                            {passwordMismatchAlert ? (
                                <Alert className="mt-3" variant="danger">
                                    Password doesn't match
                                </Alert>
                            ) : null}
                            <Button className="w-100 mt-3" type="submit">
                                Sign up
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Already have an account?{" "}
                    <strong>
                        <Link to="/">Sign in</Link>
                    </strong>
                </div>
            </div>
        </div>
    );
}

export default Signup;
