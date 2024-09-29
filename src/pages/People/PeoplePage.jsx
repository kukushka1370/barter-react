import { useContext, useEffect, useState } from "react";

import UserCard from "../../components/Cards/User/UserCard";
import { AuthContext } from "../../context/AuthContext";

const PeoplePage = () => {
    const { users, getUser, fetchUsers } = useContext(AuthContext);

    const [searchValue, setSearchValue] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        if (users?.length) {
            setFilteredUsers([...users]);
        }
        fetchUsers();
    }, [users]);

    const handleSearch = async () => {
        if (searchValue.trim() === "" && users?.length) return setFilteredUsers([...users]);
        let searchedUsers = users?.filter((user) => {
            return user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                user.surname.toLowerCase().includes(searchValue.toLowerCase()) ||
                user.email.toLowerCase().includes(searchValue.toLowerCase());
        });
        if (searchedUsers.length !== 0) {
            return setFilteredUsers(searchedUsers);
        }
        searchedUsers = await getUser(searchValue);
        return setFilteredUsers(searchedUsers);
    };

    return (
        <div className="d-flex flex-column align-items-center" style={{ gap: "40px", paddingTop: "30px" }}>
            <div className="d-flex" style={{ gap: "20px", width: "80vw" }}>
                <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type="text" placeholder="Поиск пользователя, организации или потребности..." style={{ width: "85%", padding: "7px", borderRadius: "9px" }} />
                <div onClick={() => handleSearch()} className="d-flex align-items-center justify-content-center" style={{ background: "#5bc0de", color: "#fff", borderRadius: "10px", padding: "9px", cursor: "pointer" }}>Найти</div>
            </div>
            <div className="d-flex flex-wrap justify-content-center" style={{ gap: "50px" }}>
                {
                    !filteredUsers?.length ? <span>Ничего не найдено</span> :
                        filteredUsers?.map((user, index) => (
                            <UserCard userInfo={user} key={index} />
                        ))
                }
            </div>
        </div>
    );
}

export default PeoplePage;