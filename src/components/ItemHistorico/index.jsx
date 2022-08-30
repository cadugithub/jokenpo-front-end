import "./styles.css"
export function ItemHistorico({jogadas, indexRodadas, vencedor, perdedor}){

    return (
    <div className="itemHistorico">
        
        {
        (indexRodadas !== undefined && perdedor === undefined) && <h2>{indexRodadas+1}º Partida - Vencedor: {vencedor}</h2>
        }
        <ul>
        { (jogadas != undefined && perdedor === undefined) &&
          jogadas.map((jogada, index) => (
                <li key={index}> Jogador: {jogada.jogador} - Máquina: {jogada.maquina} - resultado: {jogada.resultado}</li>
          ))
        }
        </ul>
        <ul>
          {
          
          (jogadas === undefined) &&
          <div className="itemHistoricoJogos .itemHistorico">
            <h2>{indexRodadas+1}º JOGO</h2> 
            <p>{vencedor} X {perdedor} - Vencedor: {vencedor}</p>
          </div>
          }
        </ul>
    </div>
    )
}