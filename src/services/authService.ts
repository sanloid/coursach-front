import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";


interface LoginResponse{
    token : string,
}

interface ApiRequset {
    name : string,
    password : string,
}

interface RegResponse {
  token ?: string,
  response ?: string,
  status ?: number,
  message ?: string,
  name ?: string,
}

export const authAPI = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://coursach-back.vercel.app/auth",
  }),
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, ApiRequset>({
      query: (body) => ({
        url: "login",
        method : "POST",
        body : body,
      }),
    }),
    register : build.mutation<RegResponse, ApiRequset>({
      query : (body) => ({
        url : 'reg',
        method : "POST",
        body : body,
      })
    })
  }),
});
