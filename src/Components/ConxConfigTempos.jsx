
function ConxConfigTempos({config, setConfig}) {

    const handleTemposChange = (e) => {
        let isChecked = e.target.checked;
        if (isChecked){
            setConfig(c => ({...c, tempos: [...c.tempos, e.target.id]}));
        } else{
            setConfig(c => ({...c, tempos: c.tempos.filter(t => t!=e.target.id)}));
        }
    }

    return(
        <div>
            <h2>Tempos</h2>
            <table>
                <tbody>
                    <tr>
                        <th colSpan="3">Indicativo</th>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox" id="pri" onChange={handleTemposChange}/>
                            <label htmlFor="pri">Presente</label>
                        </td>
                        <td>
                            <input type="checkbox" id="pti" onChange={handleTemposChange}/>
                            <label htmlFor="pti">Pretérito</label>
                        </td>
                        <td>
                            <input type="checkbox" id="fui" onChange={handleTemposChange}/>
                            <label htmlFor="fui">Futuro</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox" id="cop" onChange={handleTemposChange}/>
                            <label htmlFor="cop">Copretérito</label>
                        </td>
                        <td>
                            <input type="checkbox" id="ant" onChange={handleTemposChange}/>
                            <label htmlFor="ant">Antepretérito</label>
                        </td>
                        <td>
                            <input type="checkbox" id="pos" onChange={handleTemposChange}/>
                            <label htmlFor="pos">Pospretérito</label>
                        </td>
                    </tr>
                    <tr>
                        <th colSpan="3">Subxuntivo</th>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox" id="prs" onChange={handleTemposChange}/>
                            <label htmlFor="prs">Presente</label>
                        </td>
                        <td>
                            <input type="checkbox" id="pts" onChange={handleTemposChange}/>
                            <label htmlFor="pts">Pretérito</label>
                        </td>
                        <td>
                            <input type="checkbox" id="fus" onChange={handleTemposChange}/>
                            <label htmlFor="fus">Futuro</label>
                        </td>
                    </tr>
                    <tr>
                        <th colSpan="3">Imperativo</th>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox" id="imp" onChange={handleTemposChange}/>
                            <label htmlFor="imp">Imperativo</label>
                        </td>
                    </tr>
                    <tr>
                        <th colSpan="3">Formas nominais</th>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <input type="checkbox" id="fno" onChange={handleTemposChange}/>
                            <label htmlFor="fno">Formas no nominais</label>
                        </td>
                    </tr>
                    <tr>
                        <th colSpan="3">Infinitivo conxugado</th>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <input type="checkbox" id="inf" onChange={handleTemposChange}/>
                            <label htmlFor="inf">Infinitivo conxugado</label>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ConxConfigTempos