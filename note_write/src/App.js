import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteModal from "./NoteModal";
import Main from "./main"; // 메인 컴포넌트

const App = () => {
  // TypeScript 제거
  return (
    <Router>
      <Routes>
        {/* 로그인 라우터  */}
        {/* <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} /> */}
        {/* 메인 테스트용 라우터 */}
        <Route path="/main" element={<Main />} />
        <Route path="/notemodal" element={<NoteModal />} />
      </Routes>
    </Router>
  );
};

export default App;
