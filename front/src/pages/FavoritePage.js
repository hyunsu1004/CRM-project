import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useState } from "react";
import AttributeModal from "./AttributeModal";
import Layout from "../components/Layout";
import "../styles/btn.css";

const CustomButtonComponent = ({ onClick }) => {
  return (
    <button className="btn" onClick={onClick}>
      속성 추가
    </button>
  );
};

export const FavoriteGrid = () => {
  const [rowData, setRowData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  // 모달에서 추가된 속성 데이터를 그리드에 반영할 수 있는 함수
  const addNewAttribute = (newAttribute) => {
    setRowData((prevData) => [...prevData, newAttribute]); // 새로운 속성을 그리드에 추가
  };

  useEffect(() => {
    // 스프링 백엔드에서 데이터 가져오기
    const fetchData = async () => {
      const response = await fetch("/api/data"); // API 엔드포인트
      const data = await response.json();
      setRowData(data);
    };
    fetchData();
  }, []);

  const defaultColDef = useMemo(
    () => ({
      editable: true,
    }),
    []
  );

  const [columnDefs] = useState([
    {
      headerName: "회사명",
      valueGetter: (p) => p.data.name,
      flex: 1,
    },
    { headerName: "분야", field: "domain", flex: 1 },
    { headerName: "설명", field: "desc", flex: 1.5 },
    { headerName: "담당자", field: "manager", flex: 1 },
    {
      headerName: "진행 상태",
      field: "curState",
      flex: 1,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["대기", "진행 중", "완료"],
      },
      cellClassRules: {
        "gray-background": 'value === "대기"',
        "blue-background": 'value === "진행 중"',
        "green-background": 'value === "완료"',
      },
    },
    {
      headerName: "딜 횟수",
      field: "dealCnt",
      valueFormatter: (p) => Math.floor(p.value).toLocaleString() + " 회",
      flex: 0.5,
      cellEditor: "agNumberCellEditor",
      cellEditorParams: {
        precision: 2,
        step: 1,
        showStepperButtons: true,
      },
    },
  ]);

  return (
    <div
      style={{ width: "100%", height: "350px" }}
      className={"ag-theme-quartz"}
    >
      <CustomButtonComponent onClick={() => setModalOpen(true)} />
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
      />
      {isModalOpen && <AttributeModal onClose={() => setModalOpen(false)} onSubmit={addNewAttribute} />}
    </div>
  );
};

const FavoritePage = ({ user, isDarkMode }) => {
  return (
    <Layout user={user} isDarkMode={isDarkMode}>
      <FavoriteGrid user={user} isDarkMode={isDarkMode} />
    </Layout>
  );
};

export default FavoritePage;
