import { Link } from "react-router-dom";
import "../style/App.css";

function Header(){

    return(
        <>
            <header>
                <nav>
                    <ul>
                        <Link to="/overview">Home</Link>
                        <Link to="/register">Register</Link>
                        <Link to="/login">Login</Link>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Header;