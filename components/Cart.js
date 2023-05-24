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
  Switch,
  Checkbox,
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
  const [cart, setCart] = useState();
  const [lieu, setLieu] = useState(" ");
  const [numero, setNumero] = useState(" ");
  const [nom, setNom] = useState(" ");
  const [prix, setPrix] = useState();
  const toast = useToast();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState();
  const [day, setDay] = useState();
  const [hours, setHours] = useState();
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

    localStorage.setItem("prix", PrixT);
  }, []);

  if (cart != undefined && cart.length != 0) {
    //liste des fonctions en rapport avec le produit et la commande
    function saveCommande() {
      let email = localStorage.getItem("email");
      let Cart = JSON.parse(localStorage.getItem("Cart"));
      
      if (lieu != undefined && lieu != null && lieu.length > 3) {
        Cart.map((data, index) =>{
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
            lieu: lieu,
            receveur: nom,
            numero: numero,
            jour:day,
            moment:hours,
            date: new Date(),
          })
        }
        
         
        );
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
        {cart.map((data, index) => (
          <Center key={data.id}>
            <Flex
              bgColor={"#F7C29E"}
              width={{ base: "fit-content", lg: "621px", md: "621px" }}
              height={"205px"}
              border={"1px solid #e6e6e6"}
              boxShadow={"0px 2px 10px"}
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
                  mt={10}
                />
              </Box>
              <Box>
                <Text pb={5} pt={5} fontWeight={"bold"}>
                  {data.nom}
                </Text>
                {/* <Flex>
                  <Image src="./images/Star.svg" alt="robe" />
                  <Text as={"sup"} fontSize={12}>
                    (59)
                  </Text>
                </Flex> */}
                <Text pt={5}>{data.description}</Text>
                <Flex
                  borderColor={"#E37611"}
                  borderStyle={"solid"}
                  borderWidth={"0,5px"}
                  width={"full"}
                  borderRadius={"4px"}
                  justifyContent={"space-between"}
                  // justifyContent={'space-between'}
                >
                  <Flex>
                    <Button onClick={() => decrement(data, 1)}>-</Button>
                    <Input
                      type={"number"}
                      color={"#E37611"}
                      w={"70px"}
                      value={data.quantity}
                      borderColor={"#F7C29E"}
                    />
                    <Button onClick={() => increment(data, 1)}>+</Button>
                  </Flex>
                  <Flex mx={5}>
                    <Icon
                      as={FaTrashAlt}
                      fontSize={30}
                      onClick={() => DeleteProduct(data)}
                    />
                  </Flex>
                  <Box>
                    <Text color={"#E37611"}>{data.price}</Text>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Center>
        ))}
        <Center>
          <Flex width={"621px"} mb={"70px"} justifyContent={"space-between"}>
            <Heading>Total</Heading>
            <Text fontSize={30}>{prix} Euros</Text>
            <Button
              bgColor={"#08566E"}
              color={"white"}
              onClick={onOpen}
              borderRadius={50}
              width={100}
            >
              Valider
            </Button>
          </Flex>
        </Center>
        <FooterR />

        {/* Modal pour le paiement et le choix du lieu de livraison */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>CONFIRMATION DE LIVRAISON</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text marginBottom={5}> JOURS DE LIVRAISON</Text>
              <Box display={"flex"} marginBottom={20}>
                <RadioGroup  onChange={setDay} value={day}>
                  <Radio value="Mardi" mr={10}>
                    Mardi
                  </Radio>
                  <Radio value="Vendredi">Vendredi</Radio>
                </RadioGroup>
              </Box>
              <Text marginBottom={5}> Heure de Livraison</Text>
              <Box display={"flex"} marginBottom={20}>
                <RadioGroup onChange={setHours} value={hours}>
                  <Radio value="Matin" mr={10}>
                    Matin(de 09h30 ----- 12h)
                  </Radio>
                  <Radio value="Soir">Soir(de 14h30 ----- 19h30)</Radio>
                </RadioGroup>
              </Box>
              <Text marginBottom={5}> OPTIONS DE LIVRAISON</Text>
              <Stack marginBottom={5}>
                <RadioGroup>
                  <Accordion>
                    <AccordionItem>
                      <h2>
                        <AccordionButton  onClick={()=>{setLieu(localStorage.getItem('addresse')),setNumero(localStorage.getItem('number')),setNom(localStorage.getItem('name'))}}>
                          <Radio value="1"> UTILISER MON ADRESSE</Radio>
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4} backgroundColor={" #B2FFFF"}>
                        <Box m={5}>
                          <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={() => saveCommande()}
                          >
                            CONFIRMER
                          </Button>
                          <Button variant="ghost" onClick={onClose}>
                            FERMER
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
                          setLieu(localStorage.getItem('addresse')),setNumero(localStorage.getItem('number')),setNom(localStorage.getItem('name'))
                            <FormControl>
                              <FormLabel>Nom du Receveur</FormLabel>
                              <Input onChange={(e)=>setNom(e.target.value)}/>
                            </FormControl>
                            <FormControl>
                              <FormLabel>Numero du Receveur</FormLabel>
                              <Input type="number" onChange={(e)=>setNumero(e.target.value)}/>
                            </FormControl>
                            <FormControl>
                              <FormLabel>ville</FormLabel>
                              <Input onChange={(e)=>setVille(e.target.value)} />
                            </FormControl>
                          </Box>
                          <Box ml={3}>
                            <FormControl>
                              <FormLabel>Nom de la Rue</FormLabel>
                              <Input onChange={(e)=>setRue(e.target.value)} />
                            </FormControl>
                            <FormControl>
                              <FormLabel>Numero du batiment</FormLabel>
                              <Input type="number" onChange={(e)=>setBatiment(e.target.value)} />
                            </FormControl>
                            <FormControl>
                              <FormLabel>Code Postal</FormLabel>
                              <Input onChange={(e)=>setPostal(e.target.value)}/>
                            </FormControl>
                          </Box>
                        </Box>
                        <Box m={5}>
                          <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={() => saveCommande()}
                          >
                            CONFIRMER
                          </Button>
                          <Button variant="ghost" onClick={onClose}>
                            FERMER
                          </Button>
                        </Box>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </RadioGroup>
              </Stack>
            </ModalBody>
            {/* 
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={() => saveCommande()}>
                CONFIRMER
              </Button>
              <Button variant="ghost" onClick={onClose}>
                FERMER
              </Button>
            </ModalFooter> */}
          </ModalContent>
        </Modal>
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
