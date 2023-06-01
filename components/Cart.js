import {
  Box,
  Center,
  Flex,
  Text,
  Image,
  Button,
  Input,
  Heading,
  Icon,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  InputGroup,
  FormControl,
  FormLabel,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Radio,
  RadioGroup,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Code,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import FooterR from "./footerResponsif";
import { useRouter } from "next/router";
import { FaTrashAlt } from "react-icons/fa";
import { ref, set, push } from "@firebase/database";
import { db2 } from "@/FIREBASE/clientApp";

export default function Carte() {

//braintree


// state = {
//         clientToken: null,
//         purchaseComplete: false  
// };
// const buy = async() => {
//   const Cart = localStorage.prix
//   const user = localStorage.user
 
//   // Send the nonce to your server
//   const { nonce } = await requestPaymentMethod();
//   const res = await fetch('/api/payment/checkout',
//       {
//         body: JSON.stringify({
//           paymentMethodNonce: nonce,
//           user_id: user,
//           price: Cart
//         }),
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         method: 'POST'
//       }
//     )
//   const result = await res.json()
//   if (result.result == "success") {
//       this.setState({
//           purchaseComplete: true
//       });
//       alert("votre achat de "+ Cart+ " a ete completer")
//       localStorage.removeItem('Cart')

      

//   }
// }
  










  const [cart, setCart] = useState();
  const [lieu, setLieu] = useState(" NON DEFINI");
  const [numero, setNumero] = useState("NON DEFINI ");
  const [nom, setNom] = useState(" NON DEFINI");
  const [prix, setPrix] = useState();
  const toast = useToast();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState();
  const [ville,setVille] = useState('non renseigner');
  const [rue,setRue] = useState('NON DEFINI');
  const [postal,setPostal] = useState('NON DEFINI');
  const [day, setDay] = useState('Mardi');
  const [hours, setHours] = useState();
  const [batiment, setBatiment] = useState('NON DEFINI');
  const [frais, setFrais] = useState();
  useEffect(() => {
    let PrixT = 0;
    const Cart = localStorage.getItem("Cart");
    const All = JSON.parse(Cart);

    setCart(JSON.parse(Cart));
    if (All != null) {
      All.map((data, index) => {
        PrixT = parseInt(data.price) + PrixT;
      });
      setPrix(PrixT);
    }
    if (PrixT < 40) {
      console.log(40 < prix < 60);
      setFrais((PrixT * 10) / 100);
    } else {
      if (PrixT < 51) {
        setFrais((PrixT * 9) / 100);
      } else {
        if (PrixT < 71) {
          setFrais((PrixT * 8) / 100);
        } else {
          if (PrixT < 81) {
            setFrais((PrixT * 7) / 100);
          } else {
            if (PrixT < 91) {
              setFrais((PrixT * 6) / 100);
            } else {
              if (90 < PrixT) {
                setFrais((PrixT * 5) / 100);
              } else {
                setFrais("SOMME INSUFFISANT POUR UNE LIVRAISON");
              }
            }
          }
        }
      }
    }
    localStorage.setItem("prix", PrixT);
  }, []);

  if (cart != undefined && cart.length != 0) {
    //liste des fonctions en rapport avec le produit et la commande
    function saveCommande() {
      let email = localStorage.getItem("email");
      let Cart = JSON.parse(localStorage.getItem("Cart"));

      if (lieu != undefined && lieu != null && lieu.length > 3 || ville != undefined && ville != null && ville.length > 3) {
        Cart.map((data, index) => {
          push(ref(db2, "Commandes"), {
            productID: data.id,
            nom: data.nom,
            description: data.description,
            quantity: data.quantity,
            imageUrl: data.imageUrl,
            organisation: data.organisation,
            totalPrice: data.price,
            initiateur: email,
            Status: "En Cours",
            ville:ville,
            rue:rue,
            code_postal:postal,
            batiment:batiment,
            lieu: lieu,
            receveur: nom,
            numero: numero,
            jour: day,
            moment: hours,
            date: new Date(),
          });
        });
        localStorage.removeItem("Cart");
        setLieu("");
        setNom("");
        setNumero("");
        router.reload();
      } else {
        toast({
          title: "PLS, veuillez renseigner les champs",
          // description: "We've created your account for you.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
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
    function DeleteProduct(Product) {
      let Cart = getCart();
      let foundit = Cart.filter((p) => p.id != Product.id);
      saveCart(foundit);
      router.reload();
    }
    const decrement = (Product, quantity) => {
      let Cart = getCart();
      let foundit = Cart.find((p) => p.id == Product.id);
      foundit.price =
        parseInt(foundit.price) -
        parseInt(foundit.price) / parseInt(foundit.quantity);
      foundit.quantity -= quantity;
      saveCart(Cart);
      router.reload();
    };
    const increment = (Product, quantity) => {
      let Cart = getCart();
      let foundit = Cart.find((p) => p.id == Product.id);
      foundit.price =
        parseInt(foundit.price) / parseInt(foundit.quantity) +
        parseInt(foundit.price);
      foundit.quantity += quantity;
      saveCart(Cart);
      router.reload();
    };

    return (
      <>
        <Box display={"flex"} justifyContent={"space-around"}>
          <Box>
            {cart.map((data, index) => (
              <Center key={data.id}>
                <Flex
                  bgColor={"#fbfbfbfc"}
                  width={{ base: "fit-content", lg: "800px", md: "800px" }}
                  height={""}
                  border={"1px solid #e6e6e6"}
                  // boxShadow={"0px 2px 10px"}
                  boxSizing={"border-box"}
                  borderRadius={"9px"}
                  // pb={10}
                  mb={20}
                >
                  <Box pr={5}>
                    <Image
                      src={data.imageUrl}
                      alt={data.name}
                      width={"117px"}
                      height={"139px"}
                      ml={15}
                      my={3}
                    />
                  </Box>
                  <Box display={"flex"} mt={10}>
                    <Text pb={5} pt={5} fontWeight={"bold"} mt={2} mr={10}>
                      {data.nom}
                    </Text>
                    {/* <Flex>
                  <Image src="./images/Star.svg" alt="robe" />
                  <Text as={"sup"} fontSize={12}>
                    (59)
                  </Text>
                </Flex> */}
                    {/* <Text pt={5}>{data.description}</Text> */}
                    <Flex
                      borderColor={"#E37611"}
                      borderStyle={"solid"}
                      borderWidth={"0,5px"}
                      width={"3/4"}
                      borderRadius={"4px"}
                      justifyContent={"space-between"}
                      mt={5}
                      // justifyContent={'space-between'}
                    >
                      <Flex mr={20}>
                        <Button onClick={() => decrement(data, 1)}>-</Button>
                        <Input
                          type={"number"}
                          w={"70px"}
                          value={data.quantity}
                        />
                        <Button onClick={() => increment(data, 1)}>+</Button>
                      </Flex>
                      <Box mr={20}>
                        <Text mt={1} color={"#E37611"} fontSize={20}>
                          €{data.price}
                        </Text>
                      </Box>
                      <Flex mx={2} mt={2}>
                        <Icon
                          color={"#DE2916"}
                          as={FaTrashAlt}
                          fontSize={30}
                          onClick={() => DeleteProduct(data)}
                        />
                      </Flex>
                    </Flex>
                  </Box>
                </Flex>
              </Center>
            ))}
          </Box>
          <Flex
            border={"1px solid #e6e6e6"}
            boxShadow={"0px 2px 10px"}
            boxSizing={"border-box"}
            borderRadius={"9px"}
            width={"fit-content"}
            bgColor={"#E3F4F4"}
            h={"fit-content"}
            pb={5}
            mt={0}
            justifyContent={"space-between"}
          >
            <Box mx={5}>
              <Heading m={2}>FORMULAIRE DE LIVRAISON</Heading>

              <Text marginBottom={5} fontWeight={"semibold"}>
                {" "}
                JOURS DE LIVRAISON
              </Text>
              <Box display={"flex"} marginBottom={2}>
               
                <Tabs>
                  <TabList>
                    <Tab onClick={() => setDay("Mardi")}>Mardi</Tab>
                    <Tab onClick={() => setDay("Vendredi")}>Vendredi</Tab>
                    <Tab onClick={() => setDay("Samedi")}>Samedi</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <Text marginBottom={5} fontWeight={"semibold"}>
                        {" "}
                        HEURE DE LIVRAISON
                      </Text>
                      <Box display={"flex"} marginBottom={5}>
                        <RadioGroup onChange={setHours} value={hours}>
                        
                          <Radio value="Soir(13h-16h)">
                            Apres-Midi(de 13h ----- 16h)
                          </Radio>
                          <br />
                          <Radio value="Soir(16h-20h)">
                            Soir(de 16h ----- 20h)
                          </Radio>
                          <br />
                          <Radio value="Soir(20h-00h)">
                            Nuit(de 20h ----- 00h)
                          </Radio>
                        </RadioGroup>
                      </Box>
                    </TabPanel>
                    <TabPanel>
                    <Text marginBottom={5} fontWeight={"semibold"}>
                        {" "}
                        HEURE DE LIVRAISON
                      </Text>
                      <Box display={"flex"} marginBottom={5}>
                        <RadioGroup onChange={setHours} value={hours}>
                         
                          <Radio value="Soir(13h-16h)">
                            Apres-Midi(de 13h ----- 16h)
                          </Radio>
                          <br />
                          <Radio value="Soir(16h-20h)">
                            Soir(de 16h ----- 20h)
                          </Radio>
                          <br />
                          <Radio value="Soir(20h-00h)">
                            Nuit(de 20h ----- 00h)
                          </Radio>
                        </RadioGroup>
                      </Box>
                    </TabPanel>
                    <TabPanel>
                    <Text marginBottom={5} fontWeight={"semibold"}>
                        {" "}
                        HEURE DE LIVRAISON
                      </Text>
                      <Box display={"flex"} marginBottom={5}>
                        <RadioGroup onChange={setHours} value={hours}>
                          <Radio value="Matin" mr={10}>
                            Matin(de 09h30 ----- 12h)
                          </Radio><br/>
                          <Radio value="Soir(13h-16h)">
                            Apres-Midi(de 13h ----- 16h)
                          </Radio>
                          <br />
                          <Radio value="Soir(16h-20h)">
                            Soir(de 16h ----- 20h)
                          </Radio>
                          <br />
                          <Radio value="Soir(20h-00h)">
                            Nuit(de 20h ----- 00h)
                          </Radio>
                        </RadioGroup>
                      </Box>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>

              <Text marginBottom={5} fontWeight={'semibold'}> OPTIONS DE LIVRAISON</Text>
              <Stack marginBottom={5}>
                <RadioGroup>
                  <Accordion>
                    <AccordionItem>
                      <h2>
                        <AccordionButton
                          onClick={() => {
                            setLieu(localStorage.getItem("addresse")),
                              setNumero(localStorage.getItem("number")),
                              setNom(localStorage.getItem("name"));
                          }}
                        >
                          <Radio value="1"> UTILISER MON ADRESSE</Radio>
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4} >
                        <Box m={5}>
                          <Button
                            bgColor="#E57C23"
                            color={'white'}
                            _hover={{
                              bgColor:'#db6d0fad'
                            }}
                            mr={3}
                            onClick={() => saveCommande()}
                          >
                            CONFIRMER
                          </Button>
                         
                        </Box>
                      </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Radio value="2"> UTILISER UNE AUTRE ADRESSE</Radio>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>

                      <AccordionPanel pb={4} backgroundColor={"#f"}>
                        <Box display={"flex"}>
                          <Box>
                            <FormControl>
                              <FormLabel>Nom du Receveur</FormLabel>
                              <Input onChange={(e) => setNom(e.target.value)} />
                            </FormControl>
                            <FormControl>
                              <FormLabel>Numero du Receveur</FormLabel>
                              <Input
                                type="number"
                                onChange={(e) => setNumero(e.target.value)}
                              />
                            </FormControl>
                            <FormControl>
                              <FormLabel>ville</FormLabel>
                              <Input
                                onChange={(e) => setVille(e.target.value)}
                              />
                            </FormControl>
                          </Box>
                          <Box ml={3}>
                            <FormControl>
                              <FormLabel>Nom de la Rue</FormLabel>
                              <Input onChange={(e) => setRue(e.target.value)} />
                            </FormControl>
                            <FormControl>
                              <FormLabel>Numero du batiment</FormLabel>
                              <Input
                                type="number"
                                onChange={(e) => setBatiment(e.target.value)}
                              />
                            </FormControl>
                            <FormControl>
                              <FormLabel>Code Postal</FormLabel>
                              <Input
                                onChange={(e) => setPostal(e.target.value)}
                              />
                            </FormControl>
                          </Box>
                        </Box>
                        <Box m={5}>
                          <Button
                             bgColor="#E57C23"
                             color={'white'}
                             _hover={{
                               bgColor:'#db6d0fad'
                             }}
                            mr={3}
                            onClick={() => saveCommande()}
                          >
                            CONFIRMER
                          </Button>
                         
                        </Box>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </RadioGroup>
              </Stack>
              <Box>
                <Text fontSize={20} fontWeight={"bold"}>
                  PRIX DE LA COMMANDE
                </Text>
                <Text fontWeight={"bold"} mx={"40%"} mb={10} mt={5}>
                
                  {prix} €
                </Text>
                <Text fontSize={20} fontWeight={"bold"}>
                  PRIX DE LA LIVRAISON
                </Text>
                <Text fontWeight={"bold"} mx={"40%"} mb={10} mt={5}>
                  {frais} €
                </Text>
                <Text fontSize={20} w={'full'} borderTop={'1px solid black'} fontWeight={"bold"} mb={5}>
                  TOTAL : {prix + frais} €
                </Text>
              </Box>

            
            </Box>
          </Flex>
        </Box>

        <FooterR />

       
      </>
    );
  } else {
    return (
      <>
        <Center>
          <Flex
            bgColor={"#F7C29E"}
            width={"621px"}
            height={"205px"}
            border={"1px solid #e6e6e6"}
            boxShadow={"0px 2px 10px"}
            boxSizing={"border-box"}
            borderRadius={"9px"}
            fontSize={30}
            justifyContent={"center"}
            // pb={10}
            mb={20}
          >
            <Text mt={20}>VOTRE PANIER EST VIDE</Text>
          </Flex>
        </Center>
      </>
    );
  }
}
