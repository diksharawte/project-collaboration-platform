import { useState, useEffect } from 'react';
import axios from 'axios';
import Signup from './Signup';
import Login from './Login';

function App() {
  const [projects, setProjects] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    if (token) {
      axios.get('http://127.0.0.1:8000/api/projects/', {
        headers: {
          Authorization: `Token ${token}`
        }
      })
        .then(response => {
          setProjects(response.data);
        })
        .catch(error => {
          console.error('Error fetching projects:', error);
        });
    }
  }, [token]);

  return (
    <div>
      <Signup />
      <Login setToken={setToken} />

      <h1>All Projects</h1>
      {projects.map(project => (
        <div key={project.id} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <p><strong>Category:</strong> {project.category}</p>
          <p><strong>Status:</strong> {project.status}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
