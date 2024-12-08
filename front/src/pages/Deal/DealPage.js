import { AgGridReact } from "ag-grid-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  ReactDOM,
} from "react";
import AttributeModal from "../AttributeModal";
import "../../styles/CustomDropdown.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "../../styles/btn.css";
import axios from "axios";
import "../../styles/grid.css";
import Layout from "../../components/Layout";
import DealModal from "./DealModal";
import { Navigate } from "react-router-dom"; // 공통 설정 및 옵션 상수 분리
const CATEGORY_OPTIONS = [
  { label: "B2B", color: "red" },
  { label: "Enterprise", color: "blue" },
  { label: "Payment", color: "green" },
  { label: "Fintech", color: "gray" },
  { label: "E-commerce", color: "purple" },
  { label: "Startup", color: "orange" },
  { label: "Healthcare", color: "pink" },
];

const SERIES_OPTIONS = [
  { value: "Series A", color: "red" },
  { value: "Series B", color: "blue" },
  { value: "Series C", color: "green" },
  { value: "Seed", color: "white" },
];

const STATUS_OPTIONS = [
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

// 공통 API 호출 함수
const updateDealData = async (url, payload) => {
  try {
    await axios.put(url, payload);
  } catch (error) {
    console.error("데이터 업데이트 실패:", error);
  }
};

// 공통 드롭다운 스타일
const dropdownStyles = {
  padding: "6px 12px",
  backgroundColor: "white",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

// CustomHeaderComponent
const CustomHeaderComponent = (props) => {
  const handleDoubleClick = () => {
    if (window.confirm(` "${props.displayName}"을(를) 삭제하겠습니까?`)) {
      props.context.deleteColumn(props.column.getColId());
    }
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        cursor: "pointer",
        textAlign: "center",
      }}
    >
      {props.displayName}
    </div>
  );
};

