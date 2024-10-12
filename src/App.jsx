import "bootstrap/dist/css/bootstrap.min.css";

import { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { AuthContext } from "./context/AuthContext";
import { ShopContext } from "./context/ShopContext";

import AppRouter from "./components/Router/AppRouter";
import AuthModal from "./components/Modals/Auth/AuthModal";
import { ChatContext } from "./context/ChatContext";

const App = () => {
  const { user, fetchUsers, fetchUserBankAccounts } = useContext(AuthContext);
  const { getGroupChatMessages } = useContext(ChatContext);
  const { fetchProducts, fetchLatestUpdates, getStatistics, getUserAgreement, getRules, } = useContext(ShopContext);

  useEffect(() => {
    fetchProducts();
    fetchUsers();
    getStatistics();
    fetchUserBankAccounts();
    fetchLatestUpdates();
    getGroupChatMessages();
    getUserAgreement();
    getRules();
    console.log("App.jsx");
  }, []);

  if (!user) {
    return <AuthModal />
  }

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App;