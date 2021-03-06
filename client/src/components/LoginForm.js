import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { authTrue, authFalse } from "../redux/actions";
import { userLoginRequest } from "../helpers/authenticateUser";

const initialState = {
    email: "",
    password: "",
};

function LoginForm() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [loginCredentials, setLoginCredentials] = useState(initialState);

    const handleInput = ({ target }) => {
        setLoginCredentials({
            ...loginCredentials,
            [target.name]: target.value,
        });
    };

    const handleLoginAction = async (event) => {
        event.preventDefault();

        const result = await userLoginRequest(loginCredentials);
        console.log(`Result from loginForm`, result);

        if (result) {
            dispatch(authTrue());
            history.push("/userDetails");
        } else {
            dispatch(authFalse());
            history.push("/");
        }
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
                        <h2 className="text-center mb-4">Login</h2>
                        <Form onSubmit={handleLoginAction}>
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
                            <Form.Group className="mt-3" id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    name="password"
                                    type="password"
                                    placeholder="Please enter password"
                                    autoComplete="false"
                                    onChange={handleInput}
                                    required
                                />
                            </Form.Group>
                            <Button className="w-100 mt-3" type="submit">
                                Login
                            </Button>
                        </Form>
                        <div className="w-100 text-center mt-3">
                            Forgot Password?
                        </div>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Need an account?{" "}
                    <strong>
                        <Link to="/signup">Signup</Link>
                    </strong>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
