import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import axios from "axios";

const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
};

function Signup() {
    const history = useHistory();
    const [userCredentials, setUserCredentials] = useState(initialState);
    const [passwordMismatchAlert, setPasswordMismatchAlert] = useState(false);

    // listening to the event
    const handleInput = ({ target }) => {
        setUserCredentials({ ...userCredentials, [target.name]: target.value });
    };

    // check weather password is matched
    useEffect(() => {
        userCredentials.password !== userCredentials.confirmPassword
            ? setPasswordMismatchAlert(true)
            : setPasswordMismatchAlert(false);
    }, [userCredentials.confirmPassword]);

    const handleSignupAction = async (event) => {
        event.preventDefault();

        axios
            .post(process.env.REACT_APP_SIGNUP_URI, userCredentials)
            .then((res) => {
                console.log(res);
                history.push("/");
            })
            .catch((err) => console.error(err));
    };

    return (
        <div
            className="container d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}>
            <div>
                <Card
                    className="w-100"
                    style={{ minWidth: "400px", backgroundColor: "mintcream" }}>
                    <Card.Body>
                        <h2 className="text-center mb-4">Sign up</h2>
                        <Form onSubmit={handleSignupAction}>
                            <Form.Group className="mt-3" id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    name="email"
                                    type="email"
                                    placeholder="Please enter email"
                                    onChange={handleInput}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mt-3" id="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    name="username"
                                    type="text"
                                    placeholder="Please enter username"
                                    onChange={handleInput}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mt-3" id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    name="password"
                                    type="password"
                                    placeholder="Please enter password"
                                    onChange={handleInput}
                                    autoComplete="on"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mt-3" id="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Please re-enter password"
                                    onChange={handleInput}
                                    autoComplete="on"
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
                        <Link to="/">Signin</Link>
                    </strong>
                </div>
            </div>
        </div>
    );
}

export default Signup;
