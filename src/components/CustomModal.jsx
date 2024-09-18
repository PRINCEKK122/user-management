import { Modal, Button } from "react-bootstrap";

const { Header, Title, Body, Footer } = Modal;

export default function CustomModal({ handleClose, options, showModal }) {
  const { title, body, footerBtns } = options;

  return (
    <Modal show={showModal} onHide={handleClose} backdrop="static">
      <Header closeButton>
        <Title>{title}</Title>
      </Header>
      <Body>{body}</Body>
      <Footer>
        {footerBtns && footerBtns.length > 1 ? (
          footerBtns.map((btn, index) => (
            <Button key={index} variant={btn.variant} onClick={btn.onClick}>
              {btn.label}
            </Button>
          ))
        ) : (
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        )}
      </Footer>
    </Modal>
  );
}
