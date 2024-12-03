import { AgGridReact } from "ag-grid-react";
import "ag-grid-charts-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getInvestors } from "../api/api";
import { CompanyDetailModal } from "../pages/Company/CompanyDetail";

export const InvestorGrid = ({ apiEndpoint, editable, rowSelection }) => {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const columnsToShow = [
    "name",
    "category",
    "totalInvestment",
    "recentFunding",
  ];
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleOpen = (company) => {
    setSelectedCompany(company);
    setOpenModal(true); // 모달 열기
  };

  const handleClose = () => setOpenModal(false);

  useEffect(() => {
    // API에서 데이터 가져오기
    const getData = async () => {
      try {
        const response = await getInvestors();
        let data = response;
        // totalInvestment 문자열 기준으로 상위 10개만 가져오기, 만약 데이터가 없으면 빈 배열로 설정
        if (Array.isArray(data)) {
          data = data
              .filter((item) => item.totalInvestment !== undefined)
              .sort((a, b) => {
                const aValue =
                    parseFloat(a.totalInvestment.replace(/[^0-9.-]+/g, "")) || 0;
                const bValue =
                    parseFloat(b.totalInvestment.replace(/[^0-9.-]+/g, "")) || 0;
                return bValue - aValue;
              })
              .slice(0, 10);
        } else {
          data = [];
        }
        setRowData(data);

        // 컬럼 정의
        const columnDefs = [
          {
            headerName: "기업명",
            field: "name",
            onCellClicked: (params) => {
              // 상세 페이지 이동
              // navigate(`/investors/${params.data.id}`);
              // 상세 모달 열기
              handleOpen(params.data);
            },
          },
          { headerName: "제품/서비스", field: "productOrService" },
          { headerName: "기술 분야", field: "technology" },
          { headerName: "카테고리", field: "category" },
          { headerName: "총 자본금", field: "totalCapital" },
          { headerName: "총 투자금", field: "totalInvestment" },
          { headerName: "최근 투자 단계", field: "recentInvestment" },
          { headerName: "최근 펀딩 일자", field: "recentFunding" },
          { headerName: "주요 투자자", field: "keyInvestors" },
          { headerName: "선호도", field: "interest" },
        ];

        // 특정 컬럼만 보여주도록 설정
        const filteredColumnDefs = columnsToShow
            ? columnDefs.filter((colDef) => columnsToShow.includes(colDef.field))
            : columnDefs;

        setColumnDefs(filteredColumnDefs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [apiEndpoint, navigate]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      editable: editable,
      minWidth: 120,
      floatingFilter: true,
      filter: "agTextColumnFilter",
      resizable: true,
      sortable: true,
    };
  }, [editable]);

  const TopColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      suppressMenu: true,
    };
  }, [editable]);

  const gridOptions = {
    rowSelection: rowSelection,
  };

  return (
      <div style={{ height: 600, width: "100%" }}>
        <div
            className="ag-theme-quartz"
            style={{ height: "100%", width: "100%" }}
        >
          <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={TopColDef}
              rowHeight={42}
              // rowSelection={gridOptions}
          />
        </div>
        {selectedCompany && (
            <CompanyDetailModal
                type="investors"
                openModal={openModal}
                handleClose={handleClose}
                company={selectedCompany}
            />
        )}
      </div>
  );
};