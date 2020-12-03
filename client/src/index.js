import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "./index.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

const theme = extendTheme({
  fonts: {
    body: "Raleway, Calibri",
    heading: "Raleway, Calibri",
    mono: "Raleway, Calibri",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
