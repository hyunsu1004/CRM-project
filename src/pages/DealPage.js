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
        justifyContent: "center", // 헤더 텍스트를 가운데 정렬
        alignItems: "center", // 수직 중앙 정렬
        width: "100%",
        height: "100%",
        cursor: "pointer",
        textAlign: "center", // 텍스트 가운데 정렬
      }}
    >
      {props.displayName}
    </div>
  );
};

const MultiSelectEditor = (props) => {
  const [selectedOptions, setSelectedOptions] = useState(
    props.value ? props.value.split(",") : []
  );
  const [isOpen, setIsOpen] = useState(false);

  const categoryOptions = [
    { label: "B2B", color: "red" },
    { label: "Enterprise", color: "blue" },
    { label: "Payment", color: "green" },
    { label: "Fintech", color: "gray" },
    { label: "E-commerce", color: "purple" },
    { label: "Startup", color: "orange" },
    { label: "Healthcare", color: "pink" },
  ];

  const handleSelect = async (option) => {
    const updatedSelection = selectedOptions.includes(option.label)
      ? selectedOptions.filter((item) => item !== option.label)
      : [...selectedOptions, option.label];

    setSelectedOptions(updatedSelection);

    // 그리드 데이터 업데이트
    const newValue = updatedSelection.join(",");
    props.node.setDataValue(props.column.colId, newValue);
    props.api.refreshCells({ rowNodes: [props.node] });

    // 백엔드에 데이터 업데이트
    try {
      await axios.put("/api/member/${memberId}/deals/${dealId}/updatedeals", {
        id: props.node.data.id, // 예시로 row의 id를 사용
        column: props.column.colId,
        value: newValue,
      });
    } catch (error) {
      console.error("데이터 업데이트 실패:", error);
    }
  };

  const handleRemove = (option) => {
    const updatedSelection = selectedOptions.filter((item) => item !== option);
    setSelectedOptions(updatedSelection);

    // 그리드 데이터 업데이트
    const newValue = updatedSelection.join(",");
    props.node.setDataValue(props.column.colId, newValue);
    props.api.refreshCells({ rowNodes: [props.node] });
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
          border: "1px solid lightgray",
          borderRadius: "4px",
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
                categoryOptions.find((cat) => cat.label === option)?.color ||
                "lightgray",
            }}
          >
            {option}
            <span
              className="remove-tag"
              onClick={() => handleRemove(option)}
              style={{ marginLeft: "8px", cursor: "pointer" }}
            >
              ✕
            </span>
          </span>
        ))}
        {selectedOptions.length > 3 && (
          <span
            style={{
              marginLeft: "8px",
              fontSize: "14px",
              fontWeight: "bold",
              color: "gray",
            }}
          >
            +{selectedOptions.length - 3}
          </span>
        )}
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
            maxHeight: "200px",
            overflowY: "auto",
            backgroundColor: "white",
            border: "1px solid lightgray",
            borderRadius: "4px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {categoryOptions.map((option) => (
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

