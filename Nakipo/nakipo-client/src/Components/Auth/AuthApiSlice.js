import { createApi } from "@reduxjs/toolkit/query/react";
import BaseQuery from "../../Services/BaseQuery";
import { deleteCookie, setCookie } from "../../Services/CommonConfigurations";

export const authApiSlice = createApi({
    reducerPath: "authApi",
    tagTypes: ['User'],
    baseQuery: BaseQuery,
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (user) => ({
                url: 'Auth/getUser',
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            }),
            providesTags: [{ type: 'User', id: 'CURRENT' }],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (err) {
                    console.error("Error:", err);
                }
            }
        }),
        getUserWallet: builder.query({
            query: (user) => ({
                url: '/Wallet/getWallet',
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            }),
            providesTags: [{ type: 'Wallet', id: 'CURRENT' }],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (err) {
                    console.error("Error:", err);
                }
            }
        }),

        login: builder.mutation({
            query: (user) => ({
                url: 'Auth/login',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: user,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    setCookie("userId", data.id, 1);
                    setCookie("hasVisited", true, 182);


                    // ✅ manually update cached user
                    dispatch(
                        authApiSlice.util.updateQueryData('getUser', data.id, (draft) => {
                            Object.assign(draft, data);
                        })
                    );

                    if (arg.nav) {
                        arg.nav("/takePhoto");
                    }
                } catch (err) {
                    console.error("Error:", err);
                }
            },
            invalidatesTags: (result) => [{ type: 'User', id: result?.id ?? 'CURRENT' }],
        }),
        updatePassword: builder.mutation({
            query: (passwords) => ({
                url: 'Auth/updateUserPassword',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: passwords,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (err) {
                    console.error("Error:", err);
                }
            }
        }),

  getCupon: builder.mutation({
            query: (walletAmountToGetCupon) => ({
                url: 'Wallet/GetCuponCode?walletAmountToGetCupon='+walletAmountToGetCupon,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    var result = await queryFulfilled;
                    console.log(result);
                    window.location.href= "/share";

                } catch (err) {
                    console.log("error", err);
                }
            },
            invalidatesTags: (result) => [{ type: 'User', id: result?.id ?? 'CURRENT' }],
        }),
        updateUser: builder.mutation({
            query: (user) => ({
                url: 'Auth/UpdateUser',
                method: 'POST',
                body: user,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (err) {
                    console.log("error", err);
                }
            },
            invalidatesTags: (result) => [{ type: 'User', id: result?.id ?? 'CURRENT' }],
        }),

        register: builder.mutation({
            query: (user) => ({
                url: 'Auth/register',
                method: 'POST',
                body: user,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    setCookie("userId", data.id, 1);
                    setCookie("hasVisited", true, 182);


                    // ✅ manually update cached user
                    dispatch(
                        authApiSlice.util.updateQueryData('getUser', data.id, (draft) => {
                            Object.assign(draft, data);
                        })
                    );

                    window.location.href = '/takePhoto';
                } catch (err) {
                    console.error("Error:", err);
                }
            },
            invalidatesTags: (result) => [{ type: 'User', id: result?.id ?? 'CURRENT' }],
        }),

        logout: builder.mutation({
            query: () => ({
                url: 'Auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch }) {
                try {
                    deleteCookie("userId");
                } catch (err) {
                    console.error("Error:", err);
                }
            },
            invalidatesTags: [{ type: 'User', id: 'CURRENT' }],
        }),
    googleLogin: builder.mutation({
        query: ({credential, nav}) => ({
            url: '/Auth/google',
            method: 'POST',
            body: { credential },
        }),
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
            try {
                const { data } = await queryFulfilled;

                setCookie("userId", data.id, 1);
                setCookie("hasVisited", true, 182);

                // ✅ manually update cached user
                dispatch(
                    authApiSlice.util.updateQueryData('getUser', data.id, (draft) => {
                        Object.assign(draft, data);
                    })
                );

                if (arg.nav) {
                    arg.nav("/takePhoto");
                }

            } catch (err) {
                console.error("Error:", err);
            }
        },
        invalidatesTags: (result) => [{ type: 'User', id: result?.id ?? 'CURRENT' }],
    }),
    forgotPassword: builder.mutation({
        query: (email) => ({
            url: 'Auth/forgotPassword',
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: { email },
        }),
    }),
    validateResetToken: builder.mutation({
        query: ({ email, token }) => ({
            url: 'Auth/validateResetToken',
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: { email, token },
        }),
    }),
    resetPassword: builder.mutation({
        query: ({ email, token, newPassword }) => ({
            url: 'Auth/reset-password',
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: { email, token, newPassword },
        }),
    }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useForgotPasswordMutation,
    useValidateResetTokenMutation,
    useResetPasswordMutation,
    useLogoutMutation,
    useGoogleLoginMutation,
    useGetCuponMutation,
    useUpdateUserMutation,
    useUpdatePasswordMutation,
    useGetUserQuery,
    useGetUserWalletQuery
} = authApiSlice;
