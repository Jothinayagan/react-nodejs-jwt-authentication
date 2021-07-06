import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginForm from "./components/LoginForm";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import UserDetails from "./components/UserDetails";
import Paragraph from "./components/Paragraph";
import NavBar from "./components/NavBar";

function App() {
    const isAuthenticatedUser = useSelector((state) => state.isAuthenticated);

    return (
        <>
            <NavBar isAuthenticatedUser={isAuthenticatedUser} />
            <Router>
                <Switch>
                    <Route path="/" exact component={LoginForm} />
                    <Route path="/signup" component={Signup} />
                    <ProtectedRoute
                        path="/userDetails"
                        component={UserDetails}
                        isAuthenticatedUser={isAuthenticatedUser}
                    />
                    <ProtectedRoute
                        path="/paragraph"
                        component={Paragraph}
                        isAuthenticatedUser={isAuthenticatedUser}
                    />
                    <Route path="*" component={() => <h1>404 Not found</h1>} />
                </Switch>
            </Router>
        </>
    );
}

export default App;
