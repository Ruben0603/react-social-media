import { Link } from "react-router-dom";
import "../style/App.css";

function Header(){

    return(
        <>
            <header>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Header;