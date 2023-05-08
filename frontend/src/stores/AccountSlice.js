import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    accounts: [],
    selectedAcc: {},
  },
  reducers: {
    addAccount: (state, actions) => {
      state.accounts = [...state.accounts, actions.payload.user];
    },
    saveAccounts: (state, actions) => {
      state.accounts = actions.payload.users;
    },
    saveAccount: (state, actions) => {
      state.accounts = state.accounts.map((acc) => {
        if (acc.id === actions.payload.user.id) {
          acc = actions.payload.user;
        }
        return acc;
      });
    },
    removeAccount: (state, actions) => {
      state.accounts = state.accounts.filter((acc) => acc.id !== actions.payload);
    },
    selectedAccount: (state, actions) => {
      state.selectedAcc = actions.payload.user;
    },
  },
});

export const { addAccount, saveAccounts, removeAccount, selectedAccount, saveAccount } = accountSlice.actions;
export default accountSlice.reducer;
