import {createApi} from "@reduxjs/toolkit/query/react";
import BaseQuery from "../Services/BaseQuery";


export const photoApiSlice = createApi({
    reducerPath:"photo",
    baseQuery:BaseQuery,
    endpoints: (builder)=>{
        return{
            uploadPhoto:builder.mutation({
                query:(photoData)=>({
                    url:'Image/upload',
                    method:'POST',
                    body:photoData,
                }),
                async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                    try {
                        await queryFulfilled;
                        window.location.href = "/mission-done";
                    } catch (err) {
                        console.error("Error:", err);
                    }
                }
            }),
        }
    }
})

export const {useUploadPhotoMutation} = photoApiSlice;