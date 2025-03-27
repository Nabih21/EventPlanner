import { useState } from 'react';
import '../styles/auth.css';
import Login from '../components/Login';
import UserSignup from '../components/UserSignup';
import AdminSignup from '../components/AdminSignup';

const Auth = () => {
    return (
        <> 
        <div className="auth">
                <h1> Welcome to login </h1>
                <Login />
                <Register /> 

        </div>
        </>
    )
};

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const title = "Login";

    const [cookies, setCookies] = useCookies(["access_token"]);
    const nav = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/auth/login", {
                username, 
                password,
            });
            if ( response.data.message === "InvalidUser")
            {
                alert("Username does not exist");
                return;
            }

            if ( response.data.message === "PasswordBad")
            {
                alert("Username or password Invalid" );
                return;
            }

            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID", response.data.userID) ;
            alert("Login successful")
            nav("/");

        } catch (err) {
            alert("Login failed");
            console.error(err);
        }
    }

    return (
        <Form 
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            title={title}
            onSubmit={onSubmit}
        />
    )
}

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const title = "Register";

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/auth/register", {
            username,
            password,
            });
            alert("Registatrion Completed! Now Login" );

        } catch (err) {
            alert("registration failed");
            console.error(err);
        }
    };

  return (
    <div className="auth-container">
      {renderAuthForm()}
    </div>
  );
};

export default Auth;