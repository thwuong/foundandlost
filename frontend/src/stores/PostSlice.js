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
    removePost: (state, actions) => {
      state.posts = state.posts.filter((post) => post.id !== actions.payload);
      state.totalPost = state.totalPost - 1;
    },
    updatePost: (state, actions) => {
      state.posts = state.posts.map((post) => {
        if (post.id === actions.payload.postId) {
          post.status = actions.payload.status;
        }
        return post;
      });
    },
  },
});

export const {
  savePostList,
  savePostItem,
  addNewPost,
  removePost,
  updatePost,
} = postSlice.actions;
export default postSlice.reducer;
