import { authentic, db2 } from "@/FIREBASE/clientApp";
import {
  Badge,
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  RadioGroup,
  Radio,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,

  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useMediaQuery,
  SimpleGrid,
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
import { PayPalButtons } from "@paypal/react-paypal-js";
import Head from "next/head";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Sold from "@/components/DevisAddon/Sold";
import Draw from "@/components/Devis/Draw";

function Cancel2(id, state) {
  // console.log(id);
  update(ref(db2, "DevisPerso/" + String(id)), {
    status: state,
  });
}
function Valide2(id, state) {
  // console.log(id);
  update(ref(db2, "DevisPerso/" + String(id)), {
    Status: state,
  });
}
function Paiement(id, state) {
  // console.log(id);
  const date = new Date();
  if (state == "Espéces") {
    update(ref(db2, "DevisPerso/" + String(id)), {
      Paiement: state,
      status: "Reglé",
      PayerLe: "transaction non soldé/en vérification"
    });
  }
  else {
    update(ref(db2, "DevisPerso/" + String(id)), {
      Paiement: state,
      PayerLe: `${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}`,
      status: "Reglé"
    });
  }

}


function Valide({ items, email, id }) {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const [isOpenModal1, setIsOpenModal1] = useState(false);
  const toggleModal1 = () => setIsOpenModal1(!isOpenModal1);

  const [payp, setPayp] = useState("none");
  const [esp, setEsp] = useState("")


  if (items.status == "Validé" && items.email == email) {
    return (
      <>
        <Box
          onClick={onOpen}
          mb={5}
          bgColor={"white"}
          mx={2}
          py={2}
          boxShadow={"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"}
          w={["400px", "400px", "400px", "500px", "500px"]}
          maxH={"170px"}


          borderRadius="sm"
          overflow="hidden"
        >

          <Flex justifyContent={"space-between"} width={"100%"}>
            <Box pl={2} width={"fit-content"}>


              <Box

                fontSize={[13, 13, 13, 15, 15]}
                as="h4"
                lineHeight="tight"

              >
                <Text>
                  <span className="itemsDev"> Référence: </span> {id}</Text>

                <Flex><Text mr={2}>Date : </Text>{new Date(items.createdAt).toLocaleDateString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}</Flex>
                <Text mb={5}> Destination : {items.arrive}</Text>
                {/* <Flex><Text mr={2}>Arrivé : </Text>{items.arrive}</Flex> */}
              </Box>


              {/* <Box>
              <Button bgColor={'red.500'} _hover={{
                bgColor:'#FF6969'
              }} color={'white'} onClick={() => Cancel2(id, "Annulé")}>
                Annuler
              </Button>
            </Box> */}

            </Box>

            <Box display="grid" height={"fit-content"} width={"fit-content"}>
              <Badge borderRadius="full" mb={2} px={2} bgColor="#ff914d" height={"fit-content"} width={"fit-content"} color={"white"} textTransform={"capitalize"}>
                {items.status}
              </Badge>

              <Badge borderRadius="full" px={4} height={"fit-content"} width={"fit-content"} bgColor={"#00bf63"} color={"white"} textTransform={"capitalize"}>
                {items.moyen}
              </Badge>
              <Flex mt={2}>
                <Text fontWeight={700}>{items.total + " "}</Text>
                <Box as="span" color="gray.600" fontSize="sm">
                  <b>€</b> TTC
                </Box>
              </Flex>
            </Box>


          </Flex>
          <Flex justifyContent={"space-between"} width={"full"} >

            {items.methodeDePaiement ? <> <Text>{items.methodeDePaiment}  </Text> {items.methodeDePaiment} </> : <Text> Erreur au niveau du paiement</Text>}
            <ChevronRightIcon fontSize={"30px"} color={"cyan.800"} fontWeight={700} />
          </Flex>

        </Box>
        <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>

              <Box bgColor={"white"} w={"full"}>
                <Flex justifyContent={"space-between"}>
                  <Flex mb={5}><span className={"itemsDev"}>Référence :</span> {items.devisId}</Flex>
                  <Flex>
                    <Badge borderRadius="full" mb={2} px={6} bgColor="#ff914d" height={"fit-content"} width={"fit-content"} color={"white"} textTransform={"capitalize"}>
                      {items.status}
                    </Badge>

                    <Badge borderRadius="full" px={8} height={"fit-content"} width={"fit-content"} bgColor={"#00bf63"} color={"white"} textTransform={"capitalize"}>
                      {items.moyen}
                    </Badge>
                  </Flex>

                </Flex >
                {items.moyen == "Aerien" ? <Box>
                  <SimpleGrid columns={2}>
                    {items.categories.map((category, index) => (
                      <Flex key={index} width={"100%"}>
                        <Box>
                          <Image width="80px" height="80px" src="./new/colis2.png" />
                        </Box>
                        <Box mt={3}>
                          {/* <Text> <span className={"itemsDev"}>Retrait:</span> </Text> */}
                          <Text><span className={"itemsDev"}> Poids:</span> {items.poids[index]} </Text>
                          <Text> <span className={"itemsDev"}>Categorie:</span> {category}</Text>
                          {/* <Text> <span className={"itemsDev"}>Prix:</span>  </Text> */}
                        </Box>
                      </Flex>
                    ))}

                  </SimpleGrid>


                </Box> :
                  <Box >
                    <SimpleGrid columns={2}>
                      {items.contenant.map((category, index) => (
                        <Flex key={index} width={"100%"}>
                          <Box>
                            <Image width="80px" height="80px" src="./new/colis2.png" />
                          </Box>
                          <Box mt={3}>
                            {/* <Text> <span className={"itemsDev"}>Retrait:</span> </Text> */}
                            <Text> <span className={"itemsDev"}>Contenant:</span> {category}</Text>
                            <Text> <span className={"itemsDev"}>Besoin:</span> {items.besoin[index] ? "Oui" : "Non"}</Text>
                            {/* <Text><span className={"itemsDev"}> Poids:</span> {items.poids[index]} </Text> */}

                            {/* <Text> <span className={"itemsDev"}>Prix:</span>  </Text> */}
                          </Box>
                        </Flex>
                      ))}

                    </SimpleGrid>


                  </Box>}

                <SimpleGrid columns={2} mt={5} >
                  <Box>
                    <Flex>
                      <img width="24" height="24" src="https://img.icons8.com/color/48/000000/address--v1.png" alt="address--v1" />
                      <Text> Départ : {items.depart}</Text>
                    </Flex>
                    <Text> Dépôt : {items.retrait_depot}</Text>
                    <Flex><Text mr={2}>Départ estimée : </Text>{new Date(items.createdAt).toLocaleDateString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}</Flex>
                  </Box>
                  <Box>
                    <Flex>
                      <img width="24" height="24" src="https://img.icons8.com/color/48/000000/address--v1.png" alt="address--v1" />
                      <Text> Départ : {items.arrive}</Text>
                    </Flex>

                    <Flex><Text mr={2}>Retirée le  : </Text>{new Date(items.createdAt).toLocaleDateString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}</Flex>
                  </Box>
                </SimpleGrid>


                <Center mt={5} mb={5} color={"cyan.800"} fontWeight={"bold"} >Informations</Center>
                <SimpleGrid columns={2} justifyContent={"space-around"}>
                  <Box><Text color={"cyan.800"} fontWeight={700}>Destinataire</Text>
                    <Text><span className={"itemsDev"}>Nom :</span> {items.nomDestinataire}</Text>
                    <Text><span className={"itemsDev"}>Prénom :</span> {items.prenomDestinataire} </Text>
                    <Text><span className={"itemsDev"}>Adresse :</span>{items.adresseDest},{items.villeDest},{items.posteDest} </Text>
                    <Text><span className={"itemsDev"}>Prix :</span> {items.total}€</Text>
                    <Text><span className={"itemsDev"}>Contact :</span> {items.numeroDestinataire}</Text>
                    <Text><span className={"itemsDev"}>Email :</span>{items.emailDest} </Text>
                  </Box>
                  <Box><Text color={"cyan.800"} fontWeight={700}>Expediteur</Text>
                    <Text><span className={"itemsDev"}>Nom :</span>{items.nomExpediteur} </Text>
                    <Text><span className={"itemsDev"}>Prénom :</span>{items.prenomExpediteur} </Text>
                    <Text><span className={"itemsDev"}>Adresse :</span>{items.rue}{items.ville} </Text>
                    <Text><span className={"itemsDev"}>Contact :</span> {items.numeroExpediteur}</Text>
                    <Text><span className={"itemsDev"}>Email :</span> {items.email}</Text>
                  </Box>
                </SimpleGrid>
                <Center mt={5} color={"cyan.800"} fontWeight={"bold"} >Livraison</Center>

                <Box>
                  <Text> <span className={"itemsDev"}>Type :</span> En agence </Text>
                  <Text><span className={"itemsDev"}> Prestataire :</span> Rschain</Text>
                  <Text><span className={"itemsDev"}> Adresse :</span> Carrefour prière, cocody-Abidjan</Text>
                  <Text> <span className={"itemsDev"}>Contact :</span> 00225 - 07030908075</Text>
                </Box>

                <Center mt={5} justifyContent={"space-evenly"}>
                  <Draw id={items.devisId} nomDest={ items.nomDestinataire} prenomDest={ items.prenomDestinataire} 
                  adrDest={items.adresseDest } telDest={ items.numeroDestinataire} villeDest={items.villeDest} 
                  posteDest={items.posteDest} emailDest={items.emailDest } 
                  nomArr={ items.nomExpediteur} prenomArr={items.prenomExpediteur } 
                  villeArr={items.ville} adrArr={items.rue} telArr={items.numeroExpediteur} emailArr={items.email}  />
                  <Button colorScheme={"red"} width={"130px"} px={4} py={2} height={"65px"} borderRadius={"xl"} onClick={() => Cancel2(id, "Annulé")}>Annuler</Button>
                </Center>
              </Box>

            </ModalBody>

            {/* <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Fermer
            </Button>

          </ModalFooter> */}
          </ModalContent>
        </Modal>
      </>
    );
  } else {
    return <></>;
  }
}
function Cancel({ items, email, id }) {
  // console.log(items.Status);
  const { isOpen, onOpen, onClose } = useDisclosure()
  if (items.status == "Annulé" && items.email == email) {
    return (
      <>
        <Box
          onClick={onOpen}
          mb={5}
          bgColor={"white"}
          mx={2}
          py={2}
          boxShadow={"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"}
          w={["400px", "400px", "400px", "500px", "500px"]}
          maxH={"170px"}


          borderRadius="sm"
          overflow="hidden"
        >

          <Flex justifyContent={"space-between"} width={"100%"}>
            <Box pl={2} width={"fit-content"}>


              <Box

                fontSize={[13, 13, 13, 15, 15]}
                as="h4"
                lineHeight="tight"

              >
                <Text>
                  <span className="itemsDev"> Référence: </span> {id}</Text>

                <Flex><Text mr={2}>Date : </Text>{new Date(items.createdAt).toLocaleDateString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}</Flex>
                <Text mb={5}> Destination : {items.arrive}</Text>
                {/* <Flex><Text mr={2}>Arrivé : </Text>{items.arrive}</Flex> */}
              </Box>


              {/* <Box>
              <Button bgColor={'red.500'} _hover={{
                bgColor:'#FF6969'
              }} color={'white'} onClick={() => Cancel2(id, "Annulé")}>
                Annuler
              </Button>
            </Box> */}

            </Box>

            <Box display="grid" height={"fit-content"} width={"fit-content"}>
              <Badge borderRadius="full" mb={2} px={2} bgColor="#ff914d" height={"fit-content"} width={"fit-content"} color={"white"} textTransform={"capitalize"}>
                {items.status}
              </Badge>

              <Badge borderRadius="full" px={4} height={"fit-content"} width={"fit-content"} bgColor={"#00bf63"} color={"white"} textTransform={"capitalize"}>
                {items.moyen}
              </Badge>
              <Flex mt={2}>
                <Text fontWeight={700}>{items.total + " "}</Text>
                <Box as="span" color="gray.600" fontSize="sm">
                  <b>€</b> TTC
                </Box>
              </Flex>
            </Box>


          </Flex>
          <Flex justifyContent={"space-between"} width={"full"} >

            {items.methodeDePaiement ? <> <Text>{items.methodeDePaiment}  </Text> {items.methodeDePaiment} </> : <Text> Erreur au niveau du paiement</Text>}
            <ChevronRightIcon fontSize={"30px"} color={"cyan.800"} fontWeight={700} />
          </Flex>

        </Box>
        <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>

              <Box bgColor={"white"} fontSize={{ base: "12px", lg: "15px" }} w={"full"}>
                <Flex justifyContent={"space-between"} display={{ base: "block", lg: "flex" }}>
                  <Flex mb={5} fontSize={{ base: "12px", lg: "15px" }}><Text fontFamily={"-apple-system"} color={"#086f83"} w={{ base: "70px", lg: "fit-content" }} fontWeight={600} >Référence :</Text> {items.devisId}</Flex>
                  <Flex textAlign={{ base: "center", lg: "inherit" }}>
                    <Badge borderRadius="full" mb={2} px={6} bgColor="#ff914d" height={"fit-content"} width={"fit-content"} color={"white"} textTransform={"capitalize"}>
                      {items.status}
                    </Badge>

                    <Badge borderRadius="full" px={8} height={"fit-content"} width={"fit-content"} bgColor={"#00bf63"} color={"white"} textTransform={"capitalize"}>
                      {items.moyen}
                    </Badge>
                  </Flex>

                </Flex >
                {items.moyen == "Aerien" ? <Box>
                  <SimpleGrid columns={2}>
                    {items.categories.map((category, index) => (
                      <Flex key={index} width={"100%"}>
                        <Box>
                          <Image width="80px" height="80px" src="./new/colis2.png" />
                        </Box>
                        <Box mt={3}>
                          {/* <Text> <span className={"itemsDev"}>Retrait:</span> </Text> */}
                          <Text><span className={"itemsDev"}> Poids:</span> {items.poids[index]} </Text>
                          <Text> <span className={"itemsDev"}>Categorie:</span> {category}</Text>
                          {/* <Text> <span className={"itemsDev"}>Prix:</span>  </Text> */}
                        </Box>
                      </Flex>
                    ))}

                  </SimpleGrid>


                </Box> :
                  <Box >
                    <SimpleGrid columns={2}>
                      {items.contenant.map((category, index) => (
                        <Flex key={index} width={"100%"}>
                          <Box>
                            <Image width="80px" height="80px" src="./new/colis2.png" />
                          </Box>
                          <Box mt={3}>
                            {/* <Text> <span className={"itemsDev"}>Retrait:</span> </Text> */}
                            <Text> <span className={"itemsDev"}>Contenant:</span> {category}</Text>
                            <Text> <span className={"itemsDev"}>Besoin:</span> {items.besoin[index] ? "Oui" : "Non"}</Text>
                            {/* <Text><span className={"itemsDev"}> Poids:</span> {items.poids[index]} </Text> */}

                            {/* <Text> <span className={"itemsDev"}>Prix:</span>  </Text> */}
                          </Box>
                        </Flex>
                      ))}

                    </SimpleGrid>


                  </Box>}

                <SimpleGrid columns={2} mt={5} >
                  <Box>
                    <Flex>
                      <img width="24" height="24" src="https://img.icons8.com/color/48/000000/address--v1.png" alt="address--v1" />
                      <Text> Départ : {items.depart}</Text>
                    </Flex>
                    <Text fontSize={{ base: "12px", lg: "15px" }}> Dépôt : {items.retrait_depot}</Text>
                    <Flex fontSize={{ base: "12px", lg: "15px" }}><Text mr={1}>Départ: </Text>{new Date(items.createdAt).toLocaleDateString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}</Flex>
                  </Box>
                  <Box>
                    <Flex>
                      <img width="24" height="24" src="https://img.icons8.com/color/48/000000/address--v1.png" alt="address--v1" />
                      <Text> Arrivé : {items.arrive}</Text>
                    </Flex>

                    <Flex fontSize={{ base: "12px", lg: "15px" }}><Text mr={2} >Retrait: </Text>
                      {/* {new Date(items.createdAt).toLocaleDateString(undefined, {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})} */}
                    </Flex>
                  </Box>
                </SimpleGrid>


                <Center mt={5} mb={5} color={"cyan.800"} fontWeight={"bold"} >Informations</Center>
                <SimpleGrid columns={{ base: 1, lg: 2 }} spacingY={{ base: 5, lg: 2 }} justifyContent={"space-around"}>
                  <Box><Text color={"cyan.800"} fontWeight={700}>Destinataire</Text>
                    <Text><span className={"itemsDev"}>Nom :</span> {items.nomDestinataire}</Text>
                    <Text><span className={"itemsDev"}>Prénom :</span> {items.prenomDestinataire} </Text>
                    <Text><span className={"itemsDev"}>Adresse :</span>{items.adresseDest},{items.villeDest},{items.posteDest} </Text>
                    <Text><span className={"itemsDev"}>Prix :</span> {items.total}€</Text>
                    <Text><span className={"itemsDev"}>Contact :</span> {items.numeroDestinataire}</Text>
                    <Text><span className={"itemsDev"}>Email :</span>{items.emailDest} </Text>
                  </Box>
                  <Box><Text color={"cyan.800"} fontWeight={700}>Expediteur</Text>
                    <Text><span className={"itemsDev"}>Nom :</span>{items.nomExpediteur} </Text>
                    <Text><span className={"itemsDev"}>Prénom :</span>{items.prenomExpediteur} </Text>
                    <Text><span className={"itemsDev"}>Adresse :</span>{items.rue}{items.ville} </Text>
                    <Text><span className={"itemsDev"}>Contact :</span> {items.numeroExpediteur}</Text>
                    <Text><span className={"itemsDev"}>Email :</span> {items.email}</Text>
                  </Box>
                </SimpleGrid>
                <Center mt={5} color={"cyan.800"} fontWeight={"bold"} >Livraison</Center>

                <Box>
                  <Text> <span className={"itemsDev"}>Type :</span> En agence </Text>
                  <Text><span className={"itemsDev"}> Prestataire :</span> Rschain</Text>
                  <Text><span className={"itemsDev"}> Adresse :</span> Carrefour prière, cocody-Abidjan</Text>
                  <Text> <span className={"itemsDev"}>Contact :</span> 00225 - 07030908075</Text>
                </Box>


              </Box>
            </ModalBody>

            {/* <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Fermer
            </Button>

          </ModalFooter> */}
          </ModalContent>
        </Modal>
      </>
    );
  } else {
    return <></>;
  }
}
function Launch({ items, email, id }) {
  // console.log(items);
  const { isOpen, onOpen, onClose } = useDisclosure()
  if ((items.status == "En attente" || items.status == "Reglé") && items.email == email) {
    return (
      <>
        <Box
          onClick={onOpen}
          mb={5}
          bgColor={"white"}
          mx={2}
          py={2}
          boxShadow={"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"}
          w={["400px", "400px", "400px", "500px", "500px"]}
          maxH={"170px"}


          borderRadius="sm"
          overflow="hidden"
        >

          <Flex justifyContent={"space-between"} width={"100%"}>
            <Box pl={2} width={"fit-content"}>


              <Box

                fontSize={[13, 13, 13, 15, 15]}
                as="h4"
                lineHeight="tight"

              >
                <Text>
                  <span className="itemsDev"> Référence: </span> {id}</Text>

                <Flex><Text mr={2}>Date : </Text>{new Date(items.createdAt).toLocaleDateString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}</Flex>
                <Text mb={5}> Destination : {items.arrive}</Text>
                {/* <Flex><Text mr={2}>Arrivé : </Text>{items.arrive}</Flex> */}
              </Box>


              {/* <Box>
              <Button bgColor={'red.500'} _hover={{
                bgColor:'#FF6969'
              }} color={'white'} onClick={() => Cancel2(id, "Annulé")}>
                Annuler
              </Button>
            </Box> */}

            </Box>

            <Box display="grid" height={"fit-content"} width={"fit-content"}>
              <Badge borderRadius="full" mb={2} px={2} bgColor="#ff914d" height={"fit-content"} width={"fit-content"} color={"white"} textTransform={"capitalize"}>
                {items.status}
              </Badge>

              <Badge borderRadius="full" px={4} height={"fit-content"} width={"fit-content"} bgColor={"#00bf63"} color={"white"} textTransform={"capitalize"}>
                {items.moyen}
              </Badge>
              <Flex mt={2}>
                <Text fontWeight={700}>{items.total + " "}</Text>
                <Box as="span" color="gray.600" fontSize="sm">
                  <b>€</b> TTC
                </Box>
              </Flex>
            </Box>


          </Flex>
          <Flex justifyContent={"space-between"} width={"full"} >

            {items.methodeDePaiement ? <> <Text>{items.methodeDePaiment}  </Text> {items.methodeDePaiment} </> : <Text> Erreur au niveau du paiement</Text>}
            <ChevronRightIcon fontSize={"30px"} color={"cyan.800"} fontWeight={700} />
          </Flex>

        </Box>
        <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>

              <Box bgColor={"white"} fontSize={{ base: "12px", lg: "15px" }} w={"full"}>
                <Flex justifyContent={"space-between"} display={{ base: "block", lg: "flex" }}>
                  <Flex mb={5} fontSize={{ base: "12px", lg: "15px" }}><Text fontFamily={"-apple-system"} color={"#086f83"} w={{ base: "70px", lg: "fit-content" }} fontWeight={600} >Référence :</Text> {items.devisId}</Flex>
                  <Flex textAlign={{ base: "center", lg: "inherit" }}>
                    <Badge borderRadius="full" mb={2} px={6} bgColor="#ff914d" height={"fit-content"} width={"fit-content"} color={"white"} textTransform={"capitalize"}>
                      {items.status}
                    </Badge>

                    <Badge borderRadius="full" px={8} height={"fit-content"} width={"fit-content"} bgColor={"#00bf63"} color={"white"} textTransform={"capitalize"}>
                      {items.moyen}
                    </Badge>
                  </Flex>

                </Flex >
                {items.moyen == "Aerien" ? <Box>
                  <SimpleGrid columns={2}>
                    {items.categories.map((category, index) => (
                      <Flex key={index} width={"100%"}>
                        <Box>
                          <Image width="80px" height="80px" src="./new/colis2.png" />
                        </Box>
                        <Box mt={3}>
                          {/* <Text> <span className={"itemsDev"}>Retrait:</span> </Text> */}
                          <Text><span className={"itemsDev"}> Poids:</span> {items.poids[index]} </Text>
                          <Text> <span className={"itemsDev"}>Categorie:</span> {category}</Text>
                          {/* <Text> <span className={"itemsDev"}>Prix:</span>  </Text> */}
                        </Box>
                      </Flex>
                    ))}

                  </SimpleGrid>


                </Box> :
                  <Box >
                    <SimpleGrid columns={2}>
                      {items.contenant.map((category, index) => (
                        <Flex key={index} width={"100%"}>
                          <Box>
                            <Image width="80px" height="80px" src="./new/colis2.png" />
                          </Box>
                          <Box mt={3}>
                            {/* <Text> <span className={"itemsDev"}>Retrait:</span> </Text> */}
                            <Text> <span className={"itemsDev"}>Contenant:</span> {category}</Text>
                            <Text> <span className={"itemsDev"}>Besoin:</span> {items.besoin[index] ? "Oui" : "Non"}</Text>
                            {/* <Text><span className={"itemsDev"}> Poids:</span> {items.poids[index]} </Text> */}

                            {/* <Text> <span className={"itemsDev"}>Prix:</span>  </Text> */}
                          </Box>
                        </Flex>
                      ))}

                    </SimpleGrid>


                  </Box>}

                <SimpleGrid columns={2} mt={5} >
                  <Box>
                    <Flex>
                      <img width="24" height="24" src="https://img.icons8.com/color/48/000000/address--v1.png" alt="address--v1" />
                      <Text> Départ : {items.depart}</Text>
                    </Flex>
                    <Text fontSize={{ base: "12px", lg: "15px" }}> Dépôt : {items.retrait_depot}</Text>
                    <Flex fontSize={{ base: "12px", lg: "15px" }}><Text mr={1}>Départ: </Text>{new Date(items.createdAt).toLocaleDateString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}</Flex>
                  </Box>
                  <Box>
                    <Flex>
                      <img width="24" height="24" src="https://img.icons8.com/color/48/000000/address--v1.png" alt="address--v1" />
                      <Text> Arrivé : {items.arrive}</Text>
                    </Flex>

                    <Flex fontSize={{ base: "12px", lg: "15px" }}><Text mr={2} >Retrait: </Text>
                      {/* {new Date(items.createdAt).toLocaleDateString(undefined, {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})} */}
                    </Flex>
                  </Box>
                </SimpleGrid>


                <Center mt={5} mb={5} color={"cyan.800"} fontWeight={"bold"} >Informations</Center>
                <SimpleGrid columns={{ base: 1, lg: 2 }} spacingY={{ base: 5, lg: 2 }} justifyContent={"space-around"}>
                  <Box><Text color={"cyan.800"} fontWeight={700}>Destinataire</Text>
                    <Text><span className={"itemsDev"}>Nom :</span> {items.nomDestinataire}</Text>
                    <Text><span className={"itemsDev"}>Prénom :</span> {items.prenomDestinataire} </Text>
                    <Text><span className={"itemsDev"}>Adresse :</span>{items.adresseDest},{items.villeDest},{items.posteDest} </Text>
                    <Text><span className={"itemsDev"}>Prix :</span> {items.total}€</Text>
                    <Text><span className={"itemsDev"}>Contact :</span> {items.numeroDestinataire}</Text>
                    <Text><span className={"itemsDev"}>Email :</span>{items.emailDest} </Text>
                  </Box>
                  <Box><Text color={"cyan.800"} fontWeight={700}>Expediteur</Text>
                    <Text><span className={"itemsDev"}>Nom :</span>{items.nomExpediteur} </Text>
                    <Text><span className={"itemsDev"}>Prénom :</span>{items.prenomExpediteur} </Text>
                    <Text><span className={"itemsDev"}>Adresse :</span>{items.rue}{items.ville} </Text>
                    <Text><span className={"itemsDev"}>Contact :</span> {items.numeroExpediteur}</Text>
                    <Text><span className={"itemsDev"}>Email :</span> {items.email}</Text>
                  </Box>
                </SimpleGrid>
                <Center mt={5} color={"cyan.800"} fontWeight={"bold"} >Livraison</Center>

                <Box>
                  <Text> <span className={"itemsDev"}>Type :</span> En agence </Text>
                  <Text><span className={"itemsDev"}> Prestataire :</span> Rschain</Text>
                  <Text><span className={"itemsDev"}> Adresse :</span> Carrefour prière, cocody-Abidjan</Text>
                  <Text> <span className={"itemsDev"}>Contact :</span> 00225 - 07030908075</Text>
                </Box>

                <Center mt={5} justifyContent={"space-evenly"}>
                <Draw id={items.devisId} nomDest={ items.nomDestinataire} prenomDest={ items.prenomDestinataire} 
                  adrDest={items.adresseDest } telDest={ items.numeroDestinataire} villeDest={items.villeDest} posteDest={items.posteDest} emailDest={items.emailDest } 
                  nomArr={ items.nomExpediteur} prenomArr={items.prenomExpediteur } villeArr={items.ville} adrArr={items.rue} telArr={items.numeroExpediteur} emailArr={items.email}  />
                  <Button colorScheme={"red"} width={"130px"} px={4} py={2} height={"65px"} borderRadius={"xl"} onClick={() => Cancel2(id, "Annulé")}>Annuler</Button>
                </Center>
              </Box>

            </ModalBody>

            {/* <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Fermer
            </Button>

          </ModalFooter> */}
          </ModalContent>
        </Modal>
      </>
    );
  } else {
    return <></>;
  }
}
function Regle({ items, email, id }) {
  // console.log(items.Status);
  const { isOpen, onOpen, onClose } = useDisclosure()
  if (items.status == "Disponible" && items.email == email) {
    return (
      <>
        <Box
          onClick={onOpen}
          mb={5}
          bgColor={"white"}
          mx={2}
          py={2}
          boxShadow={"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"}
          w={["400px", "400px", "400px", "500px", "500px"]}
          maxH={"170px"}


          borderRadius="sm"
          overflow="hidden"
        >

          <Flex justifyContent={"space-between"} width={"100%"}>
            <Box pl={2} width={"fit-content"}>


              <Box

                fontSize={[13, 13, 13, 15, 15]}
                as="h4"
                lineHeight="tight"

              >
                <Text>
                  <span className="itemsDev"> Référence: </span> {id}</Text>

                <Flex><Text mr={2}>Date : </Text>{new Date(items.createdAt).toLocaleDateString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}</Flex>
                <Text mb={5}> Destination : {items.arrive}</Text>
                {/* <Flex><Text mr={2}>Arrivé : </Text>{items.arrive}</Flex> */}
              </Box>


              {/* <Box>
              <Button bgColor={'red.500'} _hover={{
                bgColor:'#FF6969'
              }} color={'white'} onClick={() => Cancel2(id, "Annulé")}>
                Annuler
              </Button>
            </Box> */}

            </Box>

            <Box display="grid" height={"fit-content"} width={"fit-content"}>
              <Badge borderRadius="full" mb={2} px={2} bgColor="#ff914d" height={"fit-content"} width={"fit-content"} color={"white"} textTransform={"capitalize"}>
                {items.status}
              </Badge>

              <Badge borderRadius="full" px={4} height={"fit-content"} width={"fit-content"} bgColor={"#00bf63"} color={"white"} textTransform={"capitalize"}>
                {items.moyen}
              </Badge>
              <Flex mt={2}>
                <Text fontWeight={700}>{items.total + " "}</Text>
                <Box as="span" color="gray.600" fontSize="sm">
                  <b>€</b> TTC
                </Box>
              </Flex>
            </Box>


          </Flex>
          <Flex justifyContent={"space-between"} width={"full"} >

            {items.methodeDePaiement ? <> <Text>{items.methodeDePaiment}  </Text> {items.methodeDePaiment} </> : <Text> Erreur au niveau du paiement</Text>}
            <ChevronRightIcon fontSize={"30px"} color={"cyan.800"} fontWeight={700} />
          </Flex>

        </Box>
        <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>

              <Box bgColor={"white"} fontSize={{ base: "12px", lg: "15px" }} w={"full"}>
                <Flex justifyContent={"space-between"} display={{ base: "block", lg: "flex" }}>
                  <Flex mb={5} fontSize={{ base: "12px", lg: "15px" }}><Text fontFamily={"-apple-system"} color={"#086f83"} w={{ base: "70px", lg: "fit-content" }} fontWeight={600} >Référence :</Text> {items.devisId}</Flex>
                  <Flex textAlign={{ base: "center", lg: "inherit" }}>
                    <Badge borderRadius="full" mb={2} px={6} bgColor="#ff914d" height={"fit-content"} width={"fit-content"} color={"white"} textTransform={"capitalize"}>
                      {items.status}
                    </Badge>

                    <Badge borderRadius="full" px={8} height={"fit-content"} width={"fit-content"} bgColor={"#00bf63"} color={"white"} textTransform={"capitalize"}>
                      {items.moyen}
                    </Badge>
                  </Flex>

                </Flex >
                {items.moyen == "Aerien" ? <Box>
                  <SimpleGrid columns={2}>
                    {items.categories.map((category, index) => (
                      <Flex key={index} width={"100%"}>
                        <Box>
                          <Image width="80px" height="80px" src="./new/colis2.png" />
                        </Box>
                        <Box mt={3}>
                          {/* <Text> <span className={"itemsDev"}>Retrait:</span> </Text> */}
                          <Text><span className={"itemsDev"}> Poids:</span> {items.poids[index]} </Text>
                          <Text> <span className={"itemsDev"}>Categorie:</span> {category}</Text>
                          {/* <Text> <span className={"itemsDev"}>Prix:</span>  </Text> */}
                        </Box>
                      </Flex>
                    ))}

                  </SimpleGrid>


                </Box> :
                  <Box >
                    <SimpleGrid columns={2}>
                      {items.contenant.map((category, index) => (
                        <Flex key={index} width={"100%"}>
                          <Box>
                            <Image width="80px" height="80px" src="./new/colis2.png" />
                          </Box>
                          <Box mt={3}>
                            {/* <Text> <span className={"itemsDev"}>Retrait:</span> </Text> */}
                            <Text> <span className={"itemsDev"}>Contenant:</span> {category}</Text>
                            <Text> <span className={"itemsDev"}>Besoin:</span> {items.besoin[index] ? "Oui" : "Non"}</Text>
                            {/* <Text><span className={"itemsDev"}> Poids:</span> {items.poids[index]} </Text> */}

                            {/* <Text> <span className={"itemsDev"}>Prix:</span>  </Text> */}
                          </Box>
                        </Flex>
                      ))}

                    </SimpleGrid>


                  </Box>}

                <SimpleGrid columns={2} mt={5} >
                  <Box>
                    <Flex>
                      <img width="24" height="24" src="https://img.icons8.com/color/48/000000/address--v1.png" alt="address--v1" />
                      <Text> Départ : {items.depart}</Text>
                    </Flex>
                    <Text fontSize={{ base: "12px", lg: "15px" }}> Dépôt : {items.retrait_depot}</Text>
                    <Flex fontSize={{ base: "12px", lg: "15px" }}><Text mr={1}>Départ: </Text>{new Date(items.createdAt).toLocaleDateString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}</Flex>
                  </Box>
                  <Box>
                    <Flex>
                      <img width="24" height="24" src="https://img.icons8.com/color/48/000000/address--v1.png" alt="address--v1" />
                      <Text> Arrivé : {items.arrive}</Text>
                    </Flex>

                    <Flex fontSize={{ base: "12px", lg: "15px" }}><Text mr={2} >Retrait: </Text>{/*{new Date(items.createdAt).toLocaleDateString(undefined, {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})}*/}</Flex>
                  </Box>
                </SimpleGrid>


                <Center mt={5} mb={5} color={"cyan.800"} fontWeight={"bold"} >Informations</Center>
                <SimpleGrid columns={{ base: 1, lg: 2 }} spacingY={{ base: 5, lg: 2 }} justifyContent={"space-around"}>
                  <Box><Text color={"cyan.800"} fontWeight={700}>Destinataire</Text>
                    <Text><span className={"itemsDev"}>Nom :</span> {items.nomDestinataire}</Text>
                    <Text><span className={"itemsDev"}>Prénom :</span> {items.prenomDestinataire} </Text>
                    <Text><span className={"itemsDev"}>Adresse :</span>{items.adresseDest},{items.villeDest},{items.posteDest} </Text>
                    <Text><span className={"itemsDev"}>Prix :</span> {items.total}€</Text>
                    <Text><span className={"itemsDev"}>Contact :</span> {items.numeroDestinataire}</Text>
                    <Text><span className={"itemsDev"}>Email :</span>{items.emailDest} </Text>
                  </Box>
                  <Box><Text color={"cyan.800"} fontWeight={700}>Expediteur</Text>
                    <Text><span className={"itemsDev"}>Nom :</span>{items.nomExpediteur} </Text>
                    <Text><span className={"itemsDev"}>Prénom :</span>{items.prenomExpediteur} </Text>
                    <Text><span className={"itemsDev"}>Adresse :</span>{items.rue}{items.ville} </Text>
                    <Text><span className={"itemsDev"}>Contact :</span> {items.numeroExpediteur}</Text>
                    <Text><span className={"itemsDev"}>Email :</span> {items.email}</Text>
                  </Box>
                </SimpleGrid>
                <Center mt={5} color={"cyan.800"} fontWeight={"bold"} >Livraison</Center>

                <Box>
                  <Text> <span className={"itemsDev"}>Type :</span> En agence </Text>
                  <Text><span className={"itemsDev"}> Prestataire :</span> Rschain</Text>
                  <Text><span className={"itemsDev"}> Adresse :</span> Carrefour prière, cocody-Abidjan</Text>
                  <Text> <span className={"itemsDev"}>Contact :</span> 00225 - 07030908075</Text>
                </Box>

                <Center mt={5} justifyContent={"space-evenly"}>
                  {/* <Text bgColor={"cyan.800"} color={"white"} width={"130px"} px={4} py={2}  fontWeight={600} textAlign={"center"} borderRadius={"xl"} height={"fit-content"}>Modifier les informations</Text>  */}
                  <Button colorScheme={"red"} width={"130px"} px={4} py={2} height={"65px"} borderRadius={"xl"} onClick={() => Cancel2(id, "Annulé")}>Annuler</Button>
                </Center>
              </Box>

            </ModalBody>

            {/* <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Fermer
            </Button>

          </ModalFooter> */}
          </ModalContent>
        </Modal>
      </>
    );
  } else {
    return <></>;
  }
}

export default function HistDev() {
  const [commandeListe, setCommandeListe] = useState([]);
  const [email, setEmail] = useState();
  const [id, setId] = useState([]);
  const [inde, setInde] = useState();
  const router = useRouter()
  const Getall = async () => {
    const starCountRef = ref(db2, "DevisPerso/");
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
        router.reload()
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
      <Box display={{ base: "grid", lg: "none" }}>
        <InputBar />
        {isLagerThan768 ? <Navbar></Navbar> : <></>}
      </Box>
      <Box>
        <Text fontSize={"15px"} ml={5} display={{ base: "block", lg: "none" }} fontWeight={600}>Mes devis</Text>
        <Tabs
          isManual
          orientation={["horizontal", "horizontal", "horizontal", "vertical", "vertical"]}
          variant="outfitted"
          isLazy
          w={"100% "}
        // defaultIndex={1}

        >

          <TabPanels>
            <TabPanel>
              <Tabs isManual isLazy w={"100% "}>
                <Center>
                  <TabList>
                    <Tab>Historique</Tab>
                    <Tab>Devis en cours</Tab>
                    <Tab>Devis validés</Tab>

                    <Tab>Devis annulés</Tab>
                  </TabList>
                </Center>

                <TabPanels>
                  <TabPanel bgColor={"#f3f3f3"}>

                    <Center>
                      <Box>
                        {commandeListe ? (
                          Object.values(commandeListe).map((items, index) => (
                            <Regle
                              key={items.key}
                              items={items}
                              id={id[index]}
                              email={email}
                            />
                          ))
                        ) : (
                          <Box>Aucune donnee</Box>
                        )}</Box>
                    </Center>
                  </TabPanel>
                  <TabPanel bgColor={"#f3f3f3"} >
                    <Center>
                      <Box>


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
                    </Center>
                  </TabPanel>
                  <TabPanel bgColor={"#f3f3f3"}>
                    <Center>
                      <Box>
                        {commandeListe ? (
                          Object.values(commandeListe).map((items, index) => (
                            <Valide
                              key={items.key}
                              items={items}
                              id={id[index]}
                              email={email}
                            />
                          ))
                        ) : (
                          <Box>Aucune donnee</Box>
                        )}</Box>
                    </Center>
                  </TabPanel>

                  <TabPanel bgColor={"#f3f3f3"}>
                    <Center>
                      <Box>
                        {commandeListe ? (
                          Object.values(commandeListe).map((items, index) => (
                            <Cancel key={items.key} items={items} id={id[index]} email={email} />
                          ))
                        ) : (
                          <Box>Aucune donnee</Box>
                        )}</Box>
                    </Center>
                  </TabPanel>
                </TabPanels>

              </Tabs>
            </TabPanel>

          </TabPanels>
        </Tabs>
      </Box>
      {/* <Center  mt={10} width="100%" display={{base:"grid",lg:"none"}}>
      <Text fontSize={"15px"} ml={5} display={{base:"block",lg:"none"}} fontWeight={600}>Mes devis</Text>
        <Tabs
          isManual
          orientation={["horizontal","horizontal","horizontal","vertical","vertical"]}
          variant="outfitted"
          isLazy
          w={"100% "}
          // defaultIndex={1}
         
        >
         
          <TabPanels>
            <TabPanel>
              <Tabs isManual isLazy  w={"100% "}>
                <TabList>
                  <Tab>Devis en cours</Tab>
                  <Tab>Devis validés</Tab>
                  <Tab>Devis reglés</Tab>
                  <Tab>Devis annulés</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Box >
                      {commandeListe ? (
                        Object.values(commandeListe).map((items,index) => (
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
                        Object.values(commandeListe).map((items,index) => (
                          <Valide
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
                        Object.values(commandeListe).map((items,index) => (
                          <Regle
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
              Object.values(commandeListe).map((items,index) => (
                <Cancel key={items.key} items={items} id={id[index]} email={email} />
              ))
            ) : (
              <Box>Aucune donnee</Box>
            )}
            </Box>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </TabPanel>
           
          </TabPanels>
        </Tabs>
      </Center> */}

    </>
  );
}
