import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: {
    requests: [],
  },
  reducers: {
    addRequest: (state, actions) => {
      state.requests = [...state.requests, actions.payload.newRequest];
    },
    updateRequest: (state, actions) => {
      state.requests = state.requests.map((request) => {
        if (request.id === actions.payload.requestId) {
          request.status = actions.payload.status;
        }
        return request;
      });
    },
    saveRequests: (state, actions) => {
      state.requests = actions.payload.requests;
    },
  },
});

export const { saveRequests, addRequest, updateRequest } = requestSlice.actions;
export default requestSlice.reducer;
