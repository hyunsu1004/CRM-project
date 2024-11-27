import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import "./styles/global.css"; // 전역 스타일 import
import { createTheme } from "ag-grid-community";
import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";

// 폰트와 색상 등을 정의한 테마 설정
const theme = createTheme({
  typography: {
    fontFamily: "'IBM Plex Sans KR', sans-serif", // 원하는 폰트 패밀리를 설정
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
