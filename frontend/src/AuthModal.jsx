import { useState } from 'react';
import axios from 'axios';

function AuthModal({ onClose, onLoginSuccess }) {
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    const url = mode === 'login' ? 'http://127.0.0.1:8000/api/login/' : 'http://127.0.0.1:8000/api/signup/';
    try {
      const res = await axios.post(url, { username, password });
      onLoginSuccess(res.data.token, res.data.username);
      onClose();
    } catch (err) {
      setMessage('Failed: ' + JSON.stringify(err.response?.data || err.message));
    }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2>{mode === 'login' ? 'Welcome back' : 'Create account'}</h2>

        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

        <button className="btn-primary" onClick={handleSubmit}>
          {mode === 'login' ? 'Login' : 'Signup'}
        </button>

        <p className="modal-switch">
          {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setMessage(''); }}>
            {mode === 'login' ? 'Signup' : 'Login'}
          </span>
        </p>

        {message && <p className="modal-error">{message}</p>}
      </div>
    </div>
  );
}

export default AuthModal;