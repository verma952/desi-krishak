import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css';
import { AuthContext } from "./context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

function Login() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false); // ✅ For user feedback
    const [message, setMessage] = useState("");
    const [error, setError] = useState(""); // ✅ For specific error messages
    
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    // Clears messages after a few seconds
    const clearMessages = () => {
        setTimeout(() => {
            setMessage("");
            setError("");
        }, 4000);
    };

    const sendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        try {
            await axios.post(`${API_URL}/api/auth/send-otp`, { email });
            setOtpSent(true);
            setMessage("OTP sent successfully to your email. / ओटीपी आपके ईमेल पर सफलतापूर्वक भेज दिया गया है।");
        } catch (err)
        {
            console.error(err);
            setError("Failed to send OTP. Please check the email and try again. / ओटीपी भेजने में विफल। कृपया ईमेल जांचें और पुनः प्रयास करें।");
        } finally {
            setLoading(false);
            clearMessages();
        }
    };

    const verifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        try {
            const res = await axios.post(`${API_URL}/api/auth/verify-otp`, { email, otp });
            
            // ✅ FIXED: Use the correct login function from AuthContext
            // The backend should return the full user object and the token
            const { user, token } = res.data;
            login(user, token); // This now handles setting state and localStorage

            setMessage("Login successful! Redirecting... / लॉग इन सफल! रीडायरेक्ट किया जा रहा है...");
            
            // Redirect to profile page after a short delay
            setTimeout(() => {
                navigate("/profile");
            }, 1500);

        } catch (err) {
            console.error(err);
            setError("Invalid OTP or verification failed. Please try again. / अमान्य ओटीपी या सत्यापन विफल। कृपया पुनः प्रयास करें।");
            setLoading(false);
            clearMessages();
        }
    };

    return (
        <div className="login-page-wrapper">
            <div className="login-container">
                <h2>Login to DesiKrishak / देसी कृषक में लॉगिन करें</h2>
                
                <form onSubmit={otpSent ? verifyOtp : sendOtp} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email Address / ईमेल पता</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="your-email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={otpSent || loading}
                        />
                    </div>

                    {otpSent && (
                        <div className="form-group">
                             <label htmlFor="otp">Enter OTP / ओटीपी दर्ज करें</label>
                            <input
                                id="otp"
                                type="text"
                                placeholder="6-digit code"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                    )}

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading 
                            ? (otpSent ? 'Verifying... / सत्यापन हो रहा है...' : 'Sending OTP... / ओटीपी भेजा जा रहा है...')
                            : (otpSent ? 'Verify OTP / ओटीपी सत्यापित करें' : 'Get OTP / ओटीपी प्राप्त करें')
                        }
                    </button>
                    
                    {message && <p className="message success">{message}</p>}
                    {error && <p className="message error">{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default Login;
