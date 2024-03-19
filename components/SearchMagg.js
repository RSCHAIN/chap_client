import {
  Image,
  Button,
  Drawer,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Select,
  Text,
  Card,
  DrawerBody,
  Divider,
  DrawerFooter,
  SimpleGrid,
  Icon,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  Box,
  Center,
  InputGroup,
  InputRightElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { db } from "@/FIREBASE/clientApp";
import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  startAfter,
  startAt,
  endAt,
} from "firebase/firestore";
import { checkStoreAvailability } from "@/utils/dates";
import { set } from "@firebase/database";
import { useRouter } from "next/router";

export default function SearchMagg() {
 const router = useRouter()

 const handleRedirect= ()=>{
  router.push("/RechercheMag")
  router.reload()
  
 }
  return (
    <>
      <Box
      textAlign={"center"}
       as={Link}
       href={"/IntermediatePage"}
     
        width={["100px", "100px", "100px", "150px", "150px"]}
      
        _hover={{
          bgColor: "white",
          opacity: "0.7",
          textDecoration: "none",
        }}
      >
        <SimpleGrid columns={1} textAlign={"center"}>

        
        <Center>
        <Image
       
          
          bgColor= "white"
          width={["50px", "50px", "50px", "100px", "100px"]}
          src="./new/searchTag.png"
          cursor={"pointer"}
          alt="search mag"
        />
        </Center>
<Center >

        <Text
        
        width={"fit-content"}
         
          fontSize={["15px", "15px", "15px", "25px", "25px"]}
          // textAlign={"center"}
          borderRadius={"25px"}
          fontWeight={700}
          color={"black"}
        >
          RECHERCHER
        </Text>
        </Center>
        <Center>
        <Text
       
        width={"fit-content"}
          fontSize={["10px", "10px", "10px", "15px", "15px"]}
          // textAlign={"center"}
          borderRadius={"25px"}
          color={"black"}
          fontWeight={600}
        >
          Un commerce
        </Text>
        </Center>
        </SimpleGrid>
        
      </Box>
     
    </>
  );
}
