import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Card,
  CardContent,
  Modal,
} from "@mui/material";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-charts-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { getStartups, getInvestors } from "../../api/api"; // api.js에서 API 함수 가져오기
import Layout from "../../components/Layout";
import {
  AccessTime,
  AccountBalance,
  ArrowBack,
  AttachMoney,
  Business,
  Category,
} from "@mui/icons-material";

// 회사 세부 정보 모달
export const CompanyDetailModal = ({
  type,
  openModal,
  handleClose,
  company,
}) => {
  return (
    <Modal open={openModal} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          width: "80%",
          maxWidth: "600px",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          {company.name} - 상세 정보
        </Typography>
        <List>
          {type === "startups" ? (
            <>
              <ListItem>
                <ListItemIcon>
                  <Category />
                </ListItemIcon>
                <ListItemText
                  primary="주요 카테고리"
                  secondary={
                    <span style={{ fontWeight: "bold" }}>
                      {company.keyCategory}
                    </span>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="총 건수"
                  secondary={
                    <span style={{ color: "#00796b" }}>
                      {company.totalCount}
                    </span>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AttachMoney />
                </ListItemIcon>
                <ListItemText
                  primary="총 투자금"
                  secondary={
                    <span style={{ color: "#004d40" }}>
                      {company.totalInvestment}
                    </span>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="평균 투자 금액"
                  secondary={
                    <span style={{ color: "#ff5722" }}>
                      {company.averageInvestment}
                    </span>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AccessTime />
                </ListItemIcon>
                <ListItemText
                  primary="최근 펀딩 일자"
                  secondary={
                    <span style={{ fontStyle: "italic" }}>
                      {company.recentFunding}
                    </span>
                  }
                />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem>
                <ListItemIcon>
                  <Business />
                </ListItemIcon>
                <ListItemText
                  primary="기술 분야"
                  secondary={company.technology}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="총 자본금"
                  secondary={company.totalCapital}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AccountBalance />
                </ListItemIcon>
                <ListItemText
                  primary="총 투자금"
                  secondary={company.totalInvestment}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="최근 투자 단계"
                  secondary={company.recentInvestment}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AccessTime />
                </ListItemIcon>
                <ListItemText
                  primary="최근 펀딩 일자"
                  secondary={company.recentFunding}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="주요 투자자"
                  secondary={company.keyInvestors}
                />
              </ListItem>
            </>
          )}
        </List>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="text"
            component={Link}
            to={`/${type}`}
            sx={{ color: "var(--mid-color)" }}
          >
            투자자 목록으로
          </Button>
          <Button variant="contained" onClick={handleClose}>
            닫기
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

// 회사 세부 정보 페이지
const CompanyDetail = ({ type }) => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [member, setMember] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("member");
    if (loggedInUser) {
      setMember(JSON.parse(loggedInUser)); // localStorage에서 사용자 정보 읽기
    }

    const fetchData = async () => {
      try {
        const data =
          type === "startups" ? await getStartups() : await getInvestors();
        const selectedCompany = data.find((item) => item.id === parseInt(id));
        setCompany(selectedCompany);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };
    fetchData();
  }, [id, type]);

  if (!company) {
    return <Typography variant="h6">Company not found</Typography>;
  }

  return (
    <Layout member={member}>
      {type === "startups" ? (
        // 스타트업 세부 정보
        <Card
          sx={{ borderRadius: 3, boxShadow: 6, padding: 4, marginBottom: 4 }}
        >
          <CardContent>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", marginBottom: 2 }}
            >
              {company.name}
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              카테고리:{" "}
              <span style={{ fontWeight: "bold" }}>{company.category}</span>
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Category />
                </ListItemIcon>
                <ListItemText
                  primary="주요 카테고리"
                  secondary={
                    <span style={{ fontWeight: "bold" }}>
                      {company.keyCategory}
                    </span>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="총 건수"
                  secondary={
                    <span style={{ color: "#00796b" }}>
                      {company.totalCount}
                    </span>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AttachMoney />
                </ListItemIcon>
                <ListItemText
                  primary="총 투자금"
                  secondary={
                    <span style={{ color: "#004d40" }}>
                      {company.totalInvestment}
                    </span>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="평균 투자 금액"
                  secondary={
                    <span style={{ color: "#ff5722" }}>
                      {company.averageInvestment}
                    </span>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AccessTime />
                </ListItemIcon>
                <ListItemText
                  primary="최근 펀딩 일자"
                  secondary={
                    <span style={{ fontStyle: "italic" }}>
                      {company.recentFunding}
                    </span>
                  }
                />
              </ListItem>
            </List>
            <Button
              variant="contained"
              component={Link}
              to={`/${type}`}
              startIcon={<ArrowBack />}
            >
              스타트업 목록으로
            </Button>
          </CardContent>
        </Card>
      ) : (
        // 투자시 세부 정보
        <Card
          sx={{ borderRadius: 3, boxShadow: 6, padding: 4, marginBottom: 4 }}
        >
          <CardContent>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", marginBottom: 2 }}
            >
              {company.name}
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              카테고리: {company.category}
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="기술 분야"
                  secondary={company.technology}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="총 자본금"
                  secondary={company.totalCapital}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="총 투자금"
                  secondary={company.totalInvestment}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="최근 투자 단계"
                  secondary={company.recentInvestment}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="최근 펀딩 일자"
                  secondary={company.recentFunding}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="주요 투자자"
                  secondary={company.keyInvestors}
                />
              </ListItem>
            </List>
            <Button variant="contained" component={Link} to={`/${type}`}>
              투자자 목록으로
            </Button>
          </CardContent>
        </Card>
      )}
    </Layout>
  );
};

const CompanyList = ({ data, title, type }) => {
  return (
    <Paper sx={{ padding: 2, marginBottom: 4 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <List>
        {data &&
          data.map((company) => (
            <ListItem
              key={company.id}
              component={Link}
              to={`/${type}/${company.id}`}
              button
            >
              <ListItemText
                primary={company.name}
                secondary={company.category}
              />
            </ListItem>
          ))}
      </List>
    </Paper>
  );
};

// (임시) 전체 회사 대시보드 페이지
const CompanyDashboard = () => {
  const [startups, setStartups] = useState([]);
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startupsData = await getStartups();
        const investorsData = await getInvestors();
        setStartups(startupsData);
        setInvestors(investorsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Company Dashboard
      </Typography>
      <CompanyList data={startups} title="Startups List" type="startups" />
      <CompanyList data={investors} title="Investors List" type="investors" />
    </Box>
  );
};

export { CompanyDashboard, CompanyDetail };
