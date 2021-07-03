import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Signup from "./components/Signup";
import SuccessLoginSignup from "./components/SuccessLoginSignup";
import ProtectedContent from "./components/ProtectedContent";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={LandingPage} />
                <Route path="/signup" component={Signup} />
                <Route path="/userSuccess" component={SuccessLoginSignup} />
                <Route path="/protected" component={ProtectedContent} />
                <Route path="*" component={() => <h1>404 Not found</h1>} />
            </Switch>
        </Router>
    );
}

export default App;
