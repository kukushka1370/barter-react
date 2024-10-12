import { createContext, useCallback, useEffect, useState } from "react";

import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import BankAccountService from "../services/BankAccountService";
import AccountService from "../services/AccountService";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [bankAccounts, setBankAccounts] = useState([
        { amountTotal: "0", amountPurchases: "0", amountSales: "0", currencySymbol: "₽", currencyName: "Рубли", currencyCode: "RUB" },
        // { amountTotal: "0", amountPurchases: "0", amountSales: "0", currencySymbol: "$", currency: "Доллары", currencyCode: "USD" },
        // { amountTotal: "0", amountPurchases: "0", amountSales: "0", currencySymbol: "€", currency: "Евро", currencyCode: "EUR" },
        // { amountTotal: "0", amountPurchases: "0", amountSales: "0", currencySymbol: "¥", currency: "Юани", currencyCode: "YUAN" },
    ]);
    const [users, setUsers] = useState([]);
    const [isAuthLoading, setIsAuthLoading] = useState(false);
    const [authError, setAuthError] = useState(null);
    const [authInfo, setAuthInfo] = useState({
        email: "",
        password: "",
        name: "",
        surname: "",
        phoneNumber: "",
        postcode: "",
        region: "",
        organizationName: "",
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user !== null) {
            if (user?.role?.includes("owner") || user?.role?.includes("владелец") || user?.role?.includes("Владелец")) {
                user?.role?.push("admin");
            }
            setUser(user);
        }
    }, []);

    // const flattenAuthInfo = useCallback(() => {
    //     const flattenedAuthInfo = {};
    //     Object.values(authInfo).forEach((step) => {
    //         Object.keys(step).forEach((key) => {
    //             flattenAuthInfo[key] = step[key];
    //         });
    //     });
    //     console.log(flattenedAuthInfo);
    //     return flattenedAuthInfo;
    // }, [authInfo]);

    const updateAuthInfo = useCallback((info) => {
        setAuthInfo(info);
        console.log(authInfo);
    }, [authInfo]);

    const registerUser = useCallback(() => {
        setIsAuthLoading(true);
        console.log(authInfo);
        AuthService.register(authInfo).then(response => {
            setUser(response.data.user);
            console.log(response.data);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("token", JSON.stringify(response.data.accessToken));
        }).catch(err => {
            setAuthError(err.response.data.message);
            console.log(err.response);
        }).finally(() => setIsAuthLoading(false));
    }, [authInfo]);

    const loginUser = useCallback(() => {
        setIsAuthLoading(true);
        console.log(authInfo);
        AuthService.login(authInfo).then(response => {
            setUser(response.data.user);
            console.log(response.data);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("token", JSON.stringify(response.data.accessToken));
        }).catch(err => {
            setAuthError(err.response.data.message);
            console.log(err.response);
        }).finally(() => setIsAuthLoading(false));
    }, [authInfo]);

    const logoutUser = useCallback((e) => {
        e.preventDefault();
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
    }, []);

    const fetchUsers = useCallback(() => {
        UserService.fetchUsers().then((response) => setUsers(response.data)).catch((err) => console.error(err)).finally(() => console.log(`Finished fetching users!`));
    }, []);

    const udpatePassword = useCallback(() => {
        AccountService.updateUserPassword().then(() => alert(`Password updated successfully`)).catch((err) => console.error(err)).finally(() => console.log(`Finished updating password!`));
    }, []);

    const fetchUserBankAccounts = useCallback(() => {
        BankAccountService.fetchUserBankAccounts(user?.id).then((response) => { setBankAccounts(response.data); console.log({ bankAcc: response.data }) }).catch((err) => console.error(err)).finally(() => console.log(`Finished fetching bank accounts!`));
    }, [user]);

    const deleteBankAccount = useCallback((currencyCode) => {
        BankAccountService.deleteBankAccount(user?.id, currencyCode).then((response) => console.log(response)).catch((err) => console.error(err)).finally(() => console.log(`Deleted bank account!`));
    }, [user]);

    const addBankAccount = useCallback((currencyCode = "RUB") => {
        console.warn(currencyCode, user?.id);
        BankAccountService.addBankAccount({ userId: user?.id, currencyCode: currencyCode || "RUB" }).then((response) => setBankAccounts(prev => [...prev, response.data])).catch((err) => console.error(err)).finally(() => console.log(`Added bank account!`));
    }, [user]);

    const getUser = useCallback((value = "") => {
        UserService.fetchUsers(value).then((response) => console.log(response)).catch((err) => console.error(err)).finally(() => console.log(`Finished fetching user!`));
    }, []);

    const approveOrDecline = useCallback((userId, verdict) => {
        console.log({ userId, verdict })
        UserService.approveOrDecline({ userId, verdict }).then((response) => setUsers(response?.data)).catch((err) => console.error(err)).finally(() => console.log(`Finished fetching user!`));
    }, []);

    const transferMoney = useCallback((id, transferBankAccountId, transferAmount) => {
        BankAccountService.transferMoney({ bankAccountFromId: id, bankAccountToId: transferBankAccountId, transferAmount }).then((response) => {
            console.log(response.data.userBA);
            // alert(`Exchange rate : ${response.data.exchangeRate}`);
            return setBankAccounts(response?.data?.userBA || []);
        }).catch((err) => console.error(err)).finally(() => console.log(`Finished fetching user!`));
    }, []);

    const addNewCurrency = useCallback((currencySymbol, currencyCode, name) => {
        BankAccountService.addNewCurrency({ currencyCode, currencySymbol, name }).then((response) => console.log(response?.data)).catch((err) => console.error(err)).finally(() => console.log(`Finished fetching user!`));
    }, []);

    return <AuthContext.Provider
        value={{
            addNewCurrency,
            transferMoney,
            user,
            approveOrDecline,
            bankAccounts,
            fetchUserBankAccounts,
            deleteBankAccount,
            addBankAccount,
            authInfo,
            updateAuthInfo,
            registerUser,
            loginUser,
            logoutUser,
            isAuthLoading,
            authError,
            users,
            fetchUsers,
            getUser,
            udpatePassword,
        }}
    >
        {children}
    </AuthContext.Provider>
}