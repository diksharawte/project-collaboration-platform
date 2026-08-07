import { useState, useEffect } from 'react';
import axios from 'axios';

function MySentRequests({ token }) {
  const [requests, setRequests] = useState([]);

  const fetchSentRequests = () => {
    if (token) {
      axios.get('http://127.0.0.1:8000/api/my-sent-requests/', {
        headers: { Authorization: `Token ${token}` }
      }).then(res => setRequests(res.data))
        .catch(err => console.error('Fetch failed:', err));
    }
  };

  useEffect(() => { fetchSentRequests(); }, [token]);

  if (!token) return null;

  return (
    <div className="panel">
      <h2>My sent requests</h2>
      {requests.length === 0 && <p className="empty-note">You haven't requested to join any project yet.</p>}
      {requests.map(req => (
        <div key={req.id} className="request-row">
          <div>
            <p className="request-meta"><strong>Project #{req.project}</strong></p>
            <p className="request-message">{req.message}</p>
            <span className={`status-badge ${req.status}`}>{req.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MySentRequests;