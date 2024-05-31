import "./App.scss";
// import { useEffect, useState } from "react";
import { RouterProvider } from "react-router";
// import { initAdmin } from "./utilities/localUtils";
import { router } from "./Router";

 
// import { ExplorerContext } from "./contexts/context";
 
 

function App() {
  // const [web3, setWeb3] = useState(null)
  // useEffect(() => {
  //   setWeb3(new Web3Explorer())
  // }, [])

 
  return <>
      
      {/* <ExplorerContext.Provider value={{ web3: web3 }}>
        <RouterProvider router={router} />
      </ExplorerContext.Provider> */}
      <RouterProvider router={router} />

  </>
}

export default App;
