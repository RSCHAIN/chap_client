import { Input,Text } from "@chakra-ui/react"
import axios from "axios"
import { getCloneableBody } from "next/dist/server/body-streams"
import { useState } from "react"
import { useEffect } from "react"

export default function Recherhce(){
    const [data,setData] = useState([])
    const [code,setCode] = useState([])
    const [final,setFinal] = useState([""])
    const Search =(id)=>{
        // console.log(data.filter(order => (order.num_dep === id)))
       if(data.filter(order => (order.num_dep === id)).length!=0){
        setFinal(data.filter(order => (order.num_dep === id)))
       }
       
    }
    useEffect(()=>{
        const  GetAll= async ()=>{
            await axios.get("api/GetJson").then((response)=>{
                // console.log(response.data);
                // console.log("object values", Object.values(response.data))
                setData(JSON.parse(Object.values(response.data)))
            })
        };
      GetAll()

    })
    return(
        <>
       <Input type="number" onChange={(e)=>{
        setCode(e.target.value),
        Search(code.slice(0,2))
       }}/>
       <Text>{Object.values(final[0])[2]}</Text>
       <Text>{typeof(code)}</Text>
       


        </>
    )
}