import { Editable, EditableInput, EditablePreview, Flex, Link, Text, Tooltip } from "@chakra-ui/react";
import Showconnex from "../ShowConnexion";
import { useEffect } from "react";
import { useState } from "react";

const LoginSignButton = () => {
    const [posta,setPosta]= useState("")
    useEffect(()=>{
        setPosta(localStorage.getItem("postal"))
    },[posta])
    return (
        <>
        <Flex display={["none","none","none","flex","flex"]}>  
        {posta.length>=5 ? <>
        
            <Flex><Text mr={5} mt={1}>Votre code postal</Text> <Tooltip label='click, pour editer'><Editable  defaultValue={posta}>
  <EditablePreview/>
  <EditableInput value={posta} onChange={(e)=>{setPosta(e.target.value),localStorage.setItem("postal",e.target.value)}}/>
</Editable></Tooltip></Flex></>:<>  <Flex><Text mr={5} mt={1}>Editer votre code postal</Text> <Tooltip label='click, pour editer'><Editable  defaultValue={posta}>
  <EditablePreview/>
  <EditableInput value={posta} onChange={(e)=>{setPosta(e.target.value),localStorage.setItem("postal",e.target.value)}}/>
</Editable></Tooltip></Flex></>}
                  <Showconnex/>
                  </Flex>

        </>
    );
};

export default LoginSignButton;