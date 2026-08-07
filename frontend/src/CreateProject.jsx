import { useState } from 'react';
import axios from 'axios';

function CreateProject({ token, onProjectCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  const handleCreate = async () => {
    if (!title.trim()) return;
    try {
      await axios.post(
        'http://127.0.0.1:8000/api/projects/',
        { title, description, category, status: 'open' },
        { headers: { Authorization: `Token ${token}` } }
      );
      setMessage('Project created!');
      setTitle('');
      setDescription('');
      setCategory('');
      onProjectCreated();
    } catch (err) {
      setMessage('Failed: ' + JSON.stringify(err.response?.data || err.message));
    }
  };

  return (
    <div className="panel">
      <h2>Post a new project</h2>
      <div className="form-row">
        <input type="text" placeholder="Project title" value={title} onChange={e => setTitle(e.target.value)} />
        <input type="text" placeholder="Category (e.g. Web app)" value={category} onChange={e => setCategory(e.target.value)} />
      </div>
      <div className="form-row">
        <textarea
          placeholder="What are you building? What help do you need?"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows="3"
        />
      </div>
      <button className="btn-primary" onClick={handleCreate}>Create project</button>
      {message && <p className={message.startsWith('Failed') ? 'error-note' : 'success-note'}>{message}</p>}
    </div>
  );
}

export default CreateProject;