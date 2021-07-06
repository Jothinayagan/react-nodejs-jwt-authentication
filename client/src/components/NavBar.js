import React from "react";
import { Navbar, Button } from "react-bootstrap";

function NavBar({ isAuthenticatedUser }) {
    const isAuth = isAuthenticatedUser;

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
                            <Button variant="outline-light">Logout</Button>
                        </>
                    )}
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default NavBar;
