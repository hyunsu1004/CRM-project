// (미완성) 나중에 통합 사용할 수 있도록 CompanyGrid 컴포넌트를 작성
import { AgGridReact } from "ag-grid-react";
import "ag-grid-charts-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getColumnDefinitions, getDefaultColDef } from "./GridOption"; // 유틸리티 파일에서 가져오기
import { getInvestors, getStartups } from "../api/api";

export const CompanyGrid = ({ apiEndpoint, editable, company, show }) => {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const navigate = useNavigate();

  const gridOptions = {
    context: { navigate }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        // API에서 데이터 가져오기
        // const response = await axios.get('/json/company.json');
        let data = company === 'startups' ? await getStartups() : await getInvestors();

        // 데이터 정렬: 총 투자금 기준 상위 10개
        if (Array.isArray(data)) {
          data = data
            .filter((item) => item.totalInvestment !== undefined)
            .sort((a, b) => {
              const aValue = parseFloat(a.totalInvestment.replace(/[^0-9.-]+/g, "")) || 0;
              const bValue = parseFloat(b.totalInvestment.replace(/[^0-9.-]+/g, "")) || 0;
              return bValue - aValue;
            })
            .slice(0, 10);
        } else {
          data = [];
        }

        setRowData(data);
        setColumnDefs(getColumnDefinitions(company, show));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [apiEndpoint, company]);

  const defaultColDef = useMemo(() => getDefaultColDef(company), [company]);

  return (
    <div className="ag-theme-quartz" style={{ height: 600, width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        context={{ navigate }}
        rowHeight={42}
      />
    </div>
  );
};