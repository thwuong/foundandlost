import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    commentList: [],
    parentComment: null,
  },
  reducers: {
    addComment: (state, actions) => {
      state.commentList = [...state.commentList, actions.payload.newComment];
    },
    saveComments: (state, actions) => {
      state.commentList = actions.payload.comments;
    },
    updateComment: (state, actions) => {
      state.commentList = state.commentList.map((comment) => {
        if (comment.id === actions.payload.commentId) {
          comment.content = actions.payload.content;
        }
        return comment;
      });
    },
    removeComment: (state, actions) => {
      state.commentList = state.commentList.filter(
        (comment) => comment.id !== actions.payload
      );
    },
    saveParentComment: (state, actions) => {
      state.parentComment = actions.payload;
    },
  },
});

export const {
  addComment,
  saveComments,
  removeComment,
  updateComment,
  saveParentComment,
} = commentSlice.actions;
export default commentSlice.reducer;
