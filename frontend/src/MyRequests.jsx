import { useState, useEffect } from 'react';
import axios from 'axios';

function MyRequests({ token }) {
  const [requests, setRequests] = useState([]);

  const fetchRequests = () => {
    if (token) {
      axios.get('http://127.0.0.1:8000/api/requests/', {
        headers: { Authorization: `Token ${token}` }
      }).then(res => setRequests(res.data))
        .catch(err => console.error('Fetch failed:', err));
    }
  };

  useEffect(() => { fetchRequests(); }, [token]);

  const handleUpdate = async (requestId, newStatus) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/requests/${requestId}/`,
        { status: newStatus },
        { headers: { Authorization: `Token ${token}` } }
      );
      fetchRequests();
    } catch (err) {
      console.error('Update failed:', err.response?.data || err.message);
      alert('Failed to update: ' + JSON.stringify(err.response?.data || err.message));
    }
  };

  if (!token) return null;

  return (
    <div className="panel">
      <h2>Contribution requests</h2>
      {requests.length === 0 && <p className="empty-note">No requests yet.</p>}
      {requests.map(req => (
        <div key={req.id} className="request-row">
          <div>
            <p className="request-meta"><strong>Project #{req.project}</strong> · User #{req.user}</p>
            <p className="request-message">{req.message}</p>
            <span className={`status-badge ${req.status}`}>{req.status}</span>
          </div>
          {req.status === 'pending' && (
            <div className="btn-row">
              <button className="btn-success btn-xs" onClick={() => handleUpdate(req.id, 'accepted')}>Accept</button>
              <button className="btn-danger btn-xs" onClick={() => handleUpdate(req.id, 'rejected')}>Reject</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyRequests;