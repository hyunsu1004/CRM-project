import React, { useState, useEffect } from "react";
import "../styles/NoteModal.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill"; // React-Quill 컴포넌트 임포트
import DOMPurify from "dompurify";
const NoteModal = ({ note, onClose, onSave }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (note) {
            setTitle(note.title || "");
            setContent(note.content || "");
        }
    }, [note]);

    const handleSave = () => {
        if (title.trim() && content.trim()) {
            // DOMPurify로 content를 정리 (HTML 유지)
            const sanitizedContent = DOMPurify.sanitize(content);

            // plain text 버전 생성
            const plainTextContent = DOMPurify.sanitize(content, {
                USE_PROFILES: { html: false },
            });

            // 저장 콜백 실행
            onSave({
                title,
                content: sanitizedContent, // HTML 형식 저장
                plainText: plainTextContent, // Plain text 저장 (필요 시)
            });

            onClose();
        } else {
            alert("제목과 내용을 입력해주세요.");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {/* 노트 헤더 */}
                <div className="modal-header" style={{ marginBottom: "20px" }}>
                    <h2>노트 추가</h2>
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
                <ReactQuill
                    theme="snow" // Quill의 테마 (snow 또는 bubble 선택 가능)
                    value={content}
                    onChange={(value) => setContent(value)}
                    className="inpust-content"
                    placeholder="내용을 입력해주세요"
                    style={{ height: "380px", marginBottom: "20px" }} // 에디터 스타일
                />

                {/* 취소/저장 버튼 */}
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
