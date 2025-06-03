import axios from "axios";
import { useState } from "react"



function Test(){

const [inputval, Getinputval] = useState("")
const [reply, Getreply] = useState("")

    return(
        <>
        <input type="text" onInput={(e)=>{
            Getinputval(e.target.value)
        }} />
        <button onClick={()=>{

            axios.get("http://127.0.0.1:8000/", {
      params: { message: inputval }
    })
    .then((res) => {
      console.log(res.data.message)
      Getreply(res.data.message)
    })
    .catch((err) => {
        console.log(err);
        Getreply("there was an error")
        
    })
    .finally(() => {
      setIsTyping(false);
    });

        }}>Send</button>
        <h1>{reply}</h1>
        </>
    )
}

export default Test


