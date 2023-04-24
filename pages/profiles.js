import Navbar from "@/components/Navbar";
import InputBar from "@/components/InputBar"; 
import { Box, Button, Center, Flex, Heading, Input, Text, useMediaQuery } from "@chakra-ui/react";
import Footer from "@/components/footer";
import FooterR from "@/components/footerResponsif";
import { app } from "@/FIREBASE/clientApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
export default function Profiles() {
    const [users, setUsers] = useState("");
    const auth = getAuth(app);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsers(user);
      }
    });
  });
    const [isLagerThan768] = useMediaQuery("(min-width: 768px)");
  return( <>

  <Box bgColor={'#FFDEE9'} bgGradient={'linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%);'} >
  <InputBar/>
        {isLagerThan768 ? <Navbar></Navbar> : <></>}
        <Center my={20}>
        <Box w='lg' borderWidth='1px' px={10} mb={5} pb={10} shadow='md' borderRadius='lg' overflow='hidden'>
            <Flex pt={5}>
                <Text pt={2}>Nom</Text>
                <Input type={'text'} value={'hello'} w={'xs'} ml={5}/>
            </Flex>
            <Flex pt={5}>
                <Text pt={2}>Email</Text>
                <Input type={'text'} defaultValue={users.email} w={'xs'} onChange={e=>console.log(e.target.value)} ml={5}/>
            </Flex>
            
            <Heading pt={5}>Information Personnelles</Heading>
          
            <Flex pt={5}>
                <Text pt={2}>addresse</Text>
                <Input type={'text'} value={'hello'} w={'xs'} ml={5}/>
            </Flex>
            <Flex pt={5}>
                <Text pt={2}>Prenom</Text>
                <Input type={'text'} value={'hello'} w={'xs'} ml={5}/>
            </Flex>
            <Flex pt={5}>
                <Text pt={2}>numero de telephone</Text>
                <Input type={'text'} value={'hello'} w={'xs'} ml={5}/>
            </Flex>
           <Center>
           <Flex mt={10}> 
                <Button>Mettre a jour les donnees</Button>
                
            </Flex>
           </Center>
            
        </Box>
        </Center>
        <FooterR/>
  </Box>
  
    </>);
}
