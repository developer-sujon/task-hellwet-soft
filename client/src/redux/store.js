//External import
import { configureStore } from '@reduxjs/toolkit';

//Internal Import
import basefetchBaseQuery from './services/baseQuery';

import settingReducer from './slice/settingReducer';
import authReducer from './slice/authReducer';
import { authService } from './services/authService';

const store = configureStore({
  reducer: {
    authReducer,
    settingReducer,
    [authService.reducerPath]: authService.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(basefetchBaseQuery.middleware),
});

export default store;
