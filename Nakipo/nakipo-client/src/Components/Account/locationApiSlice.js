import {createApi} from "@reduxjs/toolkit/query/react";
import BaseQuery from "../../Services/BaseQuery";


export const locationApiSlice = createApi({
    reducerPath:"location",
    baseQuery:BaseQuery,
    endpoints: (builder)=> {
        return {
            getCityLocation: builder.query({
                query: ({ latitude, longitude }) => ({
                    url: `/location?latitude=${latitude}&longitude=${longitude}`,
                    method: 'GET',
                }),
                async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                    try {
                        await queryFulfilled;
                    } catch (err) {
                        console.error("Error:", err);
                    }
                },
            })
        }
    }
})

export const {  useLazyGetCityLocationQuery} = locationApiSlice;
