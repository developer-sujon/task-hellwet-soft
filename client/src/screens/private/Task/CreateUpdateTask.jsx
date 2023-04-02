//External lib imports
import { Row, Col, Container, Button, Card, Form, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

//Internal lib imports
import Layout from '../../../layout/Layout';
import { useTaskCreateMutation, useTaskListQuery, useTaskUpdateMutation } from '../../../redux/services/taskService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateUpdateTask = () => {
  let [objectID, SetObjectID] = useState(null);
  const [details, setDetails] = useState({
    title: '',
    descriptions: '',
    dueDate: '',
    status: '',
  });
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: allTask } = useTaskListQuery();
  const [taskCreate, { isLoading: createLoading, isSuccess: createSuccess }] = useTaskCreateMutation();
  const [TaskUpdate, { isLoading: updateLoading, isSuccess: updateSuccess }] = useTaskUpdateMutation();

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    if (id !== null) {
      SetObjectID(id);
    }

    if (objectID && allTask) {
      setDetails(allTask?.data?.find((item) => item.id === objectID));
    }
  }, [objectID, allTask]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: details,
    resolver: yupResolver(
      yup.object({
        title: yup
          .string()
          .required(t('title is required'))
          .min(3, t('title must be 3 characters long'))
          .max(30, t('title maximum be 30 characters')),
        descriptions: yup.string().required(t('descriptions is required')),
        dueDate: yup.date(),
        status: yup.string().required(t('status is required')),
      })
    ),
  });

  useEffect(() => {
    if (details) {
      reset(details);
    }
  }, [details]);

  /*
   * form handle submit
   */
  const submitForm = ({ title, descriptions, dueDate, status }) => {
    const postBody = {
      title,
      descriptions,
      dueDate,
      status,
    };
    if (!objectID) {
      taskCreate(postBody);
    } else {
      TaskUpdate({ id: objectID, postBody });
    }
  };

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      navigate('/task');
    }
  }, [createSuccess, updateSuccess]);

  return (
    <Layout>
      <Container>
        <Card>
          <Card.Body>
            <Row>
              <h5>{t(`${objectID ? 'Update Task' : 'Save Task'}`)}</h5>
              <hr className="bg-light" />
              <Col>
                <Form onSubmit={handleSubmit(submitForm)} onReset={reset}>
                  <Row class>
                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="title">
                        <Form.Label>{t('title')}</Form.Label>
                        <Controller
                          control={control}
                          name="title"
                          defaultValue=""
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                              onChange={onChange}
                              value={value}
                              ref={ref}
                              isInvalid={errors.title}
                              placeholder={t('title of the task')}
                              type="text"
                              size="sm"
                            />
                          )}
                        />
                        {errors.title && <Form.Text className="text-danger">{errors.title.message}</Form.Text>}
                      </Form.Group>
                    </Col>
                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="dueData">
                        <Form.Label>{t('dueData')}</Form.Label>
                        <Controller
                          control={control}
                          name="dueDate"
                          defaultValue=""
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                              onChange={onChange}
                              value={value}
                              ref={ref}
                              isInvalid={errors.dueDate}
                              placeholder={t('dueData of the task')}
                              type="date"
                              size="sm"
                            />
                          )}
                        />
                        {errors.dueDate && <Form.Text className="text-danger">{errors.dueData.message}</Form.Text>}
                      </Form.Group>
                    </Col>
                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="status">
                        <Form.Label>{t('status')}</Form.Label>
                        <Controller
                          control={control}
                          name="status"
                          defaultValue=""
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Select
                              onChange={onChange}
                              value={value}
                              ref={ref}
                              isInvalid={errors.status}
                              placeholder={t('status of the agent')}
                              type="text"
                              size="sm"
                            >
                              <option value="">{t('choice status')}</option>
                              <option value="new">{t('new')}</option>
                              <option value="pending">{t('pending')}</option>
                              <option value="canceled">{t('canceled')}</option>
                              <option value="complete">{t('complete')}</option>
                            </Form.Select>
                          )}
                        />
                        {errors.status && <Form.Text className="text-danger">{errors.status.message}</Form.Text>}
                      </Form.Group>
                    </Col>
                    <Col sm={12}>
                      <Form.Group className="mb-3" controlId="descriptions">
                        <Form.Label>{t('descriptions')}</Form.Label>
                        <Controller
                          control={control}
                          name="descriptions"
                          defaultValue=""
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                              onChange={onChange}
                              value={value}
                              ref={ref}
                              isInvalid={errors.descriptions}
                              placeholder={t('descriptions of the task')}
                              type="text"
                              size="sm"
                              as={'textarea'}
                            />
                          )}
                        />
                        {errors.descriptions && <Form.Text className="text-danger">{errors.descriptions.message}</Form.Text>}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={4}>
                      <Button size="sm" className="mt-2" type="submit">
                        {createLoading || updateLoading ? <Spinner size="sm" color="light" /> : t('save change')}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
};

export default CreateUpdateTask;
