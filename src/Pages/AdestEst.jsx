import { Link, useLocation } from "react-router-dom"
import { useState } from "react"

import AdestEstPregunta from "../Components/AdestEstPregunta"

function AdestEst() {

    const location = useLocation();
    const {verbos, tempos} = location.state;
    
    const [preguntaAgora, setPreguntaAgora] = useState(0);
    const [acertos, setAcertos] = useState(0);
    const [respuestas, setRespuestas] = useState(0);

    const [preguntas] = useState(() => {
        let preguntasInicio = [];
        for (let i = 0; i < verbos.length; i++) {
            for (let j = 0; j < tempos.length; j++) {
                preguntasInicio.push([verbos[i], tempos[j]]);
            }
        }
        return preguntasInicio.sort(() => 0.5 - Math.random());
    })

    if (preguntaAgora < preguntas.length) {
        return(
            <div className="caja">
                <h3>{preguntaAgora+1}/{preguntas.length}</h3>
                <AdestEstPregunta   tempo={preguntas[preguntaAgora][1]}
                                    verbo={preguntas[preguntaAgora][0]}
                                    seguinte={() => setPreguntaAgora(p => p+1)}
                                    acertos={(n) => setAcertos(a => a+n)}
                                    resTotales={(n) => setRespuestas(r => r+n)}/>
            </div>
        );
    } else {
        return(
            <div className="caja">
                <h1>Tiveches {acertos} acertos!</h1>
                <h2>Iso é o {(acertos*100/respuestas).toPrecision(3)}%</h2>
                <Link to="/"><button autoFocus>Volver ao inicio</button></Link>
            </div>
        );
    }
}

export default AdestEst