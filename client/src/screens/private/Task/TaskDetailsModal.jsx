//External lib imports
import { Modal, Button, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const TaskDetailsModal = ({ show, handleClose, singleTask }) => {
  const { t } = useTranslation();
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{singleTask.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{singleTask.descriptions} </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskDetailsModal;
