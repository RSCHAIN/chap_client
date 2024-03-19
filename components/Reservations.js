import {
  Image,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Select,
  SimpleGrid,
  Box,
  Flex,
  Link,
  Text,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { db } from "@/FIREBASE/clientApp";
import { collection, getDocs, query, where } from "firebase/firestore";
import Modaliser from "./ModalReservation";
import { useRouter } from "next/router";

export default function Reservations() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  ///liste des magasins concernés
  const favlist = ["Le Griffé", "Abidjan-Paris", "Le Massou Lounge"];
  const [all, setAll] = useState([]);
  const [etat, setEtat] = useState([]);
  const jour = new Date();
  const heure = jour.getHours();

  const fetched = () => {
    favlist.map(async (data, index) => {
      const cartRef = collection(db, "Admin"); // Assurez-vous que la collection est correcte.
      const q = query(cartRef, where("organisation", "==", data));

      const querySnapshot = await getDocs(q);

      const data1 = querySnapshot.docs[0].data();

      all.push(data1);
      //console.log(querySnapshot.docs[0].data());
    });
  };
  useEffect(() => {
    
      fetched();
      
   
  }, [etat]);
  const router = useRouter()

  const handleRedirect= ()=>{
   router.push("/RestRes")
   router.reload()
   
  }
  return (
    <>
      <Box
        as={Link}
        href={"/RestRes"}
        
        _hover={{
          bgColor: "transparent",
          opacity: "0.7",
          textDecoration: "none",
        }}
      >
        <Center >
          <Image
           
            width={["35px", "35px", "35px", "70px", "70px"]}
           
            src="./new/reservation2.png"
            cursor={"pointer"}
            alt="Reservation"
          />
          </Center>
          {/* <Button mt={2} display={["none","none","none","block","block"]} bgColor={"cyan.800"} _hover={{
        bgColor:"cyan.800"
      }}>Réserver une table</Button> */}
          <Center>
            <Text
            
              width={"fit-content"}
              fontSize={["15px", "15px", "15px", "25px", "25px"]}
              textAlign={"center"}
              fontWeight={700}
              borderRadius={"25px"}
              color={"black"}
            >
              RESERVER
            </Text>
            </Center>
            <Center>
            <Text
              width={"fit-content"}
              fontSize={["10px", "10px", "10px", "15px", "15px"]}
              textAlign={"center"}
              borderRadius={"25px"}
              color={"black"}
              fontWeight={600}
            >
              Une table
            </Text>
            </Center>
        
      </Box>
      <Drawer onClose={onClose} isOpen={isOpen} size={"full"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Reservation </DrawerHeader>
          <DrawerBody>
            <Center>
              <Text
                fontSize={["15px", "15px", "15px", "25px", "25px"]}
                fontWeight={700}
              >
                Choissisez votre restaurant
              </Text>
            </Center>
            <SimpleGrid columns={[2, 2, 2, 3, 3]}>
              {all.map((data, index) => (
                <Modaliser key={index} data={data} jour={jour} />
              ))}
            </SimpleGrid>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
