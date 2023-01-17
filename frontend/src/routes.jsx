import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function RoutesPath() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignIn />}></Route>
                <Route path="/sign-up" element={<SignUp />}></Route>
            </Routes>
        </Router>
    )
}

export default RoutesPath