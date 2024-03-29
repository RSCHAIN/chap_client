import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  useToast,
  Center,
} from "@chakra-ui/react";
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from "react-icons/md";
import { BsGithub, BsDiscord, BsPerson } from "react-icons/bs";
import InputBar from "@/components/InputBar";
import Navbar from "@/components/Navbar";
import FooterR from "@/components/footerResponsif";
import { useState } from "react";
import axios from "axios";
import Head from "next/head";
export default function Contact() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [nom, setNom] = useState("");
  const [etatB, setEtatB] = useState("")
  

  const SendMail= async ()=>{

    await axios.post('/api/Send2', {
      message:message.trim() ,
      email: email.toString().trim(),
      nom: nom.toString().trim(),
        }).then((response)=>{alert("Votre Message a Bien été reçu")});
  }


 






  return (
    <Box width={"100%"}>
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
    
      <InputBar />
      <Navbar></Navbar>
      <Center>
        <Box
          bg="#eeeeee "
          color="white"
          borderRadius="lg"
          boxShadow={"10px red"}
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}
        >
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>  
                <Box>
                  <Heading color={"black"}>Nous contacter</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                   Veuillez renseigner vos informations
                  </Text>
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                    <VStack pl={0} spacing={3} alignItems="flex-start">
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        color="blackAlpha.700"
                        _hover={{ border: "2px solid #1C6FEB" }}
                        leftIcon={<MdPhone color="#1970F1" size="20px" />}
                      >
                        06-05-79-90-59
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        color="blackAlpha.700"
                        _hover={{ border: "2px solid #1C6FEB" }}
                        leftIcon={<MdEmail color="#1970F1" size="20px" />}
                      >
                        srschain@gmail.com
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="250px"
                        variant="ghost"
                        color="blackAlpha.700"
                        _hover={{ border: "2px solid #1C6FEB" }}
                        leftIcon={<MdLocationOn color="#1970F1" size="20px" />}
                      >
                        14 Avenue De Bourgogne,<br/> 91300 Massy
                      </Button>
                    </VStack>
                  </Box>
                  <HStack
                    mt={{ lg: 10, md: 10 }}
                    spacing={5}
                    px={5}
                    alignItems="flex-start"
                  >
                    <IconButton
                      aria-label="facebook"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: "#0D74FF" }}
                      icon={<MdFacebook size="28px" />}
                    />
                    <IconButton
                      aria-label="github"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: "#0D74FF" }}
                      icon={<BsGithub size="28px" />}
                    />
                    <IconButton
                      aria-label="discord"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: "#0D74FF" }}
                      icon={<BsDiscord size="28px" />}
                    />
                  </HStack>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box bg="white" borderRadius="lg">
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
                      <FormControl id="name">
                        <FormLabel>Votre Nom</FormLabel>
                        <InputGroup borderColor="#0B0E3F" color="#0B0E3F">
                          {/* <InputLeftElement
                            pointerEvents="none"
                            // children={<BsPerson color="gray.800" />}
                          /> */}
                          <Input
                            type="text"
                            size="md"
                            onChange={(e) => setNom(e.target.value)}
                          />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel>E-Mail</FormLabel>
                        <InputGroup  borderColor="#0B0E3F">
                          {/* <InputLeftElement
                            pointerEvents="none"
                            // children={<MdOutlineEmail color="gray.800" />}
                          /> */}
                          <Input
                            type="text"
                            size="md"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel>Message</FormLabel>
                        <Textarea
                        minLength={30}
                         borderColor="#0B0E3F"
                          // borderColor="gray.300"
                          _hover={{
                            borderRadius: "gray.300",
                          }}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="message"
                        />
                      </FormControl>
                      <FormControl id="name" float="right">
                        <Button
                          variant="solid"
                          bg="#0D74FF"
                          color="white"
                          _hover={{}}
                          isDisabled={nom.length <= 3 || email.length <= 10 || message.length <= 30}
                          onClick={()=>{SendMail(),setNom(""),setEmail(""),setMessage("")}}
                        >
                          Envoyer
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Center>
      <FooterR />
   
    </Box>
  );
}
