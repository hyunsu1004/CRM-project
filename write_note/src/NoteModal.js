import React, { useState } from "react";
import "./NoteModal.css";

const NoteModal = ({ onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    onSave({ title, content });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>노트 작성</h2>
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
          <button onClick={onClose} className="cancel-button">
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
