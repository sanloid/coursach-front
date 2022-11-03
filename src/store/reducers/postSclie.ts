import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "../../model/IPost";

interface PostsState {
  posts: IPost[];
  maxId: number;
}

const initialState: PostsState = {
  posts: [],
  maxId: 0,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    addAll(state, action) {
      state.posts.push(action.payload.posts);
      state.maxId = action.payload.maxId;
    },
    add(state, action) {
      state.posts.push(action.payload);
      state.maxId += 1;
    },
    del(state, action) {
      state.posts = [...state.posts.filter((a) => a.id !== action.payload)];
    },
  },
});

export default postsSlice.reducer;
