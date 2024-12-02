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
import { useNavigate } from "react-router-dom";
// 공통 설정 및 옵션 상수 분리
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

    // 딜 ID가 없을 경우, 새로운 ID 생성 (프론트 임시 생성)
    // const dealId = props.node.data.dealId || `deal_${Date.now()}`;
    const dealId = props.node.data.dealId;
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
// DealGrid Component
export const DealGrid = () => {
  const [member, setMember] = useState(null);
  const gridRef = useRef();
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDealModalOpen, setDealModalOpen] = useState(false);
  const [existingAttributes, setExistingAttributes] = useState([]);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("member");
    if (loggedInUser) {
      setMember(JSON.parse(loggedInUser)); // localStorage에서 사용자 정보 읽기
    }
  }, []);
  const navigate = useNavigate();
  //딜 데이터 불러오기 백엔드 처리필요
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get("/api/deals", {
          // withCredentials: true,
        });
        setRowData(response.data); // 백엔드로부터 데이터를 설정
      } catch (error) {
        console.error("딜 데이터를 가져오는 데 실패했습니다.", error);
      }
    };

    fetchDeals();
  }, []);
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "회사명",
      field: "companyname",
      filter: "agSetColumnFilter",
      flex: 1,
      onCellClicked: (params) => {
        const selectedRow = params.data;
        navigate(`/deals/${selectedRow.id}`);
      },
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
      cellRenderer: StatusCellRenderer,
      cellEditor: StatusDropdownEditor,
      editable: true,
      filter: "agSetColumnFilter",
      cellStyle: { minWidth: "200px" },
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
        const companyName = params.data.companyname;
        navigate(`/note/${companyName}`);
      },
    },
  ]);

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
    deleteColumn: (field) => {
      setColumnDefs((prevDefs) =>
        prevDefs.filter((colDef) => colDef.field !== field)
      );
      setRowData((prevData) =>
        prevData.map((row) => {
          const { [field]: _, ...rest } = row;
          return rest;
        })
      );
    },
  };

  const handleDelete = () => {
    if (selectedRows.length === 0) return;

    //딕삭제 처리 백엔드 연결필요
    // try {
    //   const selectedIds = selectedRows.map((row) => row.id); // 삭제할 딜 ID 목록
    //   await axios.delete("/api/deals", {
    //     data: { ids: selectedIds },
    //     withCredentials: true,
    //   });

    //   // 로컬 데이터에서 삭제
    //   const updatedRowData = rowData.filter((row) => !selectedRows.includes(row));
    //   setRowData(updatedRowData);

    //   setSelectedRows([]);
    //   setShowDeleteButton(false);
    //   gridRef.current?.api?.deselectAll(); // 선택 해제
    // } catch (error) {
    //   console.error("딜 삭제 실패:", error);
    //   alert("딜 삭제 중 오류가 발생했습니다.");
    // }

    const updatedRowData = rowData.filter((row) => !selectedRows.includes(row));
    setRowData(updatedRowData);
    setSelectedRows([]);
    setShowDeleteButton(false);
    gridRef.current?.api?.deselectAll();
  };

  const onSelectionChanged = useCallback(() => {
    const selectedNodes = gridRef.current?.api?.getSelectedNodes();
    const selectedData = selectedNodes
      ? selectedNodes.map((node) => node.data)
      : [];
    setSelectedRows(selectedData);
    setShowDeleteButton(selectedData.length > 0);
  }, []);

  const addNewDeal = async (newDeal) => {
    //딜 추가 처리 백엔드 연결 필요
    try {
      const response = await axios.post("/api/member/adddeals", newDeal, {
        withCredentials: true,
      });

      // 서버에서 반환한 딜 데이터를 로컬에 추가
      const savedDeal = response.data;
      console.log("서버에서 반환된 딜 데이터: ", savedDeal);
      setRowData((prevData) => [...prevData, savedDeal]);
    } catch (error) {
      console.error("딜 추가 실패:", error);
      alert("딜 추가 중 오류가 발생했습니다.");
    }
    const newRow = {
      ...newDeal,
    };
    setRowData((prevData) => [...prevData, newRow]);
  };

  const addNewAttribute = (newAttribute) => {
    // 기존 코드
    // const isSelect = newAttribute.dataType === "select";
    // const isMultiSelect = newAttribute.dataType === "multiSelect";
    // const isDate = newAttribute.dataType === "date";
    // const isCurrency = newAttribute.dataType === "currency";
    // const isAmount = newAttribute.dataType === "amount";
    // const isCheckbox = newAttribute.dataType === "checkbox";
    // const isPerson = newAttribute.dataType === "person";
    // const isEmail = newAttribute.dataType === "email";
    // const isPhone = newAttribute.dataType === "phone";
    // const isURL = newAttribute.dataType === "url";
    // const isFile = newAttribute.dataType === "file";
    // const isInteger = newAttribute.dataType === "integer";
    // const isString = newAttribute.dataType === "string";

    // const uniqueFieldName = `${newAttribute.name}_${Date.now()}`;

    // // 새로운 속성에 대한 기본값 설정
    // const getDefaultValue = () => {
    //   if (isSelect) return "";
    //   if (isMultiSelect) return "";
    //   if (isDate) return null;
    //   if (isCurrency || isAmount || isInteger) return 0;
    //   if (isCheckbox) return false;
    //   if (isPerson || isEmail || isPhone || isURL || isFile || isString) return "";
    //   return newAttribute.defaultValue || "";
    // };

    // // 1. 기존 데이터 유지 + 새로운 속성 추가
    // const updatedRowData = rowData.map((row) => ({
    //   ...row, // 기존 데이터 유지
    //   [uniqueFieldName]: row[uniqueFieldName] || getDefaultValue(), // 새 속성 기본값 설정
    // }));

    // // 2. rowData 업데이트
    // setRowData(updatedRowData);

    // // 3. 새로운 컬럼 정의 추가
    // setColumnDefs((prevDefs) => [
    //   ...prevDefs,
    //   {
    //     headerName: newAttribute.name,
    //     field: uniqueFieldName, // 여기를 uniqueFieldName으로 변경하여 올바른 필드를 참조하도록 수정
    //     flex: 1,
    //     editable: true,
    //     filter: "agTextColumnFilter",
    //     ...(isSelect && {
    //       cellRenderer: SelectCellRenderer,
    //       cellEditor: SeriesDropdownEditor,
    //     }),
    //     ...(isMultiSelect && {
    //       cellRenderer: MultiSelectRenderer,
    //       cellEditor: MultiSelectEditor,
    //     }),
    //     ...(isDate && {
    //       cellEditor: DatePickerEditor,
    //       valueFormatter: (params) =>
    //         params.value ? new Date(params.value).toLocaleDateString("ko-KR") : "",
    //     }),
    //     ...(isCurrency && {
    //       valueFormatter: (params) =>
    //         params.value
    //           ? new Intl.NumberFormat("ko-KR", {
    //               style: "currency",
    //               currency: "KRW",
    //             }).format(params.value)
    //           : "",
    //       cellEditor: "agTextCellEditor",
    //     }),
    //     ...(isAmount && {
    //       valueFormatter: (params) => (params.value ? `${params.value} 원` : ""),
    //       cellEditor: "agTextCellEditor",
    //     }),
    //     ...(isCheckbox && {
    //       cellRenderer: (params) => (params.value ? "✅" : "❌"),
    //       cellEditor: "agCheckboxCellEditor",
    //     }),
    //     ...(isPerson && {
    //       cellRenderer: PersonRenderer,
    //       cellEditor: PersonEditor,
    //     }),
    //     ...(isEmail && {
    //       cellRenderer: (params) =>
    //         params.value ? (
    //           <a href={`mailto:${params.value}`} style={{ color: "blue" }}>
    //             {params.value}
    //           </a>
    //         ) : (
    //           ""
    //         ),
    //       cellEditor: "agTextCellEditor",
    //     }),
    //     ...(isPhone && {
    //       valueFormatter: (params) => (params.value ? `${params.value}` : ""),
    //       cellEditor: "agTextCellEditor",
    //     }),
    //     ...(isString && {
    //       valueFormatter: (params) => (params.value ? `${params.value}` : ""),
    //       cellEditor: "agTextCellEditor",
    //     }),
    //     ...(isInteger && {
    //       valueFormatter: (params) =>
    //         params.value !== undefined && params.value !== null ? `${params.value}` : 0,
    //       cellEditor: "agTextCellEditor",
    //     }),
    //     ...(isURL && {
    //       cellRenderer: (params) =>
    //         params.value ? (
    //           <a href={params.value} target="_blank" rel="noopener noreferrer" style={{ color: "blue" }}>
    //             {params.value}
    //           </a>
    //         ) : (
    //           ""
    //         ),
    //       cellEditor: "agTextCellEditor",
    //     }),
    //     ...(isFile && {
    //       cellRenderer: (params) =>
    //         params.value ? (
    //           <a href={params.value} target="_blank" rel="noopener noreferrer" style={{ color: "blue" }}>
    //             다운로드
    //           </a>
    //         ) : (
    //           ""
    //         ),
    //       cellEditor: "agTextCellEditor",
    //     }),
    //   },
    // ]);
    // 아래 수정한 코드
    const uniqueFieldName = `${newAttribute.name}_${Date.now()}`;

    setRowData((prevData) =>
      prevData.map((row) => ({
        ...row,
        [uniqueFieldName]: row[uniqueFieldName] || "",
      }))
    );

    setColumnDefs((prevDefs) => [
      ...prevDefs,
      {
        headerName: newAttribute.name,
        field: uniqueFieldName,
        flex: 1,
        editable: true,
        filter: "agTextColumnFilter",
        cellEditor:
          newAttribute.dataType === "multiSelect"
            ? MultiSelectEditor
            : "agTextCellEditor",
      },
    ]);
  };

  return (
    <Layout member={member}>
      <div
        style={{ width: "100%", height: "70vh" }}
        className="ag-theme-quartz"
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              width: "fit-content",
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <button
              onClick={() => setModalOpen(true)}
              style={{ padding: "8px 16px", fontSize: "14px" }}
            >
              속성 추가
            </button>
            <button
              onClick={() => setDealModalOpen(true)}
              style={{ padding: "8px 16px", fontSize: "14px" }}
            >
              딜 추가
            </button>
          </div>

          {showDeleteButton && (
            <button
              onClick={handleDelete}
              style={{ padding: "8px 16px", fontSize: "14px" }}
            >
              딜 삭제
            </button>
          )}
        </div>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection={{ type: "multiple" }}
          context={context}
          onSelectionChanged={onSelectionChanged}
          onCellValueChanged={async (params) => {
            // 새로운 코드
            console.log("Cell value changed:", params.data);
            console.log("Updated field:", params.colDef.field);
            console.log("Updated value:", params.newValue);

            setRowData((prevData) =>
              prevData.map((row) =>
                row === params.data
                  ? { ...row, [params.colDef.field]: params.newValue }
                  : row
              )
            );
            // 이전 코드
            // // rowData 강제 업데이트
            // const updateStatus = { ...params.data }; //수정된 행 데이터를 가져옴.
            // console.log("업데이트 딜 검토 상태 : ", updateStatus); //서버에 전달될 데이터 확인.

            // const { id } = updateStatus; //id와 status를 추출.
            // //백엔드로 변경된 데이터 전송
            // try {
            //   const response = await axios.put(
            //     `/api/member/deals/${id}`,
            //     updateStatus,
            //     {
            //       headers: { "Content-Type": "application/json" },
            //     }
            //   );
            //   if (response.status === 200) {
            //     //백엔드에서 데이터 업데이트 성공.
            //     console.log("딜 업데이트 성공");
            //     if (!params.node.isSelected()) {
            //       //이미 선택된 상태라면 alert가 중복되지 않게 .
            //       alert("검토 상태가 성공적으로 업데이트 됐습니다.");
            //     }
            //   } else {
            //     throw new Error("업데이트 실패");
            //   }
            // } catch (error) {
            //   console.error("딜 업데이트 실패 : ", error);
            //   alert("검토 상태 업데이트 중 오류가 생겼습니다.");
            //   //실패시 , 수정된 값을 이전 상태로 복원.
            //   params.node.setDataValue("status", params.oldValue);
            // }
          }}
        />
        {isModalOpen && (
          <AttributeModal
            onClose={() => setModalOpen(false)}
            onSubmit={addNewAttribute}
            existingAttributes={existingAttributes}
          />
        )}
        {isDealModalOpen && (
          <DealModal
            onClose={() => setDealModalOpen(false)}
            onSubmit={addNewDeal}
          />
        )}
      </div>
    </Layout>
  );
};

export default DealGrid;
