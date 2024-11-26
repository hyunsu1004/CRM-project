import React, { useState, useEffect } from "react";
import "../styles/modal.css";
import axios from "axios";

const DealModal = ({ onClose, onSubmit, defaultAttributes, member }) => {
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
    setFilteredCompanies([]); // 선택 후 목록 숨기기
  };

  // 모달 제출 시 호출
  const handleSubmit = async () => {
    if (!companyName) {
      alert("회사명을 선택해주세요.");
      return;
    }

    const currentDateTime = new Date().toISOString(); // 현재 날짜와 시간
    const newDeal = {
      creator: member?.name, // Deal 엔티티의 creator에 해당
      createTime: new Date().toISOString(), // 생성 시간
      status: "PENDING", // DealStatus 열거형 값 (예: PENDING, APPROVED 등) - 기본값 설정
      startup: {
        name: companyName, // Startup 엔티티에서 사용할 회사명
      },
    };

    try {
      setIsSubmitting(true); // 중복 요청 방지
      const response = await axios.post("/api/member/adddeals", newDeal, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        alert("딜이 성공적으로 추가되었습니다.");
        onSubmit(newDeal); // 부모 컴포넌트에서 처리하도록 콜백 호출
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
