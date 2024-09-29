import { Alert, Button, Col, Form, Row, Spinner, Stack } from "react-bootstrap";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

const AuthModal = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [registrationStep, setRegistrationStep] = useState(1);
    const { authInfo, updateAuthInfo, isAuthLoading, registerUser, loginUser, authError } = useContext(AuthContext);

    const steps = {
        1: <>
            <Form.Group>
                <Form.Label>Почта</Form.Label>
                <Form.Control value={authInfo.email} type="email" placeholder="example@gmail.com" onChange={e => updateAuthInfo({ ...authInfo, email: e.target.value })} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Пароль</Form.Label>
                <Form.Control value={authInfo.password} type="password" placeholder="QwWeWfr23P" onChange={e => updateAuthInfo({ ...authInfo, password: e.target.value })} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Повторите пароль</Form.Label>
                <Form.Control value={repeatedPassword} type="password" placeholder="QwWeWfr23P" onChange={(e) => setRepeatedPassword(e.target.value)} />
            </Form.Group>
        </>,
        2: <>
            <div className="d-flex" style={{ gap: "10px" }}>
                <Form.Group>
                    <Form.Label>Имя</Form.Label>
                    <Form.Control value={authInfo.name} type="text" placeholder="Имя" onChange={e => updateAuthInfo({ ...authInfo, name: e.target.value })} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Фамилия</Form.Label>
                    <Form.Control value={authInfo.surname} type="text" placeholder="Фамилия" onChange={e => updateAuthInfo({ ...authInfo, surname: e.target.value })} />
                </Form.Group>
            </div>
            <Form.Group>
                <Form.Label>Номер телефона</Form.Label>
                <Form.Control value={authInfo.phoneNumber} type="text" placeholder="+7 (985) 294 77-87" onChange={e => updateAuthInfo({ ...authInfo, phoneNumber: e.target.value })} />
            </Form.Group>
        </>,
        3: <>
            <Form.Group>
                <Form.Label>Почтовый индекс</Form.Label>
                <Form.Control value={authInfo.postcode} type="text" placeholder="Почтовый индекс" onChange={e => updateAuthInfo({ ...authInfo, postcode: e.target.value })} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Регион</Form.Label>
                <Form.Control value={authInfo.region} type="text" placeholder="Регион" onChange={e => updateAuthInfo({ ...authInfo, region: e.target.value })} />
            </Form.Group>
        </>,
        4: <>
            <Form.Group>
                <Form.Label>Имя организации / ИП</Form.Label>
                <Form.Control value={authInfo.organizationName} type="text" placeholder="Имя организации / ИП" onChange={e => updateAuthInfo({ ...authInfo, organizationName: e.target.value })} />
            </Form.Group>
            {/* <Form.Group>
                <Form.Label>Кодовое слово</Form.Label>
                <Form.Control value={authInfo.keyWord} type="text" placeholder="Кодовое слово" onChange={e => updateAuthInfo({ ...authInfo, keyWord: e.target.value })} />
            </Form.Group> */}
        </>
    };

    const handleAuth = (e) => {
        e.preventDefault();
        if (isLogin) return loginUser();
        if (registrationStep === 4) return registerUser();
        return;
    };

    const handleRegistrationStepChange = (step) => {
        if (isLogin) return;
        if (repeatedPassword !== authInfo.password) return alert(`Пароли не совпадают`);
        const updatedStep = registrationStep + step;
        if (updatedStep >= 1 && updatedStep <= 4) return setRegistrationStep(updatedStep);
        return;
    };

    return (
        <Form style={{ width: "50vw" }}>
            <Row style={{ height: "100vh", justifyContent: "center", paddingTop: "10%" }}>
                <Col xs={6}>
                    <Stack gap={3} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -60%)", width: "320px" }}>
                        <h2 style={{ fontSize: "32px", fontWeight: "500", marginBottom: "20px" }}>{isLogin ? "Вход" : "Регистрация"}</h2>
                        {
                            !isLogin ?
                                <div className="d-flex flex-column" style={{ gap: "15px" }}>
                                    <span style={{ fontSize: "21px", fontWeight: "500" }}>Шаг {registrationStep}</span>
                                    {
                                        steps[registrationStep]
                                    }
                                </div> :
                                <>
                                    <Form.Group>
                                        <Form.Label>Эл. почта</Form.Label>
                                        <Form.Control type="email" placeholder="Эл. почта" onChange={e => updateAuthInfo({ ...authInfo, email: e.target.value })} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Пароль</Form.Label>
                                        <Form.Control type="password" placeholder="Пароль" onChange={e => updateAuthInfo({ ...authInfo, password: e.target.value })} />
                                    </Form.Group>
                                </>
                        }
                        {
                            isLogin || registrationStep === 4 ?
                                <Button variant="primary" disabled={isAuthLoading} type="submit" onClick={e => handleAuth(e)}>{isAuthLoading ? <Spinner size="sm" /> : (isLogin ? "Войти" : "Зарегистрироваться")}</Button> :
                                <div className="d-flex justify-content-center" style={{ gap: "10%" }}>
                                    <Button style={{ width: "30%" }} variant="secondary" onClick={() => handleRegistrationStepChange(-1)}>Назад</Button>
                                    <Button style={{ width: "30%" }} variant="primary" onClick={() => handleRegistrationStepChange(1)}>Далее</Button>
                                </div>
                        }
                        <Button variant="link" onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}</Button>
                        {
                            authError ?
                                <Alert variant="danger"><p>{authError}</p></Alert> :
                                null
                        }
                    </Stack>
                </Col>
            </Row>
        </Form>
    );
}

export default AuthModal;