import { authentic, db2 } from "@/FIREBASE/clientApp";
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { onValue, ref, update } from "@firebase/database";
import { useEffect, useState } from "react";
import Profiles from "./profiles";
import Navbar from "@/components/Navbar";
import InputBar from "@/components/InputBar";
import FooterR from "@/components/footerResponsif";
import secureLocalStorage from "react-secure-storage";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import HistDev from "./HistDev";
import HistRest from "./HistRes";
import Head from "next/head";
function Cancel2(id, state) {
  // console.log(id);
  update(ref(db2, "Commandes/" + String(id)), {
    status: state,
  });
}

function Valide({ items, email }) {
  // console.log(items.Status);
  const { isOpen, onOpen, onClose } = useDisclosure()
  if (items.status == "Réglée" && items.email == email) {
    return (
      <Center>
      <Box
        mt={5}
        bgColor={"white"}
        w={["400px","400px","400px","500px","500px"]}
        maxH={"170px"}
        display={"flex"}
       
        borderRadius="sm"
        
        onClick={onOpen}
        boxShadow={"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"}
      >
        <Box  w={"100%"} pl="2" pb={"2"}>
       <Flex  w={"100%"} justifyContent={"space-between"}>
       <Text></Text>
          <Box mt={-2} display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="blue">
              {items.status}
            </Badge>
          </Box>
       </Flex>

      

         
          {/* <Box
            fontSize={[14, 14, 14, 15, 15]}
            mt="1"
            fontWeight="light"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          >
            {items.email}
          </Box> */}
          <Flex pr={10} mt={2}  fontSize={[13, 13, 13, 15, 15]}  w={"100%"} justifyContent={"space-between"}> 
          <Box>
          <Box
            mt="1"
            fontWeight="light"
            as={Text}
            lineHeight="tight"
            fontSize={[13, 13, 13, 15, 15]}
            noOfLines={2}
          >
           Référence : {items.commandeId}
          </Box>
            <Box mr={10}
              mt="1"
              fontWeight="light"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            >
             Date : {items.dateCommande}
            </Box>
           </Box>
           <Box>
           <Box  fontSize={[13, 13, 13, 15, 15]} mt="1">
              {items.totalPrice ? items.totalPrice : (items.Prix ? items.Prix : "0") + " "}
              <Box as="span" color="gray.600" fontSize="sm">
                € TTC
              </Box>
            </Box>
            <Text  fontSize={[13, 13, 13, 15, 15]}> Réglé en {items.modePaiement}</Text>
           </Box>
          </Flex>
          {/* <Text> Vendu et expédie par <b>{items.organisation}</b> </Text> */}
         
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Liste des produits</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {(items.cartlist).map((item, index) => {
              return (
                <>
                  <Box
                    mt={2}
                    maxW="full"
                    maxH={"190px"}
                    display={"flex"}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"

                  >
                    <Image src={item.orderImageUrl[0]} alt={item.orderName} h="170px" w={"170px"} />

                    <Box p="2">
                      {/* <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="blue">
              {items.status}
            </Badge>
          </Box> */}

                      <Box
                        mt="1"
                        fontWeight="semibold"
                        as={Text}
                        lineHeight="tight"
                        fontSize={[14, 14, 14, 15, 15]}
                        noOfLines={2}
                      >
                        {item.orderName}
                      </Box>
                      
                      <Flex display={"grid"} fontSize={[14, 14, 14, 15, 15]}>
                        <Box display={"flex"} mr={2}
                          mt="1"

                          as="h4"
                          lineHeight="tight"
                          noOfLines={2}
                        >
                          <Text>Quantité : {item.orderQte}</Text>

                        </Box>
                        <Box display={"flex"} fontSize={[14, 14, 14, 15, 15]} mt="1" mr={2}>
                          <Text>Prix unitaire: </Text>
                          {(item.orderPrice)}
                          <Box as="span" color="gray.600" fontSize="sm">
                            €
                          </Box>
                        </Box>
                        <Box display={"flex"} fontSize={[14, 14, 14, 15, 15]} mt="1">
                          <Text>Prix : </Text>
                          {(item.orderPrice * item.orderQte)}
                          <Box as="span" color="gray.600" fontSize="sm">
                            €
                          </Box>
                        </Box>
                      </Flex>


                    </Box>
                  </Box>
                </>
              )
            })}
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Fermer
            </Button>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
    );
  } else {
    return <></>;
  }
}

