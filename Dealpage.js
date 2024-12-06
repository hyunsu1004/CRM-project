import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AttributeModal from "./AttributeModal";
import "../styles/CustomDropdown.css";
import "ag-grid-charts-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "../styles/btn.css";
import axios from "axios";
import "../styles/grid.css";
import Layout from "../components/Layout";
import ReactDOM from "react-dom";
import DealModal from "../pages/DealModal";
import { useNavigate } from "react-router-dom";
import NoteModal from "./NoteModal";
export const DealGrid = ({ member }) => {
  return (
    <div
      style={{ width: "100%", height: "70vh" }}
      className={"ag-theme-quartz"}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px", // 버튼 간격
            justifyContent: "flex-end", // 버튼 오른쪽 정렬
            marginBottom: "10px", // 전체 margin 조정
          }}
        >
          {
            <button
              onClick={handleDelete}
              style={{
                padding: "8px 16px",
                backgroundColor: "white",
                color: "black",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              딜삭제
            </button>
          }
          {
            <button
              style={{
                padding: "8px 16px",
                backgroundColor: "white",
                color: "black",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              노트 추가
            </button>
          }
        </div>
      </div>
      <AgGridReact
      //     ref={gridRef} // gridRef를 AgGridReact에 연결
      //     rowData={rowData}
      //     columnDefs={columnDefs}
      //     defaultColDef={defaultColDef}
      //     rowSelection={rowSelection}
      //     onSelectionChanged={onSelectionChanged}
      //     suppressHeaderClickSelection={true}
      //     context={context}
      //     onCellValueChanged={(params) => {
      //       // rowData 강제 업데이트
      //       setRowData((prevData) =>
      //         prevData.map((row) =>
      //           row === params.data
      //             ? { ...row, [params.colDef.field]: params.newValue }
      //             : row
      //         )
      //       );
      //     }}
      //     enableAdvancedFilter={true}
      />
      (<AttributeModal onClose={() => setModalOpen(false)}></AttributeModal>)
      {<DealModal />}
      {<NoteModal />}
    </div>
  );
};

const DealPage = () => {
  const [member, setMember] = useState(null);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("member");
    if (loggedInUser) {
      setMember(JSON.parse(loggedInUser)); // localStorage에서 사용자 정보 읽기
    }
  }, []);
  return (
    <Layout member={member}>
      <DealGrid member={member} />
    </Layout>
  );
};

export default DealPage;
