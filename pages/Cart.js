import Navbar from "@/components/Navbar";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiStar } from "react-icons/bi";
import InputBar from "@/components/InputBar";
import { useMediaQuery } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "@/FIREBASE/clientApp";
import Carte from "@/components/Cart";



export default function Cart() {

  
  
  const router = useRouter();
  const auth = getAuth(app);
  useEffect(() => {
   
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/Connexion");
      } 
    });
  });

  const data = [10, 20, 30];
  const [data2, setData2] = useState();
  useEffect(() => {
    setData2(0);
    
  }, [data2]);

  const [isLagerThan768] = useMediaQuery("(min-width: 768px)");
  return (
    
    <>

      {/* <Navbar />
       */}
      <InputBar />
      {isLagerThan768 ? <Navbar></Navbar> : <></>}
      <Center>
        <Flex pb={20}>
          <Text fontSize={40} fontWeight={"bold"}>
            Panier
          </Text>
        </Flex>
        <Flex>
       
        </Flex>
       
      </Center>
      <Carte/>
    </>
  );
}

