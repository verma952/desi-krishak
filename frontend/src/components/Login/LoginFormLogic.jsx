// src/components/Login/LoginFormLogic.js
import { useState, useContext } from "react";
import axios from "axios";
// 🧐 PATH CHECK: Make sure this path is correct from its new location!
// It might need to be '../../context/AuthContext'
import { AuthContext } from "../context/AuthContext"; 

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function LoginFormLogic({ onLoginSuccess }) {
    const [formStep, setFormStep] = useState('email');
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");

    const { login } = useContext(AuthContext);

    // ✅ FIXED: Included the full helper function
    const clearMessages = () => {
        setTimeout(() => {
            setMessage("");
            setError("");
        }, 4000);
    };

    // ✅ FIXED: Included the full helper function
    const handleSendOtp = async () => {
        setLoading(true);
        setError("");
        setMessage("");
        try {
            await axios.post(`${API_URL}/api/auth/send-otp`, { email });
            setFormStep('otp');
            setMessage("OTP sent to your email. / ओटीपी आपके ईमेल पर भेज दिया गया है।");
        } catch (err) {
            console.error(err);
            setError("Failed to send OTP. Please check the email. / ओटीपी भेजने में विफल।");
        } finally {
            setLoading(false);
            clearMessages();
        }
    };

    const handleVerifyOtp = async () => {
        setLoading(true);
        setError("");
        setMessage("");
        try {
            const res = await axios.post(`${API_URL}/api/auth/verify-otp`, { email, otp });
            const { isNewUser, user, token } = res.data;

            if (isNewUser) {
                setFormStep('details');
                setMessage("Email verified! Please complete your profile.");
            } else {
                login(user, token);
                setMessage("Login successful!");
                onLoginSuccess();
            }
        } catch (err) {
             setError("Invalid OTP. Please try again. / अमान्य ओटीपी।");
        }
        finally { setLoading(false); clearMessages(); }
    };
    
    const handleCompleteRegistration = async () => {
        if (!name || !address || !/^\d{10}$/.test(mobile)) {
            setError("Please fill all fields with a valid 10-digit mobile number.");
            clearMessages();
            return;
        }
        setLoading(true);
        setError("");
        setMessage("");
        try {
            const res = await axios.post(`${API_URL}/api/auth/complete-registration`, { email, name, address, mobile });
            const { user, token } = res.data;
            login(user, token);
            setMessage("Registration successful!");
            onLoginSuccess();
        } catch (err) {
            setError("Registration failed. Please try again. / पंजीकरण विफल।");
        }
        finally { setLoading(false); clearMessages(); }
    };

    // ✅ FIXED: Included the full helper function
    const handleSubmit = (e) => {
        e.preventDefault(); // This is the line that prevents the redirect!
        if (formStep === 'email') handleSendOtp();
        if (formStep === 'otp') handleVerifyOtp();
        if (formStep === 'details') handleCompleteRegistration();
    };
    
    // ✅ FIXED: Included the full helper function
    const getButtonText = () => {
        if (loading) {
            if (formStep === 'email') return 'Sending OTP...';
            if (formStep === 'otp') return 'Verifying...';
            return 'Saving...';
        }
        if (formStep === 'email') return 'Get OTP / ओटीपी प्राप्त करें';
        if (formStep === 'otp') return 'Verify OTP / ओटीपी सत्यापित करें';
        return 'Complete Registration / पंजीकरण पूरा करें';
    };

    return (
        <>
            <h2>{formStep === 'details' ? 'Complete Your Profile' : 'Login / Register'}</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email Address / ईमेल पता</label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={formStep !== 'email' || loading} />
                </div>
                {(formStep === 'otp' || formStep === 'details') && (
                    <div className="form-group">
                        <label htmlFor="otp">Enter OTP / ओटीपी दर्ज करें</label>
                        <input id="otp" type="text" placeholder="6-digit code" value={otp} onChange={(e) => setOtp(e.target.value)} required disabled={formStep === 'details' || loading} />
                    </div>
                )}
                {formStep === 'details' && (
                    <>
                        <div className="form-group">
                            <label htmlFor="name">Full Name / पूरा नाम</label>
                            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required disabled={loading} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address / पता</label>
                            <input id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} required disabled={loading} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobile">Mobile Number / मोबाइल नंबर</label>
                            <input id="mobile" type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} required disabled={loading} />
                        </div>
                    </>
                )}
                 <button type="submit" className="login-btn" disabled={loading}>{getButtonText()}</button>
                 {message && <p className="message success">{message}</p>}
                 {error && <p className="message error">{error}</p>}
            </form>
        </>
    );
}

export default LoginFormLogic;