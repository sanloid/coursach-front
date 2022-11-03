import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { IPost } from "../model/IPost";
import { noteAPI } from "../services/noteService";
import { postsSlice } from "../store/reducers/postSclie";
import LogOut from "./LogOut";
import PostForm from "./PostForm";

export default function Posts() {
  const [delPost, delRed] = noteAPI.useDeletePostMutation();
  const { data: posts, isSuccess, refetch } = noteAPI.useFetchAllPostsQuery(localStorage.getItem('name'));

  async function del(postid: number | undefined) {
    let res = await delPost(postid);
    refetch();
  }

  return (
    <div className="container mx-auto">
      <PostForm />
      <div className="p-2">
        <button onClick={refetch} className="hover:bg-red-300 border-2 rounded-xl border-red-100 p-2"> reload </button>
      </div>
      <LogOut/>
      {posts ? (
        posts.map((post) => (
          <div key={post.id} className="border-2 m-2 p-2 rounded-xl p-2 border-red-100">

            <div>
              <h1>{post.title}</h1>
            </div>

            <div className="mb-2">
              <h2>{post.body}</h2>
            </div>

            <div>
              <button onClick={(e) => { del(post.id) }} className="border-2 rounded-xl border-red-100 p-2 hover:bg-red-300"> delete </button>
            </div>

          </div>
        ))
      ) : (
        <div>posts is loading...</div>
      )}
    </div>
  );
}
