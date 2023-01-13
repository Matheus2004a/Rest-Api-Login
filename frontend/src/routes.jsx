import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";

function RoutesPath() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/sign-up" element={<SignUp />}></Route>
            </Routes>
        </Router>
    )
}

export default RoutesPath