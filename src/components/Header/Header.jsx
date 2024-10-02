import { useContext, useState } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const [listState, setListState] = useState([false, false, false]);
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    const handleArrowClick = (j = 0) => {
        const updatedListState = [...listState].fill(false);
        updatedListState[j] = !listState[j];
        setListState(updatedListState);
    };

    const handleBurgerClick = () => {
        setIsMenuOpened(!isMenuOpened);
    };

    const handleLinkClick = () => {
        setIsMenuOpened(false);
        setListState([false, false, false]);
    };

    return (
        <header className={styles.header}>
            <Link to="/">
                <img height={25} src="https://369barter.ru/img/logo-text.png" alt="" />
            </Link>

            <div className={styles["header-nav"]} style={{ display: isMenuOpened ? "flex" : "", zIndex: "4" }}>
                <div className={styles["header-nav-left"]}>
                    <Link onClick={() => handleLinkClick()} className={styles["header-nav-link"]} to="deals">Сделки</Link>
                    <Link onClick={() => handleLinkClick()} className={styles["header-nav-link"]} to="catalog">Каталог</Link>
                    <Link onClick={() => handleLinkClick()} className={styles["header-nav-link"]} to="people">Люди</Link>
                    <Link onClick={() => handleLinkClick()} className={styles["header-nav-link"]} to="users-rating">Рейтинги пользователей</Link>
                    <div className={styles["arrow-container"]}>
                        <span
                            className={`${styles["header-nav-link"]} ${styles["arrow"]}`}
                            onClick={() => handleArrowClick(0)}
                        >О системе</span>
                        {
                            listState[0] &&
                            <ul className={styles["expand-list"]} style={{}}>
                                <li><Link onClick={() => handleLinkClick()} to="statistics" className={styles["header-nav-link"]}>Статистика</Link></li>
                                <li><Link onClick={() => handleLinkClick()} to="rules" className={styles["header-nav-link"]}>Правила системы</Link></li>
                                <li><Link onClick={() => handleLinkClick()} to="user-agreement" className={styles["header-nav-link"]}>Пользовательское соглашение</Link></li>
                                <li><Link onClick={() => handleLinkClick()} to="documents" className={styles["header-nav-link"]}>Документы</Link></li>
                                <li><Link onClick={() => handleLinkClick()} to="games" className={styles["header-nav-link"]}>Игры</Link></li>
                                {/* <li><Link onClick={() => setIsMenuOpened(false)} to="calculator" className={styles["header-nav-link"]}>Калькулятор НДС</Link></li> */}
                            </ul>
                        }
                    </div>
                    {
                        user?.role?.includes("владелец") && <div className={styles["arrow-container"]}>
                            <span
                                className={`${styles["header-nav-link"]} ${styles["arrow"]}`}
                                onClick={() => handleArrowClick(1)}
                            >Админ</span>
                            {
                                listState[1] &&
                                <ul className={styles["expand-list"]} style={{}}>
                                    <li><Link onClick={() => handleLinkClick()} to="mailing" className={styles["header-nav-link"]}>Рассылка</Link></li>
                                    {/* <li><Link onClick={() => handleLinkClick()} to="games" className={styles["header-nav-link"]}>Предложения системе</Link></li> */}
                                    <li><Link onClick={() => handleLinkClick()} to="control" className={styles["header-nav-link"]}>Управление</Link></li>
                                    <li><Link onClick={() => handleLinkClick()} to="deals" className={styles["header-nav-link"]}>Контроль сделок</Link></li>
                                </ul>
                            }
                        </div>
                    }
                </div>
                <div className={styles["arrow-container"]}>
                    <span
                        className={`${styles["header-nav-link"]} ${styles["arrow"]}`}
                        onClick={() => handleArrowClick(2)}
                    >{user?.name} {user?.surname}</span>
                    {
                        listState[2] &&
                        <ul className={styles["expand-list"]} style={{}}>
                            <li><Link onClick={() => handleLinkClick()} to="messages" className={styles["header-nav-link"]}>Сообщения</Link></li>
                            <li><Link onClick={() => handleLinkClick()} to="/" className={styles["header-nav-link"]}>Профиль</Link></li>
                            <li><Link onClick={() => handleLinkClick()} to="deals" className={styles["header-nav-link"]}>Счет</Link></li>
                            <li><Link onClick={() => handleLinkClick()} to={`catalog?userId=${user?.id}`} className={styles["header-nav-link"]}>Мои товары</Link></li>
                            <li><Link onClick={() => handleLinkClick()} to="refferals" className={styles["header-nav-link"]}>Рефералы</Link></li>
                            <li><Link onClick={(e) => logoutUser(e)} to="auth" className={styles["header-nav-link"]}>Выход</Link></li>
                        </ul>
                    }
                </div>
            </div>

            <div onClick={() => handleBurgerClick()} className={styles["burger"]}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                </svg>
            </div>
        </header>
    );
}

export default Header;