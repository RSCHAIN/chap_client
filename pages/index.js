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

export default function Home() {
  const [isLagerThan768] = useMediaQuery("(min-width: 768px)");
  useEffect(()=>{
    const verifPos = localStorage.getItem("location")
    if (verifPos== undefined) {
      localStorage.setItem("location","")
    }
  })
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
