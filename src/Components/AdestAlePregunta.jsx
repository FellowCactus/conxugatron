import { useState, useEffect, useRef } from 'react'

function AdestAlePregunta({tempo, verbo, pron, seguinte, acertos}) {
    
    const [conx, setConx] = useState([]);
    const [respuesta, setRespuesta] = useState("");
    const [milVerbos, setMilverbos] = useState([]);
    const [estado, setEstado] = useState(0);
    const seguinteRef = useRef(null);

    useEffect(() => {
        fetch(import.meta.env.BASE_URL + "/milverbos.csv")
            .then(response => response.text())
            .then(responseText => setMilverbos(responseText.trim().split("\r\n")));
        
        fetch(import.meta.env.BASE_URL + `/conxugacions/${tempo}.csv`)
            .then(response => response.text())
            .then(responseText => setConx(responseText.trim().split("\r\n")));
    }, [tempo]);

    useEffect(() => {
        if (estado === 1) {
            setTimeout(() => {
                if (seguinteRef.current) {
                    seguinteRef.current.focus();
                }
            }, 0);
        }
    }, [estado]);

    if (conx.length === 0 || milVerbos.length === 0) {
        return(<></>);
    }

    const pronome = conx[0].split(",")[pron];
    const correcto = conx.slice(1)[milVerbos.indexOf(verbo)].split(",")[pron].toLowerCase();

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

    function handleResChange(e) {
        setRespuesta(e.target.value);
    }

    function handleComprobar(e) {
        setEstado(1);
    }

    function handleEnter(e) {
        if (e.key === "Enter") {
            setEstado(1);
        }
    }

    function handleSeguinte() {
        seguinte();
        acertos(correcto.split("/").map(s => s.trim()).includes(respuesta.trim()) ? 1 : 0);
        setRespuesta("");
        setEstado(0);
    }

    const tablaPregunta =   <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><label htmlFor={pronome}>{pronome}</label></td>
                                            <td><input type="text" id={pronome} value={respuesta} onChange={handleResChange} onKeyDown={handleEnter} autoComplete="off" autoFocus/></td>
                                        </tr>
                                    </tbody>
                                </table>
                            <button onClick={handleComprobar}>Comprobar</button>
                            </div>

    const tablaRespuesta =   <div>
                                <table>
                                    <tbody>
                                        {correcto.split("/").map(s => s.trim()).includes(respuesta.trim()) ? (
                                            <tr>
                                                <td><label htmlFor={pronome}>{pronome}</label></td>
                                                <td className="correcto">{respuesta} ✔</td>
                                            </tr>
                                        ) : (
                                            <tr>
                                                <td><label htmlFor={pronome}>{pronome}</label></td>
                                                <td><span className="incorrecto">{respuesta}</span> <span className="corregido">✖ {correcto}</span></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            <button ref={seguinteRef} onClick={handleSeguinte}>Seguinte</button>
                            </div>

    return (
        <div>
            <h2>Adestramento aleatorio</h2>
            <h3>{nomeTiempos[tempo]} de {verbo}</h3>
            {estado === 0 ? tablaPregunta : tablaRespuesta}
        </div>
    );
}

export default AdestAlePregunta