function Livre({ items, email }) {
  // console.log(items.Status);
  const { isOpen, onOpen, onClose } = useDisclosure()
  if (items.status == "Livrée" && items.email == email) {
    return (
      <Center>
      <Box
        mt={5}
        bgColor={"white"}
        w={["400px","400px","400px","500px","500px"]}
        maxH={"170px"}
        display={"flex"}
       
        borderRadius="sm"
        
        onClick={onOpen}
        boxShadow={"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"}
      >
        <Box  w={"100%"} pl="2" pb={"2"}>
       <Flex  w={"100%"} justifyContent={"space-between"}>
       <Text></Text>
          <Box mt={-2} display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="blue">
              {items.status}
            </Badge>
          </Box>
       </Flex>

      

         
          {/* <Box
            fontSize={[14, 14, 14, 15, 15]}
            mt="1"
            fontWeight="light"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          >
            {items.email}
          </Box> */}
          <Flex pr={10} mt={2}  fontSize={[13, 13, 13, 15, 15]}  w={"100%"} justifyContent={"space-between"}> 
          <Box>
          <Box
            mt="1"
            fontWeight="light"
            as={Text}
            lineHeight="tight"
            fontSize={[13, 13, 13, 15, 15]}
            noOfLines={2}
          >
           Référence : {items.commandeId}
          </Box>
            <Box mr={10}
              mt="1"
              fontWeight="light"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            >
             Date : {items.dateCommande}
            </Box>
           </Box>
           <Box>
           <Box  fontSize={[13, 13, 13, 15, 15]} mt="1">
              {items.totalPrice ? items.totalPrice : (items.Prix ? items.Prix : "0") + " "}
              <Box as="span" color="gray.600" fontSize="sm">
                € TTC
              </Box>
            </Box>
            <Text  fontSize={[13, 13, 13, 15, 15]}> Réglé en {items.modePaiement}</Text>
           </Box>
          </Flex>
          {/* <Text> Vendu et expédie par <b>{items.organisation}</b> </Text> */}
         
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Liste des produits</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {(items.cartlist).map((item, index) => {
              return (
                <>
                  <Box
                    mt={2}
                    maxW="full"
                    maxH={"190px"}
                    display={"flex"}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"

                  >
                    <Image src={item.orderImageUrl[0]} alt={item.orderName} h="170px" w={"170px"} />

                    <Box p="2">
                      {/* <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="blue">
              {items.status}
            </Badge>
          </Box> */}

                      <Box
                        mt="1"
                        fontWeight="semibold"
                        as={Text}
                        lineHeight="tight"
                        fontSize={[14, 14, 14, 15, 15]}
                        noOfLines={2}
                      >
                        {item.orderName}
                      </Box>
                      
                      <Flex display={"grid"} fontSize={[14, 14, 14, 15, 15]}>
                        <Box display={"flex"} mr={2}
                          mt="1"

                          as="h4"
                          lineHeight="tight"
                          noOfLines={2}
                        >
                          <Text>Quantité : {item.orderQte}</Text>

                        </Box>
                        <Box display={"flex"} fontSize={[14, 14, 14, 15, 15]} mt="1" mr={2}>
                          <Text>Prix unitaire: </Text>
                          {(item.orderPrice)}
                          <Box as="span" color="gray.600" fontSize="sm">
                            €
                          </Box>
                        </Box>
                        <Box display={"flex"} fontSize={[14, 14, 14, 15, 15]} mt="1">
                          <Text>Prix : </Text>
                          {(item.orderPrice * item.orderQte)}
                          <Box as="span" color="gray.600" fontSize="sm">
                            €
                          </Box>
                        </Box>
                      </Flex>


                    </Box>
                  </Box>
                </>
              )
            })}
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Fermer
            </Button>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
    );
  } else {
    return <></>;
  }
}


