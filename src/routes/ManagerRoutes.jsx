import{Routes, Route} from "react-router-dom";
import {Home} from "../pages/Home";
import { EscolhaPersonagem } from "../pages/EscolhaPersonagem";
import {TelaJogo} from "../pages/TelaJogo";
import {Historico} from "../pages/Historico"
export function ManagerRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/escolhaPersonagem" element={<EscolhaPersonagem/>}/>
            <Route path="/jogo" element={<TelaJogo/>}/>
            <Route path="/jogo/:id/:idMaquina" element={<TelaJogo/>}/>
            <Route path="/historicoRodadas" element={<Historico />}/>
        </Routes>
    )
}