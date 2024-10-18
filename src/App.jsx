import "bootstrap/dist/css/bootstrap.min.css";

import { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { AuthContext } from "./context/AuthContext";
import { ShopContext } from "./context/ShopContext";

import AppRouter from "./components/Router/AppRouter";
import AuthModal from "./components/Modals/Auth/AuthModal";
import { ChatContext } from "./context/ChatContext";
import { $api } from "./http";

const App = () => {
  const { user, fetchUsers, fetchUserBankAccounts, getUserTransfers, getAllTransfers, users } = useContext(AuthContext);
  const { getGroupChatMessages } = useContext(ChatContext);
  const { fetchProducts, fetchLatestUpdates, getStatistics, getUserAgreement, getRules, getCurrencies } = useContext(ShopContext);

  const fetchCredits = () => {
    $api.get(`/bank/get-user-credits/${user?.id || JSON.parse(localStorage.getItem("user"))?.id}`)
      .then((res) => {
        let t;
        console.log("PJIHJH*IHIOHIOHIOHI", res.data);
        if (Array.isArray(res?.data?.credits2) && res?.data?.credits2?.length > 0) {
          t = window.confirm(`У вас есть заявки на кредит, желаете просмотреть?`);
        }
        if (t) {
          res.data.credits2?.forEach(async (credit) => {
            if (credit.status === true) return;
            // Здесь можно использовать window.confirm для создания промпта
            const usr = users?.find(u => u._id === credit.userId);
            const userConfirmed = window.confirm(`Одобрить кредит: ${credit.amount} ${credit.currencyCode} для ${usr?.name || ""} ${usr?.surname || ""}?`);
            if (userConfirmed) {
              // Логика для одобрения кредита
              console.log(`Кредит на сумму ${credit.amount} ${credit.currencyCode} одобрен для пользователя ${usr?.name || ""} ${user?.surname || ""}.`);
            } else {
              // Логика для отклонения кредита
              console.log(`Кредит на сумму ${credit.amount} ${credit.currencyCode} отклонен для пользователя ${usr?.name || ""} ${user?.surname || ""}.`);
            }
            await $api.post("/bank/aod-credit", { creditId: credit._id, verdict: userConfirmed });
          });
        }
      })
      .catch((err) => alert(err.message));
  };

  useEffect(() => {
    ggg();
    console.log("App.jsx");
  }, []);

  const ggg = async () => {
    await fetchUsers();
    await fetchProducts();
    await getUserTransfers();
    await getStatistics();
    await fetchUserBankAccounts();
    await fetchLatestUpdates();
    await getGroupChatMessages();
    await getUserAgreement();
    await getRules();
    await getAllTransfers();
    await getCurrencies();
    await fetchCredits();
  };

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