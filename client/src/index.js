import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

import App from "./App";

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
      <Router>
        <App />
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
