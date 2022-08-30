import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link} from 'react-router-dom';
import api from '../../services/api';
import {Button} from "@mui/material"
import ViewListIcon from '@mui/icons-material/ViewList';
import Alert from '@mui/material/Alert';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import './styles.css'

export function TelaJogo() {
const [jogadas, setJogadas] = useState([]) 
const [historicoJogadas, setHistoricoJogadas] = useState([])
const [personagem, setPersonagem]= useState([]); 
const [personagemMaquina, setPersonagemMaquina] = useState([]);
const {id, idMaquina} = useParams();
const [contVitoriaJogador,setContVitoriaJogador] = useState(0);
const [contVitoriaMaquina,setContVitoriaMaquina] = useState(0);
const [rodadas,setRodadas] = useState([]);
const [imgJogadaJogador, SetImgJogadaJogador] = useState("/img/Pedra-Papel-Tesoura.svg");
const [imgJogadaMaquina, SetImgJogadaMaquina] = useState("/img/Pedra-Papel-Tesoura.svg");
const [ultimaJogadaMaquina,setUltimaJogadaMaquina] = useState("Máquina ainda não jogou");
const [placar, setPlacar] = useState("Ninguém jogou ainda");
const [placarRodada, setPlacarRodada] = useState("off");
const navegacao = useNavigate();


const ancoraHomeCard =(dadosDaJogada)=>{
   
  if(dadosDaJogada.jogador===1){
    
    if(dadosDaJogada.idJogada === 1){
      setJogadas(prevState => [...prevState, {idJogador: dadosDaJogada.jogador, jogada: "Pedra"}])
      SetImgJogadaJogador("/img/Pedra.svg")
      setDesabilitaBotaoes(true)
      setBackgroundBotaoDesativado("gray")
    }else if(dadosDaJogada.idJogada === 2){
      setJogadas(prevState => [...prevState, {idJogador: dadosDaJogada.jogador, jogada: "Papel"}])
      SetImgJogadaJogador("/img/Papel.svg")
      setDesabilitaBotaoes(true)
      setBackgroundBotaoDesativado("gray")
    }else{
      setJogadas(prevState => [...prevState, {idJogador: dadosDaJogada.jogador, jogada: "Tesoura"}])
      SetImgJogadaJogador("/img/Tesoura.svg")
      setDesabilitaBotaoes(true)
      setBackgroundBotaoDesativado("gray")
    }
  }
  
}
useEffect(()=>{

  api.get("/personagens/"+id)
  .then((response) => {
    setPersonagem(response.data) 
  })
  .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
  });  
  api.get("/personagens/"+idMaquina)
    .then((response) => setPersonagemMaquina(response.data))
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
  }); 

},[id, idMaquina])


useEffect(()=>{
  
  if(contVitoriaJogador===3){
    
    api.post("/historicoRodadas", {"historico":{jogadas:historicoJogadas, vencedor:"Jogador: "+personagem.nome, perdedor:"Máquina: "+personagemMaquina.nome}}).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    setRodadas(prevState => [...prevState, {jogadas:historicoJogadas, vencedor:"Jogador: "+personagem.nome, perdedor:"Máquina: "+personagemMaquina.nome}])
    setContVitoriaJogador(0)
    setContVitoriaMaquina(0)
    setPlacarRodada("Você venceu a partida!!! 👏👏👏")
    setHistoricoJogadas([]) 
  }else if(contVitoriaMaquina===3){
    api.post("/historicoRodadas", {"historico":{jogadas:historicoJogadas, vencedor:"Máquina: "+personagemMaquina.nome, perdedor:"Jogador: "+personagem.nome}}).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    setRodadas(prevState => [...prevState, {jogadas:historicoJogadas, vencedor:"Máquina: "+personagemMaquina.nome, perdedor:"Jogador: "+personagem.nome}])  
    setContVitoriaJogador(0)
    setContVitoriaMaquina(0)
    setPlacarRodada("A Máquina venceu a partida!!! 😎🕹💻 ⌨️ 🖥")   
    setHistoricoJogadas([])   
  } 

  console.log("Últimas rodadas"+rodadas)

},[contVitoriaJogador, historicoJogadas, rodadas, personagem.nome, contVitoriaMaquina,personagemMaquina.nome])


