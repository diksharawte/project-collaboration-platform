import { useState, useEffect } from 'react';
import axios from 'axios';

function TaskList({ token, projectId, refreshTrigger }) {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    if (token) {
      axios.get('http://127.0.0.1:8000/api/tasks/', {
        headers: { Authorization: `Token ${token}` }
      }).then(res => setTasks(res.data.filter(t => t.project === projectId)))
        .catch(() => {});
    }
  };

  useEffect(() => { fetchTasks(); }, [token, refreshTrigger]);

  if (tasks.length === 0) return null;

  return (
    <div style={{ marginTop: '10px' }}>
      {tasks.map(task => (
        <div key={task.id} className="task-row">
          <span>{task.title}</span>
          <span className="task-status">{task.status}</span>
        </div>
      ))}
    </div>
  );
}

export default TaskList;