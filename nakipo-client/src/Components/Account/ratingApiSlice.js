import {createApi} from "@reduxjs/toolkit/query/react";
import BaseQuery from "../../Services/BaseQuery";

export const ratingApiSlice = createApi({
    reducerPath:"rating",
    tagTypes: ['Rating'],
    baseQuery:BaseQuery,
    endpoints: (builder)=> {
        return {
            getRating: builder.query({
                query: (user) => ({
                    url: 'rating',
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    }
                }),
                async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                    try {
                        await queryFulfilled;
                    } catch (err) {
                        console.error("Error:", err);
                    }
                },
                invalidatesTags: ['Rating'],
            })
        }
    }
})

        export const {useGetRatingQuery} = ratingApiSlice;
