import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';

const Login = ({ setUsername, setError }) => {
  const [name, setName] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (name.trim() === '') {
      setError('Username cannot be empty');
      return;
    }

    setUsername(name);
    setError('');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {setError && <Alert variant="danger">{setError}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter your name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
