import { useState } from 'react'
import './App.css'
import Gareth from './components/Gareth'
import Login from './components/Login'

function App() {
  // Toggle state for Gareth's components
  const [showGareth, setShowGareth] = useState(false)
  const toggleGareth = () => setShowGareth(!showGareth)

  return (
    <>
      <div>
        <button onClick={toggleGareth} >Gareth</button>
        {showGareth && <Gareth />}
      </div>
    </>
  )
}

export default App
