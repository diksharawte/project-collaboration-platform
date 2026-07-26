import { useState, useEffect } from 'react';
import axios from 'axios';
import Signup from './Signup';
import Login from './Login';
import CreateProject from './CreateProject';
import RequestToJoin from './RequestToJoin';
import MyRequests from './MyRequests';

function App() {
  const [projects, setProjects] = useState([]);
  const [token, setToken] = useState('');

  const fetchProjects = () => {
    if (token) {
      axios.get('http://127.0.0.1:8000/api/projects/', {
        headers: { Authorization: `Token ${token}` }
      })
        .then(response => setProjects(response.data))
        .catch(error => console.error('Error fetching projects:', error));
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [token]);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 20px' }}>

      <header style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', letterSpacing: '-0.5px' }}>Blueprint</h1>
        <p style={{ color: 'var(--blueprint-cyan)', fontFamily: 'var(--font-mono)', fontSize: '13px', marginTop: '4px' }}>
          post an idea. find your team. track the build.
        </p>
      </header>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
        <Signup />
        <Login setToken={setToken} />
      </div>

      <CreateProject token={token} onProjectCreated={fetchProjects} />
      <MyRequests token={token} />

      <h2 style={{ margin: '32px 0 16px', fontSize: '20px' }}>All projects</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px'
      }}>
        {projects.map((project, i) => (
          <div key={project.id} style={{
            background: 'var(--paper-white)',
            borderRadius: '4px',
            padding: '16px 18px',
            position: 'relative',
            transform: `rotate(${i % 2 === 0 ? '-1deg' : '1deg'})`,
            boxShadow: '0 4px 10px rgba(0,0,0,0.25)'
          }}>
            <div style={{
              position: 'absolute',
              top: '-8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: 'var(--rust-red)',
              boxShadow: '0 2px 3px rgba(0,0,0,0.3)'
            }} />
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--blueprint-cyan)',
              margin: '0 0 6px',
              filter: 'brightness(0.7)'
            }}>project</p>
            <h3 style={{ color: 'var(--charcoal)', fontSize: '17px', marginBottom: '6px' }}>{project.title}</h3>
            <p style={{ fontSize: '13px', color: '#555', margin: '0 0 8px' }}>{project.description}</p>
            <p style={{ fontSize: '12px', color: 'var(--moss-green)', margin: '0 0 10px', fontFamily: 'var(--font-mono)' }}>
              {project.category} · {project.status}
            </p>
            <RequestToJoin token={token} projectId={project.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
