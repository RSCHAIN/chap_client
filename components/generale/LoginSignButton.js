import { Editable, EditableInput, EditablePreview, Flex, Link, Text, Tooltip } from "@chakra-ui/react";
import Showconnex from "../ShowConnexion";
import { useEffect } from "react";
import { useState } from "react";

const LoginSignButton = () => {
    const [posta,setPosta]= useState("")
    const [paramText,setParamText]= useState("Votre code postal")
    useEffect(()=>{
        setPosta(localStorage.getItem("postal"))
    },[posta])
    return (
        <>
        <Flex display={["none","none","none","flex","flex"]}>  
        {/* {posta.length<=4 ? <>  </>:<>
        
            <Flex><Text mr={5} mt={1}>{paramText}</Text> <Tooltip label='click, pour editer'><Editable  defaultValue={posta}>
  <EditablePreview/>
  <EditableInput value={posta} onChange={(e)=>{setPosta(e.target.value),localStorage.setItem("postal",e.target.value)}}/>
</Editable></Tooltip></Flex></>} */}
                  <Showconnex/>
                  </Flex>

        </>
    );
};

export default LoginSignButton;