// MultiSelectEditor
const MultiSelectEditor = (props) => {
  const [selectedOptions, setSelectedOptions] = useState(
    props.value ? props.value.split(",") : []
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = async (option) => {
    const updatedSelection = selectedOptions.includes(option.label)
      ? selectedOptions.filter((item) => item !== option.label)
      : [...selectedOptions, option.label];

    setSelectedOptions(updatedSelection);

    // 그리드 데이터 업데이트
    const newValue = updatedSelection.join(",");
    props.node.setDataValue(props.column.colId, newValue);
    props.api.refreshCells({ rowNodes: [props.node] });

    // 딜 ID가 없을 경우, 새로운 ID 생성
    const dealId = props.node.data.dealId || `deal_${Date.now()}`;
    props.node.data.dealId = dealId;

    // 백엔드에 데이터 업데이트
    await updateDealData(`/api/member/deals/${dealId}/updatedeals`, {
      id: props.node.data.id,
      column: props.column.colId,
      value: newValue,
    });
  };

  return (
    <div className="multi-select-editor">
      <div
        className="selected-options-container"
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "nowrap",
          overflowX: "auto",
          gap: "8px",
          padding: "4px 8px",
          border: "none",
          position: "relative",
        }}
      >
        {selectedOptions.map((option, index) => (
          <span
            key={index}
            className="selected-tag"
            style={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor:
                CATEGORY_OPTIONS.find((cat) => cat.label === option)?.color ||
                "lightgray",
            }}
          >
            {option}
            <span
              className="remove-tag"
              onClick={() => handleSelect({ label: option })}
              style={{ marginLeft: "8px", cursor: "pointer" }}
            >
              ✕
            </span>
          </span>
        ))}
        <span
          className="dropdown-arrow"
          onClick={() => setIsOpen((prev) => !prev)}
          style={{
            marginLeft: "auto",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          {isOpen ? "▲" : "▼"}
        </span>
      </div>
      {isOpen && (
        <div
          className="dropdown-list"
          style={{
            position: "absolute",
            top: "60px",
            left: 0,
            zIndex: 10,
            width: "100%",
            height: "fit-content",
            maxHeight: "200px",
            overflowY: "auto",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {CATEGORY_OPTIONS.map((option) => (
            <div
              key={option.label}
              className="dropdown-item"
              onClick={() => handleSelect(option)}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(option.label)}
                onChange={() => {}}
              />
              <span
                style={{
                  marginLeft: "8px",
                  color: option.color,
                  fontWeight: "bold",
                }}
              >
                {option.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// SelectCellRenderer
const SelectCellRenderer = (props) => {
  const series = SERIES_OPTIONS.find((opt) => opt.value === props.value);
  return (
    <span style={{ fontWeight: "bold" }}>
      <span style={{ color: series?.color || "black" }}>●</span>{" "}
      <span style={{ color: "black" }}>{series?.value || "선택 없음"}</span>
    </span>
  );
};

// StatusDropdownEditor
const StatusDropdownEditor = (props) => {
  const [value, setValue] = useState(props.value || STATUS_OPTIONS[0].value);

  const handleSelect = (newValue) => {
    setValue(newValue);
    props.node.setDataValue(props.column.colId, newValue); // 값 업데이트
    props.api.refreshCells({
      rowNodes: [props.node],
      columns: [props.column.colId],
    });
    props.stopEditing(); // 편집 종료
  };

  return (
    <div style={{ padding: "5px", boxSizing: "border-box" }}>
      <CustomDropdown value={value} onChange={handleSelect} />
    </div>
  );
};

// CustomDropdown
const CustomDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedValue) => {
    onChange(selectedValue); // 선택된 값을 부모 컴포넌트로 전달
    setIsOpen(false); // 드롭다운 닫기
  };

  return (
    <div className="custom-dropdown">
      <div
        className="dropdown-header"
        onClick={() => setIsOpen(!isOpen)}
        style={dropdownStyles}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor:
                STATUS_OPTIONS.find((opt) => opt.value === value)?.color ||
                "gray",
            }}
          ></span>
          <span style={{ fontSize: "14px" }}>{value || "해당 없음"}</span>
        </span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <ul
          className="dropdown-list"
          style={{
            position: "fixed",
            width: "200px",
            backgroundColor: "white",
            border: "1px solid lightgray",
            borderRadius: "4px",
            zIndex: 9999,
            maxHeight: "200px",
            overflowY: "auto",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          {STATUS_OPTIONS.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: option.color,
                }}
              ></span>
              <span>{option.value}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// StatusCellRenderer
const StatusCellRenderer = (props) => {
  const status = STATUS_OPTIONS.find((opt) => opt.value === props.value);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "14px",
        padding: "4px",
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: status?.color || "gray",
        }}
      ></span>
      <span style={{ color: "black", fontWeight: "bold" }}>
        {status?.value || "선택 없음"}
      </span>
    </div>
  );
};

const DealGrid = ({ rowData, setRowData }) => {
  const gridRef = useRef();
  const [member, setMember] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const member = JSON.parse(localStorage.getItem("member"));
    setMember(member);
  }, []);

  const [columnDefs] = useState([
    {
      headerName: "회사명",
      field: "companyname",
      filter: "agSetColumnFilter",
      flex: 1,
    },
    {
      headerName: "생성 일시",
      field: "make_day",
      flex: 1,
      filter: "agSetColumnFilter",
      valueFormatter: (params) =>
        params.value ? new Date(params.value).toLocaleString() : "",
    },
    {
      headerName: "검토 상태",
      field: "status",
      cellRenderer: StatusCellRenderer, // React Cell Renderer
      cellEditor: StatusDropdownEditor, // React Cell Editor
      editable: true, // 편집 가능
      filter: "agSetColumnFilter",
    },
    {
      headerName: "노트",
      field: "note",
      cellRenderer: (params) => (
        <span
          style={{
            color: "blue",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          노트 보기
        </span>
      ),
      onCellClicked: (params) => {
        const companyName = params.data.companyname; // 회사 이름 추출
        Navigate(`/note/${companyName}`); // NotePage로 이동
      },
    },
  ]);

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      editable: true,
      minWidth: 200,
      floatingFilter: true,
      filter: "agTextColumnFilter",
      headerComponent: CustomHeaderComponent,
      cellStyle: { textAlign: "center" },
    }),
    []
  );

  const handleDelete = () => {
    if (selectedRows.length === 0) return;
    const updatedRowData = rowData.filter((row) => !selectedRows.includes(row));
    setRowData(updatedRowData);
    setSelectedRows([]);
    gridRef.current?.api?.deselectAll();
  };

  return (
    <Layout member={member}>
      <div
        style={{ width: "100%", height: "70vh" }}
        className="ag-theme-quartz"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <button
            onClick={handleDelete}
            style={{ padding: "8px 16px", fontSize: "14px" }}
          >
            딜 삭제
          </button>
        </div>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection={{ type: "multiple" }}
          onSelectionChanged={() => {
            const selectedNodes = gridRef.current.api.getSelectedNodes();
            const selectedData = selectedNodes.map((node) => node.data);
            setSelectedRows(selectedData);
          }}
        />
      </div>
    </Layout>
  );
};

export {
  CustomHeaderComponent,
  MultiSelectEditor,
  SelectCellRenderer,
  StatusDropdownEditor,
  CustomDropdown,
  StatusCellRenderer,
  DealGrid,
};

export default DealGrid;
