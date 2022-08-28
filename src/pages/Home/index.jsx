import {Link} from "react-router-dom"
import "./styles.css"
import {Button} from "@mui/material"
export function Home(){
    return(
        <div className="home">
            <h1>Jokenpô<img src='/img/Pedra-Papel-Tesoura.svg'></img></h1> 
            <p>Pedra, papel e tesoura, também chamado em algumas regiões do Brasil de jokenpô, é um jogo de mãos recreativo e simples para duas ou mais pessoas, que não requer equipamentos nem habilidade</p>
            <p><strong>Regras:</strong> <br/> Papel ganha de pedra; <br/> Pedra ganha de Tesoura; <br/>Tesoura ganha de papel</p>
            <Link to="/escolhaPersonagem"><Button >JOGAR</Button></Link>
        </div>
        
    )
}