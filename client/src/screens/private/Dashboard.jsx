//External lib imports
import React from 'react';

//Internal lib imports
import Layout from '../../layout/Layout';
import { useDashboardSummaryQuery } from '../../redux/services/dashboardService';
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { AiOutlineCalendar, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import StatusChart from '../../components/StatusChart';

const Dashboard = () => {
  const { data, isLoading } = useDashboardSummaryQuery();
  const { t } = useTranslation();

  const dashboardSummary = data?.data || [];

  let content = '';

  if (isLoading) {
    content = (
      <Card>
        <Card.Body>
          <Col sm={4}>
            <Spinner size="lg" variant="primary" />
          </Col>
        </Card.Body>
      </Card>
    );
  } else if (dashboardSummary && dashboardSummary.length > 0) {
    content = (
      <>
        <Card>
          <Card.Body>
            <Col sm={4}>
              <StatusChart dashboardSummary={dashboardSummary} />
            </Col>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    content = (
      <Card>
        <Card.Body>
          <Col sm={4}>
            <StatusChart
              dashboardSummary={[
                {
                  _id: 'complete',
                  count: 0,
                },
                {
                  _id: 'pending',
                  count: 0,
                },
                {
                  _id: 'canceled',
                  count: 0,
                },
                {
                  _id: 'new',
                  count: 0,
                },
              ]}
            />
          </Col>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Layout>
      <Container>
        <Row>{content}</Row>
      </Container>
    </Layout>
  );
};

export default Dashboard;
