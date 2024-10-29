import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ShopContext } from "../../context/ShopContext";

const UserAgreementPage = () => {
    const { user } = useContext(AuthContext);
    const { userAgreementPageContent, setUserAgreementPageContent } = useContext(ShopContext);

    function createMarkup() {
        return { __html: userAgreementPageContent };
    }

    return (
        <div>
            <div style={{ height: "50px", background: "#cde8f5", padding: "15px", marginTop: "10px" }}><h4 style={{ color: "#397794", fontSize: "16px" }}>Пользовательское соглашение</h4></div>
            <div style={{ padding: "20px" }} dangerouslySetInnerHTML={createMarkup()}></div>
            {
                (user?.role.includes("admin") || user?.role.includes("владелец")) &&
                <div style={{ padding: "2rem" }}>
                    <textarea style={{ minWidth: "90%" }} value={userAgreementPageContent} onChange={(e) => setUserAgreementPageContent(e.target.value)} name="" id=""></textarea>
                    <span style={{ display: "grid", placeContent: "center", border: "1px solid", width: "100px", cursor: "pointer" }}>Обновить</span>
                </div>
            }
        </div>
    );
}

export default UserAgreementPage;