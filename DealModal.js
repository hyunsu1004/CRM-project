import React, { useState } from "react";
import "../styles/modal.css"; // 필요에 따라 CSS 파일 작성

const DealModal = ({ onClose, onSubmit, defaultAttributes }) => {
  const [companyName, setCompanyName] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  const companyList = [
    "쿼타랩",
    "카카오",
    "네이버",
    "삼성전자",
    "LG전자",
    "현대자동차",
  ];

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <h2>딜 추가</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <label>
            회사명 <span style={{ color: "red" }}>*</span>
          </label>
          <input placeholder="회사명을 입력하거나 선택하세요" />
          {/* 필터링된 회사명 목록 */}
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary">닫기</button>
          <button className="btn btn-primary">추가하기</button>
        </div>
      </div>
    </div>
  );
};

export default DealModal;
