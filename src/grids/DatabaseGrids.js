import BaseGrid from "../components/BaseGrid";

const StartupGrid = ({ apiEndpoint, editable }) => {
  const columnDefs = [
    { headerName: "기업명", field: "name" },
    { headerName: "카테고리", field: "category" },
    { headerName: "총 투자금", field: "totalInvestment" },
    { headerName: "평균 투자금", field: "averageInvestment" },
    { headerName: "최근 펀딩 일자", field: "recentFunding" },
    { headerName: "핵심 분야", field: "keyCategory" },
    { headerName: "선호 여부", field: "interest", editable: true },
  ];

  return <BaseGrid apiEndpoint={apiEndpoint} columnDefs={columnDefs} editable={editable} />;
};

const InvestorGrid = ({ apiEndpoint, editable }) => {
  const columnDefs = [
    { headerName: "투자자명", field: "name" },
    { headerName: "펀드 규모", field: "fundSize" },
    { headerName: "포트폴리오 수", field: "portfolioCount" },
    { headerName: "주요 산업", field: "mainIndustry" },
    { headerName: "최근 투자 활동", field: "recentActivity" },
    { headerName: "선호 여부", field: "interest", editable: true },
  ];

  return <BaseGrid apiEndpoint={apiEndpoint} columnDefs={columnDefs} editable={editable} />;
};