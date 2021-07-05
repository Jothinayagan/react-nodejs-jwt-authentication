import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import LandingPage from "./components/LandingPage";
import Signup from "./components/Signup";
import SuccessLoginSignup from "./components/SuccessLoginSignup";
import ProtectedRoute from "./components/ProtectedRoute";
import UserDetails from "./components/UserDetails";
import Paragraph from "./components/Paragraph";

function App() {
    const isAuthenticatedUser = useSelector((state) => state.isAuthenticated);

    return (
        <Router>
            <Switch>
                <Route path="/" exact component={LandingPage} />
                <Route path="/signup" component={Signup} />
                <Route path="/userSuccess" component={SuccessLoginSignup} />
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
    );
}

export default App;
