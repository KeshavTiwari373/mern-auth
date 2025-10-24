import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  font-family: "Arial", sans-serif;
`;

const Card = styled.div`
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 350px;
  text-align: center;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 30px;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 5px 10px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  flex: 1;
  padding: 10px;
  font-size: 14px;
`;

const Icon = styled.div`
  color: #666;
  margin-right: 10px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  background: #2575fc;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #6a11cb;
    transform: translateY(-2px);
  }
`;

const Message = styled.p`
  margin-top: 15px;
  color: #ff5722;
  font-weight: bold;
  min-height: 20px;
`;

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:5001/api/auth/register", {
        name,
        email,
        password,
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", {
        email,
        password,
      });
      setToken(res.data.token);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  const handleProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  return (
    <Container>
      <Card>
        <Title>MERN Auth 🚀</Title>

        <InputGroup>
          <Icon>
            <FaUser />
          </Icon>
          <Input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        </InputGroup>

        <InputGroup>
          <Icon>
            <FaEnvelope />
          </Icon>
          <Input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <Icon>
            <FaLock />
          </Icon>
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>

        <Button onClick={handleRegister}>Sign Up</Button>
        <Button onClick={handleLogin}>Login</Button>
        <Button onClick={handleProfile}>Get Profile</Button>

        <Message>{message}</Message>
      </Card>
    </Container>
  );
}

export default App;
