import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import AuthSlice from "./AuthSlice";
import UserSlice from "./UserSlice";
import AccountSlice from "./AccountSlice";
import CategorySlice from "./CategorySlice";
import PostSlice from "./PostSlice";
import RequestSlice from "./RequestSlice";
import CommentSlice from "./CommentSlice";
import ConversationSlice from "./ConversationSlice";
import MessageSlice from "./MessageSlice";
import SocketSlice from "./SocketSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};
const rootReducer = combineReducers({
  auth: AuthSlice,
  user: UserSlice,
  account: AccountSlice,
  category: CategorySlice,
  post: PostSlice,
  request: RequestSlice,
  comment: CommentSlice,
  conversation: ConversationSlice,
  message: MessageSlice,
  instanceSocket: SocketSlice,
  // slice
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
export const persistor = persistStore(store);
