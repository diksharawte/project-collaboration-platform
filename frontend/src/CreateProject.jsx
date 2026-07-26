import { useState } from 'react';
import axios from 'axios';

function CreateProject({ token, onProjectCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/projects/',
        {
          title: title,
          description: description,
          category: category,
          status: 'open'
        },
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );
      setMessage('Project created successfully!');
      setTitle('');
      setDescription('');
      setCategory('');
      onProjectCreated();
    } catch (error) {
      setMessage('Failed to create project: ' + JSON.stringify(error.response.data));
    }
  };

 if (!token) {
  return <p style={{ color: 'var(--blueprint-cyan)', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>Login to create a project.</p>;
}

  return (
    <div style={{ border: '1px solid blue', padding: '10px', margin: '10px' }}>
      <h2>Create New Project</h2>
      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Category (e.g. Web App)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <br />
      <button onClick={handleCreate}>Create Project</button>
      <p>{message}</p>
    </div>
  );
}

export default CreateProject;