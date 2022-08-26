import { useEffect, useState } from "react";
import api from "../../services/api";
import { ItemHistorico } from "../../components/ItemHistorico";
import "./styles.css"
import { Link } from "react-router-dom";

export function Historico(){
    const [historicoRodadas, setHistoricoRodadas] = useState([])
    useEffect(()=>{
        api.get("/historicoRodadas")
        .then((response) => setHistoricoRodadas(response.data))
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });
    //console.log(personagens)
    
    }, [])
    console.log(historicoRodadas[0]) 
    return (
        <div className="historico">
            <h1>Histórico</h1> 
            <Link to="/escolhaPersonagem"><button>Jogar de novo</button></Link>    
        {
          historicoRodadas.map((rodada, index) => (
            <ItemHistorico key={index} jogadas={rodada.jogadas} indexRodadas={index} vencedor={rodada.vencedor}/>
          ))
        }
        </div>
    )
}