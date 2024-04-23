import React, { useState, useEffect } from 'react';
import { Button, Form, Alert, Container, Col, Row, Card, Stack } from 'react-bootstrap';
import io from 'socket.io-client';
import './Chat.css';
import circularav from './img/circuaravt.jpg';
import messgeb from './img/rm222-mind-17.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SendIcon from '@mui/icons-material/Send';

let socket;

const ChatRoom = ({ username }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    socket = io('http://localhost:4000');

    socket.emit('join', { username }, (error) => {
      if (error) {
        setError(error);
      }
    });

    socket.on('message', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);

      // Check if the message is from the current user and show toast
      if (message.user === username) {
        toast.success(`You: ${message.text}`);
      }
    });

    socket.on('userList', (userList) => {
      setUsers(userList);
    });

    return () => {
      socket.disconnect();
    };
  }, [username]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (message.trim() !== '') {
      socket.emit('sendMessage', { user: username, text: message }, (error) => {
        if (error) {
          setError(error);
        }
      });
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <ToastContainer /> {/* Toast container */}
      {error && <Alert variant="danger">{error}</Alert>}
      <Container>
        <Row >
          <Col >
            <div className="user-list" style={{ backgroundColor: "rgba(236, 236, 240, 0.9)" }}>
              <h5>Users Online:</h5>
              <ul>
                {users.map((user, index) => (
                  <Card style={{ backgroundColor: "rgba(236, 236, 236, 0.5)" }} key={index}>
                    <Stack gap={4}>
                      <li>
                        <img src={circularav} alt="User Avatar" className="avatar" />
                        {user}
                      </li>
                    </Stack>
                  </Card>
                ))}
              </ul>
            </div>
          </Col>
          <Col>
            <div className="message-list" style={{ backgroundColor: "rgba(236, 236, 240, 0.7)" }}>
              {messages.map((msg, index) => (
                <Card style={{ backgroundColor: "rgba(236, 236, 240, 0.1)" }} key={index}>
                  <div className={`message-item ${msg.user === username ? 'own-message' : ''}`}>
                    <img src={circularav} alt="User Avatar" className="avatar" />
                    <strong>{msg.user}</strong>: {msg.text}
                  </div>
                </Card>
              ))}
            </div>
          </Col>
        </Row>
        
        <Col sm={9}>
          
       
  <Form onSubmit={sendMessage}>
    <Row className="align-items-center"> {/* Added Row */}
      <Col xs={9}> {/* Text field column */}
     
        <Form.Group controlId="formMessage" style={{ width: "100%" }}> {/* Adjusted width to 100% */}
          <Form.Control
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>
       
      </Col>
      <Col xs={3}> {/* Button column */}
        <Button variant="primary" type="submit" className="send-button">
          <SendIcon />
        </Button>
      </Col>
    </Row>
  </Form>
  <br>
  </br>
 
</Col>



      </Container>
      <br>
      
      </br>
    </div>
  );
};

export default ChatRoom;
