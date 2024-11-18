import {Routes, Route} from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default Router;