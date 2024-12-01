import { AgGridReact } from "ag-grid-react";
import { useCallback, useMemo, useRef, useState } from "react";
import AttributeModal from "./AttributeModal";
import Layout from "../components/Layout";
import axios from "axios";

var filterParams = {
  comparator: (filterLocalDateAtMidnight, cellValue) => {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split("-");
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0]),
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return 0;
  },
  minValidYear: 2000,
  maxValidYear: 2100,
  inRangeFloatingFilterDateFormat: "YYYY. MM. DD.",
};

export const CompanyGrid = () => {
  const gridRef = useRef();
  const [isModalOpen, setModalOpen] = useState(false);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
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
      filter: "agTextColumnFilter",
      // filter: "agNumberColumnFilter",
      // valueFormatter: p => p.value + ' 억원'
    },
    {
      headerName: "총 투자유치금",
      field: "totalInvestment",
      flex: 1,
      filter: "agTextColumnFilter",
      // filter: "agNumberColumnFilter",
      // valueFormatter: p => p.value + ' 억원'
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
      filterParams: filterParams,
    },
    {
      headerName: "주요 투자자",
      field: "keyInvestors",
      flex: 1,
      filter: "agTextColumnFilter",
    }
  ]);

  // 기본 Col 타입 지정
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      editable: false,
      minWidth: 100,
      floatingFilter: true,
      filter: "agTextColumnFilter",
      suppressHeaderMenuButton: true,
      suppressHeaderContextButton: true,
    };
  }, []);

  // 데이터를 가져오는 함수
  const fetchGridData = useCallback(async () => {
    try {
      const response = await axios.get(`/api/company`);
      setRowData(response.data); // 백엔드에서 받아온 데이터 설정
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    }
  }, []);

  // Ver.MockServerTest (임시 API 이용 테스트)
  // (https://5690fba9-a6e4-4e64-81c7-fae1c69ed8aa.mock.pstmn.io/api/company)
  // const fetchGridData = useCallback(async () => {
  //   try {
  //     const response = await axios.get(`https://5690fba9-a6e4-4e64-81c7-fae1c69ed8aa.mock.pstmn.io/api/company`);
  //     setRowData(response.data); // 백엔드에서 받아온 데이터 설정
  //   } catch (error) {
  //     console.error("데이터 가져오기 실패:", error);
  //   }
  // }, []);

  // 데이터를 저장하는 함수
  const saveGridData = useCallback(async () => {
    const updatedRows = gridRef.current.api.getRenderedNodes().map((node) => node.data);
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

  //Ver.LocalTest 그리드에 데이터 받아와서 매핑 (public/json/company.json 파일)
  const onGridReady = useCallback((params) => {
    fetch("/json/company.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data.company));
  }, []);

  // 왼쪽 row 선택 체크 박스 생성
  const rowSelection = useMemo(() => {
    return { mode: "multiRow" };
  }, []);

  return (
    <div style={gridStyle} className={"ag-theme-quartz"}>
      {/* 기본 보기 */}
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        rowSelection={rowSelection}
        pagination={true}
        paginationPageSize={10}
        // onFirstDataRendered={onFirstDataRendered}
        // enableAdvancedFilter={true}
      />
      {/* 분야별 계층 보기 */}
      {/* <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        // sideBar={"filters"}
        // 새로고침 후 화면에 바로 나올때 필터 펼치기 랜더링 유무
        // onFirstDataRendered={onFirstDataRendered}
        autoGroupColumnDef={autoGroupColumnDef}
        // initialState={initialState}
        dataTypeDefinitions={dataTypeDefinitions}
        enableAdvancedFilter={true}
        // 그룹화 된 칼럼을 얼마나 펼칠지 기본값으로 설정
        groupDefaultExpanded={2}
      /> */}
      {isModalOpen && <AttributeModal onClose={() => setModalOpen(false)} />}
    </div>
  );
};

const CompanyPage = ({ user, isDarkMode }) => {
  return (
    <Layout user={user}>
      <CompanyGrid user={user} isDarkMode={isDarkMode} />
    </Layout>
  );
};

export default CompanyPage;
