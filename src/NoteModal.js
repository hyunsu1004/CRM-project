import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const NoteModal = ({ note, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(note?.content || "");
  const [uploadedFiles, setUploadedFiles] = useState([]); // 파일 목록 상태 추가
  const navigate = useNavigate();
  const [previewFile, setPreviewFile] = useState(null);
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setUploadedFiles(note.files || []);
    }
  }, [note]);
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files); // 업로드된 파일 배열로 변환
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]); // 기존 파일 목록에 추가
  };
  const handleFileClick = (file) => {
    if (file.type.startsWith("image/")) {
      // 이미지 파일 미리보기
      const fileUrl = URL.createObjectURL(file); // 파일 Blob URL 생성
      setPreviewFile(fileUrl); // 미리보기 파일 URL 설정
    } else if (file.type === "application/pdf") {
      // PDF 파일 새 탭에서 열기
      const pdfUrl = URL.createObjectURL(file);
      window.open(pdfUrl, "_blank"); // 새 탭에서 열기
    } else {
      alert("미리보기를 지원하지 않는 파일 형식입니다.");
    }
  };
  const handleSave = () => {
    if (title.trim() && content.trim()) {
      onSave({
        title,
        content,
        date: new Date().toLocaleString(),
        files: uploadedFiles,
      });
      onClose();
    } else {
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
            onChange={handleFileUpload}
          >
            <CloudUploadIcon
              style={{
                fontSize: "20px",
                // 아이콘 크기 조정
              }}
            />
            <Button onChange={handleFileUpload}>미리보기</Button>
          </Button>
        </div>
        {/* 제목 입력 */}
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          value={title}
          className="input-title"
        />
        <textarea
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="input-content"
        />

        <div>
          <ul style={{ marginTop: "10px", paddingLeft: "20px" }}>
            {uploadedFiles.length > 0 ? (
              uploadedFiles.map((file, index) => (
                <li key={index}>
                  <span
                    onClick={() => handleFileClick(file)} // 파일 클릭 시 처리
                  >
                    {file.name}
                  </span>
                </li>
              ))
            ) : (
              <li style={{ fontSize: "14px", color: "gray" }}>
                업로드된 파일이 없습니다.
              </li>
            )}
          </ul>
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
