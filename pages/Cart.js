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


export default function Cart() {
  const router = useRouter();
  const auth = getAuth(app)
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(!user){
        router.push("/Connexion")
      }
      else{
        console.log(user)
      }
    })
  })

  const data = [10, 20, 30];
  const [data2, setData2] = useState();
  useEffect(() => {
    setData2(0);
    console.log(data2);
  });
 
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
      </Center>
      {data.map((data, index) => (
        <Center>
          <Flex
            bgColor={"#F7C29E"}
            width={"621px"}
            height={"205px"}
            border={"1px solid #e6e6e6"}
            boxShadow={"0px 2px 10px"}
            boxSizing={"border-box"}
            borderRadius={"9px"}
            // pb={10}
            mb={20}
          >
            <Box>
              <Image
                src="./images/robe.png"
                width={"117px"}
                height={"139px"}
                ml={15}
                mt={10}
              />
            </Box>
            <Box>
              <Text pb={5} pt={5} fontWeight={"bold"}>
                Zarha
              </Text>
              <Flex>
                <Image src="./images/Star.svg" />
                <Text as={"sup"} fontSize={12}>
                  (59)
                </Text>
              </Flex>
              <Text pt={5}>Robe Blazer</Text>
              <Flex
                borderColor={"#E37611"}
                borderStyle={"solid"}
                borderWidth={"0,5px"}
                width={"full"}
                borderRadius={"4px"}
                // justifyContent={'space-between'}
              >
                <Flex>
                  <Button onclick={() => decrement()}>-</Button>
                  <Input
                    type={"number"}
                    color={"#E37611"}
                    w={"70px"}
                    value={data2}
                    borderColor={"#F7C29E"}
                  />
                  <Button onclick={() => increment()}>+</Button>
                </Flex>
                <Text color={"#E37611"} ml={"90%"}>
                  3500frs
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Center>
      ))}
      <Flex mt={-10} ml={"65%"} mb={"70px"}>
        <Button bgColor={"#816acd"} borderRadius={50} width={100}>
          Valider
        </Button>
      </Flex>
    </>
  );
}
