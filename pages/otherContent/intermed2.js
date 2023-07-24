import InputBar from "@/components/InputBar";
import Navbar from "@/components/Navbar";
import InputLg from "@/components/generale/InputLg";
import SearcheIcone from "@/components/generale/SearcheIcone";

import { Box, Center, Flex, Text } from "@chakra-ui/react";

import Tested from "./test2";

export default function Intrmed2() {
  return (
    <>
      <InputBar/>
      <Box display={{base:"none",md:"grid"}} mt={10}>
      <Navbar/>
      </Box>
      <Center mt={5} display={{base:"none",md:"grid"}}>
      <Flex justifyContent={"space-between"}>
        {/* <Text mr={5} fontSize={20}>Rechercher un magasin</Text><br/> */}
      
      {/* <InputLg/> */}
      <SearcheIcone message={"Recherchez un magasin"}/>
      
      </Flex>
      </Center>
      <Center mt={5} display={{base:"grid",md:"none"}}>
      <Flex justifyContent={"space-between"}>
        {/* <Text mr={5} fontSize={20}>Trouver un magasin</Text><br/> */}
      
      <SearcheIcone message={"Recherchez un magasin"}/>
      
      </Flex>
      </Center>
      <Tested/>
      
    </>
  );
}
