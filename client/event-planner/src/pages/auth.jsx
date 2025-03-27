import {useState} from "react"
import axios from 'axios'
import {useCookies} from 'react-cookie'
import { useNavigate } from "react-router-dom";

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

const Form = ({ username, setUsername, password, setPassword, title, onSubmit}) => {

    return (
        <div className="authContainer">
            <form onSubmit={onSubmit}> 
                <h2> 
                    {title}
                </h2>
                <div className="form-group" >
                    <label htmlFor="username"> Username: </label>
                    <input 
                    type="text" 
                    id="username" 
                    value={username}
                    onChange={(event) => setUsername(event.target.value)  } />
                </div>
                <div className="form-group" >
                    <label htmlFor="password"> Password: </label>
                    <input 
                    type="password" 
                    id="password" 
                    value={password}
                    onChange={(event => setPassword(event.target.value)) } />
                </div>

                <button type="submit"> {title} </button>

            </form>
        </div>
    );
}

export default Auth;