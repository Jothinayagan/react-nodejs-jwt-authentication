import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Signup from "./components/Signup";
import SuccessLoginSignup from "./components/SuccessLoginSignup";
import ProtectedContent from "./components/ProtectedContent";

function App() {
    return (
        <Router>
            <Route path="/" exact component={LandingPage} />
            <Route path="/signup" component={Signup} />
            <Route path="/userSuccess" component={SuccessLoginSignup} />
            <Route path="/protected" component={ProtectedContent} />
        </Router>
    );
}

export default App;
