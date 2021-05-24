import React from "react";
import LoginForm from "./LoginForm";

function LandingPage() {
    return (
        <div
            className="container d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}>
            <LoginForm />
        </div>
    );
}

export default LandingPage;
