import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { noteAPI } from "../services/noteService";
import { authSlice } from "../store/reducers/authSlice";
import { postsSlice } from "../store/reducers/postSclie";

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [addNew, res] = noteAPI.useAddNewPostMutation();

  const addNewPost = async (e: any) => {
    try {
      const pst = { title: title, body: body, author: localStorage.getItem('name') };
      await addNew(pst);
    }
    catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="p-2 flex flex-col">
      <input
        className="border-2 rounded-xl border-red-100 p-2 mb-2 focus:outline-none focus:border-red-500 focus:ring-red-500"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="title..."
      ></input>
      <input
        className="border-2 rounded-xl border-red-100 p-2 mb-2 focus:outline-none focus:border-red-500 focus:ring-red-500"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="body..."
      ></input>
      <div className="flex justify-center">
        <button onClick={addNewPost} className="border-2 rounded-xl border-red-100 p-2 w-32"> add new post </button>
      </div>
    </div>
  );
}
