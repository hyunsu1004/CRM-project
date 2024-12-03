import { AgGridReact } from "ag-grid-react";
import "ag-grid-charts-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";

const BaseGrid = ({ apiEndpoint, columnDefs, editable }) => {
  const [rowData, setRowData] = useState([]);
  const [gridSettings, setGridSettings] = useState(null);

  // 데이터 로드
  useEffect(() => {
    axios
      .get(apiEndpoint)
      .then((response) => {
        setRowData(response.data);
        setGridSettings(response.data.gridSettings || null);
      })
      .catch((error) => console.error("데이터 로드 중 오류:", error));
  }, [apiEndpoint]);

  // 기본 컬럼 정의
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

  // 그리드 초기화
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

  // 셀 값 변경 시 처리
  const onCellValueChanged = useCallback(
    (event) => {
      const updatedRow = event.data;
      axios
        .post(`${apiEndpoint}/update`, updatedRow)
        .then(() => console.log("데이터 업데이트 성공:", updatedRow))
        .catch((error) => console.error("데이터 업데이트 오류:", error));
    },
    [apiEndpoint]
  );

  return (
    <div className="ag-theme-quartz" style={{ height: 500, width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        onCellValueChanged={onCellValueChanged}
      />
    </div>
  );
};

export default BaseGrid;