useEffect(()=>{ 
  if(!id){
    navegacao("/escolhaPersonagem")
  }
  
  if(jogadas.length===1){
   
      const jogadaMaquina = Math.floor(3 * Math.random() + 1);
      if(jogadaMaquina===1){
        setJogadas(prevState => [...prevState, {idJogador: 2, jogada: "Pedra"}])
        setUltimaJogadaMaquina("Pedra")
        SetImgJogadaMaquina("/img/Pedra.svg")
        setPlacarRodada("off")
      }else if(jogadaMaquina===2){ 
        setJogadas(prevState => [...prevState, {idJogador: 2, jogada: "Papel"}])
        setUltimaJogadaMaquina("Papel")
        SetImgJogadaMaquina("/img/Papel.svg")
        setPlacarRodada("off")
      }else{
        setJogadas(prevState => [...prevState, {idJogador: 2, jogada: "Tesoura"}])
        setUltimaJogadaMaquina("Tesoura")
        SetImgJogadaMaquina("/img/Tesoura.svg")
        setPlacarRodada("off")
      } 
  }
  
  if(jogadas.length===2){
    if(jogadas[0].jogada==="Pedra" && jogadas[1].jogada=="Pedra"){
      setHistoricoJogadas(prevState => [...prevState, {jogador: "Pedra", maquina: "Pedra", resultado:"EMPATE!!"}])
      setPlacar("EMPATE!!")
    }else if(jogadas[0].jogada==="Papel" && jogadas[1].jogada==="Papel"){
      setHistoricoJogadas(prevState => [...prevState, {jogador: "Papel", maquina: "Papel", resultado:"EMPATE!!"}])
      setPlacar("EMPATE!!")
    }else if(jogadas[0].jogada==="Tesoura" && jogadas[1].jogada==="Tesoura"){
      setHistoricoJogadas(prevState => [...prevState, {jogador: "Tesoura", maquina: "Tesoura", resultado:"EMPATE!!"}])
      setPlacar("EMPATE!!")
    }else if(jogadas[0].jogada==="Pedra" && jogadas[1].jogada==="Papel"){
      setHistoricoJogadas(prevState => [...prevState, {jogador: "Pedra", maquina: "Papel", resultado:"MÁQUINA GANHOU!!"}])
      setContVitoriaMaquina(contVitoriaMaquina + 1 )
      setPlacar("MÁQUINA GANHOU!!")
    }else if(jogadas[0].jogada==="Pedra" && jogadas[1].jogada==="Tesoura"){
      setHistoricoJogadas(prevState => [...prevState, {jogador: "Pedra", maquina: "Tesoura", resultado:"JOGADOR GANHOU!!"}])
      setContVitoriaJogador(contVitoriaJogador  + 1 )
      setPlacar("VOCÊ GANHOU!!")
    }else if(jogadas[0].jogada==="Papel" && jogadas[1].jogada==="Pedra"){
      setHistoricoJogadas(prevState => [...prevState, {jogador: "Papel", maquina: "Pedra", resultado:"JOGADOR GANHOU!!"}])
      setContVitoriaJogador(prevState => prevState +1 )
      setPlacar("VOCÊ GANHOU!!")
    }else if(jogadas[0].jogada==="Papel" && jogadas[1].jogada==="Tesoura"){
      setHistoricoJogadas(prevState => [...prevState, {jogador: "Papel", maquina: "Tesoura", resultado:"MÁQUINA GANHOU!!"}])
      setContVitoriaMaquina(prevState => prevState + 1 )
      setPlacar("MÁQUINA GANHOU!!")
    }else if(jogadas[0].jogada==="Tesoura" && jogadas[1].jogada==="Pedra"){
      setHistoricoJogadas(prevState => [...prevState, {jogador: "Tesoura", maquina: "Pedra", resultado:"MÁQUINA GANHOU!!"}])
      setContVitoriaMaquina(prevState => prevState + 1 )
      setPlacar("MÁQUINA GANHOU!!")
    }else if(jogadas[0].jogada==="Tesoura" && jogadas[1].jogada==="Papel"){
      setHistoricoJogadas(prevState => [...prevState, {jogador: "Tesoura", maquina: "Papel", resultado:"JOGADOR GANHOU!!"}])
      setContVitoriaJogador(prevState => prevState + 1 )
      setPlacar("VOCÊ GANHOU!!")
    }
    setJogadas([])
  }
  
},  [jogadas, historicoJogadas, contVitoriaJogador, contVitoriaMaquina, id, idMaquina, navegacao])
  return (
    <div className="container">
      <header>
        <h1>Jokenpô - </h1> <img src='/img/Pedra-Papel-Tesoura.svg'></img>
      </header>
      <div className='infoPartida'>
        <Link to="/escolhaPersonagem">&lt;-  Voltar</Link>
        <a href="#obs">Começar partida <SportsEsportsIcon></SportsEsportsIcon></a> 
        <Link to="/historicoRodadas" id={"historicoRodadas"}>Partidas<ViewListIcon/></Link>
        <Link to="/historicoJogos" id={"historicoRodadas"}>Jogos<ViewListIcon/></Link>
      </div>
      <Alert variant="filled" severity="info" id={"obs"}>OBS:O jogo termina com quem ganhar 3 rodadas primeiro.</Alert>
      <div className="areaJogo">
        <div className="cardTelaJogo">
          <h2>Vitórias:{contVitoriaJogador}<br/>Jogador</h2>
          <img src={personagem.urlImg} alt="" />
          <p>{personagem.nome}</p>
          <div className="jogadas">
              <Button onClick={() => ancoraHomeCard({idJogada:1, jogador: 1})} >Pedra</Button>
              <Button onClick={() => ancoraHomeCard({idJogada:2, jogador: 1})} >Papel</Button>
              <Button onClick={() => ancoraHomeCard({idJogada:3, jogador: 1})} >Tesoura</Button>
          </div>
        </div>
        <div className="cardCentral">
        <a href="#movimentosPartida">Movimentos da partida</a>
          <div className="placar">
            {
              placarRodada === "off" && <h2>Resultado da rodada:<br/>{placar}</h2>
            }
            {placarRodada !== "off" && <h2>{placarRodada}</h2>}
          </div>
          <div className="escolhaJogadores">      
            <h2>Jogadas</h2> 
            <div>
              <img src={imgJogadaJogador} alt="jogada Jogador" />
              <p>X</p>
              <img src={imgJogadaMaquina} alt="jogada Máquina" />
            </div>
          </div>
        </div>  
        <div className="cardTelaJogo">      
          <h2>Vitórias:{contVitoriaMaquina}<br/>Máquina</h2>
          <img src={personagemMaquina.urlImg} alt="" />
          <p>{personagemMaquina.nome}</p>
        </div>     
      <div>
        </div>
      </div>
      <div id="movimentosPartida">
        <h2>Movimentos da Partida</h2>
        <ul>
          {
            historicoJogadas.length === 0 && <h2 style={{color:"gray"}}>Sem movimento</h2>
          }
        {
          historicoJogadas.length > 0 
          &&
          historicoJogadas.map((historicoJogada, index)=>(
            <li><strong>{index+1}ª rodada</strong> - Jogador: &quot;{historicoJogada.jogador}&quot; - Máquina: &quot;{historicoJogada.maquina}&quot; - resultado: &quot;{historicoJogada.resultado}&quot;</li>
          ))        
        }
        </ul>
      </div> 
    </div>   
  )
}

