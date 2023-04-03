//External Lib Import
import { createApi } from '@reduxjs/toolkit/query/react';

//External import
import SessionHelper from '../../helpers/SessionHelper';
import { setLogin } from '../slice/authReducer';
import basefetchBaseQuery from './baseQuery';

export const authService = createApi({
  reducerPath: 'auth',
  tagTypes: ['auth'],
  baseQuery: basefetchBaseQuery('auth'),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: '/register',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          /*
           * set token localStorage
           */
          dispatch(setLogin(result.data?.data?.accessToken));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: '/forgotPassword',
        method: 'POST',
        body: data,
      }),
    }),
    verifyEmail: builder.mutation({
      query: ({ email, otp }) => ({
        url: `/verifyEmail?otp=${otp}`,
        method: 'POST',
        body: {
          email,
        },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ password, email, otp }) => ({
        url: `/resetPassword?otp=${otp}`,
        method: 'POST',
        body: {
          password,
          email,
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          SessionHelper.ResetOtp();
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
} = authService;
