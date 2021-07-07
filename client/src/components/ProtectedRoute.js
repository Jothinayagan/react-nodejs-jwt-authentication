import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({
    isAuthenticatedUser,
    component: Component,
    ...rest
}) {
    console.log(`isAuthenticated => `, isAuthenticatedUser);
    return (
        <Route
            {...rest}
            render={(props) => {
                if (isAuthenticatedUser) return <Component />;
                else
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: props.location },
                            }}
                        />
                    );
            }}
        />
    );
}

export default ProtectedRoute;
