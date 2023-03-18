import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    post: {},
    totalPost: null,
  },
  reducers: {
    savePostList: (state, actions) => {
      state.posts = actions.payload.posts.rows;
      state.totalPost = actions.payload.posts.count;
    },
    savePostItem: (state, actions) => {
      state.post = actions.payload.post;
    },
    addNewPost: (state, actions) => {
      state.posts = [...state.posts, actions.payload.newPost];
      state.totalPost = state.totalPost + 1;
    },
  },
});

export const { savePostList, savePostItem, addNewPost } = postSlice.actions;
export default postSlice.reducer;
