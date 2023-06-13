import {
  Flex,
  Heading,
  Input,
  Image,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useMediaQuery,
  Box,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverFooter,
  Button,
  Center,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { ChevronDownIcon } from "@chakra-ui/icons";
import LoginSignButton from "./generale/LoginSignButton";
import InputLg from "./generale/InputLg";
import HeaderBar from "./inscription/HeaderBar";
import SearcheIcone from "./generale/SearcheIcone";
import ResponsiveMenu from "./generale/ResponsiveMenu";
import { Image as Ok } from "next/image";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { TfiHelpAlt } from "react-icons/tfi";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app, authentic } from "@/FIREBASE/clientApp";
import { useRouter } from "next/router";

const InputBar = () => {
  const auth = getAuth(app);
  const router = useRouter();

  const [total, setTotal] = useState("");
  const [lastTime, setLastTime] = useState();

  // const handleMove = () => {

  //   const currentDate = new Date();
  //   const newTime = currentDate.getTime();
  //   const define = parseInt(lastTime) + 4500000;
  //   if (total ==2) {
  //       if (define <newTime) {
  //           signOut(auth);
  //           sessionStorage.removeItem("email")
  //           router.reload();
  //         }
  //   }

  // };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setTotal(2);
      }
    });
    // setLastTime(localStorage.time)
    // handleMove()
  });
  //     const numb=()=>{

  //      const Cart = localStorage.getItem("Cart");
  //      const All = JSON.parse(Cart);
  //      let tot=0
  //      if (All != null) {
  //        All.map((data, index) => {
  //          tot = parseInt(data.quantite) + tot;
  //        });
  //        setTotal(tot);
  //      }

  //      localStorage.setItem("total", total);
  //    };

  const [isLagerThan768] = useMediaQuery("(min-width: 768px)");
  return (
    <>
      <Flex
        width={"100%"}
        height={"4em"}
        align={"center"}
        justifyContent={"space-evenly"}
      >
        {/* le logo  */}
        <Flex
          color={"yellow.400"}
          width={"auto"}
          height={"100%"}
          align={"center"}
          justifyContent={"center"}
          fontWeight={"bold"}
          ml={[0, 0, 0, "5em", "5em"]}
        >
          <Link href={"/"}>
            <Image
              src={"/logo1.png"}
              alt={"Chap"}
              width={{ base: 95, md: 150 }}
              mt={{ base: 0, md: 10 }}
              mr={["2px", "2px", 0, 0, 0]}
            />
          </Link>

          {/* <Ok src={"./logo1.png"} /> */}
        </Flex>

        {/* l'input et les button  */}
        <Flex
          align={"center"}
          justifyContent={"center"}
          width={"auto"}
          height={"full"}
        >
          {isLagerThan768 ? <InputLg /> : <SearcheIcone />}
        </Flex>

        {/* butons se connecter et s'inscrire  */}
        <Flex
          align={"center"}
          justifyContent={"center"}
          width={"auto"}
          height={"full"}
        >
          {isLagerThan768 ? <LoginSignButton /> : <ResponsiveMenu />}

          <Flex
          display={["none","none","none","flex","flex"]}
            align={"center"}
            justifyContent={"center"}
            width={"auto"}
            height={"100%"}
            mr={"1em"}
          >
            {/* <Link display={'flex'} mr={{ base: "3", md: "3" }} fontSize={20} href={"/Connexion"}>
          <Icon as={AiOutlineUser} fontSize={30} mr={2}/> Se connecter
        </Link> */}
            <Popover>
              <PopoverTrigger>
                <Button
                  leftIcon={<Icon as={TfiHelpAlt} fontSize={30} />}
                  _hover={{
                    color: "cyan.700",
                    textDecoration: "none",
                  }}
                  rightIcon={<ChevronDownIcon />}
                  bgColor={"white"}
                >
                  Aide
                </Button>
              </PopoverTrigger>
              <PopoverContent width={"210px"}>
                {/* <PopoverArrow />
           
            <PopoverBody>
              <Center><Button as={Link} href="/Connexion" bgColor="#08566E" color={"white"}_hover={{
                bgColor:"#0f7493",
                textDecoration: "none"
              }}> SE CONNECTER</Button></Center>
            </PopoverBody>
            <PopoverFooter>
             <Link href="/Mybuy" width={"full"}  _hover={{
                textDecoration: "none"
              }} ><Button width={"full"} bgColor={"white"}> Mes commandes</Button></Link>
             <Link href="/profiles" width={"full"} _hover={{
                textDecoration: "none"
              }}><Button width={"full"} bgColor={"white"} >  Mon profils</Button></Link>
             
            </PopoverFooter> */}
              </PopoverContent>
            </Popover>
          </Flex>
          {/* <Link
          mt={5}
            href={"#"}
            mr={3}
            _hover={{ textDecoration: "none", color: "#3a07c4" }}
          >
            <Box display={["none", "none", "none", "grid", "grid"]}>
              <Icon
                as={TfiHelpAlt}
                fontSize={40}
                fontWeight={"thin"}
                color={"#303030"}
              />
              <Text
                textAlign={"center"}
                alignContent={"center"}
                alignItems={"center"}
              >
                AIDE
              </Text>
              
            </Box>
          </Link> */}

          <Flex
          display={["none","none","none","flex","flex"]}
            align={"center"}
            justifyContent={"center"}
            width={"auto"}
            height={"100%"}
            mr={"1em"}
          >
            {/* <Link display={'flex'} mr={{ base: "3", md: "3" }} fontSize={20} href={"/Connexion"}>
          <Icon as={AiOutlineUser} fontSize={30} mr={2}/> Se connecter
        </Link> */}
            <Popover>
              <PopoverTrigger>
                <Link
                  href={"/Cart"}
                  _hover={{
                    bgColor: "white",
                    textDecoration: "none",
                  }}
                >
                  {" "}
                  <Button
                    _hover={{
                      bgColor: "white",
                      color: "cyan.700",
                      textDecoration: "none",
                    }}
                    leftIcon={<Icon as={HiOutlineShoppingBag} fontSize={30} />}
                    bgColor={"white"}
                  >
                    Panier
                  </Button>
                </Link>
              </PopoverTrigger>
            </Popover>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default InputBar;
