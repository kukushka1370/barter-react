import { useContext, useEffect, useState } from "react";

import UserCard from "../../components/Cards/User/UserCard";
import { AuthContext } from "../../context/AuthContext";

const RatingPage = () => {
    const { users } = useContext(AuthContext);

    const [sortOption, setSortOption] = useState("");
    const [sortedUsers, setSortedUsers] = useState([]);

    useEffect(() => {
        setSortedUsers([...users]);
    }, [users]);

    const handleSort = async (option) => {
        setSortOption(option);
        if (option === "") return;
        let sortedUpdatedUsers = [...sortedUsers];
        switch (option) {
            case "name":
                sortedUpdatedUsers.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "surname":
                sortedUpdatedUsers.sort((a, b) => a.surname.localeCompare(b.surname));
                break;
            case "email":
                sortedUpdatedUsers.sort((a, b) => a.email.localeCompare(b.email));
                break;
            case "rating":
                sortedUpdatedUsers.sort((a, b) => a.rating - b.rating);
                break;
            default:
                break;
        }
        return setSortedUsers(sortedUpdatedUsers);
    };

    return (
        <div className="d-flex flex-column align-items-center" style={{ gap: "40px", paddingTop: "30px" }}>
            <div className="d-flex" style={{ gap: "20px", width: "80vw" }}>
                <select value={sortOption} onChange={(e) => handleSort(e.target.value)} style={{ width: "85%", padding: "10px", borderRadius: "9px" }}>
                    <option value="">Выберите вариант сортировки</option>
                    <option value="name">Имя</option>
                    <option value="surname">Фамилия</option>
                    <option value="email">Email</option>
                    <option value="rating">Рейтинг</option>
                </select>
            </div>
            <div className="d-flex flex-wrap justify-content-center" style={{ gap: "50px", width: "300px" }}>
                {
                    !sortedUsers?.length ? <span>Ничего не найдено</span> :
                        sortedUsers?.map((user, index) => (
                            <UserCard userInfo={user} key={index} />
                        ))
                }
            </div>
        </div>
    );
}

export default RatingPage;