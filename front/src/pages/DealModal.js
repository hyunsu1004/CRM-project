import React, { useState } from "react";
import "../styles/modal.css"; // 필요에 따라 CSS 파일 작성
import axios from "axios";

const DealModal = ({ onClose, onSubmit, defaultAttributes, memberId }) => {
  const [companyName, setCompanyName] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // 중복 요청 방지 플래그

  // 예시 회사명 데이터 (이 데이터를 실제 API 호출로 대체 가능)
  const companyList = [
    "쿼타랩",
    "카카오",
    "네이버",
    "삼성전자",
    "LG전자",
    "현대자동차",
  ];

  // 입력값 변경 시 호출
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

  // 모달 제출 시 호출
  const handleSubmit = async () => {
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

    // 협업 ver
    try {
      setIsSubmitting(true); // 중복 요청 방지
      // API 호출: 딜 추가
      const response = await axios.post(
        `/api/member/adddeals`, // API URL
        newDeal, // 보낼 데이터
        {
          headers: {
            "Content-Type": "application/json", // JSON 데이터로 전송
          },
        }
      );

      // 성공 처리
      if (response.status === 200 || response.status === 201) {
        alert("딜이 성공적으로 추가되었습니다.");
        onSubmit(newDeal); // 부모 컴포넌트에서 처리할 수 있도록 콜백 호출
        onClose(); // 모달 닫기
      } else {
        throw new Error("딜 추가에 실패했습니다.");
      }
    } catch (error) {
      console.error("딜 추가 중 오류 발생:", error);
      alert("딜 추가 중 문제가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false); // 중복 요청 플래그 해제
    }

    // 기존 로컬 ver
    // onSubmit(newDeal);
    // onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <h2>딜 추가</h2>
          <button
            className="close-btn"
            onClick={onClose}
            disabled={isSubmitting}
          >
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
            disabled={isSubmitting}
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
