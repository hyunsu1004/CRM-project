import React, { useState } from "react";
import "../styles/AttributeModal.css";

const AttributeModal = ({ onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [option1] = useState(["Series A", "Series B", "Series C", "Series D"]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [defaultOption, setDefaultOption] = useState(""); // 기본값 상태 추가

  const handleOptionSelect = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption && !selectedOptions.includes(selectedOption)) {
      setSelectedOptions([...selectedOptions, selectedOption]);
    }
    e.target.value = ""; // 선택 후 초기화
  };

  const removeOption = (index) => {
    setSelectedOptions(selectedOptions.filter((_, i) => i !== index));
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>속성 추가하기</h2>

        <label>데이터 유형</label>
        <select className="dropdown" name="dataselect" defaultValue="">
          <option value="" disabled>
            선택
          </option>
          <option value="investor">투자자</option>
          <option value="company">기업</option>
        </select>

        <label>이름</label>
        <input
          type="text"
          placeholder="이름 입력"
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

        <label>기본값</label>
        <select
          className="dropdown"
          name="basic"
          value={defaultOption}
          onChange={(e) => setDefaultOption(e.target.value)}
        >
          <option value="">없음</option>
          <option value="dd">dd</option>
          {selectedOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <div className="button-group">
          <button onClick={onClose} className="cancel-btn">
            취소
          </button>
          <button
            onClick={() => onSubmit({ name, description, selectedOptions })}
            className="submit-btn"
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttributeModal;
