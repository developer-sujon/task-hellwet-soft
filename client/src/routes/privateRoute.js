//External Lib Import
import { lazy, Suspense } from 'react';

//Internal Lib Import
import LazyLoader from '../components/LazyLoader';

const Dashboard = lazy(() => import('../screens/private/Dashboard'));
const Task = lazy(() => import('../screens/private/Task/Task'));

const CreateUpdateTask = lazy(() => import('../screens/private/Task/CreateUpdateTask'));

const LazyLoading = ({ children }) => {
  return <Suspense fallback={<LazyLoader />}>{children}</Suspense>;
};

const privateRoutes = [
  {
    path: '/',
    element: (
      <LazyLoading>
        <Dashboard />
      </LazyLoading>
    ),
    roles: ['user', 'admin'],
    accessPermission: null,
  },
  {
    path: '/task',
    element: (
      <LazyLoading>
        <Task />
      </LazyLoading>
    ),
    roles: ['user', 'admin'],
    accessPermission: null,
  },
  {
    path: '/task-create-update',
    element: (
      <LazyLoading>
        <CreateUpdateTask />
      </LazyLoading>
    ),
    roles: ['user', 'admin'],
    accessPermission: null,
  },
];

export default privateRoutes;
