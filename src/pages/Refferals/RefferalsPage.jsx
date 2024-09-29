import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const RefferalsPage = () => {
    const { user } = useContext(AuthContext);

    return (
        <div style={{ padding: "3rem" }}>
            {
                user && user?.refferals ?
                    <ul>
                        {
                            user?.refferals?.map((ref, i) => {
                                return (
                                    <li key={i}>{ref}</li>
                                )
                            })
                        }
                    </ul> :
                    <h3>У вас пока нет реффералов</h3>
            }
        </div>
    );
}

export default RefferalsPage;