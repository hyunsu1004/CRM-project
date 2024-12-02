import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import { createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material";
import "./styles/global.css";

let theme = createTheme({
  typography: {
    fontFamily: '"IBM Plex Sans KR", sans-serif',
  },
  palette: {
    primary: {
      main: "#305673",
    },
    secondary: {
      main: "#708A9E",
    },
  }
});

theme = responsiveFontSizes(theme);

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