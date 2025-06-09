import { Link, useLocation } from "react-router-dom"
import { useState, useMemo } from "react"

import AdestAlePregunta from "../Components/AdestAlePregunta"

function AdestAle() {
    
    const location = useLocation();
    const {verbos, tempos} = location.state;

    const [preguntaAgora, setPreguntaAgora] = useState(0);
    const [acertos, setAcertos] = useState(0);

    const pronomesTiempos = {
        "pri": 6,
        "cop": 6,
        "pti": 6,
        "ant": 6,
        "fui": 6,
        "pos": 6,
        "prs": 6,
        "pts": 6,
        "fus": 6,
        "imp": 2,
        "fno": 3,
        "inf": 6
    }

    const [preguntas] = useState(() => {
        let preguntasInicio = [];
        for (let i = 0; i < verbos.length; i++) {
            for (let j = 0; j < tempos.length; j++) {
                for (let k = 0; k < pronomesTiempos[tempos[j]]; k++) {
                    preguntasInicio.push([verbos[i], tempos[j], k]);
                }
            }
        }
        return preguntasInicio.sort(() => 0.5 - Math.random());
    })

    if (preguntaAgora < preguntas.length) {
        return(
            <div className="caja">
                <h3>{preguntaAgora+1}/{preguntas.length}</h3>
                <AdestAlePregunta   tempo={preguntas[preguntaAgora][1]}
                                    verbo={preguntas[preguntaAgora][0]}
                                    pron={preguntas[preguntaAgora][2]}
                                    seguinte={() => setPreguntaAgora(p => p+1)}
                                    acertos={(n) => setAcertos(a => a+n)}/>
            </div>
        );
    } else {
        return(
            <div className="caja">
                <h1>Tiveches {acertos} acertos!</h1>
                <h2>Iso é o {(acertos*100/preguntas.length).toPrecision(3)}%</h2>
                <Link to="/"><button autoFocus>Volver ao inicio</button></Link>
            </div>
        );
    }
}

export default AdestAle