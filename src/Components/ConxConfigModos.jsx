
function ConxConfigModos({config, setConfig}) {
    
    function handleModoChange(e) {
        setConfig(c => ({...c, modo: e.target.value}));
    }

    return(
        <div>
            <h2>Modos de adestramento</h2>
            <input type="radio" value="est" id="estruturado" onChange={handleModoChange} checked={config.modo === "est"}/>
            <label htmlFor="estruturado">Adestramento estruturado</label> <br/>
            <input type="radio" value="ale" id="aleatorio" onChange={handleModoChange} checked={config.modo === "ale"}/>
            <label htmlFor="aleatorio">Adestramento aleatorio</label>
        </div>
    );
}

export default ConxConfigModos