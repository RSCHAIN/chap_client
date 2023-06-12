import React, { useState, useEffect } from "react";
import FooterR from "@/components/footerResponsif";
import {
  Box,
  Button,
  Center,
  Collapse,
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
import {IoMdAddCircleOutline} from 'react-icons/io'
// And react-slick as our Carousel Lib
import Slider from "react-slick";

// import Image from "next/image";
import { ChevronRightIcon, StarIcon } from "@chakra-ui/icons";
// import FirstNav from "@/components/firstNav";
// import Navbar from "@/components/navbar";
import { useRouter } from "next/router";
import { db2 } from "@/FIREBASE/clientApp";
import { ref, onValue } from "firebase/database";

// Settings for the slider
const settings = {
  dots: false,
  infinite: false,
  speed: 2000,
  slidesToShow: 3,
  slidesToScroll: 2,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: false,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
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

export default function Carousel() {
  const [data, setData] = useState([]);
  const [cat, setCat] = useState([]);
  const toast = useToast();
  const router = useRouter();
  const [page, setPage] = useState("");
  const [check, setCheck] = useState("");
  const [checker, setChecker] = useState(1);
  const [product, setProduct] = useState();

  useEffect(() => {
    //attribution du link
    const link = router.asPath
      .replace("/", "")
      .toString()
      .replace("#fade", "")
      .trimEnd()
      .trimStart()
      .replace("%20", " ");
    // console.log(link);
    setChecker(router.asPath.replace("/", "").toString());
    //attribution du link de la page
    setPage(
      router.asPath
        .replace("/", "")
        .toString()
        .replace("#fade", "")
        .trimEnd()
        .trimStart()
        .replace("%20", " ")
        .replace("/", ">")
    );

    //connexion et fetch des datas depuis notre db
    const starCountRef = ref(db2, link);
   
    onValue(starCountRef, (snapshot) => {
      console.log(snapshot.val())
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
  const { isOpen, onToggle } = useDisclosure();
  const message ="Revenir á l'accueil"
  if (data.length > 0) {
    // console.log(data.length);
    return (
      <>
        {/* <FirstNav/>
    <Navbar/> */}
        <InputBar />
        {isLagerThan768 ? <Navbar></Navbar> : <></>}
        <Box>
          <Flex fontSize={25} ml={35}>
            <Text>Home</Text>
            <ChevronRightIcon h={10}/>

            <Text py={0} fontSize={25}>
              {page}
            </Text>
            <br />
          </Flex>
          <SimpleGrid columns={[1,1,1,2,3]} spacing={10}>
            {/* {router.asPath.replace('/','')} */}
           

            {/* CSS files for react-slick */}
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
            <Box
            >
              <Button
                onClick={onToggle}
                as={Link}
                href={"#fade"}
                bgColor={"#08566E"}
                color={"white"}
                mt={[10, 10, 10, 0, 0]}
                ml={[10,10,10,0,0]}
                w={"150px"}
                _hover={{textDecoration:'none',bgColor:'#006C47' }}
              >
                VOIR PLUS
              </Button>
            </Box>

            {/* Left Icon */}
            <Flex>
              <IconButton
                aria-label="left-arrow"
                colorScheme="messenger"
                borderRadius="full"
                mr={10}
                left={side}
                top={top}
                transform={"translate(0%, -50%)"}
                zIndex={2}
                onClick={() => slider?.slickPrev()}
                display={{base:"none",md:'grid'}}
              >
                <BiLeftArrowAlt />
              </IconButton>
              {/* Right Icon */}
              <IconButton
                aria-label="right-arrow"
                colorScheme="messenger"
                borderRadius="full"
                display={{base:"none",md:'grid'}}
                ml={20}
                right={side}
                top={top}
                transform={"translate(0%, -50%)"}
                zIndex={2}
                onClick={() => slider?.slickNext()}
              >
                <BiRightArrowAlt />
              </IconButton>
            </Flex>

            {/* Slider */}
          </SimpleGrid>
          <Slider {...settings} ref={(slider) => setSlider(slider)}>
            {data.map((data, index) => (
             <Center key={data.id}>
                <Box
                  maxW={["100%","70%","70%","70%","70%"]}
                  width={"270px"}
                  height={"400px"}
                  borderWidth="1px"
                  borderRadius="lg"
                  // overflow="hidden"
                
                  // boxShadow={"2xl"}
                 
                 mt={4}
                  mb={20}
                  // key={}
                  // pb={5}
                >
                  <Box width={"270px"} height={"fit-content"} pt={10} pl={10}>
                    <Image src={data.imageUrl} alt={data.nom} width={"208px"} height={"208px"} maxH={'519px'}maxW={"208px"} />
                  </Box>

                  <Box p="6">
                    <Box
                      // mt="1"
                      fontWeight="semibold"
                      as="h5"
                      lineHeight="tight"
                      noOfLines={3}
                      minWidth={'280px'}
                      height={"70px"}
                      // display={'flex'} 
                      // justifyContent={'space-between'}
                    >
                      <Text noOfLines={2} width={'200px'}>{data.nom}</Text>
                      <Box position>
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
                        bgColor={"blue"}
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
                        backgroundColor:' #00FFEF',
                        color:'#080904 '
                       }}
                       leftIcon={<IoMdAddCircleOutline/>}
                      >
                        {" "}
                        Ajouter au panier
                      </Button>
                    </Box>

                  </Box>
                </Box>
              </Center> 
            ))}
            {/* </SimpleGrid> */}
          </Slider>
          <Collapse in={isOpen} id={"fade"} animateOpacity>
            <Center>
              <Text color={"black"} fontSize={[20,20,30,50,50]}>
                Listes de tous nos produits
              </Text>
            </Center>

            <SimpleGrid columns={[1, 1, 1, 3, 4]} spacing={5}>
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
                  maxW={["100%","70%","70%","70%","70%"]}
                  width={"270px"}
                  height={"400px"}
                  borderWidth="1px"
                  borderRadius="lg"
                  // overflow="hidden"
                
                  // boxShadow={"2xl"}
                 
                 mt={4}
                  mb={20}
                  // key={}
                  // pb={5}
                >
                  <Box width={"270px"} height={"fit-content"} pt={10} pl={10}>
                    <Image src={data.imageUrl} alt={data.nom} width={"208px"} height={"208px"} maxH={'519px'}maxW={"208px"} />
                  </Box>

                  <Box p="6">
                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h5"
                      lineHeight="tight"
                      noOfLines={3}
                      minWidth={'280px'}
                      height={"50px"}
                      // display={'flex'} 
                      // justifyContent={'space-between'}
                    >
                      <Text>{data.nom}</Text>
                      <Box position>
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
                        bgColor={"blue"}
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
                        backgroundColor:' #00FFEF',
                        color:'#080904 '
                       }}
                       leftIcon={<IoMdAddCircleOutline/>}
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
  } else {
    return (
      <Center>
        <Box>
          <Heading mt="50%">CHARGEMENT</Heading>
          <Flex mt={10}>
            <Image
              src="./loading.gif"
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
