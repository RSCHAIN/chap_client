import React, { useState, useEffect } from "react";
import FooterR from "@/components/footerResponsif";
import {
  Box,
  Button,
  Center,
  Collapse,
  Spacer,
  Flex,
  Heading,
  IconButton,
  Link,
  SimpleGrid,
  Image,
  Text,
  useBreakpointValue,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
} from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import InputBar from "@/components/InputBar";
import Navbar from "@/components/Navbar";
// Here we have used react-icons package for the icons
import {
  BiLeftArrowAlt,
  BiLoaderCircle,
  BiRightArrowAlt,
} from "react-icons/bi";
import { IoMdAddCircle, IoMdAddCircleOutline } from "react-icons/io";
// And react-slick as our Carousel Lib
import Slider from "react-slick";

// import Image from "next/image";
import { ChevronRightIcon, StarIcon } from "@chakra-ui/icons";
// import FirstNav from "@/components/firstNav";
// import Navbar from "@/components/navbar";
import { useRouter } from "next/router";
import { db2 } from "@/FIREBASE/clientApp";
import { ref, onValue, push } from "firebase/database";
import { BsTelephoneOutboundFill } from "react-icons/bs";
import axios from "axios";

// Settings for the slider
const settings = {
  dots: false,
  infinite: false,
  speed: 2000,
  slidesToShow: 8,
  slidesToScroll: 2,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1900,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 2,
        infinite: false,
        dots: false,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        infinite: false,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
/////////////fetch des datas

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
    moment: "",
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
export default function Carousel() {
  const [data, setData] = useState([]);
  const [cat, setCat] = useState([]);
  const toast = useToast();
  const router = useRouter();
  const [page, setPage] = useState("");
  const [check, setCheck] = useState("");
  const [checker, setChecker] = useState(1);
  const [product, setProduct] = useState();
  const [data1, setData1] = useState();
  const [data2, setData2] = useState();

  useEffect(() => {
    //attribution du link

    const link = router.asPath
      .replace("/", "")
      .toString()
      .replace("%20", " ")
      .replace("#fade", "")
      .trimEnd()
      .replace("%20", " ")
      .replace("%20", " ")
      .replace("%C3%A9", "é")
      .replace("%C3%A9", "é")
      .replace("%C3%A9", "é");
    // console.log(link);
    setChecker(router.asPath.search("Restauration"));
    setCheck(router.asPath.search("Alimentation"));
    setProduct(router.asPath.search("Esthetique"));
    //attribution du link de la page
    setPage(
      router.asPath
        .replace("/", "")
        .toString()
        .replace("%20", " ")
        .replace("#fade", "")
        .trimEnd()
        .replace("%20", " ")
        .replace("%20", " ")
        .replace("%C3%A9", "é")
        .replace("%C3%A9", "é")
        .replace("%C3%A9", "é")
        .replace("/", ">")
    );

    //connexion et fetch des datas depuis notre db
    console.log(link);
    const starCountRef = ref(db2, link);

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
  }, [router]);

  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = useState(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  // These are the images used in the slide
  const cards = [
    "https://images.unsplash.com/photo-1612852098516-55d01c75769a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1627875764093-315831ac12f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1571432248690-7fd6980a1ae2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
  ];

  const [isLagerThan768] = useMediaQuery("(min-width: 768px)");
  const { isOpen, onToggle, onOpen, onClose } = useDisclosure();
  const message = "Revenir á l'accueil";
  if (check != -1 && data.length > 0) {
    // console.log(data.length);
    return (
      <>
        {/* <FirstNav/>
    <Navbar/> */}
        <InputBar />
        {isLagerThan768 ? <Navbar></Navbar> : <></>}
        <Box>
          <Flex w={"100%"} justifyContent={"space-between"}>
            <Flex fontSize={"1rem"}>
              <Text ml={5}>Home</Text>
              <ChevronRightIcon h={6} />

              <Text py={0}>{page}</Text>
            </Flex>

            <SimpleGrid columns={[1]} spacing={10} alignItems={""}>
              <link
                rel="stylesheet"
                type="text/css"
                charSet="UTF-8"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
              />
              <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
              />

              <Flex
                mr={10}
                fontSize={"1rem"}
                display={{ base: "none", md: "flex" }}
                onClick={onToggle}
                href={"#fade"}
              >
                {/* <Button
                  display={{ base: "none", md: "grid" }}
                  onClick={onToggle}
                  // as={Link}
                  // opacity={0.5}
                  href={"#fade"}
                  bgColor={"cyan.700"}
                  color={"red"}
                  mt={[10, 10, 10, 0, 0]}
                  w={"150px"}
                  _hover={{ textDecoration: "none", bgColor: "#006C47" }} 
                  leftIcon={<chevronRightIcon fontSize={30}color={"red"} />}
                >
                  VOIR PLUS
                </Button> */}
                Voir Plus <ChevronRightIcon h={6} />
              </Flex>
            </SimpleGrid>
          </Flex>
          <Center>
            {" "}
            {/* <Button
              display={{ base: "grid", md: "none" }}
              onClick={onToggle}
              as={Link}
              href={"#fade"}
              bgColor={"#08566E"}
              color={"white"}
              mb={5}
              w={"150px"}
              _hover={{ textDecoration: "none", bgColor: "#006C47" }}
            >
              VOIR PLUS
            </Button> */}
            <Flex
              mr={10}
              fontSize={"1rem"}
              display={{ base: "flex", md: "none" }}
              onClick={onToggle}
              href={"#fade"}
            >
              {/* <Button
                  display={{ base: "none", md: "grid" }}
                  onClick={onToggle}
                  // as={Link}
                  // opacity={0.5}
                  href={"#fade"}
                  bgColor={"cyan.700"}
                  color={"red"}
                  mt={[10, 10, 10, 0, 0]}
                  w={"150px"}
                  _hover={{ textDecoration: "none", bgColor: "#006C47" }}
                  leftIcon={<chevronRightIcon fontSize={30}color={"red"} />}
                >
                  VOIR PLUS
                </Button> */}
              Voir Plus <ChevronRightIcon h={6} />
            </Flex>
          </Center>
          <Box
            position={"relative"}
            height={"fit-content"}
            width={"100%"}
            overflow={"hidden"}
            mb={"2em"}
          >
            <IconButton
              display={{ base: "none", md: "grid" }}
              aria-label="left-arrow"
              colorScheme="messenger"
              borderRadius="full"
              position="absolute"
              left={side}
              top={top}
              transform={"translate(0%, -50%)"}
              zIndex={2}
              onClick={() => slider?.slickPrev()}
              bg={"#fff"}
            >
              <BiLeftArrowAlt color="#000" />
            </IconButton>

            <IconButton
              display={{ base: "none", md: "grid" }}
              aria-label="right-arrow"
              colorScheme="messenger"
              borderRadius="full"
              position="absolute"
              right={side}
              top={top}
              transform={"translate(0%, -50%)"}
              zIndex={2}
              onClick={() => slider?.slickNext()}
              bg={"#fff"}
            >
              <BiRightArrowAlt color="#000" />
            </IconButton>

            <Box ml={{ base: 0, md: 20 }}>
              <Slider {...settings} ref={(slider) => setSlider(slider)}>
                {data.map((data, index) => (
                  //  <Center key={data.id}>
                  <Box
                    key={data.id}
                    maxW={["50%", "50%", "50%", "50%", "50%"]}
                    width={"300px"}
                    height={"400px"}
                    // pr={20}
                    // borderWidth="1px"
                    // borderRadius="lg"
                    // overflow="hidden"
                    // paddingLeft={20}
                    // _hover={{
                    //   borderWidth:"1px",
                    // borderRadius:"lg",
                    //  boxShadow:"2xl"

                    // }}
                    // boxShadow={"2xl"}
                    mx={10}
                    mt={4}
                    mb={20}
                    // key={}
                    pb={5}
                  >
                    <Box width={"270px"} height={"fit-content"} pt={10} pl={10}>
                      <Image
                        src={data.imageUrl}
                        alt={data.nom}
                        width={"150px"}
                        height={"150px"}
                        maxH={"519px"}
                        maxW={"208px"}
                      />
                    </Box>

                    <Box p="6">
                      <Box
                        position={"relative"}
                        mt="1"
                        fontWeight="semibold"
                        as="h5"
                        lineHeight="tight"
                        noOfLines={3}
                        minWidth={"200px"}
                        height={"100px"}
                        // display={'flex'}
                        // justifyContent={'space-between'}
                      >
                        <Text mb={3}>{data.nom}</Text>
                        <Box
                          mt={2}
                          mb={3}
                          pb={3}
                          ml={"80%"}
                          textColor={"blue"}
                          color={"blue.400"}
                        >
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
                        {/* <Text>{data.description}</Text> */}
                        <Button
                          bgColor={"cyan.700"}
                          mt={10}
                          borderRadius={"66px"}
                          width={"160px"}
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
                          leftIcon={<IoMdAddCircleOutline />}
                        >
                          {" "}
                          Ajouter au panier
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                  // </Center>
                ))}

                {/* </SimpleGrid> */}
              </Slider>
            </Box>
          </Box>

          <Collapse in={isOpen} id={"fade"} mt={20} animateOpacity>
            <Center>
              <Text
                mb={20}
                color={"black"}
                fontSize={[20, 20, 15, 20, "1.5rem"]}
              >
                Listes de tous nos produits
              </Text>
            </Center>

            <SimpleGrid columns={[1, 2, 3, 4, 6]} spacing={2}>
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
                        // mt={3}
                        borderRadius={"66px"}
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
                        leftIcon={<IoMdAddCircleOutline />}
                      >
                        {" "}
                        Ajouter au panier
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </Collapse>
        </Box>
        <FooterR />
      </>
    );
  } else if (product != -1 && data.length > 0) {
    // console.log(data.length);
    return (
      <>
        {/* <FirstNav/>
    <Navbar/> */}
        <InputBar />
        {isLagerThan768 ? <Navbar></Navbar> : <></>}
        <Box>
          <Flex w={"100%"} justifyContent={"space-between"}>
            <Flex fontSize={"1rem"}>
              <Text ml={5}>Home</Text>
              <ChevronRightIcon h={6} />

              <Text py={0}>{page}</Text>
            </Flex>

            <SimpleGrid columns={[1]} spacing={10} alignItems={""}>
              <link
                rel="stylesheet"
                type="text/css"
                charSet="UTF-8"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
              />
              <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
              />

              <Flex
                mr={10}
                fontSize={"1rem"}
                display={{ base: "none", md: "flex" }}
                onClick={onToggle}
                href={"#fade"}
              >
                {/* <Button
                  display={{ base: "none", md: "grid" }}
                  onClick={onToggle}
                  // as={Link}
                  // opacity={0.5}
                  href={"#fade"}
                  bgColor={"cyan.700"}
                  color={"red"}
                  mt={[10, 10, 10, 0, 0]}
                  w={"150px"}
                  _hover={{ textDecoration: "none", bgColor: "#006C47" }} 
                  leftIcon={<chevronRightIcon fontSize={30}color={"red"} />}
                >
                  VOIR PLUS
                </Button> */}
                Voir Plus <ChevronRightIcon h={6} />
              </Flex>
            </SimpleGrid>
          </Flex>
          <Center>
            {" "}
            {/* <Button
              display={{ base: "grid", md: "none" }}
              onClick={onToggle}
              as={Link}
              href={"#fade"}
              bgColor={"#08566E"}
              color={"white"}
              mb={5}
              w={"150px"}
              _hover={{ textDecoration: "none", bgColor: "#006C47" }}
            >
              VOIR PLUS
            </Button> */}
            <Flex
              mr={10}
              fontSize={"1rem"}
              display={{ base: "flex", md: "none" }}
              onClick={onToggle}
              href={"#fade"}
            >
              {/* <Button
                  display={{ base: "none", md: "grid" }}
                  onClick={onToggle}
                  // as={Link}
                  // opacity={0.5}
                  href={"#fade"}
                  bgColor={"cyan.700"}
                  color={"red"}
                  mt={[10, 10, 10, 0, 0]}
                  w={"150px"}
                  _hover={{ textDecoration: "none", bgColor: "#006C47" }}
                  leftIcon={<chevronRightIcon fontSize={30}color={"red"} />}
                >
                  VOIR PLUS
                </Button> */}
              Voir Plus <ChevronRightIcon h={6} />
            </Flex>
          </Center>
          <Box
            position={"relative"}
            height={"fit-content"}
            width={"100%"}
            overflow={"hidden"}
            mb={"2em"}
          >
            <IconButton
              display={{ base: "none", md: "grid" }}
              aria-label="left-arrow"
              colorScheme="messenger"
              borderRadius="full"
              position="absolute"
              left={side}
              top={top}
              transform={"translate(0%, -50%)"}
              zIndex={2}
              onClick={() => slider?.slickPrev()}
              bg={"#fff"}
            >
              <BiLeftArrowAlt color="#000" />
            </IconButton>

            <IconButton
              display={{ base: "none", md: "grid" }}
              aria-label="right-arrow"
              colorScheme="messenger"
              borderRadius="full"
              position="absolute"
              right={side}
              top={top}
              transform={"translate(0%, -50%)"}
              zIndex={2}
              onClick={() => slider?.slickNext()}
              bg={"#fff"}
            >
              <BiRightArrowAlt color="#000" />
            </IconButton>

            <Box ml={{ base: 0, md: 20 }}>
              <Slider {...settings} ref={(slider) => setSlider(slider)}>
                {data.map((data, index) => (
                  //  <Center key={data.id}>
                  <Box
                    key={data.id}
                    maxW={["50%", "50%", "50%", "50%", "50%"]}
                    width={"300px"}
                    height={"400px"}
                    // pr={20}
                    // borderWidth="1px"
                    // borderRadius="lg"
                    // overflow="hidden"
                    // paddingLeft={20}
                    // _hover={{
                    //   borderWidth:"1px",
                    // borderRadius:"lg",
                    //  boxShadow:"2xl"

                    // }}
                    // boxShadow={"2xl"}
                    mx={10}
                    mt={4}
                    mb={20}
                    // key={}
                    pb={5}
                  >
                    <Box width={"270px"} height={"fit-content"} pt={10} pl={10}>
                      <Image
                        src={data.imageUrl}
                        alt={data.nom}
                        width={"150px"}
                        height={"150px"}
                        maxH={"519px"}
                        maxW={"208px"}
                      />
                    </Box>

                    <Box p="6">
                      <Box
                        position={"relative"}
                        mt="1"
                        fontWeight="semibold"
                        as="h5"
                        lineHeight="tight"
                        noOfLines={3}
                        minWidth={"200px"}
                        height={"100px"}
                        // display={'flex'}
                        // justifyContent={'space-between'}
                      >
                        <Text mb={3}>{data.nom}</Text>
                        <Box
                          mt={2}
                          mb={3}
                          pb={3}
                          ml={"80%"}
                          textColor={"blue"}
                          color={"blue.400"}
                        >
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
                        {/* <Text>{data.description}</Text> */}
                        <Button
                          bgColor={"cyan.700"}
                          mt={10}
                          borderRadius={"66px"}
                          width={"fit-content"}
                          as={"a"}
                          href={`tel:${sessionStorage.getItem("savefrom")}`}
                          onClick={() => {
                            saveCommande2(data);
                            toast({
                              title: "Reservation En Cours De Validation",

                              status: "success",
                              duration: 10000,
                              isClosable: true,
                            });
                          }}
                          color={"white"}
                          _hover={{
                            backgroundColor: " cyan.900",
                            color: "white ",
                          }}
                          leftIcon={<BsTelephoneOutboundFill />}
                        >
                          {" "}
                          Prendre Rendez-Vous
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                  // </Center>
                ))}

                {/* </SimpleGrid> */}
              </Slider>
            </Box>
          </Box>

          <Collapse in={isOpen} id={"fade"} mt={20} animateOpacity>
            <Center>
              <Text
                mb={20}
                color={"black"}
                fontSize={[20, 20, 15, 20, "1.5rem"]}
              >
                Listes de tous nos produits
              </Text>
            </Center>

            <SimpleGrid columns={[1, 2, 3, 4, 6]} spacing={2}>
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
                        href={`tel:+31${sessionStorage.getItem("savefrom")}`}
                        onClick={() => {
                          saveCommande2(data);
                          toast({
                            title: "Reservation En Cours De Validation",

                            status: "success",
                            duration: 10000,
                            isClosable: true,
                          });
                        }}
                        color={"white"}
                        _hover={{
                          backgroundColor: " cyan.900",
                          color: "white ",
                        }}
                        leftIcon={<BsTelephoneOutboundFill />}
                      >
                        {" "}
                        Prendre Rendez-Vous
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </Collapse>
        </Box>
        <FooterR />
      </>
    );
  } else if (checker != -1 && data.length > 0) {
    // console.log(data.length);
    return (
      <>
        {/* <FirstNav/>
    <Navbar/> */}
        <InputBar />
        {isLagerThan768 ? <Navbar></Navbar> : <></>}
        <Box>
          <Flex w={"100%"} justifyContent={"space-between"}>
            <Flex fontSize={"1rem"}>
              <Text ml={5}>Home</Text>
              <ChevronRightIcon h={6} />

              <Text py={0}>{page}</Text>
            </Flex>
            <Button
              marginTop={2}
              // backgroundColor={"#2480f0"}
              color={"#fff"}
              width={"fit-content"}
              as={"a"}
              // href={`tel:${sessionStorage.getItem("savefrom")}`}
              // onClick={() => {
              //   // saveCommande2(data);
              //   toast({
              //     title: "Veuillez récupérer le numéro svp ",
              //     description:`Le numero est ${sessionStorage.getItem("savefrom")}`,
              //     status: "success",
              //     duration: 100000,
              //     isClosable: true,
              //   });
              // }}
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
            <SimpleGrid columns={[1]} spacing={10} alignItems={""}>
              <link
                rel="stylesheet"
                type="text/css"
                charSet="UTF-8"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
              />
              <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
              />

              <Flex
                mr={10}
                fontSize={"1rem"}
                display={{ base: "none", md: "flex" }}
                onClick={onToggle}
                href={"#fade"}
              >
                {/* <Button
                  display={{ base: "none", md: "grid" }}
                  onClick={onToggle}
                  // as={Link}
                  // opacity={0.5}
                  href={"#fade"}
                  bgColor={"cyan.700"}
                  color={"red"}
                  mt={[10, 10, 10, 0, 0]}
                  w={"150px"}
                  _hover={{ textDecoration: "none", bgColor: "#006C47" }} 
                  leftIcon={<chevronRightIcon fontSize={30}color={"red"} />}
                >
                  VOIR PLUS
                </Button>  */}
                Voir Plus <ChevronRightIcon h={6} />
              </Flex>
            </SimpleGrid>
          </Flex>
          <Center>
            {" "}
            {/* <Button
              display={{ base: "grid", md: "none" }}
              onClick={onToggle}
              as={Link}
              href={"#fade"}
              bgColor={"#08566E"}
              color={"white"}
              mb={5}
              w={"150px"}
              _hover={{ textDecoration: "none", bgColor: "#006C47" }}
            >
              VOIR PLUS
            </Button> */}
            <Flex
              mr={10}
              fontSize={"1rem"}
              display={{ base: "flex", md: "none" }}
              onClick={onToggle}
              href={"#fade"}
            >
              {/* <Button
                  display={{ base: "none", md: "grid" }}
                  onClick={onToggle}
                  // as={Link}
                  // opacity={0.5}
                  href={"#fade"}
                  bgColor={"cyan.700"}
                  color={"red"}
                  mt={[10, 10, 10, 0, 0]}
                  w={"150px"}
                  _hover={{ textDecoration: "none", bgColor: "#006C47" }}
                  leftIcon={<chevronRightIcon fontSize={30}color={"red"} />}
                >
                  VOIR PLUS
                </Button> */}
              Voir Plus <ChevronRightIcon h={6} />
            </Flex>
          </Center>
          <Box
            position={"relative"}
            height={"fit-content"}
            width={"100%"}
            overflow={"hidden"}
            mb={"2em"}
          >
            <IconButton
              display={{ base: "none", md: "grid" }}
              aria-label="left-arrow"
              colorScheme="messenger"
              borderRadius="full"
              position="absolute"
              left={side}
              top={top}
              transform={"translate(0%, -50%)"}
              zIndex={2}
              onClick={() => slider?.slickPrev()}
              bg={"#fff"}
            >
              <BiLeftArrowAlt color="#000" />
            </IconButton>

            <IconButton
              display={{ base: "none", md: "grid" }}
              aria-label="right-arrow"
              colorScheme="messenger"
              borderRadius="full"
              position="absolute"
              right={side}
              top={top}
              transform={"translate(0%, -50%)"}
              zIndex={2}
              onClick={() => slider?.slickNext()}
              bg={"#fff"}
            >
              <BiRightArrowAlt color="#000" />
            </IconButton>

            <Box ml={{ base: 0, md: 20 }}>
              <Slider {...settings} ref={(slider) => setSlider(slider)}>
                {data.map((data, index) => (
                  //  <Center key={data.id}>
                  <Box
                    key={data.id}
                    maxW={["50%", "50%", "50%", "50%", "50%"]}
                    width={"300px"}
                    height={"400px"}
                    // pr={20}
                    // borderWidth="1px"
                    // borderRadius="lg"
                    // overflow="hidden"
                    // paddingLeft={20}
                    // _hover={{
                    //   borderWidth:"1px",
                    // borderRadius:"lg",
                    //  boxShadow:"2xl"

                    // }}
                    // boxShadow={"2xl"}
                    mx={10}
                    mt={4}
                    mb={20}
                    // key={}
                    pb={5}
                  >
                    <Box width={"270px"} height={"fit-content"} pt={10} pl={10}>
                      <Image
                        src={data.imageUrl}
                        alt={data.nom}
                        width={"150px"}
                        height={"150px"}
                        maxH={"519px"}
                        maxW={"208px"}
                      />
                    </Box>

                    <Box p="6">
                      <Box
                        position={"relative"}
                        mt="1"
                        fontWeight="semibold"
                        as="h5"
                        lineHeight="tight"
                        noOfLines={3}
                        minWidth={"200px"}
                        height={"100px"}
                        // display={'flex'}
                        // justifyContent={'space-between'}
                      >
                        <Text mb={3}>{data.nom}</Text>
                        <Box
                          mt={2}
                          mb={3}
                          pb={3}
                          ml={"80%"}
                          textColor={"blue"}
                          color={"blue.400"}
                        >
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
                        {/* <Text>{data.description}</Text> */}
                        <Button
                          bgColor={"cyan.700"}
                          mt={10}
                          borderRadius={"66px"}
                          width={"fit-content"}
                          as={"a"}
                          href={`tel:${sessionStorage.getItem("savefrom")}`}
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
                  // </Center>
                ))}

                {/* </SimpleGrid> */}
              </Slider>
            </Box>
          </Box>

          <Collapse in={isOpen} id={"fade"} mt={20} animateOpacity>
            <Center>
              <Text
                mb={20}
                color={"black"}
                fontSize={[20, 20, 15, 20, "1.5rem"]}
              >
                Listes de tous nos produits
              </Text>
            </Center>

            <SimpleGrid columns={[1, 2, 3, 4, 6]} spacing={2}>
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
                        href={`tel:${sessionStorage.getItem("savefrom")}`}
                        onClick={() => {
                          saveCommande2(data);
                          toast({
                            title: "Reservation En Cours De Validation",

                            status: "success",
                            duration: 10000,
                            isClosable: true,
                          });
                        }}
                        color={"white"}
                        _hover={{
                          backgroundColor: " cyan.900",
                          color: "white ",
                        }}
                        leftIcon={<BsTelephoneOutboundFill />}
                      >
                        {" "}
                        Reserver
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </Collapse>
        </Box>
        <FooterR />
      </>
    );
  } else {
    return (
      <Center>
        <Box>
          <Heading mt="50%">CHARGEMENT</Heading>
          <Flex mt={10}>
            <Image
              src="/loading.gif"
              alt="circle loader"
              width={30}
              height={10}
              mr={10}
            />
            <Link
              href="/"
              fontSize={30}
              _hover={{
                color: "blue.500",
              }}
            >
              {message}
            </Link>
          </Flex>
        </Box>
      </Center>
    );
  }
}
