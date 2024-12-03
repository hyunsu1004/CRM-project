import { Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import CompanyPage from "../pages/CompanyPage";
import FavoritePage from "../pages/FavoritePage";
import NotePage from "../pages/NotePage";
import DatabasePage from "../pages/DatabasePage";
import DealPage from "../pages/DealPage";
import SignupPage from "../pages/Auth/SignupPage";
import {
  CompanyDashboard,
  CompanyDetail,
} from "../pages/Company/CompanyDetail";
import { StartupGrid } from "../grids/StartupGrid";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/favorite" element={<FavoritePage />} />
      <Route path="/notes" element={<NotePage />} />
        <Route path="/notes/:dealId" element={<NotePage />} />
      <Route path="/startups" element={<DatabasePage />} />
      <Route path="/investors" element={<DatabasePage />} />
      {/* 원본 딜 페이지 */}
      <Route path="/deals" element={<DealPage />} />
      {/* 임시 딜 페이지 */}
      {/* <Route path="/deals" element={<DealDashboard />} /> */}
      {/* 딜 상세 페이지 */}
      {/* <Route path="/deals/:dealId" element={<DealDetail />} /> */}
      {/* <Route path="/" element={<CompanyDashboard />} /> */}
      <Route path="/startups/:id" element={<CompanyDetail type="startups" />} />
      <Route
        path="/investors/:id"
        element={<CompanyDetail type="investors" />}
      />
      <Route
        path="/startups-grid"
        element={<StartupGrid apiEndpoint="/api/startups" editable={false} />}
      />
    </Routes>
  );
}

export default Router;
