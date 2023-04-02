//External lib imports
import { Row, Col, Container, Button, Card, Form, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

//Internal lib imports
import Layout from '../../../layout/Layout';
import {
  useCategoryCreateMutation,
  useCategoryListQuery,
  useCategoryUpdateMutation,
} from '../../../redux/services/categoryService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateUpdateCategory = () => {
  let [objectID, SetObjectID] = useState(null);
  const [details, setDetails] = useState({
    name: '',
    color: '#21bf73',
    visibility: true,
  });
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: allCategory } = useCategoryListQuery();
  const [categoryCreate, { isLoading: createLoading, isSuccess: createSuccess }] = useCategoryCreateMutation();
  const [categoryUpdate, { isLoading: updateLoading, isSuccess: updateSuccess }] = useCategoryUpdateMutation();

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    if (id !== null) {
      SetObjectID(id);
    }

    if (objectID && allCategory) {
      setDetails(allCategory.find((item) => item.id === objectID));
    }
  }, [objectID, allCategory]);

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: details,
    resolver: yupResolver(
      yup.object({
        name: yup.string().required(t('name is required')).min(3, t('name must be 3 characters long')),
        color: yup.string().required(t('color is required')),
        visibility: yup.boolean(),
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
  const submitForm = ({ name, visibility, color }) => {
    const postBody = {
      name,
      visibility,
      color,
    };
    if (!objectID) {
      categoryCreate(postBody);
    } else {
      categoryUpdate({ id: objectID, postBody });
    }
  };

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      navigate('/categories');
    }
  }, [createSuccess, updateSuccess]);

  return (
    <Layout>
      <Container>
        <Card>
          <Card.Body>
            <Row>
              <h5>{t(`${objectID ? 'Update Category' : 'Save Category'}`)}</h5>
              <hr className="bg-light" />
              <Col>
                <Form onSubmit={handleSubmit(submitForm)} onReset={reset}>
                  <Row>
                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="name">
                        <Form.Label>{t('name')}</Form.Label>
                        <Controller
                          control={control}
                          name="name"
                          defaultValue=""
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                              onChange={onChange}
                              value={value}
                              ref={ref}
                              isInvalid={errors.name}
                              placeholder={t('name of the Category')}
                              type="text"
                              size="sm"
                            />
                          )}
                        />
                        {errors.name && <Form.Text className="text-danger">{errors.name.message}</Form.Text>}
                      </Form.Group>
                    </Col>
                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="color">
                        <Form.Label>{t('color')}</Form.Label>
                        <Controller
                          control={control}
                          name="color"
                          defaultValue=""
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                              onChange={onChange}
                              value={value}
                              ref={ref}
                              isInvalid={errors.password}
                              type="color"
                              size="sm"
                            />
                          )}
                        />
                        {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
                      </Form.Group>
                    </Col>
                    <Col sm={12}>
                      <Form.Group className="mb-3" controlId="visibility">
                        <Form.Label>{t('visibility')}</Form.Label>
                        <Controller
                          control={control}
                          name="visibility"
                          defaultValue=""
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Check
                              type={'checkbox'}
                              label={t(`the category is ${!value ? 'private' : 'public'}`)}
                              checked={value}
                              {...register('visibility')}
                            />
                          )}
                        />
                        {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
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

export default CreateUpdateCategory;
