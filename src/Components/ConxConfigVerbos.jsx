import { useState, useEffect } from 'react'

function ConxConfigVerbos({config, setConfig}) {
    
    const [verboActual, setVerboActual] = useState("");
    const [milVerbos, setMilverbos] = useState([]);
    const [nVerbos, setNVerbos] = useState(3);

    useEffect(() => {
        fetch("/milverbos.csv")
            .then(response => response.text())
            .then(responseText => setMilverbos(responseText.trim().split("\r\n")));
    },[]);
    

    function handleVerboChange(e) {
        setVerboActual(e.target.value);
    }

    function handleEntradaVerbo(e) {
        if (e.key === "Enter") {
            if (milVerbos.includes(verboActual) && !config.verbos.includes(verboActual) && config.verbos.length < 10) {
                setConfig(c => ({...c, verbos: [...c.verbos, verboActual]}));
                setVerboActual("");
            }
        }
    }

    function handleNVerbosChange(e) {
        setNVerbos(e.target.value);
    }

    function handleVerbosAleatorios(e) {
        if (nVerbos>10) {
            alert("Isos son moitos verbos!");
        } else {
            let n = parseInt(nVerbos);
            if (config.verbos.length + parseInt(nVerbos) >= 10) {
                n = 10-config.verbos.length;
            }
            const verbosDesordenados = milVerbos.toSorted(() => 0.5 - Math.random());
            setConfig(c => ({...c, verbos: [...c.verbos, ...verbosDesordenados.slice(0,n)]}));
        }
    }

    function handleBorrar(e) {
        setConfig(c => ({...c, verbos:[]}))
    }

    return(
        <div>
            <h2>Verbos</h2>
            <input type="text" value={verboActual} onChange={handleVerboChange} onKeyUp={handleEntradaVerbo} placeholder="Introduce os teus verbos..."/>
            <button onClick={handleBorrar}>Borrar</button><br/>
            <button onClick={handleVerbosAleatorios}>Verbos aleatorios</button>
            <input type="number" min="1" max="10" id="nverbos" value={nVerbos} onChange={handleNVerbosChange}/>
            <p id="lista-verbos">Verbos: <i>{config.verbos.join(", ")}</i></p>
        </div>
    );
}

export default ConxConfigVerbos