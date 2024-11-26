import {Routes, Route} from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import CompanyPage from "../pages/CompanyPage";
import FavoritePage from "../pages/FavoritePage";
import NotePage from "../pages/NotePage";
import DatabasePage from "../pages/DatabasePage";
import DealPage from "../pages/DealPage";
import SignupPage from "../pages/SignupPage";

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
            <Route path="/deals" element={<DealPage />} />
        </Routes>
    );
}

export default Router;