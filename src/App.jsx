import "bootstrap/dist/css/bootstrap.min.css";

import { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { AuthContext } from "./context/AuthContext";
import { ShopContext } from "./context/ShopContext";

import AppRouter from "./components/Router/AppRouter";
import AuthModal from "./components/Modals/Auth/AuthModal";
import { ChatContext } from "./context/ChatContext";

const App = () => {
  const { user, fetchUsers } = useContext(AuthContext);
  const { getGroupChatMessages } = useContext(ChatContext);
  const { fetchProducts, fetchLatestUpdates, getStatistics } = useContext(ShopContext);

  useEffect(() => {
    fetchProducts();
    fetchUsers();
    getStatistics();
    fetchLatestUpdates();
    getGroupChatMessages();
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