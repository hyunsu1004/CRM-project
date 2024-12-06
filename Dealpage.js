import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AttributeModal from "./AttributeModal";
import "../styles/CustomDropdown.css";
import "ag-grid-charts-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "../styles/btn.css";
import axios from "axios";
import "../styles/grid.css";
import Layout from "../components/Layout";
import ReactDOM from "react-dom";
import DealModal from "../pages/DealModal";
import { useNavigate } from "react-router-dom";
import NoteModal from "./NoteModal";
const MultiSelectEditor = (props) => {
  const options = props.value ? props.value.split(",") : [];
  const categoryOptions = [
    { label: "B2B", color: "#d32f2f" },
    { label: "Enterprise", color: "blue" },
    { label: "Payment", color: "green" },
    { label: "Fintech", color: "gray" },
  ];

  return (
    <div className="selected-options-container">
      {options.map((option, index) => (
        <span
          key={index}
          className={`selected-tag ${
            categoryOptions.find((cat) => cat.label === option)?.label
          }`}
          style={{
            backgroundColor:
              categoryOptions.find((cat) => cat.label === option)?.color ||
              "lightgray",
            color: "white",
          }}
        >
          {option}
        </span>
      ))}
    </div>
  );
};
const seriesOptions = [
  { value: "Series A", color: "red" },
  { value: "Series B", color: "blue" },
  { value: "Series C", color: "green" },
  { value: "Seed", color: "white" },
];

const PersonEditor = (props) => {
  const [selectedPeople, setSelectedPeople] = useState(
    props.value ? props.value.split(",") : []
  );

  const peopleOptions = [
    { name: "Jason Lee", email: "jason@purplelabs.io" },
    { name: "김태훈", email: "taehoon@purplelabs.io" },
    { name: "박철용", email: "double@purplelabs.io" },
    { name: "Kristoffer Andersson", email: "kristoffer@purplelabs.io" },
    { name: "장강명", email: "bright_river@purplelabs.io" },
    { name: "배두나", email: "double@purplelabs.io" },
    { name: "제갈공명", email: "lyingdragon@purplelabs.io" },
  ];
  const PersonRenderer = (props) => {
    const people = props.value ? props.value.split(",") : [];
    return (
      <div>
        {people.map((person, index) => (
          <span key={index} style={{ marginRight: "8px", fontWeight: "bold" }}>
            {person}
          </span>
        ))}
      </div>
    );
  };
  const handleSelect = async (person) => {
    const updatedSelection = selectedPeople.includes(person.name)
      ? selectedPeople.filter((name) => name !== person.name)
      : [...selectedPeople, person.name];

    setSelectedPeople(updatedSelection);

    // 값 업데이트
    const newValue = updatedSelection.join(",");
    props.node.setDataValue(props.column.colId, newValue);
    props.api.refreshCells({ rowNodes: [props.node] });

    // 서버에 선택된 사람 목록 업데이트
    try {
      await axios.put("/api/update-person-selection", {
        id: props.node.data.id, // 예시로 row의 id를 사용
        column: props.column.colId,
        selectedPeople: newValue,
      });
    } catch (error) {
      console.error("사람 목록 업데이트 실패:", error);
    }
  };

  return (
    <div className="custom-person-editor">
      {peopleOptions.map((person) => (
        <div key={person.email} className="person-item">
          <label>
            <input
              type="checkbox"
              checked={selectedPeople.includes(person.name)}
              onChange={() => handleSelect(person)}
            />
            <span>
              {person.name} ({person.email})
            </span>
          </label>
        </div>
      ))}
    </div>
  );
};
const SelectCellRenderer = (props) => {
  const series = seriesOptions.find((opt) => opt.value === props.value); // 매핑 확인
  return (
    <span style={{ fontWeight: "bold" }}>
      <span style={{ color: series?.color || "black" }}>●</span>{" "}
      <span style={{ color: "black" }}>{series?.value || "선택 없음"}</span>
    </span>
  );
};
const SeriesDropdownEditor = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(props.value || "");

  const handleSelect = (selectedValue) => {
    setValue(selectedValue);
    props.node.setDataValue(props.column.colId, selectedValue); // AG Grid 데이터 업데이트
    props.api.refreshCells({ rowNodes: [props.node] });
    setIsOpen(false);
    props.stopEditing(); // 편집 종료
  };

  const dropdownContent = (
    <ul className="dropdown-list">
      {seriesOptions.map((option) => (
        <li
          key={option.value}
          className="dropdown-item"
          onClick={() => handleSelect(option.value)}
        >
          <span
            className="dropdown-dot"
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: option.color,
              marginRight: "8px",
            }}
          ></span>
          {option.value}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="custom-dropdown" style={{ position: "relative" }}>
      <div
        className="dropdown-header"
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          border: "1px solid lightgray",
          borderRadius: "4px",
          padding: "8px 12px",
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
      >
        <span>
          <span
            className="dropdown-dot"
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor:
                seriesOptions.find((opt) => opt.value === value)?.color ||
                "gray",
            }}
          ></span>{" "}
          {value || "선택 없음"}
        </span>
        <span className="dropdown-arrow">{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && ReactDOM.createPortal(dropdownContent, document.body)}
    </div>
  );
};

export const DealGrid = ({ member }) => {
  return (
    <div
      style={{ width: "100%", height: "70vh" }}
      className={"ag-theme-quartz"}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px", // 버튼 간격
            justifyContent: "flex-end", // 버튼 오른쪽 정렬
            marginBottom: "10px", // 전체 margin 조정
          }}
        >
          {
            <button
              style={{
                padding: "8px 16px",
                backgroundColor: "white",
                color: "black",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              딜삭제
            </button>
          }
          {
            <button
              style={{
                padding: "8px 16px",
                backgroundColor: "white",
                color: "black",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              노트 추가
            </button>
          }
        </div>
      </div>
      <AgGridReact
      //     ref={gridRef} // gridRef를 AgGridReact에 연결
      //     rowData={rowData}
      //     columnDefs={columnDefs}
      //     defaultColDef={defaultColDef}
      //     rowSelection={rowSelection}
      //     onSelectionChanged={onSelectionChanged}
      //     suppressHeaderClickSelection={true}
      //     context={context}
      //     onCellValueChanged={(params) => {
      //       // rowData 강제 업데이트
      //       setRowData((prevData) =>
      //         prevData.map((row) =>
      //           row === params.data
      //             ? { ...row, [params.colDef.field]: params.newValue }
      //             : row
      //         )
      //       );
      //     }}
      //     enableAdvancedFilter={true}
      />
      (<AttributeModal onClose={() => setModalOpen(false)}></AttributeModal>)
      {<DealModal />}
      {<NoteModal />}
    </div>
  );
};

const DealPage = () => {
  const [member, setMember] = useState(null);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("member");
    if (loggedInUser) {
      setMember(JSON.parse(loggedInUser)); // localStorage에서 사용자 정보 읽기
    }
  }, []);
  return (
    <Layout member={member}>
      <DealGrid member={member} />
    </Layout>
  );
};

export default DealPage;
