import "./styles.css"
export function CardSemBotao({ancoraHomeCard, nome, idJogador, imgUrl}){

    return (
    <div className="card">
        <img src={imgUrl} alt="" />
        <p>{nome}</p>
    </div>
    )
}