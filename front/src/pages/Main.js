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
  user,
  isDarkMode,
  toggleDarkMode,
  isSidebarVisible,
  toggleSidebar,
}) => {
  return (
    <Layout user={user}>
      {/* 로그인 여부에 따라 다른 메인 컨텐츠 화면*/}
      {/* 로그인 X : 주요 기업 목록, 로그인 O : 관심 기업 목록 */}
      {/* {user ? <FavoriteGrid user={user} /> : <CompanyGrid />} */}

      {/* 주요 기업 목록 (테스트 용) */}
      <CompanyGrid />

      {/* 관심 기업 목록 (테스트 용) */}
      {/* <FavoriteGrid user={user} /> */}
    </Layout>
  );
};

export default Main;
