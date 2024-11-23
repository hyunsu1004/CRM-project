import React, { useState } from "react";
import "./styles/modal.css"; // 필요에 따라 CSS 파일 작성

const DealModal = ({ onClose, onSubmit, defaultAttributes }) => {
  const [companyName, setCompanyName] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  // 예시 회사명 데이터 (이 데이터를 실제 API 호출로 대체 가능)
  const companyList = [
    "쿼타랩",
    "카카오",
    "네이버",
    "삼성전자",
    "LG전자",
    "현대자동차",
  ];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCompanyName(value);

    // 회사명 필터링
    if (value) {
      const filtered = companyList.filter((company) =>
        company.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCompanies(filtered);
    } else {
      setFilteredCompanies([]);
    }
  };

  const handleCompanySelect = (company) => {
    setCompanyName(company);
    setFilteredCompanies([]); // 목록 숨기기
  };

  const handleSubmit = () => {
    if (!companyName) {
      alert("회사명을 선택해주세요.");
      return;
    }

    const currentDateTime = new Date().toISOString(); // 현재 날짜와 시간

    const newDeal = {
      companyname: companyName,
      username: "로그인 사용자", // 실제 사용자 정보로 교체 가능
      make_day: currentDateTime, // 생성일시 추가
      ...defaultAttributes, // 기본 속성값 추가
    };

    onSubmit(newDeal);
    onClose(); // 모달 닫기
  };

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
          <input
            type="text"
            value={companyName}
            onChange={handleInputChange}
            placeholder="회사명을 입력하거나 선택하세요"
          />
          {/* 필터링된 회사명 목록 */}
          {filteredCompanies.length > 0 && (
            <ul className="company-list">
              {filteredCompanies.map((company, index) => (
                <li
                  key={index}
                  className="company-item"
                  onClick={() => handleCompanySelect(company)}
                >
                  {company}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-secondary">
            닫기
          </button>
          <button onClick={handleSubmit} className="btn btn-primary">
            추가하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealModal;
