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
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/FIREBASE/clientApp";
import Tested from "./test2";
import { useEffect } from "react";
import { useState } from "react";
import secureLocalStorage from "react-secure-storage";
import Head from "next/head";
import { Search2Icon } from "@chakra-ui/icons";

export default function Intermed2() {
  const [terms, setTerms] = useState("");
  const [check, setCheck] = useState(0);
  const [categorie, setCategorie] = useState();
  const [modalData, setModalData] = useState([]);
  const [modalData2, setModalData2] = useState([]);
  const [jour,setJour] =useState([])


//   const Get = async ()=>{
  
//     if (datas==0) {
//         const q = query(collection(db, "Admin"), where("categorie","==", `${secureLocalStorage.getItem("service")}`),orderBy("organisation"));
      
//     const querySnapshot = await getDocs(q);
//     setModalData2(querySnapshot.docs)
    
// }}


  useEffect(() => {
    setCategorie(secureLocalStorage.getItem("service"));
    setJour(secureLocalStorage.getItem("jour"))
    // Get()
  }, []);

  const recherche = async (terms, categorie) => {
   
   try {
    const q = query(
      collection(db, "Admin"),
      where("ville", "==", String(terms).trim()),
      where("categorie", "==", categorie)
    );

    const querySnapshot = await getDocs(q);

    const q2 = query(
      collection(db, "Admin"),
      where("codePostal", "==", String(terms).trim()),
      where("categorie", "==", categorie)
    );

    const querySnapshot2 = await getDocs(q2);

    const q3 = query(
      collection(db, "Admin"),
      where("organisation", "==", String(terms).trim()),
      where("categorie", "==", categorie)
    );

    const querySnapshot3 = await getDocs(q3);
    console.log("querySnapshot",querySnapshot.docs);
    console.log("querySnapshot2",querySnapshot2.docs);
    console.log("querySnapshot3",querySnapshot3.docs);
if (querySnapshot.docs.length) {
  setModalData(querySnapshot.docs);
} else if (querySnapshot2.docs.length) {
  setModalData(querySnapshot2.docs);
}else {
  setModalData(querySnapshot3.docs);
}
    
   
   } catch (error) {
    
   }
   
  };

 

  return (
    <>
    <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-RFSVQTGJ87"
        ></script>
        <script strategy="lazyOnload">
          {` 
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
           gtag('js', new Date()); 
           gtag('config', 'G-RFSVQTGJ87');
           `}
          
        </script>
        </Head>
      <InputBar />
      <Box display={{ base: "none", md: "grid" }} mt={10}>
        <Navbar />
      </Box>
      <Center mt={5}>
        <Flex justifyContent={"space-between"}>
          {/* <Text mr={5} fontSize={20}>Trouver un magasin</Text><br/> */}
          <InputGroup>
            <Input
              type="text"
              onChange={(e) => recherche(e.target.value, categorie)}
              placeholder={"Ville"}
              w={["12em", "12em", "12em", "20em", "20em"]}
              // onClick={onOpen}
            />
            <InputRightAddon  pointerEvents="none">
              {/* <Text width={'fit-content'}>Rechercher</Text> */}
              <Search2Icon/>
              {/* <Image src="./new/searchTag.png" /> */}
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
               
                mr={{ base: "0%", md: "0%" }}
                _hover={{ textDecoration: "none" }}
                href={`/otherContent/intermed1?categorie=${doc.data().categorie}&magasin=${doc.data().organisation}`}
              >
               <Box
            height={"100%"}
            width={"100%"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={25}
           >

           
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              borderRadius={25}
              height={"100%"}
              width={"100%"}
              bg={"rgba(0, 0, 0, 0.277)"}
            >
               {
                doc.data().imageUrl?(<Image src={doc.data().imageUrl} alt={"image du magasin"} width={"100%"} height={"100%"} borderRadius={25}/>)
                : <Image src={"https://placehold.co/600x400@3x.png"} alt={"image de remplacement"}/>
               }
              
            </Flex>
            <Box mt={"-100px"}>
                <Text
                  fontSize={"lg"}
                  color={"#fff"}
                  textAlign={"center"}
                  fontWeight={"bold"}
                >
                  {doc.data().organisation}
                </Text>
              </Box>
          </Box>
              </Link>
              {/* <Box bgColor={"white"}width={"100%"} borderBottom={"1px solid black"}>
              {Object.values(doc.data().horaire)[jour].length >5 ?  <Text
                fontSize={"sm"}
                color={"green"}
                textAlign={"center"}
                fontWeight={"bold"}
              >
              Ouvert : {" ",doc.data().horaire[jour]} 
              </Text> : <Text
                fontSize={"sm"}
                color={"red"}
                textAlign={"center"}
                fontWeight={"bold"}
              >
               
               {Object.values(doc.data().horaire)[jour].length <4 ? "" : `${" ",Object.values(doc.data().horaire)[jour]}`} 
                  
              </Text> } 
              </Box>  */}
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
