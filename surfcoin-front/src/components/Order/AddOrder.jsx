 import Data from "./Amount";
 import Block from "../../models/BlockClass";
 import BlockChain from "../../models/BlockchainClass";
 import HttpClient from "../../service/http";
 import { useState} from "react";
import Sender from "./Sender";
import Recipient from "./Recipient";
  

 const Order = ({     createNewOrder }) => {
     const [amount, setAmount ] = useState({});
     const [sender, setSender] = useState({});
     const [recipient, setRecipient] = useState({});
     const [blockchain, setBlockchain] = useState(new BlockChain());
     const [transaction, setTransaction] = useState({
     });


     const handleChangesDate = async () => {
         const http = new HttpClient();
         const res = await await http.get('api/v1/blockchain')
         setBlockchain(res.data.chain)
     };
    
     const createOrder = async (e) => {
         e.preventDefault()
         const lastBlock =  (blockchain[blockchain.length - 1] ) ;
      //  create new object(transaction)
           
          
      //const check = newOrder.getValidation()        
      //   if(check.validated) {
      //console.log('newOrder', newOrder);
      //  saveBlock(newOrder);
      //}
     };
     async function saveBlock(obj) {
        const url = 'localhost:5001/api/v1/blockchain/mine';
        const http = new HttpClient(url);
        await http.add(obj);
        // redirect
        location.href = './blockchain'
      }
     return ( 
        <>
         <form className = "formOrder col-12"
         onSubmit = {(e) => {
                 e.preventDefault();
                 createOrder();}} >
         <div className = "val"
         onChange = {handleChangesDate} >
         <Data updateAmount = {setAmount}/> 
         <Sender updateSender = {setSender} />   
         <Recipient updateRecipient = {setRecipient} />    
         </div> 
         <h1 > Information that you adding to transaction </h1> 
         <div className = "data-container" >
         <p > amount :{JSON.stringify(amount)} </p> 
         <p > sender : {JSON.stringify(sender)} </p> 
         <p > recipient : {JSON.stringify(recipient)} </p>
         </div>


         <div className = "submit" >
         <button className = "button btn"
         onClick = {
             e => createOrder(e)
         } > Submit </button> </div> </form>

         </>
     );
 };

 export default Order;