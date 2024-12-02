import React, { useState, useEffect } from "react";
import "../styles/NoteModal.css";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// 숨겨진 파일 입력 스타일링
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const NoteModal = ({ note, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(note?.content || "");
  const [uploadedFiles, setUploadedFiles] = useState([]); // 파일 목록 상태 추가
  const [previewFile, setPreviewFile] = useState(null); // 미리보기 파일 상태

  const navigate = useNavigate();

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setUploadedFiles(note.files || []);
    }
  }, [note]);

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

  const closePreview = () => {
    setPreviewFile(null); // 미리보기 닫기
  };
  const handleFileDelete = (fileToDelete) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((file) => file !== fileToDelete)
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* 노트 헤더와 파일 업로드 버튼 */}
        <div
          className="modal-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2>노트</h2>
          <Button
            component="label"
            variant="contained"
            startIcon={null} // 기존 startIcon 제거
            style={{
              backgroundColor: "#1976d2",
              color: "#fff",
              fontSize: "12px",
              padding: "6px 12px",
              borderRadius: "8px",
              width: "80px",
              height: "40px", // 버튼 높이 지정
              display: "flex",
              justifyContent: "center", // 아이콘 수평 중앙 정렬
              alignItems: "center", // 아이콘 수직 중앙 정렬
            }}
          >
            <CloudUploadIcon
              style={{
                fontSize: "20px", // 아이콘 크기 조정
              }}
            />
            <VisuallyHiddenInput
              type="file"
              onChange={handleFileUpload}
              multiple
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

        {/* 내용 입력 */}
        <textarea
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="input-content"
        />

        {/* 업로드된 파일 목록 */}
        <div
          style={{
            marginBottom: "20px",
            maxHeight: "100px",
            overflowY: "auto",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <ul style={{ marginTop: "10px", paddingLeft: "20px" }}>
            {uploadedFiles.length > 0 ? (
              uploadedFiles.map((file, index) => (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      color: "blue",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() => handleFileClick(file)} // 파일 클릭 시 처리
                  >
                    {file.name}
                  </span>
                  <button
                    onClick={() => handleFileDelete(file)} // 파일 삭제 버튼
                    style={{
                      color: "black",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    X
                  </button>
                </li>
              ))
            ) : (
              <li style={{ fontSize: "14px", color: "gray" }}>
                업로드된 파일이 없습니다.
              </li>
            )}
          </ul>
        </div>

        {/* 미리보기 */}
        {previewFile && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                position: "relative",
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <button
                onClick={closePreview}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              >
                X
              </button>
              <img
                src={previewFile}
                alt="Preview"
                style={{ maxWidth: "500px", maxHeight: "500px" }}
              />
            </div>
          </div>
        )}

        {/* 취소/저장 버튼 */}
        <div className="modal-actions">
          <button
            onClick={() => {
              navigate("/notes");
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
