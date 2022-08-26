import { useEffect, useState } from "react";
import { Link, useNavigate, useParams} from "react-router-dom";
import {CardSemBotao} from "../../components/CardSemBotao"
import api from "../../services/api";
import "./styles.css"

export function EscolhaPersonagem(){
    const [personagens, setPersonagens] = useState([])
    const [personagemMaquina, setPersonagemMaquina] = useState([])
    function atualizarPersonagens(dadosPersonagens){
        const indexMaquina = Math.floor(dadosPersonagens.length * Math.random())
        setPersonagens(dadosPersonagens)
        setPersonagemMaquina(dadosPersonagens[indexMaquina])
    }
    useEffect(()=>{
        api.get("/personagens")
        .then((response) => {atualizarPersonagens(response.data)})
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });
        console.log(personagemMaquina)
    }, [])
    return (
        <div className="escolhaPersonagem">
            <h1>Escolha um personagem</h1>
            <Link to="/" className="voltarParaHome">&lt;- Voltar</Link>
            <div className="container"> 
            {
                personagens.map((personagem,index)=>(
            
                <Link key={index} to={"/jogo/"+personagem.idPersonagem+"/"+personagemMaquina.idPersonagem}>
                    <CardSemBotao
                        key={index} 
                        imgUrl={personagem.urlImg}   
                        nome={personagem.nome} 
                    />
                </Link>
            
                ))
    }
            </div>
        </div>
    )
}