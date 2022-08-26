import { useState, useEffect } from 'react';
import { useParams, useNavigate, useHref, Link} from 'react-router-dom';
import { ItemHistorico } from '../../components/ItemHistorico';
import api from '../../services/api';
import './styles.css'

export function TelaJogo() {
//===================VALORES ENTRE COMPONENTES=================== 
const [jogadas, setJogadas] = useState([]) 
const [historicoJogadas, setHistoricoJogadas] = useState([])
const [personagem, setPersonagem]= useState([]); 
const [personagemMaquina, setPersonagemMaquina] = useState([]);
const {id, idMaquina} = useParams();
const [contVitoriaJogador,setContVitoriaJogador] = useState(0);
const [contVitoriaMaquina,setContVitoriaMaquina] = useState(0);
const [rodadas,setRodadas] = useState([]);
const [imgJogadaJogador, SetImgJogadaJogador] = useState("/img/Pedra-Papel-Tesoura.png");
const [imgJogadaMaquina, SetImgJogadaMaquina] = useState("/img/Pedra-Papel-Tesoura.png");
const [ultimaJogadaMaquina,setUltimaJogadaMaquina] = useState("Máquina ainda não jogou");
const [placar, setPlacar] = useState("Ninguém jogou ainda");
const [ultimaRodada, setUltimaRodada] = useState([])
const navegacao = useNavigate();
 

const ancoraHomeCard =(dadosDaJogada)=>{
   
  if(dadosDaJogada.jogador===1){
    
    if(dadosDaJogada.idJogada === 1){
      setJogadas(prevState => [...prevState, {idJogador: dadosDaJogada.jogador, jogada: "Pedra"}])
      SetImgJogadaJogador("/img/Pedra.png")
    }else if(dadosDaJogada.idJogada === 2){
      setJogadas(prevState => [...prevState, {idJogador: dadosDaJogada.jogador, jogada: "Papel"}])
      SetImgJogadaJogador("/img/Papel.png")
    }else{
      setJogadas(prevState => [...prevState, {idJogador: dadosDaJogada.jogador, jogada: "Tesoura"}])
      SetImgJogadaJogador("/img/Tesoura.png")
    }
  }else if(dadosDaJogada.jogador === 2){
    
    if(dadosDaJogada.idJogada === 1){
      setJogadas(prevState => [...prevState, {idJogador: dadosDaJogada.jogador, jogada: "Pedra"}])
    }else if(dadosDaJogada.idJogada === 2){
      setJogadas(prevState => [...prevState, {idJogador: dadosDaJogada.jogador, jogada: "Papel"}])
    }else{
      setJogadas(prevState => [...prevState, {idJogador: dadosDaJogada.jogador, jogada: "Tesoura"}])
      
    }
  }
  
}
async function trazHistorico(){
  await api.get("/historicoRodadas")
  .then((response) => setUltimaRodada(response.data[response.data.length-1]))
  .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
});
}
async function reqGeral(){
  await api.get("/personagens/"+id)
        .then((response) => {
          setPersonagem(response.data) 
        })
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });  
        await api.get("/personagens/"+idMaquina)
          .then((response) => setPersonagemMaquina(response.data))
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        }); 
        await api.get("/historicoRodadas")
        .then((response) => console.log(response.data))
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);   
        });
}
useEffect(()=>{

  reqGeral()

},[]) 
 
useEffect(()=>{
  console.log("Vitoria máquina: "+contVitoriaMaquina+" Vitória jogador: "+contVitoriaJogador)
  if(contVitoriaJogador===3){
    api.post("/historicoRodadas", {"historico":{jogadas:historicoJogadas, vencedor:"Jogador: "+personagem.nome}}).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    // setUltimaRodada({jogadas:historicoJogadas, vencedor:"Máquina: "+personagemMaquina.nome})
    setRodadas(prevState => [...prevState, {jogadas:historicoJogadas, vencedor:"Jogador: "+personagem.nome}])
    setContVitoriaJogador(0)
    setContVitoriaMaquina(0)
    setHistoricoJogadas([]) 
  }else if(contVitoriaMaquina===3){
    api.post("/historicoRodadas", {"historico":{jogadas:historicoJogadas, vencedor:"Máquina: "+personagemMaquina.nome}}).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    // setUltimaRodada({jogadas:historicoJogadas, vencedor:"Máquina: "+personagemMaquina.nome})
    setRodadas(prevState => [...prevState, {jogadas:historicoJogadas, vencedor:"Máquina: "+personagemMaquina.nome}])  
    setContVitoriaJogador(0)
    setContVitoriaMaquina(0)   
    setHistoricoJogadas([])   
  } 
  console.log(rodadas)
},[contVitoriaJogador, contVitoriaJogador, historicoJogadas])


