// src/pages/Login.js
import { useNavigate } from "react-router-dom";
import LoginFormLogic from './LoginFormLogic'; // Import the core logic
import './Login.css';

function Login() {
    const navigate = useNavigate();

    // This is what happens after the form logic component succeeds.
    const handleLoginSuccess = () => {
        // We add a small delay so the user can see the "Success!" message.
        setTimeout(() => {
            navigate("/profile");
        }, 1000); 
    };

    return (
        <div className="login-page-wrapper">
            <div className="login-container">
                <LoginFormLogic onLoginSuccess={handleLoginSuccess} />
            </div>
        </div>
    );
}

export default Login;