import React, { useState, useEffect } from "react";
import "../../styles/modal.css";
import axios from "axios";

const DealModal = ({ onClose, onSubmit, defaultAttributes }) => {
  const [companyName, setCompanyName] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // 중복 요청 방지 플래그
  const [companyList, setCompanyList] = useState([]); // 전체 회사 리스트

  // API에서 회사 목록 가져오기
  useEffect(() => {
    const fetchCompanyList = async () => {
      try {
        const response = await axios.get("/api/member/startups");
        setCompanyList(response.data.map((company) => company.name)); // 필요한 데이터만 추출
      } catch (error) {
        console.error("회사 목록을 불러오는 중 오류 발생:", error);
      }
    };

    fetchCompanyList();
  }, []);

  // 입력값 변경 시 필터링
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

  // 회사명을 클릭하여 선택
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
          <button
            onClick={onClose}
            className="btn btn-secondary"
            disabled={isSubmitting}
          >
            닫기
          </button>
          <button
            onClick={handleSubmit}
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "추가 중..." : "추가하기"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealModal;
