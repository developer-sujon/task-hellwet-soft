//External lib imports
import { useState } from 'react';
import { Row, Col, Container, Button, Card, ListGroup, Badge, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AiOutlineEdit, AiOutlineFolderView } from 'react-icons/ai';

//Internal lib imports
import Layout from '../../../layout/Layout';
import { useTaskDeleteMutation, useTaskListQuery } from '../../../redux/services/taskService';
import Table from '../../../components/Table/Table';
import { BsTrash } from 'react-icons/bs';
import AleartMessage from '../../../helpers/AleartMessage';
import { Link } from 'react-router-dom';
import DateFormatter from '../../../utils/DateFormatter';
import TaskDetailsModal from './TaskDetailsModal';

const Task = () => {
  const [singleTask, setSingleTask] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setSingleTask({});
  };
  const handleShow = (d) => {
    setShow(true);
    setSingleTask(d);
  };

  const { t } = useTranslation();
  const { data: tasks, isLoading } = useTaskListQuery();
  const [taskDelete] = useTaskDeleteMutation();
  const data = tasks?.data || [];

  const deleteItem = (id) => {
    AleartMessage.Delete(id, taskDelete);
  };

  const columns = [
    {
      Header: '#',
      accessor: (_, index) => index + 1,
      sort: true,
    },
    {
      Header: t('title'),
      accessor: (d) => <span className="ms-1"> {d.title}</span>,
      sort: true,
    },
    {
      Header: t('status'),
      accessor: (d) => (
        <div className="bodySmall">
          {d?.status === 'new' ? (
            <Badge bg="info" pill>
              <span className="ms-1">{t(d?.status)}</span>
            </Badge>
          ) : d?.status === 'pending' ? (
            <Badge bg="primary" pill>
              <span className="ms-1">{t(d?.status)}</span>
            </Badge>
          ) : d?.status === 'canceled' ? (
            <Badge bg="danger" pill>
              <span className="ms-1">{t(d?.status)}</span>
            </Badge>
          ) : d?.status === 'complete' ? (
            <Badge bg="success" pill>
              <span className="ms-1">{t(d?.status)}</span>
            </Badge>
          ) : (
            ''
          )}
        </div>
      ),
      sort: true,
    },
    {
      Header: t('due date'),
      accessor: (d) => DateFormatter(d?.dueDate),
      sort: true,
    },
    {
      Header: t('create date'),
      accessor: (d) => DateFormatter(d?.createdAt),
      sort: true,
    },
    {
      Header: t('action'),
      accessor: (d) => (
        <div className="bodySmall">
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">View</Tooltip>}
          >
            <Button variant="primary" style={{ padding: '5px 10px' }} className="me-1" onClick={() => handleShow(d)}>
              <AiOutlineFolderView />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">Edit</Tooltip>}
          >
            <Link to={`/task-create-update?id=${d?.id}`}>
              <Button variant="primary" style={{ padding: '5px 10px' }} className="me-1">
                <AiOutlineEdit />
              </Button>
            </Link>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">Delete</Tooltip>}
          >
            <Button variant="danger" style={{ padding: '5px 10px' }} onClick={() => deleteItem(d.id)}>
              <BsTrash />
            </Button>
          </OverlayTrigger>
        </div>
      ),
    },
  ];

  const sizePerPageList = [
    {
      text: '5',
      value: 5,
    },
    {
      text: '10',
      value: 10,
    },
    {
      text: '25',
      value: 25,
    },
    {
      text: 'All',
      value: data?.length,
    },
  ];

  return (
    <Layout>
      <Container>
        <Card>
          <Card.Body>
            <Row>
              <Col className="d-flex justify-content-between p-2" sm={12}>
                <h5>{t('taks')}</h5>
                <Link to={'/task-create-update'}>
                  <Button size="sm" variant="primary">
                    {t('create Task')}
                  </Button>
                </Link>
              </Col>
              <Col sm={12}>
                {isLoading ? (
                  <Spinner size="lg" variant="primary" />
                ) : data?.length ? (
                  <Table
                    columns={columns}
                    data={data}
                    pageSize={5}
                    sizePerPageList={sizePerPageList}
                    isSortable={true}
                    pagination={true}
                  />
                ) : (
                  t('no data found')
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <TaskDetailsModal show={show} handleClose={handleClose} singleTask={singleTask} />
      </Container>
    </Layout>
  );
};

export default Task;
