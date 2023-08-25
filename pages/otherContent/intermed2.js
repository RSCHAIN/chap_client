import InputBar from "@/components/InputBar";
import Navbar from "@/components/Navbar";
import InputLg from "@/components/generale/InputLg";
import SearcheIcone from "@/components/generale/SearcheIcone";

import {
  Box,
  Center,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Link,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/FIREBASE/clientApp";
import Tested from "./test2";
import { useEffect } from "react";
import { useState } from "react";

export default function Intrmed2() {
  const [terms, setTerms] = useState("");
  const [check, setCheck] = useState(0);
  const [categorie, setCategorie] = useState();
  const [modalData, setModalData] = useState([]);
  const [jour,setJour] =useState([])

  useEffect(() => {
    setCategorie(localStorage.getItem("service"));
    setJour(localStorage.getItem("jour"))
  }, []);

  const recherche = async (terms, categorie) => {
    const q = query(
      collection(db, "Admin"),
      where("codePostal", "==", String(terms).trim()),
      where("categorie", "==", categorie)
    );

    const querySnapshot = await getDocs(q);

    setModalData(querySnapshot.docs);
  };

  return (
    <>
      <InputBar />
      <Box display={{ base: "none", md: "grid" }} mt={10}>
        <Navbar />
      </Box>
      <Center mt={5}>
        <Flex justifyContent={"space-between"}>
          {/* <Text mr={5} fontSize={20}>Trouver un magasin</Text><br/> */}
          <InputGroup>
            <Input
              type="number"
              onChange={(e) => recherche(e.target.value, categorie)}
              placeholder={"Code Postal"}
              w={["8em", "8em", "10em", "20em", "20em"]}
              // onClick={onOpen}
            />
            <InputRightAddon pointerEvents="none">
              <Text>Rechercher</Text>
            </InputRightAddon>
          </InputGroup>
        </Flex>
      </Center>
      {modalData.length == 0 ? <Tested /> : <>
      <SimpleGrid
        
          columns={[2, 2, 2, 3, 4]}
          spacing={2}
          width={"100%"}
          mt={10}
          ml={[10, 10, 10, 20, 20]}
        >
         
          {modalData.map((doc, index) => (
           
            <Box
              key={index}
              height={["50%", "20vh", "20vh", "20vh", "20vh"]}
              width={{ base: "70%", md: "45%" }}
              marginBottom={40}
              mr={5}
              borderRadius={[10,10,50,50,50]}
            >
              <Link
                height={"15vh"}
                width={{ base: "80%", md: "30%" }}
                mt={5}
                mb={5}
                onClick={() => {
                  sessionStorage.setItem("savefrom", doc.data().number),
                    sessionStorage.setItem("image",  doc.data().imageUrl),
                    sessionStorage.setItem("nom",  doc.data().organisation),
                    sessionStorage.setItem("adresse",  doc.data().adresse),
                    sessionStorage.setItem("categorie",  doc.data().categorie);
                    sessionStorage.setItem("description",  doc.data().description);
                    sessionStorage.setItem("nationalite",  doc.data().nationalite);
                    sessionStorage.setItem("horaire", JSON.stringify( doc.data().horaire));
                    sessionStorage.setItem("paiement", JSON.stringify( doc.data().methodeDePaiement));
                }}
                mr={{ base: "0%", md: "0%" }}
                _hover={{ textDecoration: "none" }}
                href={"/otherContent/intermed1"}
              >
                <Flex
                  height={"100%"}
                  width={"100%"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  borderRadius={50}
                  backgroundImage={ doc.data().imageUrl}
                  backgroundPosition={"center"}
                  backgroundSize={"cover"}
                  backgroundRepeat={"no-repeat"}
                >
                  <Flex
                    alignItems={"center"}
                    justifyContent={"center"}
                    borderRadius={50}
                    height={"100%"}
                    width={"100%"}
                    bg={"rgba(0, 0, 0, 0.277)"}
                  >
                    <Text fontSize={"xl"} color={"#fff"} textAlign={"center"}>
                      {  doc.data().organisation}
                    </Text>
                  </Flex>
                </Flex>
              </Link>
              <Box bgColor={"white"}width={"100%"} borderBottom={"1px solid black"}>
              {Object.values(doc.data().horaire)[jour].length >5 ?  <Text
                fontSize={"sm"}
                color={"green"}
                textAlign={"center"}
                fontWeight={"bold"}
              >
              Ouvert : {" ",Object.values(doc.data().horaire)[jour]} 
              </Text> : <Text
                fontSize={"sm"}
                color={"red"}
                textAlign={"center"}
                fontWeight={"bold"}
              >
               
               {Object.values(doc.data().horaire)[jour].length <4 ? "kolo" : `${" ",Object.values(doc.data().horaire)[jour]}`} 
                  
              </Text> } 
              </Box> 
              <Box>
                <Text as={"h4"} pb={5} align={"center"}>
                    {  doc.data().adresse}
                </Text>
              </Box>
              
            </Box>
            
          ))}
        </SimpleGrid>
      </>}
    </>
  );
}
