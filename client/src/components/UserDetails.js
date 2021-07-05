import React from "react";
import { Button } from "react-bootstrap";
import { withRouter, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { authTrue, authFalse } from "../redux/actions";
import { sendReqToRoute } from "../helpers/authenticateUser";

const styles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "25px",
};

function UserDetails() {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleClick = async (e) => {
        e.preventDefault();

        const result = await sendReqToRoute();
        console.log(`Result from userDetails`, result);

        if (result) {
            dispatch(authTrue());
            history.push("/paragraph");
        } else {
            dispatch(authFalse());
            history.push("/");
        }
        // Send the accessToken and refreshToken in headers along with req
        // get the result from promise either true or false
        // if true, proceed to paragraph component else redirect to login
    };

    return (
        <div style={styles}>
            <h1>User Details</h1>
            <br />
            <br />
            <br />
            <h3>
                If you see this, it means you're authenticated and token is
                valid!
            </h3>
            <br />
            <br />
            <br />
            <br />
            <Button onClick={handleClick}>Click here for paragraph</Button>
        </div>
    );
}

export default withRouter(UserDetails);
