// 도움말 웹 페이지 예제
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Layout from "../components/Layout";
import { width } from "@fortawesome/free-solid-svg-icons/faArrowDown";

const HelpPage = () => {
  const [member, setMember] = useState(null);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("member");
    if (loggedInUser) {
      setMember(JSON.parse(loggedInUser)); // localStorage에서 사용자 정보 읽기
    }
  }, []);

  const gridData = [
    {
      topic: "로그인 문제 해결",
      description: '비밀번호를 잊으셨다면, "비밀번호 찾기"를 클릭하세요.',
    },
    {
      topic: "회원가입 가이드",
      description: "회원가입은 이메일 인증 후 완료됩니다.",
    },
    {
      topic: "결제 오류",
      description: "결제 관련 문제는 고객센터에 문의하세요.",
    },
    {
      topic: "프로필 설정",
      description: "프로필 사진과 정보를 설정하려면 설정 페이지로 이동하세요.",
    },
    {
      topic: "비밀번호 변경",
      description: "비밀번호 변경은 보안 설정에서 가능합니다.",
    },
    {
      topic: "앱 업데이트",
      description: "최신 기능을 사용하려면 정기적으로 앱을 업데이트하세요.",
    },
    {
      topic: "알림 설정",
      description: "알림 설정은 환경설정에서 조정할 수 있습니다.",
    },
    {
      topic: "데이터 백업",
      description: "중요한 데이터는 주기적으로 백업하시기 바랍니다.",
    },
    {
      topic: "서비스 해지",
      description: "서비스 해지는 고객센터를 통해 진행됩니다.",
    },
    {
      topic: "보안 점검",
      description: "정기적인 보안 점검으로 계정을 안전하게 유지하세요.",
    },
  ];

  const gridColumns = [
    { headerName: "주제", field: "topic", flex: 1 },
    { headerName: "설명", field: "description", flex: 2 },
  ];

  return (
    <Layout member={member}>
      <Container maxWidth="md" style={{ marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          도움말 페이지
        </Typography>
        <Typography variant="body1" gutterBottom>
          자주 묻는 질문과 답변을 확인하거나, 도움말 데이터를 검색하세요.
        </Typography>

        <Box sx={{ margin: "20px 0" }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>자주 묻는 질문</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                로그인, 회원가입, 결제 문제와 같은 자주 묻는 질문을 확인하세요.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>추가 정보</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                더 많은 정보는 고객센터에서 확인할 수 있습니다.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>

        <div
          className="ag-theme-quartz"
          style={{ height: "auto", width: "100%", marginTop: "20px" }}
        >
          <AgGridReact
            rowData={gridData}
            columnDefs={gridColumns}
            domLayout={"autoHeight"}
          />
        </div>
      </Container>
    </Layout>
  );
};

export default HelpPage;
