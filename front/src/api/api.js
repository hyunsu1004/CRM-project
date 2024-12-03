import axios from "axios";

// 환경 변수 또는 고정된 엔드포인트 사용 가능
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

export const getStartups = async () => {
  try {
    // JSON 파일에서 데이터를 요청하는 로직 추가
    if (process.env.REACT_APP_USE_JSON === "true") {
        console.log(process.env.REACT_APP_USE_JSON)
      const response = await fetch(`${process.env.PUBLIC_URL}/json/company.json`);
      const data = await response.json();
      return data.startups;
    } else {
      const response = await axios.get(`${API_BASE_URL}/api/startups`);
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching startups:", error);
    throw error;
  }
};

export const getInvestors = async () => {
  try {
    // JSON 파일에서 데이터를 요청하는 로직 추가
    if (process.env.REACT_APP_USE_JSON === "true") {
      const response = await fetch(`${process.env.PUBLIC_URL}/json/company.json`);
      const data = await response.json();
      return data.investors;
    } else {
      const response = await axios.get(`${API_BASE_URL}/api/investors`);
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching investors:", error);
    throw error;
  }
};
