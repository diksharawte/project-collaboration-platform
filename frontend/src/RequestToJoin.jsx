import { useState } from 'react';
import axios from 'axios';

function RequestToJoin({ token, projectId }) {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleRequest = async () => {
    try {
      await axios.post(
        'http://127.0.0.1:8000/api/requests/',
        { project: projectId, message: message },
        { headers: { Authorization: `Token ${token}` } }
      );
      setStatus('Request sent!');
    } catch (error) {
      setStatus('Failed: ' + JSON.stringify(error.response.data));
    }
  };

  return (
    <div style={{ marginTop: '10px', borderTop: '1px dashed var(--blueprint-cyan)', paddingTop: '10px' }}>
      <input
        type="text"
        placeholder="Why do you want to join?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: '100%', marginBottom: '8px', fontSize: '13px' }}
      />
      <button onClick={handleRequest} style={{ width: '100%', fontSize: '13px' }}>
        Request to join
      </button>
      {status && (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--moss-green)', marginTop: '6px' }}>
          {status}
        </p>
      )}
    </div>
  );
}

export default RequestToJoin;