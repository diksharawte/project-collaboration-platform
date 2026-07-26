import { useState, useEffect } from 'react';
import axios from 'axios';

function MyRequests({ token }) {
  const [requests, setRequests] = useState([]);

  const fetchRequests = () => {
    if (token) {
      axios.get('http://127.0.0.1:8000/api/requests/', {
        headers: { Authorization: `Token ${token}` }
      }).then(response => setRequests(response.data));
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [token]);

  const handleUpdate = async (requestId, newStatus) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/requests/${requestId}/`,
        { status: newStatus },
        { headers: { Authorization: `Token ${token}` } }
      );
      fetchRequests();
    } catch (error) {
      console.error('Failed to update:', error);
    }
  };

  if (!token) return null;

  const statusColor = (s) => {
    if (s === 'accepted') return 'var(--moss-green)';
    if (s === 'rejected') return 'var(--rust-red)';
    return 'var(--marigold)';
  };

  return (
    <div style={{
      background: 'var(--paper-white)',
      borderRadius: '6px',
      padding: '16px 18px',
      margin: '24px 0'
    }}>
      <h2 style={{ color: 'var(--charcoal)', fontSize: '18px', marginBottom: '12px' }}>
        Contribution requests
      </h2>
      {requests.length === 0 && (
        <p style={{ fontSize: '13px', color: '#777' }}>No requests yet.</p>
      )}
      {requests.map(req => (
        <div key={req.id} style={{
          borderTop: '1px solid #ddd',
          padding: '10px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div>
            <p style={{ fontSize: '13px', margin: 0, color: 'var(--charcoal)' }}>
              Project #{req.project} · User #{req.user}
            </p>
            <p style={{ fontSize: '12px', margin: '2px 0 0', color: '#666' }}>{req.message}</p>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: statusColor(req.status)
            }}>
              {req.status}
            </span>
          </div>
          {req.status === 'pending' && (
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={() => handleUpdate(req.id, 'accepted')} style={{ fontSize: '12px', padding: '6px 10px' }}>
                Accept
              </button>
              <button
                onClick={() => handleUpdate(req.id, 'rejected')}
                style={{ fontSize: '12px', padding: '6px 10px', background: 'var(--rust-red)', color: 'var(--paper-white)' }}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyRequests;