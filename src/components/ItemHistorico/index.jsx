import "./styles.css"
export function ItemHistorico({jogadas, indexRodadas, vencedor}){

    return (
    <div className="itemHistorico">
        
        {
        indexRodadas != undefined && <h2>{indexRodadas+1}º Rodada - Vencedor: {vencedor}</h2>
        }
        <ul>
        {
          jogadas.map((jogada, index) => (
                <li key={index}> Jogador: {jogada.jogador} - Máquina: {jogada.maquina} - resultado: {jogada.resultado}</li>
          ))
        }
        </ul>
    </div>
    )
}