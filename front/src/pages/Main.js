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
import { StartupGrid } from "../grids/StartupGrid";
import { InvestorGrid } from "../grids/InvestorGrid";

const Main = () => {
  const [member, setMember] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

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
            환영합니다,{" "}
            <span style={{ fontWeight: 900, color: "var(--mid-color)" }}>
              {member?.name || "Guest"}
            </span>{" "}
            님
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

        <Box
          sx={{
            height: "550px",
            p: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              height: "550px",
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              border: "2px solid var(--top-color)",
              borderRadius: "20px",
              flex: 1
            }}
          >
            <Typography variant="h6">
              <span style={{ fontWeight: 900, color: "var(--mid-color)" }}>
                TOP10 스타트업
              </span>
            </Typography>
            <StartupGrid />
          </Box>

          <Box
            sx={{
              height: "550px",
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              border: "2px solid var(--top-color)",
              borderRadius: "20px",
              flex: 1
            }}
          >
            <Typography variant="h6">
              <span style={{ fontWeight: 900, color: "var(--mid-color)" }}>
                TOP 10 투자자
              </span>
            </Typography>
            <InvestorGrid />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Main;
