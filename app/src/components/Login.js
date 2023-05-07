import { useState } from "react";
import axios from "axios";

function Login() {
    const [user, setUser] = useState(null);
    //LOGIN
    const [emailLogin, setEmailLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");
    const [errorLogin, setErrorLogin] = useState(false);
    //REGISTRO
    const [nameRegistro, setNameRegistro] = useState("");
    const [emailRegistro, setEmailRegistro] = useState("");
    const [passwordRegistro, setPasswordRegistro] = useState("");
    const [errorRegistro, setErrorRegistro] = useState(false);
    //CONSULTA
    const [nameConsulta, setNameConsulta] = useState("");
    const [errorConsulta, setErrorConsulta] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:3333/login",
                JSON.stringify({ emailLogin, passwordLogin }),
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            setUser(response.data);
            localStorage.setItem("User", JSON.stringify(response.data.user))
            setErrorLogin(false);
            setEmailLogin('');
            setPasswordLogin('');
        } catch (errorLogin) {
            if (!errorLogin?.response) {
                setErrorLogin("Erro inesperado");
            } else if (errorLogin.response.status === 402) {
                setErrorLogin("Usuário ou senha invalidos");
            } else if (errorLogin.response.status === 401) {
                setErrorLogin("Campos Obrigatorios não preenchidos");
            }
        }
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            await axios.post(
                "http://localhost:3333/register",
                JSON.stringify({ nameRegistro, emailRegistro, passwordRegistro }),
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            setEmailRegistro('');
            setPasswordRegistro('');
            setNameRegistro('');
            setErrorRegistro("Usuário cadastrado com sucesso");
        } catch (errorRegistro) {
            if (!errorRegistro?.response) {
                setErrorRegistro("Erro inesperado");
            } else if (errorRegistro.response.status === 401) {
                setErrorRegistro("Campos Obrigatorios não preenchidos");
            } else if (errorRegistro.response.status === 402) {
                setErrorRegistro("Não foi possivel adicionar uma fila para o cadastro");
            } else if (errorRegistro.response.status === 403) {
                setErrorRegistro("Email já utilizado");
            }
        }
    };

    const handleLogout = async (event) => {
        event.preventDefault();
        setUser(null);
        localStorage.removeItem("User");
    };

    const handleConsulta = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3333/consulta",
                JSON.stringify({ nameConsulta }),
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            var resposta = '';
            for (var i = 0; i < response.data.user.length; i++) {
                resposta = resposta + (
                    "Nome: " + response.data.user[i]["name"] + "\nEmail: " + response.data.user[i]["email"] + "\n"
                );
            };
            setErrorConsulta(resposta);
            setNameConsulta('');
        } catch (errorConsulta) {
            if (!errorConsulta?.response) {
                setErrorConsulta("Erro inesperado");
            } else if (errorConsulta.response.status === 401) {
                setErrorConsulta("Campos Obrigatorios não preenchidos");
            }else if (errorConsulta.response.status === 402) {
                setErrorConsulta("Usuário não encontrado");
            }
        }
    };

    return (
        <div className="login-form-wrap">
            {localStorage.getItem("User") == null ? (
                <div>
                    <h2>Login</h2>
                    <form className="login-form">
                        <input
                            type="email"
                            name="email"
                            placeholder="email"
                            required
                            onChange={(event) => setEmailLogin(event.target.value)}
                        ></input>
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            required
                            onChange={(event) => setPasswordLogin(event.target.value)}
                        ></input>
                        <button
                            type="submit"
                            className="btn-login"
                            onClick={(event) => handleLogin(event)}
                        >
                            Login
                        </button>
                    </form>
                    <p>{errorLogin}</p>
                </div>
            ) : (
                <div>
                    <h2>Register New User</h2>
                    <form className="login-form">
                        <input
                            type="name"
                            name="name"
                            placeholder="name"
                            required
                            onChange={(event) => setNameRegistro(event.target.value)}
                        ></input>
                        <input
                            type="email"
                            name="email"
                            placeholder="email"
                            required
                            onChange={(event) => setEmailRegistro(event.target.value)}
                        ></input>
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            required
                            onChange={(event) => setPasswordRegistro(event.target.value)}
                        ></input>
                        <button
                            type="submit"
                            className="btn-login"
                            onClick={(event) => handleRegister(event)}
                        >
                            Register
                        </button>
                    </form>
                    <button type="button" className="btn-login" onClick={handleLogout}>
                        Logout
                    </button>
                    <p>{errorRegistro}</p>
                    <p></p>
                    <h2>Consulte os Usuários</h2>
                    <form className="login-form">
                        <input
                            type="name"
                            name="name"
                            placeholder="name"
                            required
                            onChange={(event) => setNameConsulta(event.target.value)}
                        ></input>
                        <button
                            type="submit"
                            className="btn-login"
                            onClick={(event) => handleConsulta(event)}>
                            Pesquisar
                        </button>
                    </form>
                    <p>{errorConsulta}</p>
                </div>
            )}
        </div>
    );
}
export default Login;
