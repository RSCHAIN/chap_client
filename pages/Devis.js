import { Box,Flex,Center,Heading,Text,Image, Input,Button,InputGroup,InputRightElement, Select } from "@chakra-ui/react";
import InputBar from "@/components/InputBar";
import Navbar from "@/components/Navbar";

export default function Devis(){
  const slog="Comparer différents transporteur et faites des économies avec CHAP  "
  const slog1 = " Envoyez vos colis facilement sans inscription : comprarez les envois de vos colis, remplissez les informations d'expedition, payez et préparez le colis pour le transporteur. SUivez votre colis a tout moment sur le site web Packlink."
  return(
    <>
    <InputBar />
    <Navbar></Navbar>
    <Center width="100%" mt={20}>
    <Box width="70%" >
      <Flex>
        <Box width={"70%"} height={"fit-content"} boxShadow={"lg"} rounded={'xl'} p={5} border={"1px solid black"} mr={10} >
          <Box  mb={5}>
            <Box>
            <Text  mb={2}>Email : </Text>
          <Input width={"50%"} placeholder={"email"} /> 
            </Box>
            <Box>
            <Text  mb={2}>Numéro : </Text>
          <Input width={"50%"} placeholder={"email"} /> 
            </Box>
          </Box>
          <Box>
            <Box mb={5}>
              <Text mb={2}>De</Text>
              <Flex>
              <Select variant='outline' placeholder='Pays' mr={5}/>
              <Select variant='outline' placeholder='Ville ou code postal' />
              </Flex>
            </Box>
            <Box mb={5}>
              <Text mb={2}>A</Text>
              <Flex >
              <Select variant='outline' placeholder='Pays' mr={5}/>
              <Select variant='outline' placeholder='VIlle ou code postal' />
              </Flex>
            </Box>
            <Box mb={5}>
              <Text mb={2}>COLIS</Text>
              <Flex width={"100%"}>
                <InputGroup width={"40%"}>
                <Input type={"Text"}  placeholder={"Poids"} mr={2}/> 
                <InputRightElement>
               <Text>kg</Text>
               </InputRightElement>
                </InputGroup>
               <InputGroup width={"40%"} >
               <Input type={"Text"} placeholder={"Longueur"}  />
               <InputRightElement>
               <Text>cm</Text>
               </InputRightElement>
               </InputGroup>
               <InputGroup width={"40%"}>
               <Input type={"Text"} placeholder={"Largeur"}   />
               <InputRightElement>
               <Text>cm</Text>
               </InputRightElement>
               </InputGroup>
               <InputGroup width={"40%"} >
               <Input type={"Text"} placeholder={"hauteur"}  />
               <InputRightElement>
               <Text>cm</Text>
               </InputRightElement>
               </InputGroup>
              </Flex>
            </Box>
            <Button width={"100%"} bgColor={"cyan.900"} color={"white"}>Envoyer dès maintenant</Button>
          </Box>

        </Box>
        <Box width={"40%"}>
        <Image src='./pic2.jpg' alt="image livraison" />
          <Heading>{slog}</Heading>
       
          <Text fontWeight={"semibold"} textAlign={"justify"} width={"85%"}>
           {slog1}
          </Text>
        
        </Box>
      </Flex>
    </Box>
    </Center>
    </>
  )
}