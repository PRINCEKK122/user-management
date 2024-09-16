import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomModal from "./Modal";

const { Label, Control, Group } = Form;
const { Header, Footer, Title, Body } = Modal;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const users = useSelector((state) => state.users);
  const navigate = useNavigate();

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const labelClasses = "fs-4 fw-light";

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      localStorage.setItem(user.id, JSON.stringify(user));
      navigate(`/users`);

    } else {
      handleShow();
    }
  };

  return (
    <div className="w-25 mx-auto vh-100 d-flex flex-column justify-content-center">
      <h2 className="mb-4 display-4">Login to get started</h2>

      <Form onSubmit={handleSubmit}>
        <Group className="mb-3" controlId="username">
          <Label className={labelClasses}>Username</Label>
          <Control
            type="text"
            size="lg"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Group>

        <Group className="mb-3" controlId="password">
          <Label className={labelClasses}>Password</Label>
          <Control
            type="password"
            size="lg"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Group>

        <Group className="d-flex justify-content-end">
          <Button variant="primary" size="lg" type="submit">
            Login
          </Button>
        </Group>
      </Form>
      {/* TODO */}
      {/* <CustomModal /> */} 

      <Modal show={showModal} onHide={handleClose} backdrop="static">
        <Header closeButton>
          <Title>Invalid Credentials</Title>
        </Header>
        <Body>User not found, enter valid credentials!</Body>
        <Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Footer>
      </Modal>
    </div>
  );
}