function Cancel({ items, email }) {
  // console.log(items.Status);
  const { isOpen, onOpen, onClose } = useDisclosure()
  if (items.status == "Annulée" && items.email == email) {
    return (
      <Center>
      <Box
        mt={5}
        bgColor={"white"}
        w={["400px","400px","400px","500px","500px"]}
        maxH={"170px"}
        display={"flex"}
       
        borderRadius="sm"
        
        onClick={onOpen}
        boxShadow={"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"}
      >
        <Box  w={"100%"} pl="2" pb={"2"}>
       <Flex  w={"100%"} justifyContent={"space-between"}>
       <Text></Text>
          <Box mt={-2} display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="red">
              {items.status}
            </Badge>
          </Box>
       </Flex>

      

         
          {/* <Box
            fontSize={[14, 14, 14, 15, 15]}
            mt="1"
            fontWeight="light"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          >
            {items.email}
          </Box> */}
          <Flex pr={10} mt={2}  fontSize={[13, 13, 13, 15, 15]}  w={"100%"} justifyContent={"space-between"}> 
          <Box>
          <Box
            mt="1"
            fontWeight="light"
            as={Text}
            lineHeight="tight"
            fontSize={[13, 13, 13, 15, 15]}
            noOfLines={2}
          >
           Référence : {items.commandeId}
          </Box>
            <Box mr={10}
              mt="1"
              fontWeight="light"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            >
             Date : {items.dateCommande}
            </Box>
           </Box>
           <Box>
           <Box  fontSize={[13, 13, 13, 15, 15]} mt="1">
              {items.totalPrice ? items.totalPrice : (items.Prix ? items.Prix : "0") + " "}
              <Box as="span" color="gray.600" fontSize="sm">
                € TTC
              </Box>
            </Box>
            <Text> Réglé en {items.modePaiement}</Text>
           </Box>
          </Flex>
          {/* <Text> Vendu et expédie par <b>{items.organisation}</b> </Text> */}
         
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Liste des produits</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {(items.cartlist).map((item, index) => {
              return (
                <>
                  <Box
                    mt={2}
                    maxW="full"
                    maxH={"190px"}
                    display={"flex"}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"

                  >
                    <Image src={item.orderImageUrl[0]} alt={item.orderName} h="170px" w={"170px"} />

                    <Box p="2">
                      {/* <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="blue">
              {items.status}
            </Badge>
          </Box> */}

                      <Box
                        mt="1"
                        fontWeight="semibold"
                        as={Text}
                        lineHeight="tight"
                        fontSize={[14, 14, 14, 15, 15]}
                        noOfLines={2}
                      >
                        {item.orderName}
                      </Box>
                    
                      <Flex display={"grid"} fontSize={[14, 14, 14, 15, 15]}>
                        <Box display={"flex"} mr={2}
                          mt="1"

                          as="h4"
                          lineHeight="tight"
                          noOfLines={2}
                        >
                          <Text>Quantité : {item.orderQte}</Text>

                        </Box>
                        <Box display={"flex"} fontSize={[14, 14, 14, 15, 15]} mt="1" mr={2}>
                          <Text>Prix unitaire: </Text>
                          {(item.orderPrice)}
                          <Box as="span" color="gray.600" fontSize="sm">
                            €
                          </Box>
                        </Box>
                        <Box display={"flex"} fontSize={[14, 14, 14, 15, 15]} mt="1">
                          <Text>Prix : </Text>
                          {(item.orderPrice * item.orderQte)}
                          <Box as="span" color="gray.600" fontSize="sm">
                            €
                          </Box>
                        </Box>
                      </Flex>


                    </Box>
                  </Box>
                </>
              )
            })}
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Fermer
            </Button>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
    );
  } else {
    return <></>;
  }
}
function Launch({ items, email, id }) {
  // console.log(items);
  const { isOpen, onOpen, onClose } = useDisclosure()
  if (items.status == "En attente" && items.email == email) {
    return (
      <Center>
        <Box
          mt={5}
          bgColor={"white"}
          w={["400px","400px","400px","500px","500px"]}
          maxH={"170px"}
          display={"flex"}
         
          borderRadius="sm"
          
          onClick={onOpen}
          boxShadow={"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"}
        >
          <Box  w={"100%"} pl="2" pb={"2"}>
         <Flex  w={"100%"} justifyContent={"space-between"}>
         <Text></Text>
            <Box mt={-2} display="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="blue">
                {items.status}
              </Badge>
            </Box>
         </Flex>

        

           
            {/* <Box
              fontSize={[14, 14, 14, 15, 15]}
              mt="1"
              fontWeight="light"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            >
              {items.email}
            </Box> */}
            <Flex pr={10} mt={2}  fontSize={[13, 13, 13, 15, 15]}  w={"100%"} justifyContent={"space-between"}> 
            <Box>
            <Box
              mt="1"
              fontWeight="light"
              as={Text}
              lineHeight="tight"
              fontSize={[13, 13, 13, 15, 15]}
              noOfLines={2}
            >
             Référence : {items.commandeId}
            </Box>
              <Box mr={10}
                mt="1"
                fontWeight="light"
                as="h4"
                lineHeight="tight"
                noOfLines={1}
              >
               Date : {items.dateCommande}
              </Box>
             </Box>
             <Box>
             <Box  fontSize={[13, 13, 13, 15, 15]} mt="1">
                {items.totalPrice ? items.totalPrice : (items.Prix ? items.Prix : "0") + " "}
                <Box as="span" color="gray.600" fontSize="sm">
                  € TTC
                </Box>
              </Box>
              <Text> Réglé en {items.modePaiement}</Text>
             </Box>
            </Flex>
            {/* <Text> Vendu et expédie par <b>{items.organisation}</b> </Text> */}
            <Box >
              <Button bgColor={'red.500'} _hover={{
                bgColor: '#FF6969'
              }} color={'white'} onClick={() => Cancel2(id, "Annulée")}>
                Annuler
              </Button>
            </Box>
          </Box>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Liste des produits</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {(items.cartlist).map((item, index) => {
                return (
                  <>
                    <Box
                      mt={2}
                      maxW="full"
                      maxH={"190px"}
                      display={"flex"}
                      borderWidth="1px"
                      borderRadius="lg"
                      overflow="hidden"

                    >
                      <Image src={item.orderImageUrl[0]} alt={item.orderName} h="170px" w={"170px"} />

                      <Box p="2">
                        {/* <Box display="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="blue">
                {items.status}
              </Badge>
            </Box> */}

                        <Box
                          mt="1"
                          fontWeight="semibold"
                          as={Text}
                          lineHeight="tight"
                          fontSize={[14, 14, 14, 15, 15]}
                          noOfLines={2}
                        >
                          {item.orderName}
                        </Box>
                       
                        <Flex display={"grid"} fontSize={[14, 14, 14, 15, 15]}>
                          <Box display={"flex"} mr={2}
                            mt="1"

                            as="h4"
                            lineHeight="tight"
                            noOfLines={2}
                          >
                            <Text>Quantité : {item.orderQte}</Text>

                          </Box>
                          <Box display={"flex"} fontSize={[14, 14, 14, 15, 15]} mt="1" mr={2}>
                            <Text>Prix unitaire: </Text>
                            {(item.orderPrice)}
                            <Box as="span" color="gray.600" fontSize="sm">
                              €
                            </Box>
                          </Box>
                          <Box display={"flex"} fontSize={[14, 14, 14, 15, 15]} mt="1">
                            <Text>Prix : </Text>
                            {(item.orderPrice * item.orderQte)}
                            <Box as="span" color="gray.600" fontSize="sm">
                              €
                            </Box>
                          </Box>
                        </Flex>


                      </Box>
                    </Box>
                  </>
                )
              })}
            </ModalBody>

            <ModalFooter>
              <Button variant='ghost' mr={3} onClick={onClose}>
                Fermer
              </Button>

            </ModalFooter>
          </ModalContent>
        </Modal>
      </Center>
    );
  } else {
    return <></>;
  }
}

