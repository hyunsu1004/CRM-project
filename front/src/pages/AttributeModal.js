import React, { useState, useEffect } from "react";
import axios from "axios"; // Axios import
import "../styles/AttributeModal.css";

const AttributeModal = ({ onClose, onSubmit, existingAttributes = [] }) => {
  // 기본값을 빈 배열로 설정
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [defaultValue, setDefaultValue] = useState(""); // 기본값 상태
  const [dataType, setDataType] = useState(""); // 자료형 선택 상태
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태
  const [option1] = useState(["Series A", "Series B", "Series C", "Series D"]);

  // 자료형에 따른 추천 기본값 설정
  const defaultValues = {
    integer: 0,
    string: "",
    date: "2024-01-01", // 기본 날짜는 오늘 날짜로 설정하거나 원하는 날짜로 수정 가능
    currency: 0.0,
    amount: 0.0,
    select: "",
    multiSelect: [],
    checkbox: false,
    person: "",
    email: "",
    phone: "",
    url: "",
    status: "Active",
    file: null,
  };

  // 자료형이 변경되면 기본값을 추천 옵션으로 설정
  useEffect(() => {
    if (dataType) {
      setDefaultValue(defaultValues[dataType]); // 자료형에 따른 기본값 설정
    }
  }, [dataType]);

  const handleOptionSelect = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption && !selectedOptions.includes(selectedOption)) {
      setSelectedOptions([...selectedOptions, selectedOption]);
    }
    e.target.value = ""; // 선택 후 초기화
  };

  const removeOption = (index) => {
    const optionToRemove = selectedOptions[index];
    // 해당 옵션이 선택된 상태에서 삭제하려고 할 때 알림
    if (defaultValue === optionToRemove) {
      alert("기본값으로 설정된 옵션은 삭제할 수 없습니다.");
      return;
    }

    setSelectedOptions(selectedOptions.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    // 동일 이름 속성 체크
    const isNameExist = existingAttributes.some((attr) => attr.name === name);
    if (isNameExist) {
      setErrorMessage("이미 존재하는 이름입니다.");
      return;
    }

    // 백엔드에 데이터를 전송하는 부분을 주석 처리하고, 대신 alert로 전달되는 값을 확인
    try {
      const data = {
        name,
        description,
        selectedOptions,
        defaultValue,
        dataType,
      };

      // alert로 값 확인 (확인용)
      alert("전송될 데이터:\n" + JSON.stringify(data, null, 2));

      // 백엔드 전송 코드
      const response = await axios.post("/api/attribute", data);
      if (response.status === 200) {
        alert("속성이 성공적으로 추가되었습니다.");
        onSubmit(data); // 성공적으로 추가된 데이터 처리
        onClose(); // 모달 닫기
      }
    } catch (error) {
      console.error("속성 추가 오류:", error);
      alert("속성 추가에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>속성 추가하기</h2>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <label>자료형</label>
        <select
          className="dropdown"
          name="datatype"
          value={dataType}
          onChange={(e) => setDataType(e.target.value)}
        >
          <option value="" disabled>
            선택
          </option>
          <option value="integer">정수</option>
          <option value="string">문자열</option>
          <option value="date">날짜</option>
          <option value="currency">통화</option>
          <option value="amount">금액</option>
          <option value="select">선택</option>
          <option value="multiSelect">다중 선택</option>
          <option value="checkbox">체크박스</option>
          <option value="person">사람</option>
          <option value="email">이메일</option>
          <option value="phone">전화번호</option>
          <option value="url">URL</option>
          <option value="status">상태</option>
          <option value="file">파일</option>
        </select>

        <label>속성 이름</label>
        <input
          type="text"
          placeholder="속성 이름 입력"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>설명 (선택)</label>
        <input
          type="text"
          placeholder="설명 입력"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>옵션</label>
        <div className="options-container">
          {selectedOptions.map((option, index) => (
            <span key={index} className="option">
              {option}
              <button
                className="remove-btn"
                onClick={() => removeOption(index)}
              >
                X
              </button>
            </span>
          ))}
        </div>
        <select
          className="dropdown2"
          name="optionselect"
          onChange={handleOptionSelect}
          defaultValue=""
        >
          <option value="">옵션 선택</option>
          {option1
            .filter((option) => !selectedOptions.includes(option))
            .map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
        </select>

        <label>기본값</label>
        <input
          type={dataType === "date" ? "date" : "text"} // 날짜일 경우 input type을 date로 설정
          placeholder={defaultValue}
          onChange={(e) => setDefaultValue(e.target.value)}
        />

        <div className="button-group">
          <button onClick={onClose} className="cancel-btn">
            취소
          </button>
          <button onClick={handleSubmit} className="submit-btn">
            추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttributeModal;
