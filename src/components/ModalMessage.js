import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export function ModalMessage(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter text-center">
          Message
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-center">
          <b>{props.message}</b>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
