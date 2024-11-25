import {Routes, Route} from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import CompanyPage from "../pages/CompanyPage";
import FavoritePage from "../pages/FavoritePage";
import NotePage from "../pages/NotePage";
import DatabasePage from "../pages/DatabasePage";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/favorite" element={<FavoritePage />} />
            <Route path="/notes" element={<NotePage />} />
            <Route path="/startups" element={<DatabasePage />} />
            <Route path="/investors" element={<DatabasePage />} />
        </Routes>
    );
}

export default Router;