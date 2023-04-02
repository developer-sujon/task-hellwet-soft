//External Lib Import
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//Internal Lib Import
import { setLogout } from '../slice/authReducer';
import { setLoading } from '../slice/settingReducer';
import ToastMessage from '../../helpers/ToastMessage';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_SERVER_URL,
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const {
      settingReducer: { language },
      authReducer: { accessToken },
    } = getState();

    headers.set('authorization', accessToken ? `Bearer ${accessToken}` : '');
    headers.set('accept-language', language);
    return headers;
  },
});

const basefetchBaseQuery = createApi({
  reducerPath: 'api',
  baseQuery: async (args, api, extraOptions) => {
    const { error, data } = await baseQuery(args, api, extraOptions);

    if (error) {
      api.dispatch(setLoading(false));

      if (error.status === 401) {
        api.dispatch(setLogout());

        ToastMessage.errorMessage(error.data?.message);
      } else if (error.status === 404 || error.status === 400) {
        ToastMessage.errorMessage(error.data?.message);
      } else {
        ToastMessage.errorMessage('Sorry, Something went wrong');
      }
      return { error: { status: error.status, data: error.data } };
    }

    if (data) {
      api.dispatch(setLoading(false));

      if (data?.message) {
        ToastMessage.successMessage(data.message);
        delete data.message;
      }
      return { data };
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({}),
});

export default basefetchBaseQuery;
