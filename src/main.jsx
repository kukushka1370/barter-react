import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ShopContextProvider } from "./context/ShopContext.jsx";
import { ChatContextProvider } from "./context/ChatContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChatContextProvider>
        <ShopContextProvider>
          <App />
        </ShopContextProvider>
      </ChatContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
);