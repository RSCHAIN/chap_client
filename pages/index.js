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
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiCurrentLocation } from "react-icons/bi";
import { BsGeoAlt } from "react-icons/bs";
import { onValue, ref } from "@firebase/database";
import { db2 } from "@/FIREBASE/clientApp";
import Cookies from "cookies";

export default function Home() {
  const [getter,setGetter] = useState([])
  const [isLagerThan768] = useMediaQuery("(min-width: 768px)");
  const [cat, setCat] = useState([]);
  useEffect(()=>{
    const verifPos = localStorage.getItem("location")
    if (verifPos== undefined) {
      localStorage.setItem("location","")
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
        localStorage.setItem("women", JSON.stringify(categorie));
        
      }
        
    })
  }
  const updateAll = () => {
  
    cat.map((index, key) => {
      const starCountRef2 = ref(db2, index.id + "/");
      onValue(starCountRef2, (snapshot) => {
        const donnees = snapshot.val();
        console.log(snapshot.val())
        if (donnees != null) {
          const categorie = Object.keys(donnees).map((key) => ({
            id: key,
            ...donnees[key],
          }))
          
          
          localStorage.setItem(index.id + "Datos", JSON.stringify(categorie));
          setGetter(JSON.parse(localStorage.getItem(index.id + "Datos")))
        }
      })
    })
    
  }






  return (
    <>
      {/* <BarBleu /> */}
      <InputBar />
      {isLagerThan768 ? <Navbar></Navbar> : <></>}
      <SliderComponents />
     
      <LadingCorps />

      <FooterR />
    </>
  );
}
