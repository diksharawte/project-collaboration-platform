import { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/signup/', {
        username: username,
        password: password
      });
      setMessage(`Signup successful! Token: ${response.data.token}`);
    } catch (error) {
      setMessage('Signup failed: ' + JSON.stringify(error.response.data));
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Signup</button>
      <p>{message}</p>
    </div>
  );
}

export default Signup;