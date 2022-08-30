import { useEffect, useState } from "react";
import api from "../../services/api";
import { ItemHistorico } from "../../components/ItemHistorico";
import "./styles.css"
import { Link } from "react-router-dom";

export function HistoricoJogos(){
    const [historicoRodadas, setHistoricoRodadas] = useState([])
    useEffect(()=>{
        api.get("/historicoRodadas")
        .then((response) => setHistoricoRodadas(response.data))
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });
    
    }, [])
    return (
        <div className="historico">
            <h1>Histórico de jogos</h1> 
            <Link to="/escolhaPersonagem"><button>Jogar de novo</button></Link>    
        {
          historicoRodadas.map((rodada, index) => (
            <ItemHistorico key={index} indexRodadas={index} vencedor={rodada.vencedor} perdedor={rodada.perdedor}/>
          ))
        }
        </div>
    )
}