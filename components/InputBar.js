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
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
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
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          setTotal(2)
        }
      });
    // setLastTime(localStorage.time)
    // handleMove()
  })
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
        width={"full"}
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
          ml={[0, 0, "5em", "5em", "5em"]}
        >
          <Link href={"/"}>
            <Image
              src={"/logo1.png"}
              alt={"Chap"}
              width={{ base: 95, md: 150 }}
              mt={{ base: 0, md: 10 }}
              mr={["5px", "5px", 0, 0, 0]}
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

          <Link
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
              {/* <Text bgColor={'#08566E'} h={'fit-content'} padding={1} borderRadius={50} color={'white'}fontSize={20}>{total}</Text> */}
            </Box>
          </Link>

          <Link
             mt={5}
            href={"/Cart"}
            mr={3}
            _hover={{ textDecoration: "none", color: "#3a07c4" }}
          >
            <Box display={["none", "none", "none", "grid", "grid"]}>
              <Icon
                as={HiOutlineShoppingBag}
                fontSize={40}
                fontWeight={"thin"}
                color={"#303030"}
              />
              <Text
                textAlign={"center"}
                alignContent={"center"}
                alignItems={"center"}
              >
                PANIER
              </Text>
              {/* <Text bgColor={'#08566E'} h={'fit-content'} padding={1} borderRadius={50} color={'white'}fontSize={20}>{total}</Text> */}
            </Box>
          </Link>
        </Flex>
      </Flex>
    </>
  );
};

export default InputBar;