const MultiSelectRenderer = (props) => {
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

const CustomButtonComponent = ({ onClick, onDealClick }) => {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <button className="btn" onClick={onClick}>
        속성 추가
      </button>
      <button className="btn" onClick={onDealClick}>
        딜 추가
      </button>
    </div>
  );
};
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
const CustomDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedValue) => {
    onChange(selectedValue); // 선택된 값을 부모 컴포넌트로 전달
    setIsOpen(false); // 드롭다운 닫기
  };

  return (
    <div className="custom-dropdown" style={{ position: "relative" }}>
      <div
        className="dropdown-header"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          border: "1px solid lightgray",
          borderRadius: "4px",
          padding: "6px 12px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor:
                statusOptions.find((opt) => opt.value === value)?.color ||
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
            position: "fixed", // fixed로 변경
            // 버튼과 같은 x 좌표
            width: "200px", // 고정된 폭 설정
            backgroundColor: "white",
            border: "1px solid lightgray",
            borderRadius: "4px",
            zIndex: 9999, // 매우 높은 값
            maxHeight: "200px",
            overflowY: "auto",
            padding: "8px 0",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          {statusOptions.map((option) => (
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

const StatusCellRenderer = (props) => {
  const status = statusOptions.find((opt) => opt.value === props.value);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px", // 아이콘과 텍스트 사이 간격
        fontSize: "14px", // 텍스트 크기
        padding: "4px", // 내부 여백
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

// AG Grid에서 사용될 리프레시 메서드 구현
StatusCellRenderer.refresh = (params) => {
  return params.value !== undefined; // 값이 변경되었음을 나타냄
};

const StatusDropdownEditor = (props) => {
  const [value, setValue] = useState(props.value || statusOptions[0].value);

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
const DatePickerEditor = (props) => {
  const [value, setValue] = useState(props.value || "");

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    props.node.setDataValue(props.column.colId, newValue); // 그리드 데이터 업데이트
    props.stopEditing(); // 편집 종료
  };

  return (
    <input
      type="date"
      value={value}
      onChange={handleChange}
      style={{
        width: "100%",
        height: "100%",
        padding: "5px",
        border: "none",
        boxSizing: "border-box",
      }}
    />
  );
};

export const DealGrid = ({ member }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const gridRef = useRef();
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDealModalOpen, setDealModalOpen] = useState(false);
  const [existingAttributes, setExistingAttributes] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
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
        navigate(`/note/${companyName}`); // NotePage로 이동
      },
    },
  ]);
  const deleteColumn = (field) => {
    setColumnDefs((prevDefs) =>
      prevDefs.filter((colDef) => colDef.field !== field)
    );
    setRowData((prevData) =>
      prevData.map((row) => {
        const { [field]: _, ...rest } = row;
        return rest;
      })
    );
  };

  const [defaultAttributes, setDefaultAttributes] = useState({});
  // 모달에서 추가된 속성 데이터를 그리드에 반영할 수 있는 함수

  const addNewAttribute = (newAttribute) => {
    const isSelect = newAttribute.dataType === "select";
    const isMultiSelect = newAttribute.dataType === "multiSelect";
    const isDate = newAttribute.dataType === "date";
    const isCurrency = newAttribute.dataType === "currency";
    const isAmount = newAttribute.dataType === "amount";
    const isCheckbox = newAttribute.dataType === "checkbox";
    const isPerson = newAttribute.dataType === "person";
    const isEmail = newAttribute.dataType === "email";
    const isPhone = newAttribute.dataType === "phone";
    const isURL = newAttribute.dataType === "url";
    const isFile = newAttribute.dataType === "file";
    const isInteger = newAttribute.dataType === "integer";
    const isString = newAttribute.dataType === "string";
    const uniqueFieldName = `${newAttribute.name}_${Date.now()}`;

    // 새로운 속성에 대한 기본값 설정
    const getDefaultValue = () => {
      if (isSelect) return "";
      if (isMultiSelect) return "";
      if (isDate) return null;
      if (isCurrency || isAmount || isInteger) return 0;
      if (isCheckbox) return false;
      if (isPerson || isEmail || isPhone || isURL || isFile || isString)
        return "";
      return newAttribute.defaultValue || "";
    };

    // 1. 기존 데이터 유지 + 새로운 속성 추가
    const updatedRowData = rowData.map((row) => ({
      ...row, // 기존 데이터 유지
      [uniqueFieldName]: row[uniqueFieldName] || getDefaultValue(), // 새 속성 기본값 설정
      // 새 속성 기본값 설정
    }));

    // 2. rowData 업데이트
    setRowData(updatedRowData);

    // 3. 새로운 컬럼 정의 추가
    setColumnDefs((prevDefs) => [
      ...prevDefs,
      {
        headerName: newAttribute.name,
        field: newAttribute.name,
        flex: 1,
        editable: true,
        filter: "agTextColumnFilter",
        ...(isSelect && {
          cellRenderer: SelectCellRenderer,
          cellEditor: SeriesDropdownEditor,
        }),
        ...(isMultiSelect && {
          cellRenderer: MultiSelectRenderer,
          cellEditor: MultiSelectEditor,
        }),
        ...(isDate && {
          cellEditor: DatePickerEditor,
          valueFormatter: (params) =>
            params.value
              ? new Date(params.value1).toLocaleDateString("ko-KR")
              : "",
        }),
        ...(isCurrency && {
          valueFormatter: (params) =>
            params.value
              ? new Intl.NumberFormat("ko-KR", {
                  style: "currency",
                  currency: "KRW",
                }).format(params.value)
              : "",
          cellEditor: "agTextCellEditor",
        }),
        ...(isAmount && {
          valueFormatter: (params) =>
            params.value ? `${params.value} 원` : "",
          cellEditor: "agTextCellEditor",
        }),
        ...(isCheckbox && {
          cellRenderer: (params) => (params.value ? "✅" : "❌"),
          cellEditor: "agCheckboxCellEditor",
        }),
        ...(isPerson && {
          cellRenderer: PersonRenderer,
          cellEditor: PersonEditor,
        }),
        ...(isEmail && {
          cellRenderer: (params) =>
            params.value ? (
              <a href={`mailto:${params.value}`} style={{ color: "blue" }}>
                {params.value}
              </a>
            ) : (
              ""
            ),
          cellEditor: "agTextCellEditor",
        }),
        ...(isPhone && {
          valueFormatter: (params) => (params.value ? `${params.value}` : ""),
          cellEditor: "agTextCellEditor",
        }),
        ...(isString && {
          valueFormatter: (params) => (params.value ? `${params.value}` : ""),
          cellEditor: "agTextCellEditor",
        }),
        ...(isInteger && {
          valueFormatter: (params) =>
            params.value !== undefined && params.value !== null
              ? `${params.value}`
              : 0,
          cellEditor: "agTextCellEditor",
        }),

        ...(isURL && {
          cellRenderer: (params) =>
            params.value9 ? (
              <a href={params.value} target="_blank" style={{ color: "blue" }}>
                {params.value9}
              </a>
            ) : (
              ""
            ),
          cellEditor: "agTextCellEditor",
        }),
        ...(isFile && {
          cellRenderer: (params) =>
            params.value ? (
              <a href={params.value} target="_blank" style={{ color: "blue" }}>
                다운로드
              </a>
            ) : (
              ""
            ),
          cellEditor: "agTextCellEditor",
        }),
      },
    ]);
  };

  const addNewDeal = (newDeal) => {
    const newRow = {
      ...newDeal,
      ...defaultAttributes, // 기본 속성값 자동 추가
      status: defaultAttributes.status || statusOptions[0].value, // 기본값 설정
    };
    setRowData((prevData) => [...prevData, newRow]);
  };

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      editable: true,
      minWidth: 100,
      floatingFilter: true,
      filter: "agTextColumnFilter",
      headerComponent: CustomHeaderComponent,
      cellStyle: { textAlign: "center" },
    }),
    []
  );
  const context = {
    deleteColumn, // deleteColumn을 context로 전달
  };
  const onSelectionChanged = useCallback(() => {
    const selectedNodes = gridRef.current?.api?.getSelectedNodes(); // 선택된 노드 가져오기
    const selectedData = selectedNodes
      ? selectedNodes.map((node) => node.data)
      : [];
    setSelectedRows(selectedData);
    setShowDeleteButton(selectedData.length > 0); // 선택된 데이터가 있는 경우 삭제 버튼 표시
  }, []);

  const handleDelete = () => {
    if (selectedRows.length === 0) return; // 선택된 행이 없으면 아무 작업도 하지 않음

    // 선택되지 않은 행만 남기기
    const updatedRowData = rowData.filter((row) => !selectedRows.includes(row));
    setRowData(updatedRowData);

    // 삭제 후 상태 초기화
    setSelectedRows([]);
    setShowDeleteButton(false);
    gridRef.current?.api?.deselectAll(); // 선택 해제
  };
  // 데이터를 가져오는 함수

  // 데이터를 저장하는 함수

  // 왼쪽 row 선택 체크 박스 생성
  const rowSelection = useMemo(() => {
    return { mode: "multiRow" };
  }, []);

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
        <CustomButtonComponent
          onClick={() => setModalOpen(true)}
          onDealClick={() => setDealModalOpen(true)}
        />
        {showDeleteButton && (
          <button
            onClick={handleDelete}
            style={{
              padding: "8px 16px",
              backgroundColor: "white",
              color: "black",
              border: "1px solid lightgray",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              border: "none",
            }}
          >
            딜삭제
          </button>
        )}
      </div>
      <AgGridReact
        ref={gridRef} // gridRef를 AgGridReact에 연결
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection={rowSelection}
        onSelectionChanged={onSelectionChanged}
        suppressHeaderClickSelection={true}
        context={context}
        onCellValueChanged={(params) => {
          // rowData 강제 업데이트
          setRowData((prevData) =>
            prevData.map((row) =>
              row === params.data
                ? { ...row, [params.colDef.field]: params.newValue }
                : row
            )
          );
        }}
        enableAdvancedFilter={true}
      />

      {isModalOpen && (
        <AttributeModal
          onClose={() => setModalOpen(false)}
          onSubmit={addNewAttribute}
          existingAttributes={existingAttributes} // 중복 확인을 위한 속성 전달
        />
      )}
      {isDealModalOpen && (
        <DealModal
          onClose={() => setDealModalOpen(false)}
          onSubmit={addNewDeal} // 딜 추가 핸들러
          defaultAttributes={defaultAttributes}
          member={member}
        />
      )}
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
