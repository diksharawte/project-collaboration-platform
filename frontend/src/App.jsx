import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import AuthModal from './AuthModal';
import CreateProject from './CreateProject';
import RequestToJoin from './RequestToJoin';
import MyRequests from './MyRequests';
import CreateTask from './CreateTask';
import TaskList from './TaskList';
import MySentRequests from './MySentRequests';
import heroImage from "./assets/home.jpg";

function App() {
  const [projects, setProjects] = useState([]);
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [activeTab, setActiveTab] = useState('Projects');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [projectRefresh, setProjectRefresh] = useState(0);

  const fetchProjects = () => {
    if (token) {
      axios.get('http://127.0.0.1:8000/api/projects/', {
        headers: { Authorization: `Token ${token}` }
      }).then(res => setProjects(res.data)).catch(() => {});
    }
  };

  useEffect(() => { fetchProjects(); }, [token]);

  const handleLoginSuccess = (newToken, newUsername) => {
    setToken(newToken);
    setUsername(newUsername);
  };

  const handleLogout = () => {
    setToken('');
    setUsername('');
    setProjects([]);
    setActiveTab('Projects');
  };

  const triggerRefresh = () => setProjectRefresh(prev => prev + 1);

  const steps = [
    { step: '01', title: 'Post an idea', desc: "Share what you're building and what skills you need." },
    { step: '02', title: 'Find your team', desc: 'People request to join based on their skills.' },
    { step: '03', title: 'Track the build', desc: 'Assign tasks and track every contribution.' }
  ];

  return (
    <>
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        token={token}
        username={username}
        onLoginClick={() => setShowAuthModal(true)}
        onLogout={handleLogout}
      />

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} onLoginSuccess={handleLoginSuccess} />
      )}

      {!token && (
  <>
    <div className="hero">
      <div className="hero-content">
        <h2>Find the right people for your next big idea</h2>
        <p>Post your project, connect with contributors, and track every contribution — like GitHub for finding teammates.</p>
        <button className="btn-primary" onClick={() => setShowAuthModal(true)}>Get started</button>
      </div>
      <img src={heroImage} alt="Team collaboration" className="hero-image" />
    </div>

    <div className="steps-grid">
      <div className="step-card"  onClick={() => setShowAuthModal(true)}>
        <i className="ti ti-bulb step-icon"></i>
        <h3>Post an idea</h3>
        <p>Share what you're building and what skills you need.</p>
      </div>
      <div className="step-card"  onClick={() => setShowAuthModal(true)}>
        <i className="ti ti-users step-icon"></i>
        <h3>Find your team</h3>
        <p>People request to join based on their skills.</p>
      </div>
      <div className="step-card"  onClick={() => setShowAuthModal(true)}>
        <i className="ti ti-checklist step-icon"></i>
        <h3>Track the build</h3>
        <p>Assign tasks and track every contribution.</p>
      </div>
    </div>
  </>
)}
      {token && activeTab === 'Projects' && (
        <>
          <CreateProject token={token} onProjectCreated={() => { fetchProjects(); triggerRefresh(); }} />

          <div className="section-title">
            All projects
            <span className="count-badge">{projects.length}</span>
          </div>

          <div className="project-grid">
            {projects.map(project => (
              <div key={project.id} className="project-card">
                <div className="pin" />
                <p className="project-label">project</p>
                <h3>{project.title}</h3>
                <p className="desc">{project.description}</p>
                <div>
                  <span className="project-meta">{project.category} · {project.status}</span>
                </div>
                <RequestToJoin token={token} projectId={project.id} />
                <TaskList token={token} projectId={project.id} refreshTrigger={projectRefresh} />
                <CreateTask token={token} projectId={project.id} />
              </div>
            ))}
          </div>

          {projects.length === 0 && (
            <p className="empty-note" style={{ padding: '32px 0' }}>No projects yet. Create your first one above!</p>
          )}
        </>
      )}

      {token && activeTab === 'My Requests' && <MyRequests token={token} />}
      {token && activeTab === 'Sent Requests' && (
        <MySentRequests token={token} />
        )}
    </>
  );
}

export default App;