useEffect(()=>{ 
  if(!id){
    navegacao("/escolhaPersonagem")
  }
  
  if(jogadas.length===1){
    const jogadaMaquina = Math.floor(3 * Math.random() + 1);
    if(jogadaMaquina===1){
      setJogadas(prevState => [...prevState, {idJogador: 2, jogada: "Pedra"}])
      setUltimaJogadaMaquina("Pedra")
      SetImgJogadaMaquina("/img/Pedra.png")
    }else if(jogadaMaquina===2){ 
      setJogadas(prevState => [...prevState, {idJogador: 2, jogada: "Papel"}])
      setUltimaJogadaMaquina("Papel")
      SetImgJogadaMaquina("/img/Papel.png")
    }else{
      setJogadas(prevState => [...prevState, {idJogador: 2, jogada: "Tesoura"}])
      setUltimaJogadaMaquina("Tesoura")
      SetImgJogadaMaquina("/img/Tesoura.png")
    }
  }
  
  if(jogadas.length===2){
    if(jogadas[0].jogada==="Pedra" && jogadas[1].jogada=="Pedra"){
      setHistoricoJogadas(prevState => [...prevState, {jogador: "Pedra", maquina: "Pedra", resultado:"EMPATE!!"}])
      setPlacar("EMPATE!!")
    }else if(jogadas[0].jogada==="Papel" && jogadas[1].jogada=="Papel"){
      setHistoricoJogadas(prevState => [...prevState, {jogador: "Papel", maquina: "Papel", resultado:"EMPATE!!"}])
      setPlacar("EMPATE!!")
    }else if(jogadas[0].jogada==="Tesoura" && jogadas[1].jogada=="Tesoura"){
      setHistoricoJogadas(prevState => [...prevState, {jogador: "Tesoura", maquina: "Tesoura", resultado:"EMPATE!!"}])
      setPlacar("EMPATE!!")
    }else if(jogadas[0].jogada==="Pedra" && jogadas[1].jogada=="Papel"){
      setHistoricoJogadas(prevState => [...prevState, {jogador: "Pedra", maquina: "Papel", resultado:"MÁQUINA GANHOU!!"}])
      setContVitoriaMaquina(contVitoriaMaquina + 1 )
      setPlacar("MÁQUINA GANHOU!!")
    }else if(jogadas[0].jogada==="Pedra" && jogadas[1].jogada=="Tesoura"){
      setHistoricoJogadas(prevState => [...prevState, {jogador: "Pedra", maquina: "Tesoura", resultado:"JOGADOR GANHOU!!"}])
      setContVitoriaJogador(contVitoriaJogador  + 1 )
      setPlacar("JOGADOR GANHOU!!")
    }else if(jogadas[0].jogada==="Papel" && jogadas[1].jogada=="Pedra"){
      setHistoricoJogadas(prevState => [...prevState, {jogador: "Papel", maquina: "Pedra", resultado:"JOGADOR GANHOU!!"}])
      setContVitoriaJogador(prevState => prevState +1 )
      setPlacar("JOGADOR GANHOU!!")
    }else if(jogadas[0].jogada==="Papel" && jogadas[1].jogada=="Tesoura"){
      setHistoricoJogadas(prevState => [...prevState, {jogador: "Papel", maquina: "Tesoura", resultado:"MÁQUINA GANHOU!!"}])
      setContVitoriaMaquina(prevState => prevState + 1 )
      setPlacar("MÁQUINA GANHOU!!")
    }else if(jogadas[0].jogada==="Tesoura" && jogadas[1].jogada=="Pedra"){
      setHistoricoJogadas(prevState => [...prevState, {jogador: "Tesoura", maquina: "Pedra", resultado:"MÁQUINA GANHOU!!"}])
      setContVitoriaMaquina(prevState => prevState + 1 )
      setPlacar("MÁQUINA GANHOU!!")
    }else if(jogadas[0].jogada==="Tesoura" && jogadas[1].jogada=="Papel"){
      setHistoricoJogadas(prevState => [...prevState, {jogador: "Tesoura", maquina: "Papel", resultado:"JOGADOR GANHOU!!"}])
      setContVitoriaJogador(prevState => prevState + 1 )
      setPlacar("JOGADOR GANHOU!!")
    }
    setJogadas([])
  }
  
},  [jogadas, historicoJogadas])
//===================VALORES ENTRE COMPONENTES===================

  return (
    <div className="container">
      <header>
        <h1>Jankenpo</h1>
        <Link to="/historicoRodadas">Histórico de rodadas</Link>
      </header>
      <Link to="/escolhaPersonagem" className='voltarParaHome'>&lt;-  Voltar</Link>
      <h2>OBS: O jogo termina com quem ganhar 3 rodadas primeiro.</h2>
      <h2>Última jogada da máquina: <span>{ultimaJogadaMaquina}</span></h2>
      <div className="areaJogo">
        <div className="cardTelaJogo">
          <h2>Vitórias:{contVitoriaJogador}<br/>Jogador</h2>
          <img src={personagem.urlImg} alt="" />
          <p>{personagem.nome}</p>
          <div className="jogadas">
              <button onClick={() => ancoraHomeCard({idJogada:1, jogador: 1})} disabled={true} style={{}}>Pedra</button>
              <button onClick={() => ancoraHomeCard({idJogada:2, jogador: 1})}>Papel</button>
              <button onClick={() => ancoraHomeCard({idJogada:3, jogador: 1})}>Tesoura</button>
          </div>
        </div>
        <div className="cardCentral">
          <div className="placar">
            <h2>Placar:<br/>{placar}</h2>
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
      <div id="movimentosUltimaRodada">
        <h2>Movimentos da Última rodada</h2>
        {/* <ItemHistorico jogadas={ultimaRodada.jogadas}/> */} 
        {
          console.log("Essa foi a ultima rodada "+ultimaRodada.jogadas)
 
        }
      </div>
    </div>
  )
}