export default function Commande() {
  const [commandeListe, setCommandeListe] = useState([]);
  const [email, setEmail] = useState();
  const [id, setId] = useState([]);
  const [inde, setInde] = useState();
  const router = useRouter()
  const Getall = async () => {
    const starCountRef = ref(db2, "Commandes/");
    onValue(starCountRef, (snapshot) => {
      setCommandeListe(snapshot.val());
      if (snapshot.val() != undefined || snapshot.val() != null) {
        setId(Object.keys(snapshot.val()));
      }

      // console.log(snapshot.val())
    });
  };

  useEffect(() => {
    onAuthStateChanged(authentic, (user) => {
      if (!user) {
        router.push("/Choose");
        // router.reload()
      }
    });
    Getall();
    setEmail(sessionStorage.getItem("email"));

    setInde(parseInt(secureLocalStorage.index));
  }, [setCommandeListe, router]);
  const [isLagerThan768] = useMediaQuery("(min-width: 768px)");

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
      {isLagerThan768 ? <Navbar></Navbar> : <></>}
      {/* <Box width="100%">
        {commandeListe ? (
          Object.values(commandeListe).map((items) => (
            <Valide key={items.key} items={items} id={id} email={email} />
          ))
        ) : (
          <Box>Aucune donnee</Box>
        )} */}
      {/* </Box> */}
      {/* <Center width="100%"> */}
      <Tabs
        isManual
        orientation={["horizontal", "horizontal", "horizontal", "vertical", "vertical"]}
        variant="outfitted"
        isLazy
        w={"100%"}
        // defaultIndex={1}
        mt={10}
      >
        <Center>
          <TabList width={"fit-content"} h={"10em"} display={{ base: "none", lg: "flex" }} >
            <SimpleGrid columns={[2, 2, 2, 4, 4]}>
              <Tab id="Commandes"> <Box><Center> <Image src={"./Profiles/commande.png"} alt="Commande" width={"50px"} height={"50px"} /> </Center><Text>Mes commandes</Text> </Box></Tab>
              <Tab id="Devis"> <Box><Center> <Image src={"./Profiles/devis.png"} alt="Commande" width={"50px"} height={"50px"} /> </Center><Text>Mes devis</Text> </Box></Tab>
              <Tab id="Reservation"><Box><Center> <Image src={"./Profiles/reservation.png"} alt="Reservation" width={"50px"} height={"50px"} /> </Center><Text>Mes reservations</Text> </Box> </Tab>
              <Tab id="Informations" >
                <Box><Center> <Image src={"./Profiles/utilisateur.png"} alt="Informations" width={"50px"} height={"50px"} /> </Center><Text>Mes informations</Text> </Box>
              </Tab>
            </SimpleGrid>
          </TabList>

        </Center>
        <TabPanels>
          <TabPanel bgColor={"white"}>
            <Tabs isManual isLazy w={"100% "}  pb={10}>
              <Center>
              <TabList >
                <Tab fontSize={{base:"12px", lg:"20px"}} ml={5}>Commandes en cours</Tab>
                <Tab fontSize={{base:"12px", lg:"20px"}}>Commandes validée(s)</Tab>
                <Tab fontSize={{base:"12px", lg:"20px"}}>Commandes Livrée(s)</Tab>
                <Tab fontSize={{base:"12px", lg:"20px"}} mr={5}>Commandes annulée(s)</Tab>
              </TabList>
              </Center>
              <TabPanels  bgColor={"#f3f3f3"}>
                <TabPanel>
                  <Box >
                    {commandeListe ? (
                      Object.values(commandeListe).map((items, index) => (
                        <Launch
                          key={items.key}
                          items={items}
                          id={id[index]}
                          email={email}
                        />
                      ))
                    ) : (
                      <Box>Aucune donnee</Box>
                    )}
                  </Box>

                </TabPanel>
                <TabPanel>

                  <Box >
                    {commandeListe ? (
                      Object.values(commandeListe).map((items) => (
                        <Valide
                          key={items.key}
                          items={items}
                          id={id}
                          email={email}
                        />
                      ))
                    ) : (
                      <Box>Aucune donnee</Box>
                    )}
                  </Box>
                </TabPanel>
                <TabPanel>

                  <Box >
                    {commandeListe ? (
                      Object.values(commandeListe).map((items) => (
                        <Livre
                          key={items.key}
                          items={items}
                          id={id}
                          email={email}
                        />
                      ))
                    ) : (
                      <Box>Aucune donnee</Box>
                    )}
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box >
                    {commandeListe ? (
                      Object.values(commandeListe).map((items) => (
                        <Cancel key={items.key} items={items} email={email} />
                      ))
                    ) : (
                      <Box>Aucune donnee</Box>
                    )}
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </TabPanel>
          <TabPanel>
            <HistDev />
          </TabPanel>
          <TabPanel>
            <HistRest />
          </TabPanel>
          <TabPanel>
            <Profiles />
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/* </Center> */}
      <FooterR />
    </>
  );
}
//TODO Remove tabs for mobile
//FIXME Fix order price view