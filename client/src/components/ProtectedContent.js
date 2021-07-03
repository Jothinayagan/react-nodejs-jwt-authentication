import React from "react";

function ProtectedContent() {
    return (
        <div>
            <h3>If you can see this page means you access token is valid!</h3>
        </div>
    );
}

export default ProtectedContent;
