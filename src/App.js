import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router"

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Router />
    </BrowserRouter>
  );
}

export default App;