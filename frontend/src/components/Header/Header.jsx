import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import BrandCoral from "../../assets/brand.svg"

import "./style.scss"

function Header() {
    return (
        <header>
            <Link to="/">
                <img src={BrandCoral} alt="coral-brand" />
            </Link>

            <input
                type="search"
                className="search"
                placeholder="Pesquise nossos produtos..."
            />

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