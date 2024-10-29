import { Route, Routes, Navigate } from "react-router-dom";

import Layout from "../Layout/Layout";
import HomePage from "../../pages/Home/HomePage";
import DealsPage from "../../pages/Deals/DealsPage";
import CatalogPage from "../../pages/Catalog/CatalogPage";
import PeoplePage from "../../pages/People/PeoplePage";
import RatingPage from "../../pages/Rating/RatingPage";
import GamesPage from "../../pages/Games/GamesPage";
import CalculatorPage from "../../pages/Calculator/CalculatorPage";
import ProductPage from "../../pages/Product/ProductPage";
import MessagesPage from "../../pages/Messages/MessagesPage";
import UserAgreementPage from "../../pages/UserAgreement/UserAgreementPage";
import RulesPage from "../../pages/Rules/RulesPage";
import StatisticsPage from "../../pages/Statistics/StatisticsPage";
import DocumentsPage from "../../pages/Documents/DocumentsPage";
import ControlPage from "../../pages/Control/ControlPage";
import MailingPage from "../../pages/Mailing/MailingPage";
import RefferalsPage from "../../pages/Refferals/RefferalsPage";
import DealsControl from "../../pages/DealsControl/DealsControl";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import AuthModal from "../Modals/Auth/AuthModal";

const AppRouter = () => {
    const { user } = useContext(AuthContext);

    return (
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route index element={<HomePage />} />
                <Route path="deals" element={<DealsPage />} />
                <Route path="auth" element={<AuthModal />} />
                <Route path="catalog" element={<CatalogPage />} />
                <Route path="catalog/:productId" element={<ProductPage />} />
                <Route path="people" element={<PeoplePage />} />
                <Route path="users-rating" element={<RatingPage />} />
                <Route path="games" element={<GamesPage />} />
                <Route path="calculator" element={<CalculatorPage />} />
                <Route path="messages" element={<MessagesPage />} />
                <Route path="user-agreement" element={<UserAgreementPage />} />
                <Route path="rules" element={<RulesPage />} />
                <Route path="statistics" element={<StatisticsPage />} />
                <Route path="control" element={user?.role?.includes("owner") || user?.role?.includes("владелец") ? <ControlPage /> : <Navigate to="/" />} />
                <Route path="refferals" element={<RefferalsPage />} />
                <Route path="mailing" element={<MailingPage />} />
                <Route path="documents" element={<DocumentsPage />} />
                <Route path="deals-control" element={<DealsControl />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Route>
        </Routes>
    );
}

export default AppRouter;