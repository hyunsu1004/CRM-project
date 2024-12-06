import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ReactDOM from "react-dom";
import dealpage from "./Dealpage";
import Dealpage from "./Dealpage";
ReactDOM.render(<App />, document.getElementById("root"));
function App() {
  return (
    <Router>
      <Routes>
        {/* 로그인 라우터  */}
        {/* <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} /> */}
        {/* 메인 테스트용 라우터 */}
        <Route path="/Dealpage" element={<Dealpage />} />
      </Routes>
    </Router>
  );
}

export default App;
