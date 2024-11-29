import logo from "./logo.svg";
import "./App.css";
import SignupPage from "./signup_page";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <routes>
      <Route path="/" element={<SignupPage />} />;
    </routes>
  );
}

export default App;
