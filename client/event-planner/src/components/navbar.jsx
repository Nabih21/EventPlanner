import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';




export const NavBar = () => {

    const css = `
    .navbar {
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-color: #f8f8f8;
      padding: 1rem;
      border-bottom: 1px solid #ccc;
    }
    .navbar a {
      color: #333;
      text-decoration: none;
      font-weight: bold;
      margin: 0 1rem;
    }
    .navbar a:hover {
      color: #555;
    }
  `;

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
        <style dangerouslySetInnerHTML={{ __html: css }} />
    </div>
    );
};