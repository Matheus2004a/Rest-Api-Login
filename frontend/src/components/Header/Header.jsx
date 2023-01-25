import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

import "./style.scss"

function Header() {
    return (
        <header>
            <Link to="/">Logo</Link>

            <input type="search" name="" className="search" placeholder="Pesquise nossos produtos..." />

            <nav>
                <ul>
                    <li>
                        <Link to="/sign-up">Register</Link>
                    </li>
                    <li>
                        <Link to="/">Login</Link>
                    </li>

                    <span className="notification">
                        <FiShoppingCart size={20} />
                    </span>
                </ul>
            </nav>
        </header>
    )
}

export default Header