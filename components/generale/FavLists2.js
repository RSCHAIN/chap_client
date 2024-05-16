import {
  Box,
  Image,
  SimpleGrid,
  Text,
  Link,
  Flex,
  Tooltip,
  Badge,
  Button, useToast, Center
} from "@chakra-ui/react";
import { ref, onValue } from "@firebase/database";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { addDoc, collection, query, where, updateDoc, getDocs } from "firebase/firestore";
import { FaTruck, FaTruckPickup } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import { onAuthStateChanged } from "firebase/auth";
import { authentic, db, db2 } from "@/FIREBASE/clientApp";
import Slider from "react-slick";
import Head from "next/head";


const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 13,
  },
  MDesktop: {
    breakpoint: { max: 3000, min: 2500 },
    items: 12,
  },
  LargeDesktop: {
    breakpoint: { max: 2500, min: 2050 },
    items: 11,
  },
  desktopM: {
    breakpoint: { max: 2050, min: 1750 },
    items: 9,
  },
  desktopL: {
    breakpoint: { max: 1750, min: 1550 },
    items: 8,
  },
  desktop: {
    breakpoint: { max: 1550, min: 1050 },
    items: 5,
  },
  tabletl: {
    breakpoint: { max: 1050, min: 850 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 850, min: 650 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 650, min: 0 },
    items: 2,
  },
};

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};


