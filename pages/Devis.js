import { Box,Flex,Center,Heading,Text,Image, Input,Button,InputGroup,InputRightElement, Select, SimpleGrid } from "@chakra-ui/react";
import InputBar from "@/components/InputBar";
import Navbar from "@/components/Navbar";

export default function Devis(){
  const slog="Comparer différents transporteur et faites des économies avec CHAP  "
  const slog1 = "Envoyez vos colis vers vers l'Afrique de l'ouest par nos partenaires. Remplissez le formulaire et attendez notre retour mail si vous ne possédez pas un CHAP, sinon vérifiez l'onglet devis de votre compte. Un fois reçu les différentes propositions de nos partenaires, vous pourrez choisir, payer et préparer le colis pour le transporteur."
  return(
    <>
    <InputBar />
    <Navbar></Navbar>
    <Center width="100%" mt={20} height="fit-content" mb={10}>
      
    <Box width="70%" >
      <Flex>
      <SimpleGrid columns={[1,1,1,2,2]} width={"100%"}>
        <Box width={["100%","100%","100%","70%","70%"]} height={"fit-content"} boxShadow={"lg"} rounded={'xl'} p={5} border={"1px solid black"} mr={10} >
          <Box  mb={5} display={"flex"} width={"100%"}>
            <Box width={"50%"} mr={5}>
            <Text  mb={2}>Email : </Text>
          <Input width={"100%"} placeholder={"email"} /> 
            </Box>
            <Box width={"50%"}>
            <Text  mb={2}>Numéro : </Text>
          <Input width={"100%"} placeholder={"Numero"} /> 
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
            <Box mb={5} width={"100%"}>
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
        <Box width={["100%","100%","100%","40%","40%"]}>
        <Image src='./pic2.jpg' alt="image livraison" />
          <Heading fontSize={"20px"} textAlign={["right","right","right","left","left"]}>{slog}</Heading>
       
         
        
        </Box>
        </SimpleGrid>
      </Flex>
      <Text fontWeight={"semibold"} textAlign={"justify"} width={"100%"} my={"40px"}>
           {slog1}
          </Text>
    </Box>
  
    </Center>
    </>
  ) 
}