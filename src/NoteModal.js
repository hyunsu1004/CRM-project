import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
const NoteModal = (note) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(note?.content || "");
  const navigate = useNavigate();
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);
  const handleSave = () => {
    if (!title.trim() && !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
    }
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>노트</h2>
          <Button
            component="label"
            variant="contained"
            startIcon={null} // 기존 startIcon 제거
          >
            <CloudUploadIcon
              style={{
                fontSize: "20px", // 아이콘 크기 조정
              }}
            />
          </Button>
        </div>
        {/* 제목 입력 */}
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

        <div>
          <button>취소</button>
          <button onClick={handleSave} className="save-button">
            저장
          </button>
        </div>
      </div>
    </div>
  );
};
export default NoteModal;
