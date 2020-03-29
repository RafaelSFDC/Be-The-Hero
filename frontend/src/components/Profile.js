import React,{ useState, useEffect } from 'react'
import logoImg from "../assets/logo.svg"
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from "react-icons/fi"
import api from "./../services/api";

const Profile = () => {
    const [color, setColor] = useState("#A8A8B3")
    const [incidents, setIncidents] = useState([])
    const ongName = localStorage.getItem("ongName")
    const ongId = localStorage.getItem("ongId")
    const history = useHistory()

    const changeColor = () => {
        setColor("#e02041")
    }

    const resetColor = () =>{
        setColor("#A8A8B3")
    }

    const handleDeleteIncident = async id =>{
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            })
            setIncidents(incidents.filter(incident => incident.id !== id))
        }
        catch(err){
            alert("Erro ao deletar caso, tente novamente")
        }
    }

    const handleLogout = e =>{
        localStorage.clear()
        history.push("/")
    }

    useEffect(() =>{
        api.get("profile", {
            headers: {
                Authorization: ongId,
            }
        }).then(res =>{
            setIncidents(res.data)
        })
    },[ongId])

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to="/incident/new">
                    Cadastrar novo caso
                </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident =>(
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL"}).format(incident.value)}</p>
                        <button
                            onClick={() => handleDeleteIncident(incident.id)}
                            type="button"
                        >
                            <FiTrash2 size={20} color="#A8A8B3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Profile
