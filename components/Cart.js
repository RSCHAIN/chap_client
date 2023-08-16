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
  SimpleGrid,
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
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

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
  const [dele, setDele] = useState();
  // const [conf1, setConf1] = useState();
  const [conf2, setConf2] = useState();
  const [conf3, setConf3] = useState();
  const [conf4, setConf4] = useState();
  const [conf5, setConf5] = useState("none");
  const [conf7, setConf7] = useState("none");
  const [conf9, setConf9] = useState("none");
  const [conf8, setConf8] = useState("grid");
  const [conf6, setConf6] = useState("none");
  const [cart, setCart] = useState();
  const [lieu, setLieu] = useState(" NON DEFINI");
  const [numero, setNumero] = useState("NON DEFINI ");
  const [nom, setNom] = useState(" NON DEFINI");
  const [prix, setPrix] = useState();
  const toast = useToast();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState();
  const [ville, setVille] = useState("non renseigner");
  const [rue, setRue] = useState("NON DEFINI");
  const [postal, setPostal] = useState("NON DEFINI");
  const [day, setDay] = useState("Mardi");
  const [hours, setHours] = useState();
  const [batiment, setBatiment] = useState("NON DEFINI");
  const [frais, setFrais] = useState();
  const [dis, setDis] = useState();
  useEffect(() => {
    let PrixT = 0;
    const Cart = localStorage.getItem("Cart");
    const All = JSON.parse(Cart);

    setCart(JSON.parse(Cart));
    if (All != null) {
      All.map((data, index) => {
        PrixT = parseFloat(data.prix) + PrixT;
      });
      setPrix(PrixT);
    }
    if (PrixT < 30) {
      setDis("none");
    } else {
      setDis("grid");
      if (PrixT < 40 && PrixT > 29) {
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
                }
              }
            }
          }
        }
      }
    }

    localStorage.setItem("prix", PrixT);
  }, [prix]);

  if (cart != undefined && cart.length != 0) {
    //liste des fonctions en rapport avec le produit et la commande
    function saveCommande() {
      let email = sessionStorage.getItem("email");
      let Cart = JSON.parse(localStorage.getItem("Cart"));

      if (
        (lieu != undefined && lieu != null && lieu.length > 3) &&
        (ville != undefined && ville != null && ville.length > 3)&&
        ( hours!=undefined && hours != null)
      ) {
        Cart.map(async (data, index) => {
          push(ref(db2, "Commandes"), {
            productID: data.id,
            payment:"paypal",
            nom: data.nom,
            description: data.description,
            quantite: data.quantite,
            imageUrl: data.imageUrl,
            organisation: data.organisation,
            totalPrix: data.prix,
            initiateur: email,
            Status: "En Cours",
            ville: ville,
            rue: rue,
            code_postal: postal,
            batiment: batiment,
            lieu: lieu,
            receveur: nom,
            numero: numero,
            jour: day,
            moment: hours,
            date: new Date(),
          });
          await axios.post('/api/sendmail', {
            message:data.description ,
            email: email.toString(),
            subject: `Achat de ${data.nom}`,
            image:data.imageUrl,
            price:data.prix,
            quantity:data.quantite,
          }).then((response)=>{alert("okay")})
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

    function saveCommande2() {
      let email = sessionStorage.getItem("email");
      let Cart = JSON.parse(localStorage.getItem("Cart"));
      let adress = localStorage.addresse;
      let nom2 = localStorage.name;
      let numero = localStorage.number;
      let date = new Date();
      if (email != undefined && email != null && email.length > 3 &&  hours!=undefined && hours != null) {
        Cart.map(async (data, index) => {
          push(ref(db2, "Commandes"), {
            productID: data.id,
            nom: data.nom,
            description: data.description,
            quantite: data.quantite,
            imageUrl: data.imageUrl,
            organisation: data.organisation,
            totalPrix: data.prix,
            initiateur: email,
            Status: "En Cours",
            ville: adress,
            rue: adress,
            code_postal: adress,
            batiment: adress,
            lieu: adress,
            receveur: nom2,
            numero: numero,
            jour: day,
            moment: hours,
            date,
          });
          await axios.post('/api/sendmail', {
            message:data.description ,
            email: email.toString(),
            subject: `Achat de ${data.nom}`,
            image:data.imageUrl,
            price:data.prix,
            quantity:data.quantite,
          }).then((response)=>{alert("okay")})
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

    function saveCommande3() {
      let email = sessionStorage.getItem("email");
      let Cart = JSON.parse(localStorage.getItem("Cart"));

      if (
        (lieu != undefined && lieu != null && lieu.length > 3) &&
        (ville != undefined && ville != null && ville.length > 3)&&
        ( hours!=undefined && hours != null)
      ) {
        Cart.map(async (data, index) => {
          push(ref(db2, "Commandes"), {
            productID: data.id,
            payment:"En Especes",
            nom: data.nom,
            description: data.description,
            quantite: data.quantite,
            imageUrl: data.imageUrl,
            organisation: data.organisation,
            totalPrix: data.prix,
            initiateur: email,
            Status: "En Cours",
            ville: ville,
            rue: rue,
            code_postal: postal,
            batiment: batiment,
            lieu: lieu,
            receveur: nom,
            numero: numero,
            jour: day,
            moment: hours,
            date: new Date(),
          });
          await axios.post('/api/sendmail', {
            message:data.description ,
            email: email.toString(),
            subject: `Achat de ${data.nom}`,
            image:data.imageUrl,
            price:data.prix,
            quantity:data.quantite,
          }).then((response)=>{alert("okay")})
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
    const decrement = (Product, quantite) => {
      let Cart = getCart();
      let foundit = Cart.find((p) => p.id == Product.id);
      if (foundit.quantite <= 1) {
        DeleteProduct(foundit);
        console.log("inferieur a 1");
      } else {
        foundit.prix =
          parseInt(foundit.prix) -
          parseInt(foundit.prix) / parseInt(foundit.quantite);
        foundit.quantite -= quantite;
        saveCart(Cart);
        router.reload();
      }
    };
    const increment = (Product, quantite) => {
      let Cart = getCart();
      let foundit = Cart.find((p) => p.id == Product.id);
      foundit.prix =
        parseInt(foundit.prix) / parseInt(foundit.quantite) +
        parseInt(foundit.prix);
      foundit.quantite += quantite;
      saveCart(Cart);
      router.reload();
    };

    return (
      <>
        <SimpleGrid
          columns={[1, 1, 1, 2, 2]}
          spacing={10}
          justifyContent={"space-around"}
        >
          <Box>
            {cart.map((data, index) => (
              <Center key={data.id}>
                <SimpleGrid
                  columns={[2, 2, 2, 4, 4]}
                  // spacing={10}
                  backgroundColor={"#fbfbfbfc"}
                  width={{ base: "100%", lg: "800px", md: "fit-content" }}
                  height={""}
                  border={"1px solid #e6e6e6"}
                  // boxShadow={"0px 2px 10px"}
                  boxSizing={"border-box"}
                  borderRadius={"9px"}
                  // pb={10}
                  marginBottom={20}
                >
                  <Box>
                    <Image
                      src={data.imageUrl}
                      alt={data.name}
                      width={"117px"}
                      height={"100px"}
                      marginLeft={5}
                      marginY={3}
                    />
                  </Box>

                  <Text
                    paddingBottom={5}
                    pt={5}
                    fontWeight={"bold"}
                    marginTop={7}
                  >
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
                    borderRadius={"4px"}
                    justifyContent={"space-between"}
                    marginTop={10}
                    mb={[10, 10, 10, 0, 0]}
                    ml={[10, 10, 10, 0, 0]}
                    // justifyContent={'space-between'}
                  >
                    <Flex>
                      <Button onClick={() => decrement(data, 1)}>-</Button>
                      <Input
                        type={"number"}
                        width={"70px"}
                        
                        value={data.quantite}
                      />
                      <Button mr={4} onClick={() => increment(data, 1)}>+</Button>
                    </Flex>
                    <Box mr={20}>
                      <Text marginTop={1} color={"red.500"} fontSize={20}>
                        €{data.prix}
                      </Text>
                    </Box>
                    <Flex marginX={2} marginTop={2}>
                      <Icon
                        color={"red.500"}
                        as={FaTrashAlt}
                        fontSize={30}
                        onClick={() => DeleteProduct(data)}
                      />
                    </Flex>
                  </Flex>
                </SimpleGrid>
              </Center>
            ))}
          </Box>
          <Flex
            border={"1px solid #e6e6e6"}
            // boxShadow={"0px 2px 10px"}
            boxSizing={"border-box"}
            borderRadius={"9px"}
            width={"fit-content"}
            backgroundColor={"#fff"}
            height={"fit-content"}
            paddingBottom={5}
            marginBottom={[5, 5, 5, 0, 0]}
            marginTop={0}
            justifyContent={"space-between"}
          >
            <Box marginX={5}>
              <Heading margin={2} fontSize={"20px"} fontWeight={700}>
                Validation de la commande
              </Heading>
              <RadioGroup>
                <Accordion>
                  <AccordionItem display={dis}>
                    <h2>
                      <AccordionButton
                        onClick={() => {
                          setLieu(localStorage.getItem("addresse")),
                            setNumero(localStorage.getItem("number")),
                            setNom(localStorage.getItem("name"));
                        }}
                      >
                        <Radio value="4"> Livraison a domicile</Radio>
                      </AccordionButton>
                    </h2>
                    <AccordionPanel paddingBottom={4}>
                      <Box margin={2}>
                        <Text marginBottom={5} fontWeight={"semibold"}>
                          {" "}
                          Jours de Livraison
                        </Text>
                        <Box display={"flex"} marginBottom={2}>
                          <Tabs>
                            <TabList>
                              <Tab onClick={() => setDay("Mardi")}>Mardi</Tab>
                              <Tab onClick={() => setDay("Vendredi")}>
                                Vendredi
                              </Tab>
                              <Tab onClick={() => setDay("Samedi")}>Samedi</Tab>
                            </TabList>

                            <TabPanels>
                              <TabPanel>
                                <Text marginBottom={5} fontWeight={"semibold"}>
                                  {" "}
                                  Periode de livraison
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
                                  Periode de livraison
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
                                  Periode de livraison
                                </Text>
                                <Box display={"flex"} marginBottom={5}>
                                  <RadioGroup onChange={setHours} value={hours}>
                                    <Radio value="Matin">
                                      Matin(de 09h30 ----- 12h)
                                    </Radio>
                                    <br />
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

                        <Text marginBottom={5} fontWeight={"semibold"}>
                          {" "}
                          Lieu de livraison
                        </Text>
                        <Stack marginBottom={5}>
                          <RadioGroup>
                            <Accordion>
                              <AccordionItem>
                                <h2>
                                  <AccordionButton
                                  display={conf3}
                                    onClick={() => {
                                      setLieu(localStorage.getItem("addresse")),
                                        setNumero(
                                          localStorage.getItem("number")
                                        ),
                                        setNom(localStorage.getItem("name"));
                                    }}
                                  >
                                    <Radio value="1">
                                      {" "}
                                      Utiliser mon adresse
                                    </Radio>
                                  </AccordionButton>
                                </h2>
                                <RadioGroup>
                                <AccordionPanel paddingBottom={4}>
                                  <Box margin={2}>
                                    <Box onClick={()=>{setConf7("none"),setDele(false)}} width={"100%"}>
                                    <Radio value='1' onClick={()=>{setConf7("none"),setDele(false)}}>Paypal</Radio>
                                    </Box>
                                    <PayPalButtons
                                    
                                      disabled={dele}
                                      createOrder={(data, actions) => {
                                        return actions.order.create({
                                          purchase_units: [
                                            {
                                              amount: {
                                                value: `${prix + frais}`,
                                              },
                                            },
                                          ],
                                        });
                                      }}
                                      onApprove={(data, actions) => {
                                        return actions.order
                                          .capture()
                                          .then((details) => {
                                            const name =
                                              details.payer.name.given_name;
                                            setDele(true);
                                            setDis("grid");
                                            setConf2("none");
                                            setConf3("grid");
                                            setConf4("none");
                                            setConf5("grid");
                                            setConf6("grid");
                                            setConf8("none")

                                            alert(
                                              `Transaction Validée par ${name} \n veuillez CONFIRMER svp `
                                            );
                                          });
                                      }}
                                    />
                                    <Button
                                    display={conf6}
                                      bgColor="cyan.700"
                                      color={"white"}
                                      // _hover={{
                                      //   backgroundColor: "#db6d0fad",
                                      // }}

                                      marginRight={3}
                                      onClick={() => saveCommande()}
                                    >
                                      Confirmer
                                    </Button>
                                  </Box>
                                </AccordionPanel>
                                <AccordionPanel paddingBottom={4}>
                                  <Box margin={2}>
                                    <Flex width={"100%"}  onClick={()=>{setConf7("Grid"),setDele(true)}}>
                                    <Radio display={conf8} value='2' onClick={()=>{setConf7("Grid"),setDele(true)}} mb={5}>Especes</Radio>
                                    </Flex>
                                    <Button
                                      display={conf7}
                                      bgColor="cyan.700"
                                      color={"white"}
                                      marginRight={3}
                                      onClick={() => saveCommande3()}
                                    >
                                      Confirmer
                                    </Button>
                                  </Box>
                                </AccordionPanel>
                                </RadioGroup>
                              </AccordionItem>

                              <AccordionItem>
                                <h2>
                                  <AccordionButton display={conf4}>
                                    <Radio value="2">
                                      {" "}
                                     Utiliser une autre adresse
                                    </Radio>
                                    <AccordionIcon />
                                  </AccordionButton>
                                </h2>

                                <AccordionPanel
                                
                                  paddingBottom={4}
                                  backgroundColor={"#f"}
                                >
                                  <Box display={"none"}>
                                    <Box>
                                      <FormControl>
                                        <FormLabel>Nom du Receveur</FormLabel>
                                        <Input
                                          onChange={(e) =>
                                            setNom(e.target.value)
                                          }
                                        />
                                      </FormControl>
                                      <FormControl>
                                        <FormLabel>
                                          Numero du Receveur
                                        </FormLabel>
                                        <Input
                                          type="number"
                                          onChange={(e) =>
                                            setNumero(e.target.value)
                                          }
                                        />
                                      </FormControl>
                                      <FormControl>
                                        <FormLabel>Ville</FormLabel>
                                        <Input
                                          onChange={(e) =>
                                            setVille(e.target.value)
                                          }
                                        />
                                      </FormControl>
                                    </Box>
                                    <Box marginLeft={3}>
                                      <FormControl>
                                        <FormLabel>Nom de la Rue</FormLabel>
                                        <Input
                                          onChange={(e) =>
                                            setRue(e.target.value)
                                          }
                                        />
                                      </FormControl>
                                      <FormControl>
                                        <FormLabel>
                                          Numero du batiment
                                        </FormLabel>
                                        <Input
                                          type="number"
                                          onChange={(e) =>
                                            setBatiment(e.target.value)
                                          }
                                        />
                                      </FormControl>
                                      <FormControl>
                                        <FormLabel>Code Postal</FormLabel>
                                        <Input
                                          onChange={(e) =>
                                            setPostal(e.target.value)
                                          }
                                        />
                                      </FormControl>
                                    </Box>
                                  </Box>
                                  <Box margin={2}>
                                  <PayPalButtons
                                      disabled={dele}
                                      createOrder={(data, actions) => {
                                        return actions.order.create({
                                          purchase_units: [
                                            {
                                              amount: {
                                                value: `${prix + frais}`,
                                              },
                                            },
                                          ],
                                        });
                                      }}
                                      onApprove={(data, actions) => {
                                        return actions.order
                                          .capture()
                                          .then((details) => {
                                            const name =
                                              details.payer.name.given_name;
                                            setDele(true);
                                            setDis("grid");
                                            setConf2("none");
                                            setConf3("grid");
                                            setConf4("grid");
                                            setConf5("grid");
                                            setConf6("grid");
                                            alert(
                                              `Transaction Validée par ${name} \n veuillez CONFIRMER svp `
                                            );
                                          });
                                      }}
                                    />
                                    <Button
                                    display={conf6}
                                      backgroundColor="cyan.700"
                                      color={"white"}
                                      marginRight={3}
                                      onClick={() => saveCommande()}
                                    >
                                      Confirmer
                                    </Button>
                                  </Box>
                                </AccordionPanel>
                                <AccordionPanel
                                
                                paddingBottom={4}
                                backgroundColor={"#f"}
                              >
                                <Box display={conf9}>
                                  <Box>
                                    <FormControl>
                                      <FormLabel>Nom du Receveur</FormLabel>
                                      <Input
                                        onChange={(e) =>
                                          setNom(e.target.value)
                                        }
                                      />
                                    </FormControl>
                                    <FormControl>
                                      <FormLabel>
                                        Numero du Receveur
                                      </FormLabel>
                                      <Input
                                        type="number"
                                        onChange={(e) =>
                                          setNumero(e.target.value)
                                        }
                                      />
                                    </FormControl>
                                    <FormControl>
                                      <FormLabel>Ville</FormLabel>
                                      <Input
                                        onChange={(e) =>
                                          setVille(e.target.value)
                                        }
                                      />
                                    </FormControl>
                                  </Box>
                                  <Box marginLeft={3}>
                                    <FormControl>
                                      <FormLabel>Nom de la Rue</FormLabel>
                                      <Input
                                        onChange={(e) =>
                                          setRue(e.target.value)
                                        }
                                      />
                                    </FormControl>
                                    <FormControl>
                                      <FormLabel>
                                        Numero du batiment
                                      </FormLabel>
                                      <Input
                                        type="number"
                                        onChange={(e) =>
                                          setBatiment(e.target.value)
                                        }
                                      />
                                    </FormControl>
                                    <FormControl>
                                      <FormLabel>Code Postal</FormLabel>
                                      <Input
                                        onChange={(e) =>
                                          setPostal(e.target.value)
                                        }
                                      />
                                    </FormControl>
                                  </Box>
                                </Box>
                                <Box margin={2}>
                               
                                  <Button
                                  display={conf9}
                                    backgroundColor="cyan.700"
                                    color={"white"}
                                    marginRight={3}
                                    onClick={() => saveCommande4()}
                                  >
                                    Confirmer
                                  </Button>
                                </Box>
                              </AccordionPanel>
                              </AccordionItem>
                            </Accordion>
                          </RadioGroup>
                        </Stack>
                        <Box>
                          <Text fontWeight={"bold"}fontSize={"19px"} > Récapitulatif de commande</Text>
                         
                         <Flex justifyContent={"space-between"} mb={2}>
                          <Text>Articles :</Text>
                          <Text>
                          {prix} €
                          </Text>
                         </Flex>
                         <Flex justifyContent={"space-between"}  mb={2} borderBottom={"1px solid grey"}>
                          <Text>Livraison :</Text>
                          <Text>
                          {frais} €
                          </Text>
                         </Flex>
                         <Flex justifyContent={"space-between"}>
                          <Text  fontSize={20}
                          
                           color={"red.600"}
                            fontWeight={"bold"}
                            marginBottom={5}>Total :</Text>
                          <Text  fontSize={20}
                           
                           color={"red.600"}
                            fontWeight={"bold"}
                            marginBottom={5}>
                          {prix + frais} €
                          </Text>
                         </Flex>
                         
                         

                        </Box>
                      </Box>
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <h2>
                      <AccordionButton display={conf2}>
                        <Radio value="3"> En magasin</Radio>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>

                    <AccordionPanel pb={4} backgroundColor={"#f"}>
                      <Box margin={2}>
                        <Text marginBottom={5} fontWeight={"semibold"}>
                          {" "}
                          Jours de recuperation
                        </Text>
                        <Box display={"flex"} marginBottom={2}>
                          <Tabs>
                            <TabList>
                              <Tab onClick={() => setDay("Mardi")}>Mardi</Tab>
                              <Tab onClick={() => setDay("Vendredi")}>
                                Vendredi
                              </Tab>
                              <Tab onClick={() => setDay("Samedi")}>Samedi</Tab>
                            </TabList>

                            <TabPanels>
                              <TabPanel>
                                <Text marginBottom={5} fontWeight={"semibold"}>
                                  {" "}
                                  Disponibilité
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
                                 Disponibilité
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
                                  Disponibilité
                                </Text>
                                <Box display={"flex"} marginBottom={5}>
                                  <RadioGroup onChange={setHours} value={hours}>
                                    <Radio value="Matin">
                                      Matin(de 09h30 ----- 12h)
                                    </Radio>
                                    <br />
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
                        <Box>
                          <Text fontWeight={"bold"}fontSize={"19px"} > Récapitulatif de commande</Text>
                         
                         <Flex justifyContent={"space-between"} my={2} borderBottom={"1px solid grey"}>
                          <Text>Articles :</Text>
                          <Text>
                          {prix} €
                          </Text>
                         </Flex>
                         
                         <Flex justifyContent={"space-between"}>
                          <Text  fontSize={20}
                          
                           color={"red.600"}
                            fontWeight={"bold"}
                            marginBottom={5}>Total :</Text>
                          <Text  fontSize={20}
                           
                           color={"red.600"}
                            fontWeight={"bold"}
                            marginBottom={5}>
                          {prix} €
                          </Text>
                         </Flex>
                         
                         

                        </Box>
                      </Box>
                      <Box m={5}>
                      <PayPalButtons
                                      disabled={dele}
                                      createOrder={(data, actions) => {
                                        return actions.order.create({
                                          purchase_units: [
                                            {
                                              amount: {
                                                value: `${prix}`,
                                              },
                                            },
                                          ],
                                        });
                                      }}
                                      onApprove={(data, actions) => {
                                        return actions.order
                                          .capture()
                                          .then((details) => {
                                            const name =
                                              details.payer.name.given_name;
                                            setDele(true);
                                            setDis("none");
                                            setConf2("none");
                                            setConf3("none");
                                            setConf4("none");
                                            setConf5("none");
                                            setConf6("grid");

                                            alert(
                                              `Transaction Validée par ${name} \n veuillez CONFIRMER svp `
                                            );
                                          });
                                      }}
                                    />
                        <Button
                        display={conf6}
                          bgColor="cyan.700"
                          color={"white"}
                          // _hover={{
                          //   bgColor: "#db6d0fad",
                          // }}
                          mr={3}
                          onClick={() => saveCommande2()}
                        >
                          CONFIRMER
                        </Button>
                      </Box>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </RadioGroup>
            </Box>
          </Flex>
        </SimpleGrid>

        <FooterR />
      </>
    );
  } else {
    return (
      <>
        <Center>
          <Flex
            bgColor={"#fff"}
            width={"621px"}
            height={"205px"}
            border={"1px solid #e6e6e6"}
            boxShadow={"0px 2px 10px"}
            boxSizing={"border-box"}
            borderRadius={"9px"}
            fontSize={30}
            justifyContent={"center"}
            // pb={10}
            marginBottom={20}
          >
            <Text marginTop={20}>VOTRE PANIER EST VIDE</Text>
          </Flex>
        </Center>
      </>
    );
  }
}
