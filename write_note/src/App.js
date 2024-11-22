import React, { useState } from "react";
import NoteModal from "./NoteModal";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (note) => {
    console.log("저장된 노트:", note);
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>노트 모달 열기</button>
      {isModalOpen && (
        <NoteModal onClose={() => setIsModalOpen(false)} onSave={handleSave} />
      )}
    </div>
  );
};

export default App;
