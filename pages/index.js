import FooterR from "@/components/footerResponsif";
import BarBleu from "@/components/generale/BarBleu";
import LadingCorps from "@/components/generale/LadingCorps";
import SliderComponents from "@/components/generale/SliderComponents";
import InputBar from "@/components/InputBar";
import Navbar from "@/components/Navbar";
import Location from "@/components/location";
import {
  Box,
  Button,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useMediaQuery,
  useToast,
  Link
} from "@chakra-ui/react";
import { MdLocationOn } from "react-icons/md";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiCurrentLocation } from "react-icons/bi";
import { BsGeoAlt } from "react-icons/bs";
import { onValue, ref } from "@firebase/database";
import { db2 } from "@/FIREBASE/clientApp";
import Cookies from "cookies";
import { useRouter } from "next/router";

export default function Home() {
  const [final,setFinal] = useState([""]);
  const [locate, setLocate] = useState("");
  const router = useRouter()
  const [getter,setGetter] = useState([])
  const [isLagerThan768] = useMediaQuery("(min-width: 768px)");
  const [cat, setCat] = useState([]);
  useEffect(()=>{
    localStorage.setItem("index",0)
    const verifPos = localStorage.getItem("location")
    const postale = localStorage.getItem("postal")
    if (verifPos== undefined) {
      localStorage.setItem("location"," ")

    }
    if (postale == undefined || postale== null) {
      router.reload()
      localStorage.setItem("postal","0")
    }
    update()
    updateAll()
  })
  const update = () =>{
    const starCountRef = ref(db2, "/");
    onValue(starCountRef, (snapshot) => {
      const donnes = snapshot.val();
      if (donnes != null) {
        const categorie = Object.keys(donnes).map((key) => ({
          id: key,
          ...donnes[key],
        }))
        setCat(categorie)
       
        
      }
        
    })
  }
  const updateAll = () => {
  
    cat.map((index, key) => {
      const starCountRef2 = ref(db2, index.id + "/");
      onValue(starCountRef2, (snapshot) => {
        const donnees = snapshot.val();
        // console.log(snapshot.val())
        if (donnees != null) {
          const categorie = Object.keys(donnees).map((key) => ({
            id: key,
            ...donnees[key],
          }))
          
          
          // localStorage.setItem(index.id + "Datos", JSON.stringify(categorie));
          // setGetter(JSON.parse(localStorage.getItem(index.id + "Datos")))
        }
      })
    })
    
  }






  return (
    <>
      {/* <BarBleu /> */}
      <InputBar />
      {isLagerThan768 ? <Navbar></Navbar> : <></>}
      <Box width={"100%"} height={"3em"}  mb={4} display={["grid","grid","grid","none","none"]}>
        <Center>  <Text fontSize={"25px"} color={"black"} fontWeight={"semibold"} fontFamily={"system-ui"}>Bienvenue sur Chap</Text></Center>
    
      </Box>
      <Center
              width={"100%"}
              display={["grid", "grid", "grid", "none", "none"]}
            >
              <Box>
                <InputGroup mt={2}  borderRadius={"100px"} mb={5}>
                  <InputRightElement as={Text} width={"10em"}>
                  {Object.values(final[0])[1]}
                  </InputRightElement>
                  <Input
                    borderRadius={"100px"}
                    type={"number"}
                    placeholder="Entrez votre code postal "
                    w={"20em"}
                    maxLength={5}
                    value={locate}
                    // value={postal}
                    onChange={(e) => {
                      localStorage.setItem("postal", e.target.value),
                      setCode(e.target.value),
                      Search(code.slice(0,2))
                    }}
                    // onClick={onOpen}
                  />
                  <InputLeftElement
                    as={Link}
                    href={"#"}
                    borderRaduis={"50%"}
                    _hover={{
                      textDecoration: "none",
                    }}
                    cursor={"pointer"}
                  >
                    <MdLocationOn />
                  </InputLeftElement>
                </InputGroup>
              </Box>
            </Center>
          
      <SliderComponents />
      
      <LadingCorps />

      <FooterR />
    </>
  );
}
