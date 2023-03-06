import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { persistor, store } from "./stores/index";
import { PersistGate } from "redux-persist/integration/react";
import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import "./index.css";
import "boxicons";
const { ToastContainer } = createStandaloneToast();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ChakraProvider>
        <App />
        <ToastContainer />
      </ChakraProvider>
    </PersistGate>
  </Provider>
);
