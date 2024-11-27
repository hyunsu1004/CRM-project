import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import { createTheme, ThemeProvider } from "@mui/material";
import "./styles/global.css";

const theme = createTheme({
  Typography: {
    fontFamily: '"IBM Plex Sans KR", sans-serif',
  },
  palette: {
    primary: {
      main: "#305673",
    },
    secondary: {
      main: "#708A9E",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
