import React from "react";
import { Navbar, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

import { authTrue, authFalse } from "../redux/actions";

function NavBar({ isAuthenticatedUser }) {
    const dispatch = useDispatch();
    const isAuth = isAuthenticatedUser;

    const handleLogout = (e) => {
        e.preventDefault();

        dispatch(authFalse());
        Cookies.remove("access");
        Cookies.remove("refresh");
    };

    return (
        <>
            <Navbar fixed="top" bg="primary" variant="dark">
                <Navbar.Brand href="#home">JWT Authentication</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    {isAuth && (
                        <>
                            {/* <Navbar.Text>
                                Signed in as: <a href="#login">{isAuth}</a>
                            </Navbar.Text> */}
                            <Button
                                variant="outline-light"
                                onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    )}
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default NavBar;
