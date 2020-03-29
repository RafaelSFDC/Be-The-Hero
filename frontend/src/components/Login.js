import React, {useState} from 'react'
import heroesImg from "../assets/heroes.png"
import logoImg from "../assets/logo.svg"
import { FiLogIn } from "react-icons/fi"
import { Link, useHistory } from "react-router-dom"
import api from "./../services/api";

const Login = () => {

    const [id, setId] = useState("")
    const history = useHistory()

    const loginHandler = async e =>{
        e.preventDefault()

        try{
            const response = await api.post("sessions", { id})
            localStorage.setItem("ongId", id)
            localStorage.setItem("ongName", response.data.name)
            history.push("/profile")
        }
        catch (err){
            alert("Falha no login, tente novamente")
        }
    }

    return (
        <div className="login-container">
            <section onSubmit={loginHandler} className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form>
                    <h1>Faça seu Login</h1>
                    <input
                        type="text"
                        placeholder="Sua ID"
                        value={id}
                        onChange={e =>setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>
    )
}

export default Login
