import { AgGridReact } from "ag-grid-react";
import "ag-grid-charts-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useEffect } from "react";
import "../styles/grid.css";
import Layout from "../components/Layout";
import { CompanyGrid } from "./CompanyPage";
import { AppBar, Box, Tab, Tabs, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ height: "520px", p: 2 }}>{children}</Box>}
    </div>
  );
};

const StartupGrid = ({ apiEndpoint }) => {
  const [rowData, setRowData] = useState([]);
  const [gridSettings, setGridSettings] = useState(null);

  useEffect(() => {
    // API에서 데이터 가져오기
    axios
      .get(apiEndpoint)
      .then((response) => {
        setRowData(response.data.initialData);
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

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={gridSettings ? gridSettings.columns : []}
        defaultColDef={{
          resizable: true,
          sortable: true,
          filter: true,
        }}
        onGridReady={onGridReady}
      />
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
        <AppBar position="static" color="">
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="전체 기업" />
            {/* 로그인 시에만 보이는 탭 */}
            {member?<Tab label="선호 기업" />:null}
          </Tabs>
        </AppBar>

        {/* 탭 컨텐츠 */}
        <TabPanel value={tabIndex} index={0}>
          {/* 기업 전체 데이터 */}
          {pageType === "스타트업" ? (
            <StartupGrid apiEndpoint="/api/member/${memberId}/startups" />
          ) : (
            <StartupGrid apiEndpoint="/api/member/${memberId}/investors" />
          )}
          {/* 임시 */}
          {/* <CompanyGrid /> */}
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          {member ? <CompanyGrid /> : <div><h1>선호 기업을 관리하려면 로그인이 필요합니다.</h1></div>}
          {/* 선호 기업 데이터 */}
          {/* {pageType === "스타트업" ? (
            <StartupGrid apiEndpoint="/api/member/${memberId}/startups/favorite" />
          ) : (
            <StartupGrid apiEndpoint="/api/member/${memberId}/investors/favorite" />
          )} */}
          {/* 임시 */}
        </TabPanel>
      </Box>
    </Layout>
  );
};

export default DatabasePage;
