import { HashRouter as Router, Routes, Route } from "react-router-dom"

import ConxConfig from "./Pages/ConxConfig"
import AdestEst from "./Pages/AdestEst"
import AdestAle from "./Pages/AdestAle"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConxConfig/>}/>
        <Route path="/adestest" element={<AdestEst/>}/>
        <Route path="/adestale" element={<AdestAle/>}/>
      </Routes>
    </Router>
  )
}

export default App
