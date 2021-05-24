import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
};

function Signup() {
    const [userCredentials, setUserCredentials] = useState(initialState);

    const handleInput = ({ target }) => {
        setUserCredentials({ ...userCredentials, [target.name]: target.value });
    };

    return (
        <div className="container">
            <div
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}>
                <Card className="w-100" style={{ minWidth: "400px" }}>
                    <Card.Body>
                        <h2 className="text-center mb-4">Sign up</h2>
                        <Form>
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
