import { AgGridReact } from "ag-grid-react";
import "ag-grid-charts-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useEffect, useMemo, useCallback } from "react";
import "../styles/grid.css";
import Layout from "../components/Layout";
import { CompanyGrid } from "./CompanyPage";
import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ height: "520px", p: 2 }}>{children}</Box>}
    </div>
  );
};

const StartupGrid = ({ apiEndpoint, editable }) => {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const [gridSettings, setGridSettings] = useState(null);

  useEffect(() => {
    // API에서 데이터 가져오기
    axios
      .get(apiEndpoint)
      .then((response) => {
        // 기업 데이터를 받아옴
        const data = response.data;

        setRowData(data);

        // 기업 컬럼 정의
        const columnDefs = [
          {
            headerName: "기업명",
            field: "name",
          },
          {
            headerName: "제품/서비스",
            field: "productOrService",
          },
          {
            headerName: "기술 분야",
            field: "technology",
          },
          {
            headerName: "카테고리",
            field: "category",
          },
          {
            headerName: "총 자본금",
            field: "totalCapital",
          },
          {
            headerName: "총 투자금",
            field: "totalInvestment",
          },
          {
            headerName: "최근 투자 단계",
            field: "recentInvestment",
          },
          {
            headerName: "최근 펀딩 일자",
            field: "recentFunding",
          },
          {
            headerName: "주요 투자자",
            field: "keyInvestors",
          },
          {
            headerName: "선호 여부",
            field: "interest",
          },
        ];

        setColumnDefs(columnDefs);
        setGridSettings(response.data.gridSettings);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [apiEndpoint]);

  const onGridReady = (params) => {
    const { columnApi, gridApi } = params;
    if (gridSettings) {
      columnApi.applyColumnState({
        state: gridSettings.columns,
        applyOrder: true,
      });
      gridApi.setSortModel(gridSettings.sortModel);
      gridApi.setFilterModel(gridSettings.filterModel);
    }
  };

  // 기본 Col 타입 지정
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      editable: editable,
      minWidth: 100,
      floatingFilter: true,
      filter: "agTextColumnFilter",
      resizable: true,
      sortable: true,
    };
  }, [editable]);

  // 빈 row 추가 함수
  const addNewRow = () => {
    const newRow = {
      name: "",
      productOrService: "",
      technology: "",
      category: "",
      totalCapital: "",
      totalInvestment: "",
      recentInvestment: "",
      recentFunding: "",
      keyInvestors: "",
    };
    setRowData([...rowData, newRow]);
  };

  // 데이터 저장 API 요청 함수
  const saveToServer = (updatedRowData) => {
    const dataTosend = Array.isArray(updatedRowData)
      ? updatedRowData
      : [updatedRowData];
    axios
      .post(`${apiEndpoint}/interest`, dataTosend) // 데이터 저장을 위한 API POST 요청
      .then((response) => {
        console.log("데이터가 성공적으로 저장되었습니다:", response.data);
      })
      .catch((error) => {
        console.error("서버에 데이터 저장 중 오류 발생:", error);
      });
  };

  // 셀 값 변경 시 호출되는 함수
  const onCellValueChanged = (event) => {
    const updatedRowData = event.data;
    saveToServer(updatedRowData); // 변경된 데이터를 서버에 저장
  };

  // row 선택
  const rowSelection = useMemo(() => {
    return { mode: "multiRow" };
  }, []);

  const onRowSelected = useCallback(
    (event) => {
      // 선택된 행의 'interest' 값을 토글
      const selectedNode = event.node;
      const isFollowed = selectedNode.data.interest;

      // 'interest' 값을 반전시켜 팔로우/언팔로우 상태를 변경
      selectedNode.setDataValue("interest", !isFollowed);

      const updatedRowData = selectedNode.data

      saveToServer(updatedRowData)



      // 알림 표시
      if (event.node.isSelected()) {
        window.alert(event.node.data.name + " 이 관심기업에 추가되었습니다.");
      } else {
        window.alert(event.node.data.name + " 이 관심기업에서 해제되었습니다.");
      }
      // {
      //   event.node.isSelected()
      //     ? window.alert(
      //         event.node.data.name + " 이 관심기업에 추가되었습니다."
      //       )
      //     : window.alert(
      //         event.node.data.name + " 이 관심기업에서 해제되었습니다."
      //       );
      // }
    },
    [window]
  );

  const onSelectionChanged = useCallback(
    (event) => {
      var rowCount = event.api.getSelectedNodes().length;
    },
    []
  );

  // GridOptions 설정
  const gridOptions = {
    rowSelection: 'multiRow',
    onSelectionChanged: onSelectionChanged,
    onRowSelected: onRowSelected
  }

  return (
    <div className="ag-theme-quartz" style={{ height: 500, width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        onCellValueChanged={onCellValueChanged}
        rowSelection={rowSelection}
        gridOptions={gridOptions}
      />
      <button onClick={addNewRow}>추가</button>
    </div>
  );
};

const DatabasePage = () => {
  const [member, setMember] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation(); // 현재 경로를 가져옴

  // 페이지 유형을 경로에 따라 설정
  const pageType = location.pathname.includes("startups")
    ? "스타트업"
    : "투자자";

  useEffect(() => {
    const loggedInUser = localStorage.getItem("member");
    if (loggedInUser) {
      setMember(JSON.parse(loggedInUser)); // localStorage에서 사용자 정보 읽기
    }
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // 추가적으로 검색 API 요청 로직을 여기에 추가 가능
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Layout member={member}>
      <Box sx={{ width: "100%", bgcolor: "transparent" }}>
        {/* 검색 바 */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">
            <span style={{ fontWeight: 900, color: "var(--mid-color)" }}>
              {pageType}
            </span>{" "}
            페이지에 오신 것을 환영합니다
          </Typography>
          <TextField
            label="검색"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            size="small"
            sx={{ width: 300 }}
          />
        </Box>

        {/* 탭 메뉴 */}
        <AppBar position="static" color="default">
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="전체 기업" />
            {/* 로그인 시에만 보이는 탭 */}
            {member ? <Tab label="선호 기업" /> : null}
          </Tabs>
        </AppBar>

        {/* 탭 컨텐츠 */}
        <TabPanel value={tabIndex} index={0}>
          {/* 기업 전체 데이터 */}
          {pageType === "스타트업" ? (
            <StartupGrid
              apiEndpoint={`/api/member/startups`}
              editable={false}
            />
          ) : (
            <StartupGrid
              apiEndpoint={`/api/member/investors`}
              editable={false}
            />
          )}
          {/* 임시 */}
          {/* <CompanyGrid /> */}
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          {pageType === "스타트업" ? (
            <StartupGrid
              apiEndpoint={`/api/member/startups/interest`}
              editable={true}
            />
          ) : (
            <StartupGrid
              apiEndpoint={`/api/member/investors/interest`}
              editable={true}
            />
          )}
        </TabPanel>
      </Box>
    </Layout>
  );
};

export default DatabasePage;
