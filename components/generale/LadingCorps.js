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
import {MdLocationOn} from 'react-icons/md'
import { db, db2 } from "@/FIREBASE/clientApp";
import { ref, onValue } from "firebase/database";
import Location from "../location";
import { useRouter } from "next/router";
import { collection, query, where, getDocs } from "firebase/firestore";
import Favlist from "./FavLists";

// les card des differntes cartegories qui seront mapés
export function ItemCard({ item, card }) {
  const [imageUrl, setImageUrl] = useState();
  const [adresse, setAdresse] = useState();
  const [numero, setNumero] = useState();
  const [nom, setNom] = useState();

  const [categorie, setCategorie] = useState();
  // const location = localStorage.getItem("location").length;
  // const toast = useToast();
  // const update = async () => {
  //   console.log('item',item)
  // const q = query(
  // collection(db, "Admin"),
  // where("organisation", "==", item)
  // );

  // const querySnapshot = await getDocs(q);
  // querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  // setAdresse(doc.data().adresse);
  // setImageUrl(doc.data().imageUrl);
  // setNumero(doc.data().number);
  // setNom(doc.data().organisation);
  // setCategorie(doc.data().categorie);
  // });
  // };

  // console.log(item.id)

  // Object.values(item).map((data) => {
  //   update();
  // });

  // if (location > 2) {
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
          mb={5}
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
          <Text as={"h4"} pb={5} align={"center"}>
            {item.adresse}
          </Text>
        </Box>
      </Box>
    </>
  );
  // } else {
  //   return (
  //     <>
  //       {/* card  */}
  //       <Link
  //         height={"40vh"}
  //         width={{ base: "70%", md: "30%" }}
  //         mt={"5"}
  //         mr={{ base: "0%", md: "0%" }}
  //         _hover={{ textDecoration: "none" }}
  //         // onClick={() =>  toast({
  //         //   title: 'POSITION REQUISE',
  //         //   description: "Nous vous prions de fournir votre position",
  //         //   status: 'info',
  //         //   duration: 9000,
  //         //   isClosable: true,
  //         // })}
  //       >
  //         <Flex
  //           height={"100%"}
  //           width={"100%"}
  //           alignItems={"center"}
  //           justifyContent={"center"}
  //           backgroundImage={item.imageUrl}
  //           backgroundPosition={"center"}
  //           backgroundSize={"cover"}
  //           backgroundRepeat={"no-repeat"}
  //         >
  //           <Flex
  //             alignItems={"center"}
  //             justifyContent={"center"}
  //             borderRadius={"10px"}
  //             height={"100%"}
  //             width={"100%"}
  //             bg={"rgba(0, 0, 0, 0.277)"}
  //           >
  //             <Text
  //               fontWeight={"bold"}
  //               fontSize={"2xl"}
  //               color={"#fff"}
  //               textAlign={"center"}
  //             >
  //               {item.id}
  //             </Text>
  //           </Flex>
  //         </Flex>
  //       </Link>
  //     </>
  //   );
  // }
}

export function ContainerCard({ card }) {
  const router = useRouter();
  const [datos, setDatos] = useState([]);
  const [datas, setDatas] = useState(0);

  const GetAgain = async () => {
    const q = query(collection(db, `f${card}`));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      datos.push(doc.data());
    });
    setDatas(1);
  };

  useEffect(() => {
    if (datas == 0) {
      GetAgain();
      setDatas(1);
    }
  }, [datas, GetAgain]);
  if (datos == null) {
    router.reload();
  }

  return (
    <>
      {/* categorie*/}
      <Flex
        width={"95%"}
        height={"auto"}
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
          mt={2}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Heading
            height={"auto"}
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            {card}
          </Heading>
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
          maxHeight={"auto"}
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
        </Flex>
      </Flex>
    </>
  );
}

// le rendu final qui sera affiché
const LadingCorps = () => {
  const [cat, setCat] = useState([]);
  const [postal,setPostal] = useState("")
  const [datos, setDatos] = useState([]);
  const [locate,setLocate] = useState("")
  const [datas, setDatas] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  //recherche un magasin
  const recherche = async (terms) => {
    // console.log("Hello all i need help")
    // console.log(terms)
    // console.log(categorie)
    const q = query(
      collection(db, "Admin"),
      where("codePostal", "==", String(terms).trim())
    );

    const querySnapshot = await getDocs(q);
    // if (querySnapshot.docs) {
    //     querySnapshot.docs.forEach((doc)=>{
    //         console.log(doc.data())
    //     })
    // }
    setModalData(querySnapshot.docs);
    // console.log(querySnapshot.docs)
    // querySnapshot.forEach((doc) => {

    // // doc.data() is never undefined for query doc snapshots
    // modalData.push(doc.data())
    // });
  };

    
  const router = useRouter()
  //fin de recherche

  const update = async () => {
    console.log(cat);
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


  useEffect(() => {
    if (datas == 0) {
      update();
      setDatas(1);
    }
    setLocate(localStorage.getItem("postal") ?? "0")
    
    //updateAll()
  }, [datas, update, cat,postal,locate]);
  if (datas != 0) {
    return (
      <>
        {/* <Location /> */}
        <Center width={"100%"} height={"auto"}>
          <Box height={"95%"} width={"95%"}>
          <Center width={"100%"} display={"grid","grid","grid","none","none"}>
              <Box>
               

             
              <InputGroup mt={10}  bgColor={"#ddd"} borderRadius={"100px"}>
              <Input
              borderRadius={"100px"}
                type={"number"}
                placeholder="Entrez votre code postal "
                w={"20em"}
                maxLength={5}
                value={locate}
                // value={postal}
                onChange={(e)=>{localStorage.setItem("postal",e.target.value)}}
                // onClick={onOpen}
              />
              <InputLeftElement as={Link} href={"#"} borderRaduis={"50%"}   _hover={{
                textDecoration: "none",
              
              }} cursor={"pointer"} >
                <MdLocationOn/>
              </InputLeftElement>
            </InputGroup>
              </Box>
            </Center>
            <Heading textAlign={"start"} fontSize={"25px"}color={"#08566e"} mb={2} mt={9}>
              Les produits sponsorisés
            </Heading>
            <Favlist/>

            {/* l'entet principale */}
            <Heading textAlign={"start"} fontSize={"25px"} color={"#08566e"} mb={2} mt={9}>
              Nos Services
            </Heading>
           

            {/* la box de toutes les cartegorie */}
            {locate.length<=4 ?
            <Flex
              height={"auto"}
              position={"relative"}
              width={"100%"}
              mt={10}
              mb={2}
              direction={"column"}
              alignItems={"center"}
              pb={20}
              justifyContent={"center"}
            >
              {cat.map((card, key) => {
                // console.log('card',card)

                return <ContainerCard key={key} card={card}></ContainerCard>;
              })}
            </Flex> : <><All/></> }
            
          </Box>
        </Center>
      </>
    );
  }
};

export default LadingCorps;
