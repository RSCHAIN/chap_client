import {
  ArrowForwardIcon,
  ChevronRightIcon,
  Search2Icon,
} from "@chakra-ui/icons";
import All from "@/components/ResultResarch/All";

import {
  Box,
  Button,
  Center,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import { MdLocationOn } from "react-icons/md";
import { db, db2 } from "@/FIREBASE/clientApp";
import { ref, onValue } from "firebase/database";
import Location from "../location";
import { useRouter } from "next/router";
import { collection, query, where, getDocs } from "firebase/firestore";
import Favlist from "./FavLists";
import axios from "axios";

// les card des differntes cartegories qui seront mapés
export function ItemCard({ item, card }) {
  const [imageUrl, setImageUrl] = useState();
  const [adresse, setAdresse] = useState();
  const [numero, setNumero] = useState();
  const [nom, setNom] = useState();

  const [categorie, setCategorie] = useState();
 
  return (
    <>
      {/* card  */}
      <Box
        mt={5}
        height={["20vh", "20vh", "20vh", "20vh", "20vh"]}
        width={{ base: "25%", md: "15%" }}
        marginBottom={40}
        mr={5}
        borderRadius={25}
      >
        <Link
          height={"15vh"}
          width={{ base: "80%", md: "30%" }}
          mt={5}
         
          onClick={() => {
            sessionStorage.setItem("savefrom", item.number),
              sessionStorage.setItem("image", item.imageUrl),
              sessionStorage.setItem("nom", item.organisation),
              sessionStorage.setItem("adresse", item.adresse),
              sessionStorage.setItem("categorie", item.categorie);
            sessionStorage.setItem("description", item.description);
            sessionStorage.setItem("nationalite", item.nationalite);
            sessionStorage.setItem("horaire", JSON.stringify(item.horaire));
            sessionStorage.setItem(
              "paiement",
              JSON.stringify(item.methodeDePaiement)
            );
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
            borderRadius={25}
            backgroundImage={item.imageUrl}
            backgroundPosition={"center"}
            backgroundSize={"cover"}
            backgroundRepeat={"no-repeat"}
          >
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              borderRadius={25}
              height={"100%"}
              width={"100%"}
              bg={"rgba(0, 0, 0, 0.277)"}
            >
              <Text
                fontSize={"xl"}
                color={"#fff"}
                textAlign={"center"}
                fontWeight={"bold"}
              >
                {item.organisation}
              </Text>
            </Flex>
          </Flex>
        </Link>
        <Box>
          <Text as={"h4"} pb={2} align={"center"}>
            {item.adresse}
          </Text>
        </Box>
      </Box>
    </>
  );
 
}

export function ContainerCard({ card }) {
  const router = useRouter();
  const [datos, setDatos] = useState([]);
  const [datas, setDatas] = useState(0);

  
  useEffect(() => {
    const GetAgain = async () => {
      const q = query(collection(db, `f${card}`));
  
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
  
        datos.push(doc.data());
      });
      setDatas(1);
    };
  
    if (datas == 0) {
      GetAgain();
      setDatas(1);
    }
  }, [datas,card,datos]);
  if (datos == null) {
    router.reload();
  }

  return (
    <>
      {/* categorie*/}
      <Flex
      mt={10}
        width={"95%"}
        height={"45vh"}
        // mb={10}
        // pb={10}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        {/* la box de l'entete de la cartegorie  */}
        <Flex
          id={card}
          height={"auto"}
          width={"100%"}
          mt={5}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Text
            height={"auto"}
            width={"100%"}
            display={"flex"}
            fontWeight={"bold"}
            fontSize={"25px"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            {card}
          </Text>
          <Link
            href="/otherContent/intermed2"
            onClick={() => {
              if (card == "Coiffure") {
                localStorage.setItem("service", "Salon de Coiffure");
              } else if (card == "Mèches") {
                localStorage.setItem("service", "Commerce de meches");
              } else {
                localStorage.setItem("service", card);
              }
            }}
            _hover={{ textDecoration: "none" }}
          >
            <Button
              border={"none"}
              rightIcon={<ArrowForwardIcon />}
              colorScheme="#08566f"
              variant="outline"
              fontSize={"14px"}
            >
              Voir Plus
            </Button>
          </Link>
        </Flex>

        {/* contient les card's  */}
        <Flex
        mb={10}
        pb={10}
          maxHeight={"auto"}
          width={"100%"}
          flexWrap={"wrap"}
          direction={"row"}
          alignItems={{ base: "center", md: "normal" }}
          justifyContent={{ base: "center", md: "space-between" }}
        >
        <SimpleGrid 
        display={["none","none","none","flex","flex"]}
        
          width={"100%"} 
          flexWrap={"wrap"} 
          direction={"row"}
          alignItems={{ base: "center", md: "normal" }}
          justifyContent={{ base: "center", md: "space-between" }}
          >
          {
            //  console.log(datas)
            
            datos.map((item, key) => (
              <ItemCard key={key} item={item} card={card}></ItemCard>
            ))
          }
          </SimpleGrid>
          <SimpleGrid 
        display={["flex","flex","flex","none","none"]}
        mb={10}
        pb={10}
          width={"100%"} 
          flexWrap={"wrap"} 
          direction={"row"}
          alignItems={{ base: "center", md: "normal" }}
          justifyContent={{ base: "center", md: "space-between" }}
          >
          {
            //  console.log(datas)
            
            datos.slice(0,3).map((item, key) => (
              <ItemCard key={key} item={item} card={card}></ItemCard>
            ))
          }
          </SimpleGrid>
        </Flex>
      </Flex>
    </>
  );
}

// le rendu final qui sera affiché
const LadingCorps = () => {
  const [cat, setCat] = useState([]);
  const [postal, setPostal] = useState("");
  const [datos, setDatos] = useState([]);
  const [locate, setLocate] = useState("");
  const [datas, setDatas] = useState(0);
  const [data,setData] = useState([]);
    const [code,setCode] = useState([]);
    const [final,setFinal] = useState([""]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [check,setCheck] = useState(0);
  //recherche un magasin
  const recherche = async (terms) => {
  
    const q = query(
      collection(db, "Admin"),
      where("codePostal", "==", String(terms).trim())
    );
    const querySnapshot = await getDocs(q);
    setModalData(querySnapshot.docs);
  };

  const router = useRouter();
  //fin de recherche


  const Search =(id)=>{
 
    if(data.filter(order => (order.num_dep === id)).length!=0){
      setFinal(data.filter(order => (order.num_dep === id))) 
   
     
   } 
   else{
    setFinal([""])
   }
  
   
}

  useEffect(() => {
    const update = async () => {
      // console.log(cat);
      if (datas == 0) {
        const q = query(collection(db, "Services"));
  
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          cat.push(doc.data().nom);
        });
      }
  
      setDatas(1);
    };
    if(check == 0 || check == 1){
      const  GetAll= async ()=>{
        setData([])
        await axios.get("api/GetJson").then((response)=>{
  
            setData(JSON.parse(Object.values(response.data)))
        })
    };
    GetAll()
      setCheck(check+1);
    }
   

    if (datas == 0) {
      update();
     
      setDatas(1);
    }
    setLocate(localStorage.getItem("postal") ?? "0");

    //updateAll()
  }, [datas, cat, postal, locate,check]);
  if (datas != 0) {
    return (
      <>
        {/* <Location /> */}
        <Center width={"100%"} height={"auto"}>
          <Box height={"100%"} width={"100%"}>
          <Flex width={"100%"} height={"fit-content"} bgColor={"#08566e"} display={["flex","flex","flex","none","none"]} color={"white"}>
              <Center width={"100%"}>
                <Box  display={"grid"}>
                  <Box>
                    
                    <Text fontSize={"20px"} width={"full"} >
                    Commerçant ? 
                    </Text>
                    <Text fontSize={"13px"} width={"full"}>
                     Devenez partenaire et boostez votre commerce avec CHAP
                    </Text>
                   
                    </Box>
                    <Center>
                    <Button color={"white"}  bgColor={"black"} mt={2} _hover={{
                      bgColor:"black",
                      opacity:"0.7",
                      textDecoration:"none"
                    }}
                    py={2}
                    as={Link}
                    width={"fit-content"}
                    href={"https://chapbackofficefournisseur.vercel.app/Connexion"}

                    >

                      Rejoignez-nous
                    </Button>
                    </Center>
                    </Box>
                    
                    </Center>
            </Flex>
        
          
            <Flex width={"100%"} height={"15vh"} bgColor={"#08566e"} display={["none","none","none","flex","flex"]} mt={-3} color={"white"}>
              <Center width={"100%"}>
                <Box  display={"flex"}>
                  <Box mr={10} textAlign={"center"}>
                    <Text fontSize={"25px"} width={"full"} _hover={{
                      bgColor:"black",
                      opacity:"0.7"
                    }}>
                    Commerçant ?
                    </Text>
                    <Text fontSize={"20px"} width={"full"} _hover={{
                      bgColor:"black",
                      opacity:"0.7"
                    }}>
                    Devenez partenaire et boostez votre commerce avec CHAP
                    </Text>
                    </Box>
                    <Button color={"white"} bgColor={"black"} 
                    _hover={{
                      bgColor:"black",
                      opacity:"0.7",
                      textDecoration:"none"
                    }}
                    as={Link}
                    mt={2}
                    py={2}
                    href={"https://chapbackofficefournisseur.vercel.app/Connexion"} >
                      Rejoignez-nous
                    </Button>
                    </Box>
                    </Center>
            </Flex>
            <Heading
              textAlign={"start"}
              fontSize={"25px"}
              color={"#08566e"}
              mb={2}
              mt={9}
            >
              Les produits sponsorisés
            </Heading>
            <Favlist />
          
            {/* l'entet principale */}
            <Heading
              textAlign={"start"}
              fontSize={"25px"}
              color={"#08566e"}
              mb={2}
              mt={9}
            >
              Nos Services
            </Heading>

            {/* la box de toutes les cartegorie */}
            {locate.length <= 4 ? (
              <Flex
                height={"fit-content"}
                position={"relative"}
                width={"100%"}
               
                
                direction={"column"}
                alignItems={"center"}
                mb={10}
                pb={5}
                justifyContent={"center"}
              >
                {cat.map((card, key) => {
                  // console.log('card',card)

                  return <ContainerCard key={key} card={card}></ContainerCard>;
                })}
              </Flex>
            ) : (
              <>
                <All />
              </>
            )}
          </Box>
        </Center>
      </>
    );
  }
};

export default LadingCorps;
