import { useState } from 'react';
import axios from 'axios';

function CreateTask({ token, projectId }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');

  const handleCreate = async () => {
    if (!title.trim()) return;
    try {
      await axios.post(
        'http://127.0.0.1:8000/api/tasks/',
        { project: projectId, title, status: 'todo' },
        { headers: { Authorization: `Token ${token}` } }
      );
      setStatus('Task added!');
      setTitle('');
    } catch (err) {
      setStatus('Failed: ' + JSON.stringify(err.response?.data || err.message));
    }
  };

  return (
    <div className="small-form">
      <input type="text" placeholder="New task title" value={title} onChange={e => setTitle(e.target.value)} />
      <button className="btn-outline btn-sm" onClick={handleCreate}>Add task</button>
      {status && <p className={status.startsWith('Failed') ? 'error-note' : 'success-note'}>{status}</p>}
    </div>
  );
}

export default CreateTask;