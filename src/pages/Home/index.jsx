import {Link} from "react-router-dom"
import "./styles.css"
export function Home(){
    return(
        <div className="home">
            <p>Jakenpo é um jogo onde você escolhe "pedra", "Papel" ou "Tesoura" e seu adversário pode escolher essa mesma coisa também.</p>
            <p><strong>Regras:</strong> <br/> Papel ganha de pedra; <br/> Pedra ganha de Tesoura; <br/>Tesoura ganha de papel</p>
            <Link to="/escolhaPersonagem"><button>JOGAR</button></Link>
        </div>
        
    )
}