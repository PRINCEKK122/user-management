import { Modal, Button } from "react-bootstrap";

const { Header, Title, Body, Footer } = Modal;

export default function CustomModal({ handleClose, options, showModal }) {
  const {title, body} = options;

  return (
    <Modal show={showModal} onHide={handleClose} backdrop="static">
      <Header closeButton>
        <Title>{title}</Title>
      </Header>
      <Body>{body}</Body>
      <Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Footer>
    </Modal>
  );
}
