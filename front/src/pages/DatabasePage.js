import { useState, useEffect } from "react";
import { AppBar, Box, Tabs, Tab, TextField, Typography } from "@mui/material";
import { StartupGrid } from "../grids/StartupGrid";
import { InvestorGrid } from "../grids/InvestorGrid";
import { TabPanel } from "../components/TabPanel";
import Layout from "../components/Layout";
import { useLocation } from "react-router-dom";

const DatabasePage = () => {
    const [member, setMember] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const location = useLocation();

    const pageType = location.pathname.includes("startups") ? "스타트업" : "투자자";

    useEffect(() => {
        const loggedInUser = localStorage.getItem("member");
        if (loggedInUser) {
            setMember(JSON.parse(loggedInUser));
        }
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    // 빈 row 추가 함수
    const [row, setRow] = useState([]);
    const addNewRow = () => {
        const newRow = {
            name: "",
            productOrService: "",
            technology: "",
            category: "",
            totalCapital: "",
            totalInvestment: "",
            recentInvestment: "",
            recentFunding: "",
            keyInvestors: "",
            interest: false,
        };
        setRow([...row, newRow]);
    };

    return (
        <Layout member={member}>
            <Box sx={{ width: "100%", bgcolor: "transparent" }}>
                <Box
                    sx={{
                        p: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h6">
                        <span style={{ fontWeight: 900, color: "var(--mid-color)" }}>
                            {pageType}
                        </span>{" "}
                        페이지에 오신 것을 환영합니다
                    </Typography>
                    <TextField
                        label="검색"
                        variant="outlined"
                        value={searchTerm}
                        onChange={handleSearch}
                        size="small"
                        sx={{ width: 300 }}
                    />
                </Box>

                <AppBar position="static" color="default">
                    <Tabs
                        value={tabIndex}
                        onChange={handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab label="전체" />
                        {member ? <Tab label="선호" /> : null}
                    </Tabs>
                </AppBar>

                <TabPanel value={tabIndex} index={0}>
                    {pageType === "스타트업" ? (
                        <StartupGrid apiEndpoint={`/api/member/startups`} editable={false} />
                    ) : (
                        <InvestorGrid apiEndpoint={`/api/member/investors`} editable={false} />
                    )}
                </TabPanel>

                <TabPanel value={tabIndex} index={1}>
                    {pageType === "스타트업" ? (
                        <StartupGrid apiEndpoint={`/api/member/startups/interest`} editable={true} />
                    ) : (
                        <InvestorGrid apiEndpoint={`/api/member/investors/interest`} editable={true} />
                    )}
                </TabPanel>
            </Box>
        </Layout>
    );
};

export default DatabasePage;