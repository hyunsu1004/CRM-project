// 필요한 라이브러리 import
import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Grid,
  Box,
  TextField,
  Divider,
} from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Layout from "../../components/Layout";
import NotePage from "../Note/NotePage";
import axios from "axios";

// 딜 데이터를 관리하기 위한 예시 데이터
const dealRows = [
  {
    id: 1,
    company: "Company A",
    createdAt: "2023-12-01",
    status: "검토 중",
    notes: ["첫번째 딜 노트"],
  },
  {
    id: 2,
    company: "Company B",
    createdAt: "2023-12-02",
    status: "완료",
    notes: ["두번째 딜 노트"],
  },
  // 추가적인 데이터들...
];

// 주요 컬럼 정의
const dealColumns = [
  { headerName: "회사명", field: "company", width: 150 },
  { headerName: "생성 일시", field: "createdAt", width: 150 },
  { headerName: "검토 상태", field: "status", width: 150 },
];

export const DealDashboard = () => {
  // 멤버 정보 관리
  const [member, setMember] = useState(null);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("member");
    if (loggedInUser) {
      setMember(JSON.parse(loggedInUser)); // localStorage에서 사용자 정보 읽기
    }
  }, []);
  const navigate = useNavigate();

  // 딜을 더블클릭 했을 때 호출되는 함수
  const handleRowDoubleClick = (event) => {
    const selectedRow = event.data;
    navigate(`/deals/${selectedRow.id}`);
  };

  return (
    <Layout member={member}>
      <Box sx={{ height: 600, width: "100%" }} className="ag-theme-quartz">
        {/* 딜 목록을 보여주는 그리드 */}
        <AgGridReact
          rowData={dealRows}
          columnDefs={dealColumns}
          paginationPageSize={5}
          onRowDoubleClicked={handleRowDoubleClick}
        />
      </Box>
    </Layout>
  );
};

const DealDetail = () => {
  // 멤버 정보 관리
  const [member, setMember] = useState(null);
  const [deal, setDeal] = useState(null);
  const { dealId } = useParams();
  const [note, setNote] = useState("");
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem("member");
    if (loggedInUser) {
      setMember(JSON.parse(loggedInUser)); // localStorage에서 사용자 정보 읽기
    }

    // 백엔드 API 호출하여 딜 상세 데이터 불러오기
    const fetchDeal = async () => {
      try {
        // 백엔드 API 호출
        const response = await axios.get(`/api/deals/${dealId}`);
        setDeal(response.data);
      } catch (error) {
        console.error("딜 상세 정보를 가져오는 데 실패했습니다:", error);
      }
    };

    fetchDeal();
  }, [dealId]);

  if (!deal) return <Typography>딜을 찾을 수 없습니다.</Typography>;


  const handleAddNote = async () => {
    if (note.trim()) {
      try {
        // 백엔드에 새로운 노트 추가 요청
        await axios.post(`/api/deals/${dealId}/notes`, { note });

        // 노트 추가 성공 시 로컬 상태 업데이트
        setDeal((prevDeal) => ({
          ...prevDeal,
          notes: [...prevDeal.notes, note],
        }));
        setNote("");
      } catch (error) {
        console.error("노트를 추가하는 데 실패했습니다:", error);
      }
    }
  };

  return (
    <Layout member={member}>
      <Box sx={{ width: "80%", p: 4, margin: "0 auto" }}>
        <Typography variant="h4" gutterBottom>
          {deal.company} 상세 정보
        </Typography>
        <Divider />
        <Box sx={{ my: 2 }}>
          <Typography variant="body1">
            <strong>생성 일시:</strong> {deal.createdAt}
          </Typography>
          <Typography variant="body1">
            <strong>검토 상태:</strong> {deal.status}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            노트 관리
          </Typography>
          <NotePage notes={deal.notes} />
        </Box>
      </Box>
    </Layout>
  );
};

export default DealDetail;