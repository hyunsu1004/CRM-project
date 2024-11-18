import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useEffect } from "react";
import "../styles/grid.css";
import Layout from "../components/Layout";

const CustomButtonComponent = () => {
  return <button onClick={() => window.alert("clicked")}>Push Me!</button>;
};

const GridExample = () => {
  const [rowData, setRowData] = useState([
    {
      name: "KNUCS",
      domain: "교육",
      dealCnt: 10,
      electric: null,
      desc: "대학교 컴퓨터공학과",
      manager: "장세현",
      curState: "진행 중",
    },
    {
      name: "QuotaLab",
      domain: "데이터 분석",
      dealCnt: 0,
      electric: null,
      desc: "데이터 분석 솔루션 제공",
      manager: "이영희",
      curState: "대기",
    },
    {
      name: "Attio",
      domain: "SaaS",
      dealCnt: 2,
      electric: null,
      desc: "플랫폼 관리 도구",
      manager: "박준호",
      curState: "완료",
    },
    {
      name: "Google",
      domain: "IT/클라우드",
      dealCnt: 4,
      electric: null,
      desc: "검색 엔진과 클라우드 제공",
      manager: "홍길동",
      curState: "진행 중",
    },
    {
      name: "Naver",
      domain: "포털 서비스",
      dealCnt: 1,
      electric: null,
      desc: "포털 서비스 제공",
      manager: "최민수",
      curState: "진행 중",
    },
    {
      name: "Kakao",
      domain: "모바일/IT",
      dealCnt: 2,
      electric: null,
      desc: "메신저와 다양한 IT 서비스",
      manager: "한지수",
      curState: "대기",
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      editable: true,
    };
  }, []);
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "이름(회사명)",
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
    { field: "속성 추가", cellRenderer: CustomButtonComponent, flex: 0.5 },
  ]);

  return (
    <div
      style={{ width: "100%", height: "350px" }}
      className={"ag-theme-quartz"}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

const Main = ({
  user,
  isDarkMode,
  toggleDarkMode,
  isSidebarVisible,
  toggleSidebar,
}) => {
  return (
    <Layout user={user}>
      {/* 로그인 여부에 따라 GridExample1 또는 GridExample2 렌더링 */}
      {user ? <GridExample /> : <GridExample />}
    </Layout>
  );
};

export default Main;
