import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-charts-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { getStartups, getInvestors } from "../../api/api"; // api.js에서 API 함수 가져오기
import Layout from "../../components/Layout";

const CompanyDetail = ({ type }) => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [member, setMember] = useState(null);

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
      <Paper sx={{ padding: 4, marginBottom: 4 }}>
        <Typography variant="h4" gutterBottom>
          {company.name}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Category: {company.category}
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Total Count"
              secondary={company.totalCount}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Total Investment"
              secondary={company.totalInvestment}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Average Investment"
              secondary={company.averageInvestment}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Recent Funding"
              secondary={company.recentFunding}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Key Category"
              secondary={company.keyCategory}
            />
          </ListItem>
        </List>
        <Button variant="contained" component={Link} to={`/${type}`}>
          Back to {type}
        </Button>
      </Paper>
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
