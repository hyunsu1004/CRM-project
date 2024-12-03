import { AgGridReact } from "ag-grid-react";
import "ag-grid-charts-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useEffect, useRef } from "react";
import "../styles/grid.css";
import Layout from "../components/Layout";
import {
  AppBar,
  Box,
  Tab,
  Tabs,
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import { StartupGrid } from "../grids/StartupGrid";
import { InvestorGrid } from "../grids/InvestorGrid";
import { Link } from "react-router-dom";
import { CompanyDetail, CompanyDetailModal } from "./Company/CompanyDetail";

const Main = () => {
  const [member, setMember] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [companies, setCompanies] = useState([]);
  const [shuffledCompanies, setShuffledCompanies] = useState([]); // 셔플된 기업 리스트 저장
  const [openModal, setOpenModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleOpen = (company) => {
    setSelectedCompany(company);
    setOpenModal(true); // 모달 열기
  };

  const handleClose = () => setOpenModal(false);

  const slideRef = useRef();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("member");
    if (loggedInUser) {
      setMember(JSON.parse(loggedInUser)); // localStorage에서 사용자 정보 읽기
    }

    // company.json에서 데이터 가져오기
    axios
      .get("/json/company.json")
      .then((response) => {
        const companyData = response.data.investors;
        setCompanies(companyData); // 데이터 상태에 저장
        // 셔플된 기업 리스트 설정
        setShuffledCompanies(
          companyData.sort(() => Math.random() - 0.5).slice(0, 12)
        ); // 처음 데이터 가져올 때만 셔플
      })
      .catch((error) => {
        console.error("Error fetching company data:", error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3); // 슬라이드 인덱스를 순환
    }, 3000); // 3초마다 슬라이드 변경

    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 인터벌 정리
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // 추가적으로 검색 API 요청 로직을 여기에 추가 가능
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Layout member={member}>
      <Box
        sx={{
          width: "100%",
          bgcolor: "transparent",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        {/* 배너 섹션 */}
        <Box
          sx={{
            width: "100%",
            height: "150px",
            bgcolor: "var(--mid-color)",
            color: "white",
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
          }}
        >
          <Typography variant="h5">
            이달의 특별 캠페인! 투자 관계를 편하게 형성 해보세요!
          </Typography>
          <Button
            variant="texted"
            sx={{
              ml: 2,
              color: "var(--bot-color)",
              fontSize: "16px",
              fontWeight: "900",
            }}
          >
            더 알아보기
          </Button>
        </Box>

        {/* 검색 바 */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            backgroundColor: "#fff",
            zIndex: 1000,
            borderBottom: "2px solid var(--bot-color)",
          }}
        >
          <Typography variant="h6">
            환영합니다,{" "}
            <span style={{ fontWeight: 900, color: "var(--mid-color)" }}>
              {member?.name || "방문자"}
            </span>{" "}
            님
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

        {/* 추천 섹션 (슬라이드 형식, 라이브러리 없이 구현) */}
        <Box
          sx={{
            mt: 2,
            width: "100%",
            p: 2,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              borderBottom: "2px solid var(--top-color)",
              mb: 2,
              fontWeight: "700",
            }}
          >
            추천 스타트업 및 투자자
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "80%",
                overflow: "hidden",
              }}
            >
              <Box
                ref={slideRef}
                sx={{
                  display: "flex",
                  textAlign: "center",
                  transform: `translateX(-${currentIndex * 100}%)`,
                  transition: "transform 1s ease-in-out",
                  width: "100%",
                }}
              >
                {shuffledCompanies.map((company, index) => (
                  <Card
                    key={index}
                    sx={{
                      minWidth: "33.333%",
                      flex: "0 0 20%",
                      p: 2,
                      boxSizing: "border-box",
                      boxShadow: "none",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      onClick={() => {
                        handleOpen(company);
                      }}
                      style={{
                        cursor: "pointer",
                        transition: "0.4ms ease-in-out",
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontSize: "20px",
                            fontWeight: "600",
                            color: "var(--top-color)",
                            borderBottom: "2px solid var(--bot-color)",
                          }}
                        >
                          {company.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            mt: 1,
                            mb: 1,
                            fontWeight: "600", // 글자 강조
                            fontSize: "16px",
                          }}
                        >
                          {company.productOrService}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            display: "inline-block", // 내용 크기에 맞게 줄임
                            backgroundColor: "var(--top-color)", // 원하는 배경색
                            color: "#fff", // 글자 색상 (배경과 대조)
                            padding: "4px 8px", // 안쪽 여백
                            borderRadius: "16px", // 둥근 모서리
                            fontWeight: "600", // 글자 강조
                            fontSize: "12px", // 텍스트 크기 조정
                          }}
                        >
                          {company.technology}
                        </Typography>
                      </CardContent>
                    </div>
                  </Card>
                ))}
                {selectedCompany && (
                  <CompanyDetailModal
                    type="investors"
                    openModal={openModal}
                    handleClose={handleClose}
                    company={selectedCompany}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* 스타트업 및 투자자 그리드 섹션 */}
        <Box
          sx={{
            height: "550px",
            p: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              height: "550px",
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              border: "2px solid var(--mid-color)",
              borderRadius: "20px",
              flex: 1,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h6">
              <span style={{ fontWeight: 900, color: "var(--mid-color)" }}>
                TOP10 스타트업
              </span>
            </Typography>
            <StartupGrid />
          </Box>

          <Box
            sx={{
              height: "550px",
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              border: "2px solid var(--mid-color)",
              borderRadius: "20px",
              flex: 1,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h6">
              <span style={{ fontWeight: 900, color: "var(--mid-color)" }}>
                TOP 10 투자자
              </span>
            </Typography>
            <InvestorGrid />
          </Box>
        </Box>

        {/* 최근 활동 섹션 */}
        <Box sx={{ width: "100%", p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              borderBottom: "2px solid var(--top-color)",
              mb: 2,
              fontWeight: "700",
            }}
          >
            최근 활동
          </Typography>
          <List>
            {[...Array(0)].map((_, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`최근 본 아이템 ${index + 1}`}
                  secondary="간단한 설명..."
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* 뉴스 및 블로그 섹션 */}
        <Box sx={{ width: "100%", p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              borderBottom: "2px solid var(--top-color)",
              mb: 2,
              fontWeight: "700",
            }}
          >
            스타트업 뉴스
          </Typography>
          <Grid container spacing={2}>
            {[
              {
                title: "포브스코리아 ‘2024 대한민국 AI 50",
                description:
                  "포브스코리아가 선정한 2024년 ‘대한민국 AI 50’이 공개되었습니다. 대한민국 AI ...",
                image:
                  "https://user-upload.thevc.kr/reports/thumbnails/2024AI스타트업50.png",
                link: "https://thevc.kr/discussions/%ED%8F%AC%EB%B8%8C%EC%8A%A4%EC%BD%94%EB%A6%AC%EC%95%84-2024-%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD-AI-50",
              },
              {
                title: "스타트업 재무 ‘성적표’ 업데이트, ‘수...",
                description:
                  "올 초 가장 크게 화제가 됐던 소식 중 하나가 바로 쿠팡의 흑자전환 소식이었는데요. ...",
                image:
                  "https://user-upload.thevc.kr/reports/thumbnails/2023 스타트업 성적표 업데이트1.png",
                link: "https://thevc.kr/discussions/2023-%EC%8A%A4%ED%83%80%ED%8A%B8%EC%97%85-%EC%9E%AC%EB%AC%B4-%EC%84%B1%EC%A0%81%ED%91%9C-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8_zzf06wuo",
              },
              {
                title: "2024 - 20대 스타트업 대표들",
                description:
                  "2024년 포브스코리아 ‘30세 미만 30인이 공개 되었습니다. 누적 투자금 최대 레브 ...",
                image:
                  "https://user-upload.thevc.kr/reports/thumbnails/20대 스타트업 대표.png",
                link: "https://thevc.kr/discussions/2024-20%EB%8C%80-%EC%8A%A4%ED%83%80%ED%8A%B8%EC%97%85-%EB%8C%80%ED%91%9C%EB%93%A4_zzwuo",
              },
              {
                title: "‘데드크로스 직면’, 2024 스타트업 고 ...",
                description:
                  "스타트업 투자 침체가 장기화되며 스타트업 고용시장에도 한파가 불고 있는 모습입니 ...",
                image:
                  "https://user-upload.thevc.kr/reports/thumbnails/2024 상반기 고용 현황 브리핑.png",
                link: "https://thevc.kr/discussions/korea_startup_employment_2024",
              },
            ].map((news, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={news.image}
                    alt={news.title}
                    sx={{ overflow: "hidden" }}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      {news.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {news.description}
                    </Typography>
                    <a
                      href={news.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: "none",
                        color: "var(--bot-color)",
                        fontWeight: "bold",
                      }}
                    >
                      자세히 보기
                    </a>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 인기 카테고리 섹션 */}
        <Box sx={{ width: "100%", p: 2, textAlign: "center" }}>
          <Typography variant="h6">인기 카테고리</Typography>
          <Box
            sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 2 }}
          >
            {["핀테크", "헬스케어", "AI", "금융", "모니터링", "우주"].map(
              (category, index) => (
                <Button
                  key={index}
                  variant="contained"
                  sx={{ borderRadius: "20px" }}
                >
                  {category}
                </Button>
              )
            )}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Main;
