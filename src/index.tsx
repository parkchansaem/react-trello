import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { RecoilRoot } from "recoil";
import { darktheme } from "./theme";
import { ThemeProvider } from "styled-components";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={darktheme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
