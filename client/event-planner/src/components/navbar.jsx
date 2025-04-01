import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';




export const NavBar = () => {

    const [cookies, setCookies] = useCookies(["access_token"]);
    const nav = useNavigate();

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        nav("/auth");

    }

    return (
    <div className="navbar">

        <Link to="/">Home</Link>
        <Link to="/events">View Events</Link>
        <Link to="/venues">View Venues</Link>
        { !cookies.access_token ?
        <Link to="/auth">Login</Link> 
        : 
        <button onClick={logout}> Logout </button>
        }
        
    </div>
    );
};