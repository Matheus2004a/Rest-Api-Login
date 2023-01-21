import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home/Home";
import PrivateRoutes from "./PrivateRoutes";

function RoutesPath() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignIn />}></Route>
                <Route path="/sign-up" element={<SignUp />}></Route>
                <Route
                    path="/home"
                    element={
                        <PrivateRoutes>
                            <Home />
                        </PrivateRoutes>
                    }>
                </Route>
            </Routes>
        </Router>
    )
}

export default RoutesPath