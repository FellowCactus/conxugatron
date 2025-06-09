import { useState, useEffect, useRef } from 'react'

function AdestEstPregunta({tempo, verbo, seguinte, acertos, resTotales}) {
    
    const [conx, setConx] = useState([]);
    const [respuestas, setRespuestas] = useState([]);
    const [milVerbos, setMilverbos] = useState([]);
    const inputRefs = useRef([]);

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}milverbos.csv`)
            .then(response => response.text())
            .then(responseText => setMilverbos(responseText.trim().split("\r\n")));
        
        fetch(`${import.meta.env.BASE_URL}conxugacions/${tempo}.csv`)
            .then(response => response.text())
            .then(responseText => setConx(responseText.trim().split("\r\n")));
    }, [tempo]);

    if (conx.length === 0 || milVerbos.length === 0) {
        return(<></>);
    }

    const prons = conx[0].split(",");
    const correcto = conx.slice(1)[milVerbos.indexOf(verbo)].split(",").map((s) => s.toLowerCase());

    const nomeTiempos = {
        "pri": "Presente de indicativo",
        "cop": "Copretérito",
        "pti": "Pretérito de indicativo",
        "ant": "Antepretérito",
        "fui": "Futuro de indicativo",
        "pos": "Pospretérito",
        "prs": "Presente de subxuntivo",
        "pts": "Pretérito de subxuntivo",
        "fus": "Futuro de subxuntivo",
        "imp": "Imperativo",
        "fno": "Formas nominais",
        "inf": "Infinitivo conxugado"
    }

    function handleComprobar(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        for (let [_, value] of formData.entries()) {
            setRespuestas(r => [...r, value.toLowerCase()]);
        }
    }

    function handleSeguinte() {
        seguinte();
        const arrAcertos = respuestas.map((e,i) => correcto[i].split("/").map(s => s.trim()).includes(e.trim()) ? 1 : 0);
        const numAcertos = arrAcertos.reduce((acc, curr) => acc + curr);
        acertos(numAcertos);
        resTotales(respuestas.length);
        setRespuestas([]);
    }

    function handleEnter(e,i) {
        if (e.key === "Enter") {
            e.preventDefault();
            if (i < prons.length - 1) {
                inputRefs.current[i+1].focus();
            } else {
                e.target.form?.requestSubmit();
            }
        }
    }

    const tablaPregunta =   <div className="tabla-est">
                            <form onSubmit={handleComprobar} autoComplete="off">
                                <table>
                                    <tbody>
                                        {prons.map((p,i) =>
                                            <tr key={i}>
                                                <td><label htmlFor={p}>{p}</label></td>
                                                <td><input type="text" id={p} name={i} ref={(el) => inputRefs.current[i] = el}  onKeyDown={(e) => handleEnter(e,i)} autoFocus={i===0}/></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            <button type="submit">Comprobar</button>
                            </form>
                            </div>
    
    const tablaRespuestas = <div className="tabla-est">
                                <table>
                                    <tbody>
                                        {prons.map((p,i) =>
                                            correcto[i].split("/").map(s => s.trim()).includes(respuestas[i]?.trim()) ? (
                                                <tr key={i}>
                                                    <td><label htmlFor={p}>{p}</label></td>
                                                    <td className="correcto">{respuestas[i]} ✔</td>
                                                </tr>
                                            ) : (
                                                <tr key={i}>
                                                    <td><label htmlFor={p}>{p}</label></td>
                                                    <td><span className="incorrecto">{respuestas[i]}</span> <span className="corregido">✖ {correcto[i]}</span></td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                                <button autoFocus onClick={handleSeguinte}>Seguinte</button>
                            </div>


    return (
        <div>
            <h2>Adestramento estruturado</h2>
            <h3>{nomeTiempos[tempo]} de {verbo}</h3>
            {respuestas.length === 0 ? tablaPregunta : tablaRespuestas}
        </div>
    );
}

export default AdestEstPregunta