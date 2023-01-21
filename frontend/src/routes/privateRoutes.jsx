import { Navigate } from "react-router-dom";

function PrivateRoutes({ children }) {
    const userIsLogged = localStorage.getItem("token")
    return userIsLogged ? children : <Navigate to="/" />
}

export default PrivateRoutes