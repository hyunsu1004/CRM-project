import React, { useState, useEffect } from "react";
import "../styles/NoteModal.css";
import { useNavigate } from "react-router-dom";

const NoteModal = ({ note, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(note?.content || "");
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);
  const navigate = useNavigate();

  // 저장 버튼 클릭 시 호출
  const handleSave = () => {
    const currentDateTime = new Date().toLocaleString(); // 현재 날짜와 시간
    if (title.trim() && content.trim()) {
      onSave({ title, content, date: new Date().toLocaleString() }); // 데이터 전달
      onClose();
    } else {
      alert("제목과 내용을 입력해주세요.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>노트</h2>
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-title"
        />
        <textarea
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="input-content"
        />
        <div className="modal-actions">
          <button
            onClick={() => {
              navigate("/main");
              onClose();
            }}
            className="cancel-button"
          >
            취소
          </button>
          <button onClick={handleSave} className="save-button">
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;