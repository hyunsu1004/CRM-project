import React, { useState, useEffect } from "react";
import "./styles/AttributeModal.css";

const AttributeModal = ({ onClose, onSubmit, existingAttributes = [] }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [defaultValue, setDefaultValue] = useState(""); // 기본값 상태
  const [dataType, setDataType] = useState(""); // 자료형 선택 상태
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태

  const [option1] = useState(["Series A", "Series B", "Series C", "Series D"]);
  const statusOptions = [
    { value: "미팅", color: "gray" },
    { value: "검토", color: "gray" },
    { value: "IR", color: "orange" },
    { value: "예비투자심의", color: "orange" },
    { value: "본투자심의", color: "orange" },
    { value: "최종투자심의", color: "green" },
    { value: "계약", color: "blue" },
    { value: "납입", color: "blue" },
    { value: "투자완료", color: "blue" },
    { value: "검토중단", color: "red" },
  ];

  useEffect(() => {
    if (dataType === "integer" || dataType === "string") {
      setDefaultValue(""); // 정수 또는 문자열의 기본값 초기화
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
    if (defaultValue === optionToRemove) {
      alert("기본값으로 설정된 옵션은 삭제할 수 없습니다.");
      return;
    }
    setSelectedOptions(selectedOptions.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const isNameExist = existingAttributes.some((attr) => attr.name === name);
    if (isNameExist) {
      setErrorMessage("이미 존재하는 이름입니다.");
      return;
    }

    const data = {
      name,
      description,

      defaultValue:
        dataType === "status" ? statusOptions[0].value : defaultValue,
      selectedOptions:
        dataType === "select" ? ["Series A", "Series B", "Series C"] : [],
      dataType,
    };

    onSubmit(data);
    onClose();
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

        {dataType === "integer" || dataType === "string" ? (
          <div>
            <label>기본값</label>
            <input
              type="text"
              placeholder={`기본값 입력 (${
                dataType === "integer" ? "숫자" : "문자"
              })`}
              value={defaultValue}
              onChange={(e) => setDefaultValue(e.target.value)}
            />
          </div>
        ) : null}

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
