import { AgGridReact } from "ag-grid-react";
import "ag-grid-charts-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

export const StartupGrid = ({ apiEndpoint, editable }) => {
    const [rowData, setRowData] = useState([]);
    const [columnDefs, setColumnDefs] = useState([]);

    useEffect(() => {
        // API에서 데이터 가져오기
        axios
            .get(apiEndpoint)
            .then((response) => {
                const data = response.data.investors;
                setRowData(data);

                // 컬럼 정의
                const columnDefs = [
                    { headerName: "기업명", field: "name" },
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

                setColumnDefs(columnDefs);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [apiEndpoint]);

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

    return (
        <div className="ag-theme-quartz" style={{ height: 500, width: "100%" }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
            />
        </div>
    );
};