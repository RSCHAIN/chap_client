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
  Center,
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
  Stack,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
  useBreakpointValue,
  IconButton,
  Link,
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
import { BiWorld } from "react-icons/bi";
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

  push(ref(db2, "Devis"), {
    productID: data.id,
    nom: data.nom,
    description: data.description,
    quantite: data.quantite,
    imageUrl: data.imageUrl,
    organisation: data.organisation,
    totalPrix: data.prix,
    initiateur: email,
    Status: "Demande de Devis",
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
    push(ref(db2, "Devis"), {
      initiateur: email,
      Status: "Demande de Devis",
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
    alert("Devis en cours d'estimation");
  } else {
    alert("Veuillez remplir les champs svp");
  }

  // axios
  //   .post("/api/sendmail", {
  //     message: '',
  //     email: email.toString(),
  //     subject: "Demande de devis",
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
    breakpoint: { max: 1550, min: 1350 },
    items: 7,
    // partialVisibilityGutter: 60,
  },
  desktopL: {
    breakpoint: { max: 1705, min: 1550 },
    items: 8,
    // partialVisibilityGutter: 60,
  },
  desktopM: {
    breakpoint: { max: 2000, min: 1705 },
    items: 9,
    // partialVisibilityGutter: 60,
  },
  desktopX: {
    breakpoint: { max: 2150, min: 2000 },
    items: 10,
    // partialVisibilityGutter: 60,
  },
  desktopXL: {
    breakpoint: { max: 2500, min: 2150 },
    items: 11,
    // partialVisibilityGutter: 60,
  },
  desktopXLL: {
    breakpoint: { max: 3000, min: 2500 },
    items: 12,
    // partialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 750, min: 550 },
    items: 4,
    // partialVisibilityGutter: 50,
  },
  tabletM: {
    breakpoint: { max: 1125, min: 750 },
    items: 5,
    // partialVisibilityGutter: 50,
  },
  tabletL: {
    breakpoint: { max: 1350, min: 1125 },
    items: 6,
    // partialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    // partialVisibilityGutter: 30,
  },
  mobileM: {
    breakpoint: { max: 550, min: 464 },
    items: 3,
    // partialVisibilityGutter: 30,
  },
};

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 1500,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

/////////////////////////////////////////////FIN SLIDER CONFIG//////////////////////////////////////////////////////////////







export default function Reste(){
    const [show, setShow] = useState(false);

    const handleToggle = () => setShow(!show);
    const { isOpen, onToggle, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const router = useRouter();
    const [imageUrl, setImageUrl] = useState("");
    const [numero, setNumero] = useState("");
    const [nom, setNom] = useState("");
    const [Desc1, setDesc1] = useState("");
    const [nation, setNation] = useState("");
    const [addresse, setAddresse] = useState("");
    const [data, setData] = useState([]);
    const [categorie, setCategorie] = useState("");
    const [data1, setData1] = useState();
    const [data2, setData2] = useState();
    const [link,setLink] = useState();
    
    ////HOraire
    const heure = "Horaire d'Ouverture";
    const [horaire, setHoraire] = useState({});
  
    const [paiement, setPaiement] = useState({});
  
    const [timert, setTimert] = useState();
    ///fin horaire
    const [slider, setSlider] = useState(null);
  
    const top = useBreakpointValue({ base: "90%", md: "50%" });
    const side = useBreakpointValue({ base: "30%", md: "10px" });
  
    useEffect(() => {
      if (
        sessionStorage.getItem("horaire") != "undefined" &&
        sessionStorage.getItem("horaire") != null &&
        sessionStorage.getItem("horaire") != undefined
      ) {
        setTimert(JSON.parse(sessionStorage.getItem("horaire")));
      } else {
        setTimert(null);
      }
      if (
        sessionStorage.getItem("paiement") != "undefined" &&
        sessionStorage.getItem("paiement") != null &&
        sessionStorage.getItem("paiement") != undefined
      ) {
        setPaiement(JSON.parse(sessionStorage.getItem("paiement")));
      } else {
        setPaiement(null);
      }
      setImageUrl(sessionStorage.getItem("image"));
      setNumero(sessionStorage.getItem("savefrom"));
      setNom(sessionStorage.getItem("nom"));
      setAddresse(sessionStorage.getItem("adresse"));
      setCategorie(sessionStorage.getItem("categorie"));
      setDesc1(sessionStorage.getItem("description"));
      setNation(sessionStorage.getItem("nationalite"));
      setLink(`https://www.google.com/maps/embed/v1/place?key=AIzaSyAoJQLE8uAbWnyPHCv-_udEUhH7HQooJlM
    &q=${sessionStorage.getItem("adresse")}`);
     
  
      const starCountRef = ref(
        db2,
        `${sessionStorage.getItem("categorie")}/${sessionStorage.getItem("nom")}`
      );
  
      onValue(starCountRef, (snapshot) => {
        console.log(snapshot.val());
        const donnes = snapshot.val();
  
        
  
        if (donnes != null) {
          const newProducts = Object.keys(donnes).map((key) => ({
            id: key,
            ...donnes[key],
          }));
  
          setData(newProducts);
        }
      });
    }, [
      setImageUrl,
      setAddresse,
      setNom,
      setNumero,
      setHoraire,
      setDesc1,
      setCategorie,
    ]);
  
    const images = [imageUrl, imageUrl, imageUrl, imageUrl];
    return( <>
      <InputBar />
      <Navbar />
      {/* CSS files for react-slick */}

      <Box ml={["3%", "3%", "3%", "15%", "15%"]} mt={10} mb={10}>
      <Box display={["none", "none", "none", "grid", "grid"]}>
        <Flex >
          <Box mr={5}>
            <Image
              src={`${imageUrl}`}
              alt={`logo de ${nom}`}
              width={["150px", "150px", "150px", "200px", "200px"]}
              height={["150px", "150px", "150px", "200px", "200px"]}
              maxHeight={"200px"}
              maxWidth={"200px"}
              minHeight={"80px"}
              minWidth={"100px"}
            />
          </Box>

          <Box>
            <Heading fontSize={"35px"}>{nom}</Heading>
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
              <Text fontWeight={"bold"} pr={2}>
                Description :{" "}
              </Text>
              {Desc1 == "undefined" ? (
                <Text width={"58%"}  textAlign={"justify"}>
                  {categorie} Africain
                </Text>
              ) : (
                <Text width={"58%"}   textAlign={"justify"}>
                  {Desc1}
                </Text>
              )}
            </Flex>
            <Flex>
              <Text fontWeight={"bold"}>
                Nationalite :{" "}
              </Text>
              {nation == "undefined" ? (
                <Text  ml={2} fontSize={"15px"} >
                   Africaine
                </Text>
              ) : (
                <Text  ml={2} fontSize={"15px"} >
                  {`${" ",nation} `}
                </Text>
              )}
            </Flex>
            <Flex>
              <Text fontWeight={"bold"} >Moyen De paiement : </Text>
              <Box>
                <Text ml={2} fontSize={"15px"}>
                  {paiement != "undefined" && paiement != null
                    ? paiement.methodeDePaiement1
                    : "Espèces"}
                </Text>
                <Text ml={2} fontSize={"15px"}>
                  {paiement != "undefined" && paiement != null
                    ? paiement.methodeDePaiement2
                    : ""}
                </Text>
              </Box>
            </Flex>
            <Flex>
              <Text fontWeight={"bold"} >
                Reservation :{" "}
              </Text>
              <Text width={"58%"} textAlign={"justify"}>
                {data.length != 0 ? (
                  <Text color={"messenger.500"} ml={2}>En ligne</Text>
                ) : (
                  <Text color={"red.400"} ml={2}>Non Disponible</Text>
                )}
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
                <Text fontSize={"15px"}>
                  lundi:{" "}
                  {timert != "undefined" && timert != null
                    ? `${" "} ${timert.lundi}`
                    : " Non Renseigné"}
                </Text>
                <Text fontSize={"15px"}>
                  mardi:{" "}
                  {timert != "undefined" && timert != null
                    ? `${" "} ${timert.mardi}`
                    : " Non Renseigné"}
                </Text>
                <Text fontSize={"15px"}>
                  mercredi:{" "}
                  {timert != "undefined" && timert != null
                    ? `${" "} ${timert.mercredi}`
                    : " Non Renseigné"}
                </Text>
                <Text fontSize={"15px"}>
                  jeudi:{" "}
                  {timert != "undefined" && timert != null
                    ? `${" "} ${timert.jeudi}`
                    : " Non Renseigné"}
                </Text>
                <Text fontSize={"15px"}>
                  vendredi:{" "}
                  {timert != "undefined" && timert != null
                    ? `${" "} ${timert.vendredi}`
                    : " Non Renseigné"}
                </Text>
                <Text fontSize={"15px"}>
                  samedi:{" "}
                  {timert != "undefined" && timert != null
                    ? `${" "} ${timert.samedi}`
                    : " Non Renseigné"}
                </Text>
                <Text fontSize={"15px"}>
                  dimanche:{" "}
                  {timert != "undefined" && timert != null
                    ? `${" "} ${timert.dimanche}`
                    : " Non Renseigné"}
                </Text>
              </Box>
            </Collapse>
          </Box>
          <Box ml={10}>
            <Box display={["none", "none", "none", "grid", "grid"]}>
              <iframe
                width="400"
                height="200"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={link}
              ></iframe>
              
            </Box>
            <Box
              width={"300px"}
              display={["grid", "grid", "grid", "none", "none"]}
            >
              <iframe
                width="300"
                height="200"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={link}
              ></iframe>
            </Box>
            {/* <Flex>
            <Heading fontSize={"20px"} mt={10}>
          Images du magasin{" "}
        </Heading> */}

            {/* Slider */}
            {/* <section
          style={{
            marginTop: "20px",
            marginRight: "20px",
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
                  maxWidth={{md:'150px',xl:"150px"}}
                  maxHeight={{base:'150px',xl:"150px"}}
                  minWidth={{base:'150px',xl:"150px"}}
                  minHeight={{base:'150px',xl:"150px"}}
                  pr={5}
                  src={image}
                />
              );
            })}
          </Carousel>
        </section>
            </Flex> */}
          </Box>
        </Flex>
        <Box mt={5} width={"90%"}>
                <Center >
                  <Box mr={2}>
                    <Button
                      color={"#fff"}
                      width={"150px"}
                      height={"30px"}
                      as={"a"}
                      // onClick={onOpen}
                      bgColor={"green"}
                      _hover={{
                        backgroundColor: " cyan.900",
                        color: "white ",
                      }}
                      href={`tel:${numero}`}
                      leftIcon={<BsTelephoneOutboundFill />}
                    >
                      Nous Contacter
                    </Button>
                  </Box>
                  <Box mr={2}>
                    <Button
                      color={"#fff"}
                      width={"150px"}
                      height={"30px"}
                      isDisabled={true}
                      as={"a"}
                      // onClick={onOpen}
                      bgColor={"red"}
                      _hover={{
                        backgroundColor: " red.500",
                        color: "white ",
                      }}
                     
                      // href={`${sessionStorage.getItem("website")}`}
                      leftIcon={<BiWorld />}
                      // isExternal
                    >
                      Site Web
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      color={"#fff"}
                      width={"150px"}
                      height={"30px"}
                      as={"a"}
                      // onClick={onOpen}
                      isDisabled={true}
                      bgColor={"cyan.700"}
                      _hover={{
                        backgroundColor: " cyan.900",
                        color: "white ",
                      }}
                      // leftIcon={<BsTelephoneOutboundFill />}
                    >
                      Reserver
                    </Button>
                  
                  </Box>
                </Center>
                
              </Box>
        </Box>

        <Flex display={["grid", "grid", "none", "none", "none"]}   width={"fit-content"}>
          
      
        
           <Box display={"flex"} mb={5}>
            <Box mr={5}>
              <Image
                src={`${imageUrl}`}
                alt={`logo de ${nom}`}
                width={["150px", "150px", "150px", "200px", "200px"]}
                height={["150px", "150px", "150px", "200px", "200px"]}
                maxHeight={"200px"}
                maxWidth={"200px"}
                minHeight={"80px"}
                minWidth={"100px"}
              />
              
            </Box>
            <Heading fontSize={"35px"}>{nom}</Heading>
          </Box>

          <Box>
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
              <Text fontWeight={"bold"} pr={2}>
                Description :{" "}
              </Text>
              {Desc1 == "undefined" ? (
                <Text width={"58%"}   textAlign={"justify"}>
                  {categorie} Africain
                </Text>
              ) : (
                <Text width={"58%"} textAlign={"justify"}>
                  {Desc1}
                </Text>
              )}
            </Flex>
            <Flex>
              <Text fontWeight={"bold"}>
                Nationalite :{" "}
              </Text>
              {nation == "undefined" ? (
                <Text  ml={2} fontSize={"15px"} >
                   Africaine
                </Text>
              ) : (
                <Text  ml={2} fontSize={"15px"} >
                  {`${" ",nation} `}
                </Text>
              )}
            </Flex>
            <Flex>
              <Text fontWeight={"bold"} >Moyen De paiement : </Text>
              <Box>
                <Text ml={2} fontSize={"15px"}>
                  {paiement != "undefined" && paiement != null
                    ? paiement.methodeDePaiement1
                    : "Espèces"}
                </Text>
                <Text ml={2} fontSize={"15px"}>
                  {paiement != "undefined" && paiement != null
                    ? paiement.methodeDePaiement2
                    : ""}
                </Text>
              </Box>
            </Flex>
            <Flex>
              <Text fontWeight={"bold"} >
                Reservation :{" "}
              </Text>
              <Text width={"58%"} textAlign={"justify"}>
                {data.length != 0 ? (
                  <Text color={"messenger.500"} ml={2} >En ligne</Text>
                ) : (
                  <Text color={"red.400"} ml={2}>Non Disponible</Text>
                )}
              </Text>
            </Flex>
            {/* <Center > */}
              <SimpleGrid columns={2} spacingX={3}>
              <Box mt={5}>
                <Button
                  color={"#fff"}
                  width={"150px"}
                  height={"30px"}
                  as={"a"}
                  // onClick={onOpen}
                  bgColor={"green"}
                  _hover={{
                    backgroundColor: " green.200",
                    color: "white ",
                  }}
                  href={`tel:${numero}`}
                  leftIcon={<BsTelephoneOutboundFill />}
                >
                  Nous Contacter
                </Button>
              </Box>
              <Box mt={5} >
                <Button
                  color={"#fff"}
                  width={"150px"}
                  height={"30px"}
                  as={"a"}
                  // onClick={onOpen}
                  bgColor={"red"}
                  _hover={{
                    backgroundColor: " red.500",
                    color: "white ",
                  }}
                  isDisabled={true}
                  // href={`${sessionStorage.getItem("website")}`}
                  leftIcon={<BiWorld />}
                  // isExternal
                >
                  Site Web
                </Button>
              </Box>
             
              <Box mt={5} ml={"50%"}>
                <Button
                  color={"#fff"}
                  width={"150px"}
                  height={"30px"}
                  as={"a"}
                  // onClick={onOpen}
                  isDisabled={true}
                  bgColor={"cyan.700"}
                  _hover={{
                    backgroundColor: " cyan.900",
                    color: "white ",
                  }}
                  // leftIcon={<BsTelephoneOutboundFill />}
                >
                  Reserver
                </Button>
              
              </Box>
              </SimpleGrid>
            {/* </Center> */}

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

            <Box ml={10}>
              <Text fontSize={"15px"}>
                lundi:{" "}
                {timert != "undefined" && timert != null
                  ? `${" "} ${timert.lundi}`
                  : " Non Renseigné"}
              </Text>
              <Text fontSize={"15px"}>
                mardi:{" "}
                {timert != "undefined" && timert != null
                  ? `${" "} ${timert.mardi}`
                  : " Non Renseigné"}
              </Text>
              <Text fontSize={"15px"}>
                mercredi:{" "}
                {timert != "undefined" && timert != null
                  ? `${" "} ${timert.mercredi}`
                  : " Non Renseigné"}
              </Text>
              <Text fontSize={"15px"}>
                jeudi:{" "}
                {timert != "undefined" && timert != null
                  ? `${" "} ${timert.jeudi}`
                  : " Non Renseigné"}
              </Text>
              <Text fontSize={"15px"}>
                vendredi:{" "}
                {timert != "undefined" && timert != null
                  ? `${" "} ${timert.vendredi}`
                  : " Non Renseigné"}
              </Text>
              <Text fontSize={"15px"}>
                samedi:{" "}
                {timert != "undefined" && timert != null
                  ? `${" "} ${timert.samedi}`
                  : " Non Renseigné"}
              </Text>
              <Text fontSize={"15px"}>
                dimanche:{" "}
                {timert != "undefined" && timert != null
                  ? `${" "} ${timert.dimanche}`
                  : " Non Renseigné"}
              </Text>
            </Box>
          </Box>
          <Text mt={5} as={"h3"} fontWeight={"bold"}>
            Nous rejoindre
          </Text>
          <Center>
            <Box mt={10}>
            
              <Box
                width={"300px"}
                display={["grid", "grid", "grid", "none", "none"]}
              >
                <iframe
                  width="300"
                  height="250"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={link}
                ></iframe>
              </Box>
            </Box>
          </Center>
        </Flex>
        <Flex display={["none", "none", "grid", "none", "none"]} width={"fit-content"}>
         
           <Box display={"flex"} mb={5}>
            <Box mr={5}>
              <Image
                src={`${imageUrl}`}
                alt={`logo de ${nom}`}
                width={["150px", "150px", "150px", "200px", "200px"]}
                height={["150px", "150px", "150px", "200px", "200px"]}
                maxHeight={"200px"}
                maxWidth={"200px"}
                minHeight={"80px"}
                minWidth={"100px"}
              />
              
            </Box>
            <Heading fontSize={"35px"}>{nom}</Heading>
          </Box>

          <Box>
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
              <Text fontWeight={"bold"} pr={2}>
                Description :{" "}
              </Text>
              {Desc1 == "undefined" ? (
                <Text width={"58%"}  textAlign={"justify"}>
                  {categorie} Africain
                </Text>
              ) : (
                <Text width={"58%"}  textAlign={"justify"}>
                  {Desc1}
                </Text>
              )}
            </Flex>
            <Flex>
              <Text fontWeight={"bold"}>
                Nationalite :{" "}
              </Text>
              {nation == "undefined" ? (
                <Text  ml={2} fontSize={"15px"} >
                   Africaine
                </Text>
              ) : (
                <Text  ml={2} fontSize={"15px"} >
                  {`${" ",nation} `}
                </Text>
              )}
            </Flex>
            <Flex>
              <Text fontWeight={"bold"}>Moyen De paiement : </Text>
              <Box>
                <Text ml={2} fontSize={"15px"}>
                  {paiement != "undefined" && paiement != null
                    ? paiement.methodeDePaiement1
                    : "Espèces"}
                </Text>
                <Text ml={2} fontSize={"15px"}>
                  {paiement != "undefined" && paiement != null
                    ? paiement.methodeDePaiement2
                    : ""}
                </Text>
              </Box>
            </Flex>
            <Flex>
              <Text fontWeight={"bold"}>
                Reservation :{" "}
              </Text>
              <Text width={"58%"} textAlign={"justify"}>
                {data.length != 0 ? (
                  <Text color={"messenger.500"} ml={2}>En ligne</Text>
                ) : (
                  <Text color={"red.400"} ml={2}>Non Disponible</Text>
                )}
              </Text>
            </Flex>
            <SimpleGrid columns={2} spacingX={3}>
              <Box mt={5}>
                <Button
                  color={"#fff"}
                  width={"150px"}
                  height={"30px"}
                  as={"a"}
                  // onClick={onOpen}
                  bgColor={"green"}
                  _hover={{
                    backgroundColor: " green.200",
                    color: "white ",
                  }}
                  href={`tel:${sessionStorage.getItem("savefrom")}`}
                  leftIcon={<BsTelephoneOutboundFill />}
                >
                  Nous Contacter
                </Button>
              </Box>
              <Box mt={5} >
                <Button
                  color={"#fff"}
                  width={"150px"}
                  height={"30px"}
                  as={"a"}
                  // onClick={onOpen}
                  bgColor={"red"}
                  _hover={{
                    backgroundColor: " red.500",
                    color: "white ",
                  }}
                  isDisabled={true}
                  // href={`${sessionStorage.getItem("website")}`}
                  leftIcon={<BiWorld />}
                  // isExternal
                >
                  Site Web
                </Button>
              </Box>
             
              <Box mt={5} ml={"50%"}>
                <Button
                  color={"#fff"}
                  width={"150px"}
                  height={"30px"}
                  as={"a"}
                  onClick={onOpen}
                  bgColor={"cyan.700"}
                  _hover={{
                    backgroundColor: " cyan.900",
                    color: "white ",
                  }}
                  // leftIcon={<BsTelephoneOutboundFill />}
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
                          <a
                            href={`tel:${sessionStorage.getItem("savefrom")}`}
                          >
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
              </SimpleGrid>
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

            <Box ml={10}>
              <Text fontSize={"15px"}>
                lundi:{" "}
                {timert != "undefined" && timert != null
                  ? `${" "} ${timert.lundi}`
                  : " Non Renseigné"}
              </Text>
              <Text fontSize={"15px"}>
                mardi:{" "}
                {timert != "undefined" && timert != null
                  ? `${" "} ${timert.mardi}`
                  : " Non Renseigné"}
              </Text>
              <Text fontSize={"15px"}>
                mercredi:{" "}
                {timert != "undefined" && timert != null
                  ? `${" "} ${timert.mercredi}`
                  : " Non Renseigné"}
              </Text>
              <Text fontSize={"15px"}>
                jeudi:{" "}
                {timert != "undefined" && timert != null
                  ? `${" "} ${timert.jeudi}`
                  : " Non Renseigné"}
              </Text>
              <Text fontSize={"15px"}>
                vendredi:{" "}
                {timert != "undefined" && timert != null
                  ? `${" "} ${timert.vendredi}`
                  : " Non Renseigné"}
              </Text>
              <Text fontSize={"15px"}>
                samedi:{" "}
                {timert != "undefined" && timert != null
                  ? `${" "} ${timert.samedi}`
                  : " Non Renseigné"}
              </Text>
              <Text fontSize={"15px"}>
                dimanche:{" "}
                {timert != "undefined" && timert != null
                  ? `${" "} ${timert.dimanche}`
                  : " Non Renseigné"}
              </Text>
            </Box>
          </Box>
          <Text mt={5} as={"h3"} fontWeight={"bold"}>
            Nous rejoindre
          </Text>
          <Center>
            <Box mt={10}>
              <Box
                width={"300px"}
                display={["grid", "grid", "grid", "none", "none"]}
              >
                <iframe
                  width="300"
                  height="250"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={link}
                ></iframe>
              </Box>
            </Box>
          </Center>
        </Flex>

        {/* fin slide  */}
        {data.length != 0 ? (
          <>
            {" "}
            <Heading fontSize={"20px"} mt={10}>
              Les produits{" "}
            </Heading>
            <Flex mt={10}>
              <SimpleGrid columns={[1, 1, 1, 2, 3]}>
                {data.map((data, key) => (
                  <Box
                    key={data.id}
                    maxW={"fit-content"}
                    // height={"400px"}
                    mb={5}
                    borderRadius="lg"
                    display={"flex"}
                    // border={"1px solid black"}
                  >
                    <Box
                      width={["130px","130px","130px","200px","200px"]}
                      height={"fit-content"}
                      // pt={10}
                    >
                      <Image
                        src={data.imageUrl}
                        alt={data.nom}
                        width={["130px","130px","130px","200px","200px"]}
                        height={["130px","130px","130px","200px","200px"]}
                        maxH={["130px","130px","130px","200px","200px"]}
                        maxW={["130px","130px","130px","200px","200px"]}
                        borderRadius={"25px"}
                      />
                    </Box>

                    <Box ml={5}>
                      <Box
                        fontWeight="semibold"
                        as="h5"
                        lineHeight="tight"
                        noOfLines={3}
                        width={"fit-content"}
                        height={"fit-content"}
                      >
                        <Text width={"200px"} fontSize={"20px"}>
                          {data.nom}
                        </Text>
                        <Box textColor={"blue"} color={"blue.400"}>
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
                        w={"fit-content"}
                        // Height={"250px"}
                        maxH={"250px"}
                      >
                        {data.description == "undefined" ? (
                          <></>
                        ) : (
                          <>
                            {" "}
                            <Tooltip label={data.description}>
                              <Text noOfLines={3} width={"200px"}>
                                {data.description}
                              </Text>
                            </Tooltip>
                          </>
                        )}
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
          </>
        ) : (
          <></>
        )}
      </Box>
      <FooterR />
    </>);
}