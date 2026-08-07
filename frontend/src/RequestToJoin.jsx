import { useState } from 'react';
import axios from 'axios';

function RequestToJoin({ token, projectId }) {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleRequest = async () => {
    if (!message.trim()) return;
    try {
      await axios.post(
        'http://127.0.0.1:8000/api/requests/',
        { project: projectId, message },
        { headers: { Authorization: `Token ${token}` } }
      );
      setStatus('Request sent!');
      setMessage('');
    } catch (err) {
      setStatus('Failed: ' + JSON.stringify(err.response?.data || err.message));
    }
  };

  return (
    <div className="card-divider small-form">
      <input type="text" placeholder="Why do you want to join?" value={message} onChange={e => setMessage(e.target.value)} />
      <button className="btn-gold btn-sm" onClick={handleRequest}>Request to join</button>
      {status && <p className={status.startsWith('Failed') ? 'error-note' : 'success-note'}>{status}</p>}
    </div>
  );
}

export default RequestToJoin;