import "./styles.css"
export function Card({titulo ,ancoraHomeCard, nome, idJogador, imgUrl}){

    return (
    <div className="card">
        <h2>{titulo}</h2>
        <img src={imgUrl} alt="" />
        <p>{nome}</p>
        <div className="jogadas">
            <button onClick={() => ancoraHomeCard({idJogada:1, jogador: idJogador})}>Pedra</button>
            <button onClick={() => ancoraHomeCard({idJogada:2, jogador: idJogador})}>Papel</button>
            <button onClick={() => ancoraHomeCard({idJogada:3, jogador: idJogador})}>Tesoura</button>
        </div>
    </div>
    )
}