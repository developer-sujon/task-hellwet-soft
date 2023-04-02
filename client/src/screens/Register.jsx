//External lib imports
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useSelector } from 'react-redux';

//Internal lib imports
import { useRegisterMutation } from '../redux/services/authService';
import PublicLayout from '../layout/PublicLayout';

const Register = () => {
  const navigate = useNavigate();
  const [register, { isLoading, isSuccess }] = useRegisterMutation();
  const { t } = useTranslation();
  const { accessToken } = useSelector((state) => state.authReducer);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(
      yup.object({
        name: yup.string().required(t('Name is required')),
        email: yup.string().required(t('email number is required')).email(t('invalid email address')),
        password: yup.string().required(t('Password is required.')).min(8, t('Password must be 8 digits long')),
        confirmPassword: yup
          .string()
          .required(t('Confirm password is required'))
          .oneOf([yup.ref('password'), null], t('Password and confirm password must match')),
      })
    ),
  });

  /*
   * form handle submit
   */
  const submitForm = (values) => {
    const { confirmPassword, ...others } = values;
    register(others);
  };

  useEffect(() => {
    if ((isSuccess, accessToken)) {
      navigate('/login');
    }
  }, [isSuccess, accessToken]);

  return (
    <PublicLayout>
      <div className="auth-wrapper pt-5 mt-5">
        <div className="auth-content">
          <div className="auth-wrapper">
            <div className="auth-content">
              <Row className="justify-content-center">
                <Col xl={8} className="center-screen">
                  <Card className="w-100">
                    <Card.Body>
                      <h5>Sign Up</h5>
                      <br />
                      <Form onSubmit={handleSubmit(submitForm)} onReset={reset}>
                        <Form.Group className="mb-3" controlId="name">
                          <Form.Label>Name</Form.Label>
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
                                placeholder="Name"
                                type="name"
                              />
                            )}
                          />
                          {errors.name && <Form.Text className="text-danger">{errors.name.message}</Form.Text>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                          <Form.Label>Email</Form.Label>
                          <Controller
                            control={control}
                            name="email"
                            defaultValue=""
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                              <Form.Control
                                onChange={onChange}
                                value={value}
                                ref={ref}
                                isInvalid={errors.email}
                                placeholder="Email"
                                type="email"
                              />
                            )}
                          />
                          {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Password">
                          <Form.Label>Password</Form.Label>
                          <Controller
                            control={control}
                            name="password"
                            defaultValue=""
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                              <Form.Control
                                onChange={onChange}
                                value={value}
                                ref={ref}
                                isInvalid={errors.password}
                                placeholder="Password"
                                type="password"
                              />
                            )}
                          />
                          {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="confirmPassword">
                          <Form.Label>Confirm Password</Form.Label>
                          <Controller
                            control={control}
                            name="confirmPassword"
                            defaultValue=""
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                              <Form.Control
                                onChange={onChange}
                                value={value}
                                ref={ref}
                                isInvalid={errors.confirmPassword}
                                placeholder="Confirm Password"
                                type="confirmPassword"
                              />
                            )}
                          />
                          {errors.confirmPassword && (
                            <Form.Text className="text-danger">{errors.confirmPassword.message}</Form.Text>
                          )}
                        </Form.Group>

                        <div className="d-grid">
                          <button className="btn btn-primary btn-block login-btn mt-2" type="submit">
                            {isLoading ? <Spinner size="sm" color="light" /> : t('Sign up')}
                          </button>
                        </div>
                      </Form>
                      <div className="text-center w-100 mt-3">
                        <Link className="text-center" to="/login">
                          Sign In
                        </Link>
                        <br />
                        <Link className="text-center" to="/forgot-password">
                          Forget Password
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Register;
