import { useState } from "react";
import "./App.css";
import BenProfile from "./components/Ben";

import Gareth from "./components/Gareth";
import Login from "./components/Login";

function App() {
  // Toggle state for Gareth's components
  const [showGareth, setShowGareth] = useState(false);
  const toggleGareth = () => setShowGareth(!showGareth);

  return (
    <>
      <div>
        <h1>Hello</h1>
        <BenProfile />
        <button onClick={toggleGareth}>Gareth</button>
        {showGareth && <Gareth />}
        {/* <Login /> */}
      </div>
    </>
  );
}

export default App;
