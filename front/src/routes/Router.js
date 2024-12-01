import {Routes, Route} from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Auth/Login";
import CompanyPage from "../pages/CompanyPage";
import FavoritePage from "../pages/FavoritePage";
import DatabasePage from "../pages/DatabasePage";
import DealPage from "../pages/Deal/DealPage";
import SignupPage from "../pages/Auth/SignupPage";
import { DealDashboard, DealDetail } from "../pages/Deal/DealDetail";
import NotePage from "../pages/Note/NotePage";


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
            {/* <Route path="/deals" element={<DealPage />} />
            <Route path="/deals/:dealId" element={<DealDetailPage />} /> */}
            <Route path="/deals" element={<DealDashboard />} />
            <Route path="/deals/:dealId" element={<DealDetail />} />
        </Routes>
    );
}

export default Router;