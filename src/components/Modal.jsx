import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const {Header, Title, Body, Footer} = Modal;

export default function CustomModal() {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
//   const handleShow = () => setShowModal(true);

  return (
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
  );
}
