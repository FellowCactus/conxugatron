import { useState } from 'react'
import { Link } from 'react-router-dom'

import ConxConfigTempos from '../Components/ConxConfigTempos'
import ConxConfigVerbos from '../Components/ConxConfigVerbos'
import ConxConfigModos from '../Components/ConxConfigModos'

function ConxConfig() {
    
    const [papaConfig, setPapaConfig] = useState({tempos:[], verbos:[], modo:"est"});

    return(
        <div className="caja">
            <h1>Benvido ao conxugatroŋ!</h1>
            <ConxConfigVerbos config={papaConfig} setConfig={setPapaConfig}/>
            <ConxConfigTempos config={papaConfig} setConfig={setPapaConfig}/>
            <ConxConfigModos config={papaConfig} setConfig={setPapaConfig}/>
            {papaConfig.tempos.length > 0 && papaConfig.verbos.length > 0 ? <Link to={`/adest${papaConfig.modo}`} state={papaConfig}><button>Empezar</button></Link> : <p id="falta-datos">Introduce ao menos un verbo e un tempo.</p>}
        </div>
    );
}

export default ConxConfig