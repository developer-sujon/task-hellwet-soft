//External import
import { configureStore } from '@reduxjs/toolkit';

//Internal Import
import settingReducer from './slice/settingReducer';
import authReducer from './slice/authReducer';
import { authService } from './services/authService';
import { taskService } from './services/taskService';
import { profileService } from './services/profileService';
import { dashboardService } from './services/dashboardService';

const store = configureStore({
  reducer: {
    authReducer,
    settingReducer,
    [authService.reducerPath]: authService.reducer,
    [taskService.reducerPath]: taskService.reducer,
    [profileService.reducerPath]: profileService.reducer,
    [dashboardService.reducerPath]: dashboardService.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authService.middleware,
      taskService.middleware,
      profileService.middleware,
      dashboardService.middleware,
    ]),
});

export default store;
