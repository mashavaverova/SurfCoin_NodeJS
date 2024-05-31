  import {
    useState,
    useContext,
    useEffect
  } from "react";
 
  import HttpClient from  "../service/http";
  
  // import Error from "../components/Tools/Error";

  const BlockChain = () => {

    const [blockchain, setBlockchain] = useState( [] );
   
      useEffect(() => {
        listBlockchain();
         setBlockchain  ( blockchain ); 
      }, [    ]);
 
 
    const listBlockchain = async () => {
      try {
        const http = new HttpClient();
        const result = await http.get('api/v1/blockchain');
        //http://localhost:5001/api/v1/blockchain
        console.log(result.data.chain);
        return   setBlockchain(result.data.chain);
        

      } catch (error) {
        throw new Error
        (`problem to get data ${response.status} 
                              ${response.statusText}`);
      }
      }

    return (
       <>
       <div className = "blockchain container">
      <h1 > Blockchain </h1>
      <button className = "btn" onClick = {
        listBlockchain}> List All Blocks </button> 
     
       { blockchain.map((block) => {
          
          return(
            <div  className="block">
             <p key={block.blockIndex} >blockIndex : {block.blockIndex}</p>
            <p key={block.timestamp}> timestamp : {block.timestamp}</p>
           <p>last block hash : {block.lastHash}</p>
            <p> block hash : {block.hash}</p>
       
            {/* <div> data : {block.data.map((data) => {return ( 
              <div className="data-container" key={data.transactionId}>
              <p>amount : {data.amount} </p>
              <p>sender : {data.sender} </p>
              <p>recipient : {data.recipient} </p>
              <p>  transactionId : {data.transactionId }   </p>
              </div>
            )})  }</div> */}
            <p> nonce : {block.nonce}</p>
            <p> difficulty : {block.difficulty}</p>
           
            </div>
          );

          
    }
    )} 
    </div>

     
      </>
       
    );
  };

  export default BlockChain;