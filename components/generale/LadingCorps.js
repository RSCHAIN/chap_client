import { ArrowForwardIcon, ChevronRightIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
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
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";

import { db, db2 } from "@/FIREBASE/clientApp";
import { ref, onValue } from "firebase/database";
import Location from "../location";
import { useRouter } from "next/router";
import { collection, query, where, getDocs } from "firebase/firestore";
import { BsSearch } from "react-icons/bs";
import SearcheIcone from "./SearcheIcone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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
  const [datos, setDatos] = useState([]);
  const [datas, setDatas] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure()
  //recherche un magasin
  const recherche =async (terms)=>{
        
    // console.log("Hello all i need help")
    // console.log(terms)
    // console.log(categorie)
    const q = query(collection(db, "Admin"), where("codePostal", "==", String(terms).trim()));

const querySnapshot = await getDocs(q);
// if (querySnapshot.docs) {
//     querySnapshot.docs.forEach((doc)=>{
//         console.log(doc.data())
//     })
// }
setModalData(querySnapshot.docs)
// console.log(querySnapshot.docs)
// querySnapshot.forEach((doc) => {

// // doc.data() is never undefined for query doc snapshots
// modalData.push(doc.data())
// });
}

  const [modalData,setModalData] = useState([])

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

  // const updateAll = () => {
  //   console.log("okay")
  //   cat.map((index, key) => {
  //     const starCountRef2 = ref(db2, index.id + "/");
  //     onValue(starCountRef2, (snapshot) => {
  //       const donnees = snapshot.val();
  //       if (donnees != null) {
  //         const categorie = Object.keys(donnees).map((key) => ({
  //           id: key,
  //           ...donnees[key],
  //         }))
  //         setDatos(categorie);

  //         localStorage.setItem(index.id + "Datos", JSON.stringify(categorie));
  //       }
  //     })
  //   })
  // }
  useEffect(() => {
    if (datas == 0) {
      update();
      setDatas(1);
    }

    //updateAll()
  }, [datas, update, cat]);
if (datas !=0) {
  return (
    <>
      {/* <Location /> */}
      <Center width={"100%"} height={"auto"}>
        <Box height={"95%"} width={"95%"}>
          {/* l'entet principale */}
          <Heading textAlign={"start"} color={"#08566e"} mb={5}>
            Nos Services
          </Heading>
           <Box>
            <Text ml={{base:"2%",md:"25%"}}>Entrez votre code postal pour trouver les restaurants à proximité</Text>
            {/* <SearcheIcone message={"Recherchez un magasin proche"}/> */}

            <InputGroup ml={{base:"5%",md:"30%"}}>
  <Input type='search' placeholder="Trouver un magasin a proximité" w={"20em"} onClick={onOpen}/>
    <InputRightAddon pointerEvents='none'>
    <Search2Icon/>
    </InputRightAddon>
  </InputGroup>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader  color={"#08566E"}>Trouver un magasin a proximité</ModalHeader>
                    <ModalCloseButton color={"#08566E"} />
                    <ModalBody>
                        <InputGroup>
                            <InputLeftAddon
                                pointerEvents='none'
                            >
                                <FontAwesomeIcon icon={faSearch} color={"#08566E"} />
                            </InputLeftAddon>
                            <Input
                            
                                type='number'
                                onChange={e=>recherche(e.target.value)}
                                placeholder='Code Postal'
                                _placeholder={{ color: '#000' }}
                                variant={'outline'}
                                color={"#000"}
                                borderRadius={'full'}
                                outline={'none'}
                            />
                        </InputGroup>
                       
                        {modalData.length == 0 ?<> Aucun Magasin de disponible</> : <>
                            <SimpleGrid columns={2}>
                                {modalData.map((doc,index)=>(
                                    <Box key={index}  m={2} mt={5} as={Link}  onClick={() => {
                                        sessionStorage.setItem("savefrom", doc.data().number),
                                          sessionStorage.setItem("image", doc.data().imageUrl),
                                          sessionStorage.setItem("nom", doc.data().organisation),
                                          sessionStorage.setItem("adresse", doc.data().adresse),
                                          sessionStorage.setItem("categorie", doc.data().categorie);
                                          sessionStorage.setItem("description", doc.data().description);
                                          sessionStorage.setItem("horaire", JSON.stringify(doc.data().horaire));
                                          sessionStorage.setItem("paiement", JSON.stringify(doc.data().methodeDePaiement));
                                      }}
                      _hover={{ textDecoration: "none" }}
                      href={"/otherContent/intermed1"}>
                                       <Image alt={doc.data().organisation} src={doc.data().imageUrl} maxWidth={"150px"} maxHeight={"100px"} minHeight={"100px"} minWidth={"150px"}/>
                                       <Text fontWeight={"bold"} fontSize={"20px"}>{doc.data().organisation}</Text>
                                       <Text fontWeight={"medium"}>{doc.data().adresse}</Text>
                                     </Box>
                                ))}
                            </SimpleGrid>
                        </>}
                    </ModalBody>

                    <ModalFooter>
                        <Button background={'#08566E'} color={'#fff'} mr={3} onClick={onClose}>
                            Annuler
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>







            {/* {console.log("okay")} */}
            {/* <Stack>
              <Center ml={"30%"}>
              <InputGroup >
                        <Input type={"search"} width={"30%"} border={"1px solid black"} mt={3}/>
                        <InputRightAddon mt={3} cursor={"pointer"}>
                        <BsSearch/>
                        </InputRightAddon>
                        </InputGroup>
            
              </Center>
           
            </Stack> */}
            

            </Box> 
          {/* la box de toutes les cartegorie */}
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
          </Flex>
        </Box>
      </Center>
    </>
  );
}

};

export default LadingCorps;
