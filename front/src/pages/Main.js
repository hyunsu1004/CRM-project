import React, { useCallback, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-charts-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useEffect } from "react";
import "../styles/grid.css";
import Layout from "../components/Layout";
import AttributeModal from "./AttributeModal";
import CompanyPage, { CompanyGrid } from "./CompanyPage";

const Main = ({
  isDarkMode,
  toggleDarkMode,
  isSidebarVisible,
  toggleSidebar,
}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser)); // localStorage에서 사용자 정보 읽기
    }
  }, []);
  
  return (
    <Layout user={user}>
      <CompanyGrid />
    </Layout>
  );
};

export default Main;
