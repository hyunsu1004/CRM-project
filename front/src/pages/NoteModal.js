import React, { useState, useEffect } from "react";
import "../styles/NoteModal.css";

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
            onSave({
                title,
                content,
                date: new Date().toLocaleString(),
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
                <textarea
                    placeholder="내용을 입력해주세요"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="input-content"
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
