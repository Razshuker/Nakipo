import {baseUrl, getCookie} from "./CommonConfigurations";
import {fetchBaseQuery} from "@reduxjs/toolkit/query";

const BaseQuery = async (args, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({
        baseUrl,
        credentials: 'include',
        prepareHeaders: (headers) => {
            const token = getCookie("accessToken");
            const userId = getCookie("userId");
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            } if (userId) {
                headers.set('UserId', userId);
            }
            return headers;
        },
    });

    try {
        const result = await baseQuery(args, api, extraOptions);
        console.log(result.meta?.request?.url);
        const authorizationHeader = result?.meta?.response?.headers?.get('authorization');
        if (authorizationHeader) {
            // window.location.href = '/takePhoto';
            return result;
        }

        if (result.error && result.error.status === 401) {
            if(result.meta?.request?.url === (baseUrl+"Auth/login")){
                alert("user not found, Email or password incorrect");
            }
            window.location.href = "/login";
            return result;
        }

        return result;
    } catch (error) {
        console.error('Unexpected error:', error);
        throw error;
    }
};

export default BaseQuery;
