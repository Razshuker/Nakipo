import {createApi} from "@reduxjs/toolkit/query/react";
import BaseQuery from "../../Services/BaseQuery";

export const brandApiSlice = createApi({
    reducerPath:"brands",
    tagTypes: ['Brands'],
    baseQuery:BaseQuery,
    endpoints: (builder)=> {
        return {
            getBrands: builder.query({
                query: () => ({
                    url: '/Brand/getBrands',
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
                invalidatesTags: ['Brands'],
            })
        }
    }
})

export const {useGetBrandsQuery} = brandApiSlice;
