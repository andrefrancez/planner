import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.tsx";
import PlannerPage from "../features/planner/PlannerPage.tsx";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/planner" element={<PlannerPage />} />
        </Routes>
    )
}

export default AppRoutes;