import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { parseCookies } from 'nookies';

const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BACKEND_URL,
        mode: 'cors',
        prepareHeaders: (headers) => {
            const cookies = parseCookies();
            const token = cookies?.access_token;
      
            if (token) {
              headers.set('Authorization', `Bearer ${token}`);
            }
      
            return headers;
          },
    }),
    tagTypes: ['Auth'],

    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data)=>({
                url: 'auth/login',
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Auth']
        }),
        loginWithToken: builder.query({
            query: ()=>'auth/login'
        }),
        register: builder.mutation({
            query: (data)=>({
                url: 'auth/',
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Auth']
        }),
        verifyUser: builder.mutation({
            query: (data)=>({
                url: 'auth/verify',
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Auth']
        }),
        forgetPassword: builder.mutation({
            query: (data)=>({
                url: 'auth/reset-password-request',
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Auth'],
        }),
        resetPassword: builder.mutation({
            query: (data)=>({
                url: 'auth/reset-password',
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Auth']
        }),
        resendOTP: builder.mutation({
            query: (data)=>({
                url: 'auth/resend-otp',
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Auth']
        })
    })
});

const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BACKEND_URL + 'product',
        mode: 'cors',
        prepareHeaders: (headers) => {
            const cookies = parseCookies();
            const token = cookies?.access_token;

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        }
    }),
    tagTypes: ["Product"],

    endpoints: (builder) => ({
        fetchProducts: builder.query({
            query: () => '/all',
            providesTags: ["Product"]
        }),
        addProduct: builder.mutation({
            query: (data) => ({
                url: '/',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Product']
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: '/',
                method: 'PUT',
                body: data
            }),
            invalidatesTags: (result, error, { _id }) => [{ type: 'Product', _id }],
        }),
        deleteProduct: builder.mutation<void, { _id: string }>({
            query: (data) => ({
                url: '/',
                method: 'DELETE',
                body: data
            }),
            invalidatesTags: ['Product']
        }),
        productDetails: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: 'Product', id }],
        }),
        unapprovedProducts: builder.query({
            query: (id) => `unapproved`
        })
    })
});

// export default api;
export {api, productApi};
export const {useLoginMutation, useLazyLoginWithTokenQuery, useRegisterMutation, useVerifyUserMutation, useResendOTPMutation, useResetPasswordMutation, useForgetPasswordMutation} = api;

export const {
    useLazyFetchProductsQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useLazyProductDetailsQuery,
    useLazyUnapprovedProductsQuery
} = productApi;
