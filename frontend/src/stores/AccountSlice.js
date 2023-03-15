import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    accounts: [],
  },
  reducers: {
    addAccount: (state, actions) => {
      state.accounts = state.accounts.push(actions.payload.newUser);
    },
    getAllAccount: (state, actions) => {
      state.accounts = actions.payload.users;
    },
  },
});

export const { addAccount, getAllAccount } = accountSlice.actions;
export default accountSlice.reducer;
