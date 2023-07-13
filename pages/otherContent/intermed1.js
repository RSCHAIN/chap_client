import { db2 } from "@/FIREBASE/clientApp";
import InputBar from "@/components/InputBar";
import Navbar from "@/components/Navbar";
import Slide from "@/components/slider";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { onValue, push, ref } from "@firebase/database";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { BsTelephoneOutboundFill } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";

///fonction du panier
function saveCart(product) {
  localStorage.setItem("Cart", JSON.stringify(product));
}
function getCart() {
  let Cart = localStorage.getItem("Cart");
  if (Cart == null) {
    return [];
  } else {
    return JSON.parse(Cart);
  }
}
function AddToCart(Product) {
  let Cart = getCart();
  let foundit = Cart.find((p) => p.id == Product.id);
  if (foundit != undefined) {
    foundit.quantite++;
    foundit.prix = foundit.quantite * parseInt(Product.prix);
  } else {
    Product.quantite = 1;
    Cart.push(Product);
  }

  saveCart(Cart);
}
////ffin fonction de la cart
 

/// fonction d'enregistrement des commandes

async function saveCommande2(data) {
    let email = sessionStorage.getItem("email");
  
    let adress = localStorage.addresse;
    let nom2 = localStorage.name;
    let numero = localStorage.number;
    let date = new Date();
  
    push(ref(db2, "Commandes"), {
      productID: data.id,
      nom: data.nom,
      description: data.description,
      quantite: data.quantite,
      imageUrl: data.imageUrl,
      organisation: data.organisation,
      totalPrix: data.prix,
      initiateur: email,
      Status: "Demande de Reservation",
      ville: adress,
      rue: adress,
      code_postal: adress,
      batiment: adress,
      lieu: adress,
      receveur: nom2,
      numero: numero,
      jour: "A définir",
      moment: "A définir",
      date,
    });
    axios
      .post("/api/sendmail", {
        message: data.description,
        email: email.toString(),
        subject: data.nom,
        image: data.imageUrl,
        price: data.prix,
        quantity: "A Definir",
      })
      .then((response) => {
        alert("Vous Allez recevoir un email");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  async function saveCommande3(d1, d2) {
    let email = sessionStorage.getItem("email");
  
    let adress = localStorage.addresse;
    let nom2 = localStorage.name;
    let numero = localStorage.number;
    let date = new Date();
  
    if (d1.length != 0 && d2.length != 0) {
      push(ref(db2, "Reservation"), {
        initiateur: email,
        Status: "Demande de Reservation",
        ville: adress,
        // rue: adress,
        // code_postal: adress,
        // batiment: adress,
        // lieu: adress,
        Couverts: d2,
        numero: numero,
        // jour: "A définir",
        // moment: "",
        date: d1,
      });
      alert("réservation effectué");
    
    }else{
      alert ("Veuillez remplir les champs svp");
    }
    
    // axios
    //   .post("/api/sendmail", {
    //     message: '',
    //     email: email.toString(),
    //     subject: "Reservation",
    //     image: data.imageUrl,
    //     price: data.prix,
    //     quantity: "A Definir",
    //   })
    //   .then((response) => {
    //     alert("Vous Allez recevoir un email");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }


/// fin des fonctions


////////////////////////////////////////////////////////SLIDER CONFIG /////////////////////////////////////////////////////





/////////////////////////////////////////////FIN SLIDER CONFIG//////////////////////////////////////////////////////////////




export default function Intermed1() {
    const { isOpen, onToggle, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  const [numero, setNumero] = useState("");
  const [nom, setNom] = useState("");
  const [addresse, setAddresse] = useState("");
  const [data, setData] = useState([]);
  const [categorie, setCategorie] = useState("");
    const [data1, setData1] = useState();
  const [data2, setData2] = useState();
  const heure = "Heure d'Ouverture";
  useEffect(() => {
    setImageUrl(sessionStorage.getItem("image"));
    setNumero(sessionStorage.getItem("savefrom"));
    setNom(sessionStorage.getItem("nom"));
    setAddresse(sessionStorage.getItem("adresse"));
    setCategorie(sessionStorage.getItem("categorie"));
    const starCountRef = ref(
      db2,
      `${sessionStorage.getItem("categorie")}/${sessionStorage.getItem("nom")}`
    );

    onValue(starCountRef, (snapshot) => {
      console.log(snapshot.val());
      const donnes = snapshot.val();

      // const categorie = Object.keys(donnes).map(key=>({
      //   id:key,
      //   ...donnes[key]
      // }))
      // setCat(categorie)
      if (donnes != null) {
        const newProducts = Object.keys(donnes).map((key) => ({
          id: key,
          ...donnes[key],
        }));

        setData(newProducts);
      }
    });
  }, [setImageUrl, setAddresse, setNom, setNumero]);

  if (categorie != "Restaurant" && categorie != "Esthetique" && categorie != "Restauration" && categorie != "Fret" && categorie != "Salon de Coiffure" && categorie != "Commerce de meches") {
    return (
        <>
          <InputBar />
          <Navbar />
    
        
          <Box ml={["10%","10%","20%","30%","30%"]} mt={10}>
          <Flex  >
             
             <Box>
                 <Image src={`${imageUrl}`} alt={`logo de ${nom}`} width={"150px"} />
               </Box>
               <SimpleGrid columns={[1,1,2,2,2]}>
               <Box>
                 <Heading fontSize={"20px"} >{nom}</Heading>
                 <Text fontSize={"10px"} fontWeight={"medium"}>
                   {addresse}
                 </Text>
                 <Text fontSize={"10px"} fontWeight={"medium"}>
                   {numero}
                 </Text>
                 <Heading as={"h3"} fontWeight={"bold"} fontSize={"10px"}>
                   {heure}
                 </Heading>
                
                   <Text mt={5} color={"blue.400"} fontSize={"15px"}>
                     Pas defini
                   </Text>
                
               </Box>
                          
               </SimpleGrid>
              
             </Flex>
            <Heading fontSize={"20px"} mt={10} >Images du magasin </Heading>
            <Flex width={"100%"} mt={10}>
              <Image src={`${imageUrl}`} alt={`logo de ${nom}`} width={["100px","100px","150px","200px","200px"]}  mr={10}/>
              <Image src={`${imageUrl}`} alt={`logo de ${nom}`} width={["100px","100px","150px","200px","200px"]}  mr={10}/>
              {/* <Image src={`${imageUrl}`} alt={`logo de ${nom}`} width={"200px"} mr={10}/> */}
              
            </Flex>
            <Heading  fontSize={"20px"} mt={10}>Les produits </Heading>
            <Flex width={"100%"} mt={10}>
              {/* <Image src={`${imageUrl}`} alt={`logo de ${nom}`} width={"200px"} />
              <Image src={`${imageUrl}`} alt={`logo de ${nom}`} width={"200px"} />
              <Image src={`${imageUrl}`} alt={`logo de ${nom}`} width={"200px"} />
              <Image src={`${imageUrl}`} alt={`logo de ${nom}`} width={"200px"} />
              <Image src={`${imageUrl}`} alt={`logo de ${nom}`} width={"200px"} /> */}
              <SimpleGrid columns={[1, 2, 2, 4, 6]} spacing={2}>
                {/* {console.log("data", data)} */}
                {data.map((data, key) => (
                  // <Box
                  //   key={data.id}
                  //   maxW={["100%","70%","70%","70%","70%"]}
                  //   width={"full"}
                  //   height={"fit-content"}
                  //   borderWidth="1px"
                  //   borderRadius="lg"
                  //   // overflow="hidden"
    
                  //   // boxShadow={"2xl"}
                  //   ml={5}
                  //   mb={20}
                  //   pb={5}
                  // >
                  //   <Box width={"300px"} height={"200px"} pt={10} pl={10}>
                  //     <Image src={data.imageUrl} alt={data.nom} maxH={'175px'}maxW={"150px"} />
                  //   </Box>
    
                  //   <Box p="6">
                  //     <Box
                  //       mt="15"
                  //       fontWeight="semibold"
                  //       as="h5"
                  //       lineHeight="tight"
                  //       noOfLines={2}
                  //       w={"179px"}
                  //       height={"50px"}
                  //     >
                  //       {data.nom}
                  //     </Box>
    
                  //     <Box
                  //       fontWeight="normal"
                  //       lineHeight="tight"
                  //       noOfLines={2}
                  //       w={"fit-content"}
                  //       height={"50px"}
                  //     >
                  //       <Text>{data.description}</Text>
                  //     </Box>
                  //     <Box fontWeight={'bold'}>
                  //       {data.prix}
                  //       <Box as="span" color="gray.600" pl={2} fontSize="sm">
                  //        €
                  //       </Box>
                  //     </Box>
    
                  //     <Box>
                  //       <Button
                  //         bgColor={"blue"}
                  //         mt={3}
                  //         borderRadius={"66px"}
                  //         onClick={() => {
                  //           AddToCart(data),
                  //             toast({
                  //               title: "PRODUIT AJOUTE",
    
                  //               status: "success",
                  //               duration: 9000,
                  //               isClosable: true,
                  //             });
                  //         }}
                  //         color={"white"}
                  //       >
                  //         {" "}
                  //         Ajouter au panier
                  //       </Button>
                  //     </Box>
                  //   </Box>
                  // </Box>
                  <Box
                    key={data.id}
                    maxW={["70%", "70%", "70%", "70%", "70%"]}
                    width={"270px"}
                    height={"400px"}
                    borderRadius="lg"
                    // overflow="hidden"
    
                    // boxShadow={"2xl"}
    
                    mt={4}
                    mb={20}
                    // key={}
                    // pb={5}
                  >
                    <Box height={"fit-content"} pt={10}>
                      <Image
                        src={data.imageUrl}
                        alt={data.nom}
                        width={"190px"}
                        height={"150px"}
                        maxH={"519px"}
                        maxW={"208px"}
                      />
                    </Box>
    
                    <Box p="6">
                      <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h5"
                        lineHeight="tight"
                        noOfLines={3}
                        width={"270px"}
                        height={"50px"}
                        pb={20}
                        // display={'flex'}
                        // justifyContent={'space-between'}
                      >
                        <Text width={"200px"}>{data.nom}</Text>
                        <Box textColor={"blue"} color={"blue.400"} h={5}>
                          {data.prix}
                          <Box as="span" pl={2} fontSize="sm">
                            €
                          </Box>
                        </Box>
                      </Box>
    
                      <Box
                        mt="1"
                        fontWeight="normal"
                        lineHeight="tight"
                        noOfLines={9}
                        w={"fit-content"}
                        height={"250px"}
                      >
                        <Text>{data.description}</Text>
                        <Button
                              bgColor={"cyan.700"}
                              mt={10}
                              borderRadius={"66px"}
                              width={"fit-content"}
                              as={"a"}
                             
                              onClick={() => {
                                AddToCart(data),
                                  toast({
                                    title: "PRODUIT AJOUTE",
    
                                    status: "success",
                                    duration: 9000,
                                    isClosable: true,
                                  });
                              }}
                              color={"white"}
                              _hover={{
                                backgroundColor: " cyan.900",
                                color: "white ",
                              }}
                              leftIcon={<IoMdAddCircle />}
                            >
                              {" "}
                              Commander
                            </Button>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </SimpleGrid>
            </Flex>
          </Box>
        </>
      );
  }else{
    return (
        <>
          <InputBar />
          <Navbar />
       
          <Box ml={["10%","10%","20%","30%","30%"]} mt={10}>
            <Flex >  
             
            <Box   mr={20}>
                <Image src={`${imageUrl}`} alt={`logo de ${nom}`} width={"150px"} />
                <Box mt={5}>
              <Button
              
            
              color={"#fff"}
              width={"94px"}
              height={"30px"}
              as={"a"}
             
              onClick={onOpen}
              bgColor={"cyan.700"}
              _hover={{
                backgroundColor: " cyan.900",
                color: "white ",
              }}
              leftIcon={<BsTelephoneOutboundFill />}
            >
              Reserver
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Formulaire de Reservation</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Flex>
                    <Text mr={20}>Date & heure: </Text>
                    <Input
                      type="datetime-local"
                      width={"180px"}
                      
                      onChange={(e) => setData1(e.target.value)}
                    />
                  </Flex>
                  <br />
                  <Flex>
                    <Text mr={5}>Nombre De Couverts : </Text>
                    <Input
                      type="number"
                      width={"180px"}
                      onChange={(e) => setData2(e.target.value)}
                    />
                  </Flex>
                  <br />
                  <Flex>
                    <Text marginRight={10}>Numéro du Restaurant : </Text>
                    <h3>
                      <a href={`tel:${sessionStorage.getItem("savefrom")}`}>
                        {sessionStorage.getItem("savefrom")}
                      </a>
                    </h3>
                  </Flex>
                </ModalBody>

                <ModalFooter>
                  {/* <Button colorScheme="ghost" mr={3} onClick={onClose}>
                    Annuler
                  </Button> */}
                 
                  <Button
                    bgColor={"cyan.700"}
                    color={"white"}
                    _hover={{ bgColor: "cyan.900" }}
                    onClick={() => {saveCommande3(data1, data2),
                  setData1(""),setData2("")}}
                  >
                    Valider
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
              </Box>
              </Box>
              
              <Box >
                <Heading fontSize={"20px"} >{nom}</Heading>
                <Text fontSize={"10px"} fontWeight={"medium"}>
                  {addresse}
                </Text>
                <Text fontSize={"10px"} fontWeight={"medium"}>
                  {numero}
                </Text>
                <Flex>
                <Heading as={"h3"} fontWeight={"bold"} fontSize={"10px"}>
                  {heure}
                </Heading>
              
                </Flex>
                  <Text mt={5} color={"blue.400"} fontSize={"15px"}>
                    Pas defini
                  </Text>
               
              </Box>
              
            
             
            </Flex>
            <Heading fontSize={"20px"} mt={10} >Images du magasin </Heading>
            <Flex  mt={10}>
              <Image src={`${imageUrl}`} alt={`logo de ${nom}`} width={"190px"}
                        height={"150px"}  mr={10}/>
              <Image src={`${imageUrl}`} alt={`logo de ${nom}`} width={"190px"}
                        height={"150px"}  mr={10}/>
              {/* <Image src={`${imageUrl}`} alt={`logo de ${nom}`} width={"100px"}  mr={10}/> */}
              {/* <Image src={`${imageUrl}`} alt={`logo de ${nom}`} width={"200px"} mr={10}/> */}
              
            </Flex>
            <Heading  fontSize={"20px"} mt={10}>Les produits </Heading>
            <Flex mt={10}>
       
              <SimpleGrid columns={[1, 2, 2, 2, 4]} spacing={2} mr={20}>
                
                {data.map((data, key) => (
                 
                  <Box
                    key={data.id}
                    maxW={["70%", "70%", "70%", "70%", "70%"]}
                   
                    height={"400px"}
                    borderRadius="lg"
                  
    
                    mt={4}
                    mb={20}
                  
                  >
                    <Box width={"270px"} height={"fit-content"} pt={10} pl={10}>
                      <Image
                        src={data.imageUrl}
                        alt={data.nom}
                        width={"190px"}
                        height={"150px"}
                        maxH={"519px"}
                        maxW={"208px"}
                      />
                    </Box>
    
                    <Box p="6">
                      <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h5"
                        lineHeight="tight"
                        noOfLines={3}
                        width={"270px"}
                        height={"50px"}
                        pb={20}
                     
                      >
                        <Text>{data.nom}</Text>
                        <Box textColor={"blue"} color={"blue.400"} h={5}>
                          {data.prix}
                          <Box as="span" pl={2} fontSize="sm">
                            €
                          </Box>
                        </Box>
                      </Box>
    
                      <Box
                        
                        fontWeight="normal"
                        lineHeight="taller"
                        noOfLines={8}
                        w={"250px"}
                        Height={"250px"}
                        maxH={"250px"}
                      >
                        <Text  mb={5}>{data.description}</Text>
                       
                      </Box>
                      <Box>
                      <Button
                              bgColor={"cyan.700"}
                              
                              borderRadius={"66px"}
                              width={"fit-content"}
                              as={"a"}
                             
                              onClick={() => {
                                AddToCart(data),
                                  toast({
                                    title: "PRODUIT AJOUTE",
    
                                    status: "success",
                                    duration: 9000,
                                    isClosable: true,
                                  });
                              }}
                              color={"white"}
                              _hover={{
                                backgroundColor: " cyan.900",
                                color: "white ",
                              }}
                              leftIcon={<IoMdAddCircle />}
                            >
                              {" "}
                              Commander
                            </Button>
                      </Box>
                      
                    </Box>
                  </Box>
                ))}
              </SimpleGrid>
            </Flex>
          </Box>
          
          
        </>
      );
  }
  
}
