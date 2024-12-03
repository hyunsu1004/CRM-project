import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AttributeModal from "./AttributeModal";
import Layout from "../components/Layout";
import "../styles/btn.css";
import axios from "axios";

const CustomButtonComponent = ({ onClick }) => {
  return (
    <button className="btn" onClick={onClick}>
      속성 추가
    </button>
  );
};

export const FavoriteGrid = () => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  // 모달에서 추가된 속성 데이터를 그리드에 반영할 수 있는 함수
  const addNewAttribute = (newAttribute) => {
    setRowData((prevData) => [...prevData, newAttribute]); // 새로운 속성을 그리드에 추가
  };

  const [columnDefs] = useState([
    {
      headerName: "회사명",
      field: "name",
      filter: "agSetColumnFilter",
      flex: 1,
    },
    {
      headerName: "기술",
      field: "technology",
      flex: 1,
      filter: "agSetColumnFilter",
      // 계층 보기
      // rowGroup: true,
      // hide: true,
    },
    {
      headerName: "분야",
      field: "category",
      flex: 1,
      filter: "agSetColumnFilter",
      // 계층 보기
      // rowGroup: true,
      // hide: true,
    },
    {
      headerName: "제품/서비스",
      field: "productOrService",
      flex: 2,
      filter: "agTextColumnFilter",
    },
    {
      headerName: "총 자본금",
      field: "totalCapital",
      flex: 1,
      filter: "agNumberColumnFilter",
      valueFormatter: (p) => p.value + " 억원",
    },
    {
      headerName: "총 투자유치금",
      field: "totalInvestment",
      flex: 1,
      filter: "agNumberColumnFilter",
      valueFormatter: (p) => p.value + " 억원",
    },
    {
      headerName: "최근 투자 상태",
      field: "recentInvestment",
      flex: 1,
      filter: "agSetColumnFilter",
      // 투자 진행 상태 목록이 특정되면 set로 지정해서 선택하도록 수정 (예정)
      // cellEditor: "agSelectCellEditor",
      // cellEditorParams: {
      //   values: ["대기", "진행 중", "완료"],
      // },
      // cellClassRules: {
      //   "gray": 'value === "대기"',
      //   "blue": 'value === "진행 중"',
      //   "green": 'value === "완료"',
      // },
    },
    {
      headerName: "최근 투자 유치",
      field: "recentFunding",
      flex: 1,
      filter: "agDateColumnFilter",
      dataTypeDefinitions: "date",
    },
    {
      headerName: "주요 투자자",
      field: "keyInvestors",
      flex: 1,
      filter: "agTextColumnFilter",
    },
    // { headerName: "설명", field: "desc", flex: 1.5 },
    // { headerName: "담당자", field: "manager", flex: 1 },
    // {
    //   headerName: "진행 상태",
    //   field: "curState",
    //   flex: 1,
    //   cellEditor: "agSelectCellEditor",
    //   cellEditorParams: {
    //     values: ["대기", "진행 중", "완료"],
    //   },
    //   cellClassRules: {
    //     "gray-background": 'value === "대기"',
    //     "blue-background": 'value === "진행 중"',
    //     "green-background": 'value === "완료"',
    //   },
    // },
    // {
    //   headerName: "딜 횟수",
    //   field: "dealCnt",
    //   valueFormatter: (p) => Math.floor(p.value).toLocaleString() + " 회",
    //   flex: 0.5,
    //   cellEditor: "agNumberCellEditor",
    //   cellEditorParams: {
    //     precision: 2,
    //     step: 1,
    //     showStepperButtons: true,
    //   },
    // },
  ]);

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      editable: true,
      minWidth: 100,
      floatingFilter: true,
      filter: "agTextColumnFilter",
      suppressHeaderMenuButton: true,
      suppressHeaderContextButton: true,
    }),
    []
  );

  // 데이터를 가져오는 함수
  const fetchGridData = useCallback(async () => {
    try {
      const response = await axios.get(`/api/company`);
      setRowData(response.data); // 백엔드에서 받아온 데이터 설정
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    }
  }, []);

  // 데이터를 저장하는 함수
  const saveGridData = useCallback(async () => {
    const updatedRows = gridRef.current.api
      .getRenderedNodes()
      .map((node) => node.data);
    try {
      await axios.post(`/api/company`, updatedRows);
      alert("데이터 저장 성공!");
    } catch (error) {
      console.error("데이터 저장 실패:", error);
    }
  }, []);

  // Ver.Collabo 그리드 준비 시 데이터 가져오기 (백엔드 협업)
  // const onGridReady = useCallback(() => {
  //   fetchGridData(); // 그리드가 준비되면 데이터 로드
  // }, [fetchGridData]);

  // useEffect(() => {
  //   // 스프링 백엔드에서 데이터 가져오기
  //   const fetchData = async () => {
  //     const response = await fetch("/api/data"); // API 엔드포인트
  //     const data = await response.json();
  //     setRowData(data);
  //   };
  //   fetchData();
  // }, []);

  // Ver.LocalTest 그리드에 데이터 받아와서 매핑 (public/json/company.json 파일)
  const onGridReady = useCallback((params) => {
    fetch("/json/company.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data.favorite));
  }, []);

  // 왼쪽 row 선택 체크 박스 생성
  const rowSelection = useMemo(() => {
    return { mode: "multiRow" };
  }, []);

  return (
    <div
      style={{ width: "100%", height: "70vh" }}
      className={"ag-theme-quartz"}
    >
      <CustomButtonComponent onClick={() => setModalOpen(true)} />
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        rowSelection={rowSelection}
        pagination={true}
        paginationPageSize={10}
        // onFirstDataRendered={onFirstDataRendered}
        enableAdvancedFilter={true}
        sideBar={true}
      />
      {isModalOpen && (
        <AttributeModal
          onClose={() => setModalOpen(false)}
          onSubmit={addNewAttribute}
        />
      )}
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