export default function Favlist2({ categorie, magasin }) {
  const [data, setData] = useState([]);
  const [dataK, setDataK] = useState([]);
  const [tout, setTout] = useState("");
  const [tou, setTou] = useState("");
  const [check, setCheck] = useState(0);
  const toast = useToast();

  const router = useRouter();
  const [all, setAll] = useState("none");

  async function Exist(productKey, email, uid, product) {
    const cartRef = collection(db, "orders"); // Supposons que la collection se nomme 'carts'.
    const q = query(
      cartRef,
      where("email", "==", email),
      where("productId", "==", productKey)
    ); // Requête pour récupérer le panier par userId.

    const querySnapshot = await getDocs(q);

    if (querySnapshot.size === 1) {
      const cartDoc = querySnapshot.docs[0];
      const cartData = cartDoc.data();
      // console.log(cartData)
      const itemIndex = Object.values(cartData).find(
        (item) => item.productId === productKey
      );
      if (itemIndex !== -1) {
        await updateDoc(cartDoc.ref, {
          productId: productKey,
          currentUID: uid,
          orderDescription: product.description,
          orderEtat: product.etat,
          orderNote: product.note,
          orderImageUrl: product.imageUrl,
          orderName: product.nom,
          orderPrice: product.prix,
          orderOrganisation: product.organisation,
          orderQte: querySnapshot.docs[0].data().orderQte + 1,
          email: email,
        });
      }
    } else {
      await addDoc(collection(db, "orders"), {
        productId: productKey,
        currentUID: uid,
        orderDescription: product.description,
        orderEtat: product.etat,
        orderNote: product.note,
        orderImageUrl: product.imageUrl,
        orderName: product.nom,
        orderPrice: product.prix,
        orderOrganisation: product.organisation,
        orderQte: 1,
        email: email,
      });
    }
  }

  function AddToCart(product, productKey) {
    onAuthStateChanged(authentic, async (user) => {
      if (!user) {
        toast({
          title: "Veuillez vous connectez !!!",

          status: "error",
          duration: 10000,
          isClosable: true,
        });

      } else {
        try {
          await Exist(productKey, user.email, user.uid, product);
          // router.reload();
          router.replace(router.asPath)
          toast({
            title: "Produit ajouté!!!",

            status: "success",
            duration: 9000,
            isClosable: true,
          });
        } catch (error) { console.log(error) }
      }
    });
  }

  const Fav = async () => {
    try {
      //   const starCountRef = ref(db2, `${categorie}/${magasin}`);
      // onValue(starCountRef, (snapshot) => {
      //   setData(snapshot.val());
      //   // console.log(snapshot.val())
      // });
      const q = query(collection(db, "ServicesFav"));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.data())
        // console.log(card)
        Object.keys(doc.data()).map((dat, index) => {
          // console.log(dat)

          if (dat != categorie) {
            setAll("grid");
            // console.log(doc.data())
            doc.data()[dat].map((datee, index) => {
              if (datee.length >= 3 && datee != magasin) {

                const starCountRef = ref(db2, `${dat}/${datee}`);
                onValue(starCountRef, (snapshot) => {
                  setTout(dat);
                  setData(snapshot.val());
                  Object.keys(snapshot.val()).map((data, index) => {
                    dataK[index] = data

                  })
                });
              }
            });
          }
        });
      });
    } catch {
      (error) => {
        console.log("Waiting time 2!!!");
      };
    }

    // const db = getDatabase();
  };

  useEffect(() => {
    if (check == 0 || check == 1) {
      Fav();

      setCheck(check + 1);
    }

    // setTout(data.length())
  }, [check, Fav]);

  const [slider, setSlider] = useState(null);

  const date2 = new Date();
  const dateExp = date2.setDate(date2.getDate() + 1);
  const dateExp2 = new Date(dateExp);
  const dateExp3 = dateExp2.toLocaleDateString();

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
      {data ? (
        <>
          <Box display={{ base: "none", lg: "block" }} ml={[0, 0, 0, 5, 10]} width={["90%", "90%", "90%", "100%", "90%"]} my={5} >
            <SimpleGrid columns={[1, 1, 2, 5, 5]} >
              {Object.values(data).slice(0, 5).map((data, index) => (
                <Box as="a" key={index} href={`/Details/details?c=${tout}&m=${data.organisation}&p=${dataK[index]}`} boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"} mx={[2, 2, 2, 5, 5]} mb={5} bgColor={"white"}>

                  <Box
                    mx={5}
                    key={data.id}
                    maxW={"fit-content"}
                    // height={"400px"}
                    my={[0, 0, 0, 5, 5]}
                    borderRadius="lg"
                    display={"grid"}
                    pb={10}

                  // bgColor={"white"}
                  // p={5}
                  // pb={10}
                  // key={index}
                  // my={5}
                  // height={"21.25rem"}
                  // width={"13rem"}
                  >
                    {data.etat == "Disponible" ? (
                      <Box
                        mt={-5}
                        mb={2}
                        ml={-5}
                        color={"white"}

                        fontSize={"12px"}
                        borderRadius={25}
                        px={2}
                        width={"80px"}
                        height={"fit-content"}
                        bgColor="#7ed957"
                      >
                        Disponible
                      </Box>
                    ) : (
                      <Badge
                        mt={-5}
                        mb={2}
                        ml={-5}
                        color={"white"}

                        fontSize={"12px"}
                        borderRadius={25}
                        px={2}
                        width={"80px"}
                        height={"fit-content"}
                        bgColor="red"
                      >
                        Rupture
                      </Badge>
                    )}
                    <Image
                      height={["150px", "150px", "150px", "150px", "150px"]}
                      width={["150px", "150px", "150px", "150px", "150px"]}
                      src={data.imageUrl}
                      alt={data.nom}
                    />
                    <Box height={"fit-content"} >
                      <Text
                        width={["150px", "150px", "150px", "fit-content", "fit-content"]}
                        noOfLines={2}
                        fontSize={"15px"}
                        fontWeight={700}
                        lineHeight={1.1}
                      >
                        {data.nom}
                      </Text>
                      <Text
                        cursor={"pointer"}
                        as="a" href={`/otherContent/intermed1?categorie=${tout}&magasin=${data.organisation}`}
                        fontWeight={"bold"}
                        width={"fit-content"}
                        color={"orange.900"}
                        fontSize={"10px"}
                      >
                        {data.organisation}
                      </Text>
                    </Box>
                    <Flex>
                      <AiOutlineStar fontSize={"12px"} />
                      <AiOutlineStar fontSize={"12px"} />
                      <AiOutlineStar fontSize={"12px"} />
                      <AiOutlineStar fontSize={"12px"} />
                      <AiOutlineStar fontSize={"12px"} />
                    </Flex>
                    {data.duree == "Expedié en 24h" ? (
                      <Text fontWeight={"thin"} fontSize={10}>
                        Livré le {dateExp3}{" "}
                      </Text>
                    ) : (
                      <Text fontWeight={"thin"} fontStyle={"oblique"} fontSize={"12px"}>{data.duree} </Text>
                    )}
                    <Flex>
                      <FaTruck />
                      <Tooltip
                        label={`Prix superieur à 30€ Ou être en île-de-france`}
                      >
                        <Flex>
                          <Text ml={2} fontSize={"10px"} fontWeight={700}>
                            Livraison gratuite{" "}
                          </Text>
                          <Text fontSize={"15px"} mt={-1} color={"red"}>
                            *
                          </Text>
                        </Flex>
                      </Tooltip>
                    </Flex>

                    <Flex justifyContent={"space-between"} width={["90%", "80%", "100%", "100%", "100%"]}>
                      <Text></Text>
                      <Text
                        textColor={"blue"} color={"blue.400"} fontWeight={"bold"} fontSize={"15px"}
                      >
                        {data.prix}€
                      </Text>
                    </Flex>
                  </Box>


                </Box>
              ))}
            </SimpleGrid>
          </Box>


          <Box display={{ base: "grid", lg: "none" }} width={"100%"} mt={[0, 0, 0, 10, 10]} bgColor={"white"}>
            <Carousel responsive={responsive} style={"marginLeft='20px'"}>
              {Object.values(data).slice(0, 6).map((data, index) => (
                <Box as="a" key={index} href={`/Details/details?c=${tout}&m=${data.organisation}&p=${dataK[index]}`} boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"} mx={[2, 2, 2, 5, 5]} mb={5} bgColor={"white"}>

                  <Box
                    mx={2}
                    key={data.id}
                    maxW={"200px"}
                    // height={"400px"}
                    my={[0, 0, 0, 5, 5]}
                    pl={5}
                    borderRadius="lg"
                    display={"grid"}
                    pb={10}
                    bgColor={"white"}
                    boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}

                  // bgColor={"white"}
                  // p={5}
                  // pb={10}
                  // key={index}
                  // my={5}
                  // height={"21.25rem"}
                  // width={"13rem"}
                  >
                    {data.etat == "Disponible" ? (
                      <Box
                        mb={2}
                        ml={-5}
                        px={2}
                        color={"white"}
                        fontSize={"15px"}
                        borderRadius={25}
                        width={"fit-content"}
                        height={"fit-content"}
                        bgColor="#7ed957"

                      >
                        Disponible
                      </Box>
                    ) : (
                      <Box

                        mb={2}
                        ml={-5}
                        px={2}
                        color={"white"}
                        fontSize={"15px"}
                        borderRadius={25}
                        width={"fit-content"}
                        height={"fit-content"}
                        bgColor="red"
                      >
                        Rupture
                      </Box>
                    )}
                    <Image
                      height={["150px", "150px", "150px", "150px", "150px"]}
                      width={["150px", "150px", "150px", "200px", "200px"]}
                      src={data.imageUrl}
                      alt={data.nom}
                    />
                    <Box height={"fit-content"} mb={2}>
                      <Text
                        width={["150px", "150px", "150px", "200px", "200px"]}
                        noOfLines={2}
                        fontSize={"15px"}
                        fontWeight={700}
                      >
                        {data.nom}
                      </Text>
                      <Text
                        cursor={"pointer"}
                        as="a" href={`/otherContent/intermed1?categorie=${tout}&magasin=${data.organisation}`}
                        fontWeight={"bold"}
                        width={"fit-content"}
                        color={"orange.900"}
                        fontSize={"10px"}
                      >
                        {data.organisation}
                      </Text>
                    </Box>
                    <Flex>
                      <AiOutlineStar fontSize={"12px"} />
                      <AiOutlineStar fontSize={"12px"} />
                      <AiOutlineStar fontSize={"12px"} />
                      <AiOutlineStar fontSize={"12px"} />
                      <AiOutlineStar fontSize={"12px"} />
                    </Flex>
                    {data.duree == "Expedié en 24h" ? (
                      <Text fontWeight={"thin"} fontSize={10}>
                        Livré le {dateExp3}{" "}
                      </Text>
                    ) : (
                      <Text fontWeight={"thin"} fontSize={"12px"}>{data.duree} </Text>
                    )}
                    <Flex>
                      <FaTruck />
                      <Tooltip
                        label={`Prix superieur à 30€ Ou être en île-de-france`}
                      >
                        <Flex>
                          <Text ml={2} fontSize={"10px"} fontWeight={700}>
                            Livraison gratuite{" "}
                          </Text>
                          <Text fontSize={"15px"} mt={-1} color={"red"}>
                            *
                          </Text>
                        </Flex>
                      </Tooltip>
                    </Flex>

                    <Flex justifyContent={"space-between"} width={["90%", "80%", "100%", "100%", "100%"]}>
                      <Text></Text>
                      <Text
                        color={"cyan.700"}

                        fontWeight={"bold"}
                      // fontSize={"20px"}
                      >
                        {data.prix}€
                      </Text>
                    </Flex>
                  </Box>


                </Box>
              ))}
            </Carousel>
          </Box>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
