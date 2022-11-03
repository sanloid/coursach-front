import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPost } from "../model/IPost";

export const noteAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "https://coursach-back.vercel.app/note",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
 }),
  tagTypes: ["Post"],
  endpoints: (build) => ({
    fetchAllPosts: build.query<IPost[], string | null>({
      query: (name) => ({
        url: "all/" +name,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    addNewPost: build.mutation<void, IPost>({
      query: (body) => ({
        url: "add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: build.mutation<void, number | undefined>({
      query: (id) => ({
        url: "del",
        method: "DELETE",
        body: { id: id },
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});
