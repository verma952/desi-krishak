// src/components/LoginModal.js
import LoginFormLogic from './LoginFormLogic'; // Import the core logic
import './LoginModal.css';

// The props `isOpen` and `onClose` control the modal's visibility.
// The `onLoginSuccess` is the function to call when the form inside succeeds.
const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* stopPropagation prevents the modal from closing when you click inside it */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* We add a close button for better UX */}
        <button className="modal-close-button" onClick={onClose}>&times;</button>
        
        <LoginFormLogic onLoginSuccess={onLoginSuccess} />
      </div>
    </div>
  );
};

export default LoginModal;