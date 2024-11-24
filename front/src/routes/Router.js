import {Routes, Route} from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import CompanyPage from "../pages/CompanyPage";
import FavoritePage from "../pages/FavoritePage";
import NotePage from "../pages/NotePage";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/favorite" element={<FavoritePage />} />
            <Route path="/notes" element={<NotePage />} />
            <Route path="/startups" element={<CompanyPage />} />
            <Route path="/investors" element={<CompanyPage />} />
        </Routes>
    );
}

export default Router;