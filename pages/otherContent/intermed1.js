import { db2 } from "@/FIREBASE/clientApp";
import InputBar from "@/components/InputBar";
import Navbar from "@/components/Navbar";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  Box,
  Button,
  Collapse,
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
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { onValue, push, ref } from "@firebase/database";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import {
  BsFillTelephoneOutboundFill,
  BsTelephoneOutboundFill,
} from "react-icons/bs";
import { IoMdAddCircle, IoMdAddCircleOutline } from "react-icons/io";
import Slider from "react-slick";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import FooterR from "@/components/footerResponsif";

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
  } else {
    alert("Veuillez remplir les champs svp");
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

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    paritialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30,
  },
};

/////////////////////////////////////////////FIN SLIDER CONFIG//////////////////////////////////////////////////////////////

export default function Intermed1() {
  const [show, setShow] = useState(false);




  const handleToggle = () => setShow(!show);
  const { isOpen, onToggle, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  const [numero, setNumero] = useState("");
  const [nom, setNom] = useState("");
  const [Desc1, setDesc1] = useState("");
  const [addresse, setAddresse] = useState("");
  const [data, setData] = useState([]);
  const [categorie, setCategorie] = useState("");
  const [data1, setData1] = useState();
  const [data2, setData2] = useState();
  

    ////HOraire
    const heure = "Heure d'Ouverture";
    const [horaire,setHoraire] = useState({})
    const [lundi,setLundi]=useState("Non Renseigné")
    const [mardi,setMardi]=useState("Non Renseigné")
    const [mercredi,setMercredi]=useState("Non Renseigné")
    const [jeudi,setJeudi]=useState("Non Renseigné")
    const [vendredi,setVendredi]=useState("Non Renseigné")
    const [samedi,setSamedi]=useState("Non Renseigné")
    const [dimanche,setDimanche]=useState("Non Renseigné")
    const [paiement,setPaiement]=useState({})
    const [paiement1,setPaiement1]=useState("Espèce")
    const [paiement2,setPaiement2]=useState(" ")
  
  
    ///fin horaire
 




  useEffect(() => {
    setImageUrl(sessionStorage.getItem("image"));
    setNumero(sessionStorage.getItem("savefrom"));
    setNom(sessionStorage.getItem("nom"));
    setAddresse(sessionStorage.getItem("adresse"));
    setCategorie(sessionStorage.getItem("categorie"));
    setDesc1(sessionStorage.getItem("description"));
    if (sessionStorage.getItem("horaire") != "undefined") {
      setHoraire(JSON.parse(sessionStorage.getItem("horaire")));
     setLundi( horaire.lundi)
     setMardi( horaire.mardi)
     setMercredi( horaire.mercredi)
     setJeudi( horaire.jeudi)
     setVendredi( horaire.vendredi)
     setSamedi( horaire.samedi)
     setDimanche( horaire.dimanche)
      
    }
    
    if (sessionStorage.getItem("paiement") != "undefined" && sessionStorage.getItem("paiement") != null ) {
      setPaiement(JSON.parse(sessionStorage.getItem("paiement")))
      setPaiement1(paiement.methodeDePaiement1)
      console.log(paiement)
      setPaiement2(paiement.methodeDePaiement2)
      console.log(paiement)
    }


    
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
  }, [setImageUrl, setAddresse, setNom, setNumero,setHoraire,setDesc1,setCategorie]);






  const images = [
    imageUrl,
    imageUrl,
    imageUrl,
    imageUrl,
    imageUrl,
    imageUrl,
    imageUrl,
    imageUrl,
    imageUrl,
    imageUrl,
    imageUrl,
    imageUrl,
    imageUrl,
    imageUrl,
  ];
  if (
    categorie != "Restaurant" &&
    categorie != "Esthetique" &&
    categorie != "Restauration" &&
    categorie != "Fret" &&
    categorie != "Salon de Coiffure" &&
    categorie != "Commerce de meches"
  ) {
    return (
      <>
        <InputBar />
        <Navbar />
        <Box ml={["3%", "3%", "3%", "20%", "20%"]} mt={10} mb={10}>
          <Flex>
            <Box mr={5}>
              <Image
                src={`${imageUrl}`}
                alt={`logo de ${nom}`}
                width={["150px","150px","150px","200px","200px"]}
                height={["150px","150px","150px","200px","200px"]}
                maxHeight={"200px"}
                maxWidth={"200px"}
                minHeight={"80px"}
                minWidth={"100px"}
              />
            </Box>

            <Box>
              <Heading fontSize={"40px"}>{nom}</Heading>
              <Text fontSize={"15px"} fontWeight={"medium"}>
                {addresse}
              </Text>
              <Flex mb={2} mt={2}>
                <BsFillTelephoneOutboundFill />
                <Text
                  fontSize={"15px"}
                  fontWeight={"medium"}
                  ml={2}
                  color={"green"}
                >
                  {numero}
                </Text>
              </Flex>
              <Flex>
              <Text fontWeight={"bold"}>Description : </Text>
                {Desc1 == "undefined" ? <Text  width={"58%"} textAlign={"justify"}>{categorie} Africaine</Text> :   <Text width={"58%"} textAlign={"justify"}>
                  {Desc1}
                 
                </Text> }
               
              
              </Flex>
              <Flex>
              <Text fontWeight={"bold"}>Moyen De paiement : </Text>
               <Box>
                <Text ml={2} fontSize={"15px"}>{paiement1}</Text>
                <Text ml={2} fontSize={"15px"}>{paiement2}</Text>

               </Box>
               
              
              </Flex>
              
              <Flex>
                <Heading
                  as={"h3"}
                  fontWeight={"bold"}
                  _hover={{
                    cursor: "pointer",
                  }}
                  onClick={handleToggle}
                  color={"blue.700"}
                  fontSize={"15px"}
                  mt={3}
                >
                  {heure}{" "}
                  {show ? (
                    <ChevronUpIcon fontSize={"20px"} />
                  ) : (
                    <ChevronDownIcon fontSize={"20px"} />
                  )}{" "}
                  :
                </Heading>
              </Flex>
              <Collapse in={show}>
                <Box ml={10}>
                  <Text fontSize={"15px"}>lundi: {lundi}</Text>
                  <Text fontSize={"15px"}>mardi: {mardi}</Text>
                  <Text fontSize={"15px"}>mercredi: {mercredi}</Text>
                  <Text fontSize={"15px"}>jeudi: {jeudi}</Text>
                  <Text fontSize={"15px"}>vendredi: {vendredi}</Text>
                  <Text fontSize={"15px"}>samedi: {samedi}</Text>
                  <Text fontSize={"15px"}>dimanche: {dimanche}</Text>
                </Box>
              </Collapse>
            </Box>
          </Flex>
          <Heading fontSize={"20px"} mt={10}>
            Images du magasin{" "}
          </Heading>
          <section
            style={{
              marginTop: "20px",
              marginRight: "20%",
            }}
          >
            <Carousel
              partialVisbile
              deviceType={"mobile"}
              itemClass="image-item"
              responsive={responsive}
            >
              {images.slice(0, images.length).map((image, index) => {
                return (
                  <Image
                    key={index}
                    alt={`${image}`}
                    maxWidth={"200px"}
                    maxHeight={"200px"}
                    minWidth={"150px"}
                    minHeight={"150px"}
                    pr={5}
                    src={image}
                  />
                );
              })}
            </Carousel>
          </section>

          <Heading fontSize={"20px"} mt={10}>
            Les produits{" "}
          </Heading>
          <Flex mt={10}>
            <SimpleGrid columns={[2, 2, 3, 4, 5]} spacing={2} mr={20}>
              {data.map((data, key) => (
                <Box
                  key={data.id}
                  maxW={"fit-content"}
                  height={"400px"}
                  borderRadius="lg"
                  mt={4}
                  mb={20}
                  // border={"1px solid black"}
                >
                  <Box width={"fit-content"} height={"fit-content"} pt={10} pl={5}>
                    <Image
                      src={data.imageUrl}
                      alt={data.nom}
                      width={["150px","150px","150px","190px","190px"]}
                      height={"150px"}
                      maxH={"200px"}
                      maxW={"200px"}
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
                      <Text width={"150px"}>{data.nom}</Text>
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
                      mb={5}
                      noOfLines={8}
                      w={{base:"150px",md:"200px"}}
                      Height={"250px"}
                      maxH={"250px"}
                    >
                      {data.description == "undefined" ? <></> : <>  <Tooltip label={data.description}>
                      <Text  noOfLines={1}>{data.description}</Text>
                      </Tooltip></>}
                     
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
        <FooterR/>
      </>
    );
  } 
  else if( categorie == "Fret" ){
    return(<>
       <>
        <InputBar />
        <Navbar />

        <Box ml={["3%", "3%", "3%", "20%", "20%"]} mt={10} mb={10}>
         
          <Flex>
            <Box mr={5}>
            <Image
                src={`${imageUrl}`}
                alt={`logo de ${nom}`}
                width={["150px","150px","150px","200px","200px"]}
                height={["150px","150px","150px","200px","200px"]}
                maxHeight={"200px"}
                maxWidth={"200px"}
                minHeight={"80px"}
                minWidth={"100px"}
              />
              <Box mt={5}>
                <Button
                  color={"#fff"}
                  width={"94px"}
                  height={"30px"}
                  as={"a"}
                  href={`tel:${numero}`}
                  bgColor={"cyan.700"}
                  _hover={{
                    backgroundColor: " cyan.900",
                    color: "white ",
                  }}
                  leftIcon={<BsTelephoneOutboundFill />}
                >
                  Appeler
                </Button>
                
              </Box>
            </Box>

            <Box>
              <Heading fontSize={"40px"}>{nom}</Heading>
              <Text fontSize={"15px"} fontWeight={"medium"}>
                {addresse}
              </Text>
              <Flex mb={2} mt={2}>
                <BsFillTelephoneOutboundFill />
                <Text
                  fontSize={"15px"}
                  fontWeight={"medium"}
                  ml={2}
                  color={"green"}
                >
                  {numero}
                </Text>
              </Flex>
              <Flex>
              <Text fontWeight={"bold"}>Description : </Text>
                {Desc1 == "undefined" ? <Text  width={"58%"} textAlign={"justify"}>{categorie} Africaine</Text> :   <Text width={"58%"} textAlign={"justify"}>
                  {Desc1}
                 
                </Text> }
               
              
              </Flex>

              <Flex>
              <Text fontWeight={"bold"}>Moyen De paiement : </Text>
               <Box>
                <Text ml={2} fontSize={"15px"}>{paiement1}</Text>
                <Text ml={2} fontSize={"15px"}>{paiement2}</Text>

               </Box>
               
              
              </Flex>
              
              <Flex>
                <Heading
                  as={"h3"}
                  fontWeight={"bold"}
                  _hover={{
                    cursor: "pointer",
                  }}
                  onClick={handleToggle}
                  color={"blue.700"}
                  fontSize={"15px"}
                  mt={3}
                >
                  {heure}{" "}
                  {show ? (
                    <ChevronUpIcon fontSize={"20px"} />
                  ) : (
                    <ChevronDownIcon fontSize={"20px"} />
                  )}{" "}
                  :
                </Heading>
              </Flex>
              <Collapse in={show}>
              <Box ml={10}>
                  <Text fontSize={"15px"}>lundi: {lundi}</Text>
                  <Text fontSize={"15px"}>mardi: {mardi}</Text>
                  <Text fontSize={"15px"}>mercredi: {mercredi}</Text>
                  <Text fontSize={"15px"}>jeudi: {jeudi}</Text>
                  <Text fontSize={"15px"}>vendredi: {vendredi}</Text>
                  <Text fontSize={"15px"}>samedi: {samedi}</Text>
                  <Text fontSize={"15px"}>dimanche: {dimanche}</Text>
                </Box>
              </Collapse>
            </Box>
          </Flex>
          <Heading fontSize={"20px"} mt={10} >
            Images du magasin{" "}
          </Heading>

          {/* Slider */}
          <section
            style={{
              marginTop: "20px",
              marginRight: "20%",
              marginBottom: "70px"
            }}
          >
            <Carousel
              partialVisbile
              deviceType={"mobile"}
              itemClass="image-item"
              responsive={responsive}
            >
              {images.slice(0, images.length).map((image, index) => {
                return (
                  <Image
                    key={index}
                    alt={`${image}`}
                    maxWidth={"200px"}
                    maxHeight={"200px"}
                    minWidth={"150px"}
                    minHeight={"150px"}
                    pr={5}
                    src={image}
                  />
                );
              })}
            </Carousel>
          </section>

          {/* fin slide  */}
       
        </Box>
        <FooterR/>
      </>
    </>)
  }
  else {
    return (
      <>
        <InputBar />
        <Navbar />

        <Box ml={["3%", "3%", "3%", "20%", "20%"]} mt={10} mb={10}>
         
          <Flex>
            <Box mr={5}>
            <Image
                src={`${imageUrl}`}
                alt={`logo de ${nom}`}
                width={["150px","150px","150px","200px","200px"]}
                height={["150px","150px","150px","200px","200px"]}
                maxHeight={"200px"}
                maxWidth={"200px"}
                minHeight={"80px"}
                minWidth={"100px"}
              />
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
                        onClick={() => {
                          saveCommande3(data1, data2),
                            setData1(""),
                            setData2("");
                        }}
                      >
                        Valider
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Box>
            </Box>

            <Box>
              <Heading fontSize={"40px"}>{nom}</Heading>
              <Text fontSize={"15px"} fontWeight={"medium"}>
                {addresse}
              </Text>
              <Flex mb={2} mt={2}>
                <BsFillTelephoneOutboundFill />
                <Text
                  fontSize={"15px"}
                  fontWeight={"medium"}
                  ml={2}
                  color={"green"}
                >
                  {numero}
                </Text>
              </Flex>
              <Flex>
               
                
                <Text fontWeight={"bold"}>Description :  </Text>
                {Desc1 == "undefined" ? <Text  width={"58%"} textAlign={"justify"}>{categorie} Africaine</Text> :   <Text width={"58%"} textAlign={"justify"}>
                  {Desc1}
                 
                </Text> }
              </Flex>
              <Flex>
              <Text fontWeight={"bold"}>Moyen De paiement : </Text>
               <Box>
                <Text ml={2} fontSize={"15px"}>{paiement1}</Text>
                <Text ml={2} fontSize={"15px"}>{paiement2}</Text>

               </Box>
               
              
              </Flex>
              <Flex>
                <Text fontWeight={"bold"} width={"fit-content"}>Reservation : </Text>
                <Text width={"58%"} textAlign={"justify"}>
                  1H nécessaire pour la cuisson de chaque plat
                 
                </Text>
              </Flex>
              
              <Flex>
                <Heading
                  as={"h3"}
                  fontWeight={"bold"}
                  _hover={{
                    cursor: "pointer",
                  }}
                  onClick={handleToggle}
                  color={"blue.700"}
                  fontSize={"15px"}
                  mt={3}
                >
                  {heure}{" "}
                  {show ? (
                    <ChevronUpIcon fontSize={"20px"} />
                  ) : (
                    <ChevronDownIcon fontSize={"20px"} />
                  )}{" "}
                  :
                </Heading>
              </Flex>
              <Collapse in={show}>
              <Box ml={10}>
                  <Text fontSize={"15px"}>lundi: {lundi}</Text>
                  <Text fontSize={"15px"}>mardi: {mardi}</Text>
                  <Text fontSize={"15px"}>mercredi: {mercredi}</Text>
                  <Text fontSize={"15px"}>jeudi: {jeudi}</Text>
                  <Text fontSize={"15px"}>vendredi: {vendredi}</Text>
                  <Text fontSize={"15px"}>samedi: {samedi}</Text>
                  <Text fontSize={"15px"}>dimanche: {dimanche}</Text>
                </Box>
              </Collapse>
            </Box>
          </Flex>
          <Heading fontSize={"20px"} mt={10}>
            Images du magasin{" "}
          </Heading>

          {/* Slider */}
          <section
            style={{
              marginTop: "20px",
              marginRight: "10%",
            }}
          >
            <Carousel
              partialVisbile
              deviceType={"mobile"}
              itemClass="image-item"
              responsive={responsive}
            >
              {images.slice(0, images.length).map((image, index) => {
                return (
                  <Image
                  key={index}
                  alt={`${image}`}
                  maxWidth={"200px"}
                  maxHeight={"200px"}
                  minWidth={"150px"}
                  minHeight={"150px"}
                  pr={5}
                  src={image}
                />
                );
              })}
            </Carousel>
          </section>

          {/* fin slide  */}
          <Heading fontSize={"20px"} mt={10}>
            Les produits{" "}
          </Heading>
          <Flex mt={10}>
          <SimpleGrid columns={[2, 2, 3, 4, 5]} spacing={2} >
              {data.map((data, key) => (
                <Box
                  key={data.id}
                  maxW={"fit-content"}
                  height={"400px"}
                  borderRadius="lg"
                  mt={4}
                  mb={20}
                  
                  // border={"1px solid black"}
                >
                  <Box width={"fit-content"} height={"fit-content"} pt={10} pl={5}>
                    <Image
                      src={data.imageUrl}
                      alt={data.nom}
                      width={["150px","150px","150px","190px","190px"]}
                      height={"150px"}
                      maxH={"200px"}
                      maxW={"200px"}
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
                      <Text width={"150px"}>{data.nom}</Text>
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
                      mb={5}
                      noOfLines={8}
                      w={{base:"150px",md:"200px"}}
                      Height={"250px"}
                      maxH={"250px"}
                    >
                      <Tooltip label={data.description}>
                      <Text  noOfLines={1}>{data.description}</Text>
                      </Tooltip>
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
        <FooterR/>
      </>
    );
  }
}
