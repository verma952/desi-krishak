import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css';
import { AuthContext } from "./context/AuthContext";
const API_URL = import.meta.env.VITE_API_URL;
function Login() {
    const [email, setEmail] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const sendOtp = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/api/auth/send-otp`, { email });
            setOtpSent(true);
            setMessage("OTP sent to your email");
        } catch (err) {
            console.error(err);
            setMessage("Failed to send OTP");
        }
    };

    const verifyOtp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/api/auth/verify-otp`, { email, otp });
            if (res.data.success) {
                login({ email });
                localStorage.setItem("token", res.data.token);
                setMessage("Login successful!");
                navigate("/profile");
            } else {
                setMessage("Invalid OTP");
            }
        } catch (err) {
            console.error(err);
            setMessage("Verification failed");
        }
    };

    return (
        <div className="login-container">
            <h2>Login to DesiKrishak</h2>
            <form onSubmit={otpSent ? verifyOtp : sendOtp}>
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={otpSent}
                />

                {otpSent && (
                    <>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                        <p>OTP sent to {email}</p>
                    </>
                )}

                <button type="submit">{otpSent ? "Verify OTP" : "Get OTP"}</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
}

export default Login;
