import {Routes, Route} from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Auth/Login";
import CompanyPage from "../pages/CompanyPage";
import FavoritePage from "../pages/FavoritePage";
import DatabasePage from "../pages/DatabasePage";
import SignupPage from "../pages/Auth/SignupPage";
import DealDetail, { DealDashboard } from "../pages/Deal/DealDetail";
import NotePage from "../pages/Note/NotePage";
import DealGrid from "../pages/Deal/DealPage";


function Router() {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/favorite" element={<FavoritePage />} />
            <Route path="/notes" element={<NotePage />} />
            <Route path="/startups" element={<DatabasePage />} />
            <Route path="/investors" element={<DatabasePage />} />
            {/* 원본 딜 페이지 */}
            <Route path="/deals" element={<DealGrid />} />
            {/* 임시 딜 페이지 */}
            {/* <Route path="/deals" element={<DealDashboard />} /> */}
            <Route path="/deals/:dealId" element={<DealDetail />} />
        </Routes>
    );
}

export default Router;