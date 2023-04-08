import { createSlice } from "@reduxjs/toolkit";

const notifySlice = createSlice({
  name: "notify",
  initialState: {
    notifications: [],
  },
  reducers: {
    addNotification: (state, actions) => {
      state.notifications = [...state.notifications, actions.payload];
    },
    removeNotification: (state, actions) => {
      state.notifications = state.notifications.filter(
        (noti) => noti.id !== actions.payload
      );
    },
    saveNotifications: (state, actions) => {
      state.notifications = actions.payload;
    },
    markNotification: (state, actions) => {
      state.notifications = state.notifications.map((noti) => {
        if (noti.id === actions.payload) {
          noti.isRead = true;
        }
        return noti;
      });
    },
  },
});

export const {
  markNotification,
  addNotification,
  saveNotifications,
  removeNotification,
} = notifySlice.actions;
export default notifySlice.reducer;
