import InputBar from "@/components/InputBar";
import Navbar from "@/components/Navbar";
import FooterR from "@/components/footerResponsif";
import { Button, Center, Flex, Link, useMediaQuery,Box,Icon,Text} from "@chakra-ui/react";
import {FaRegUserCircle} from 'react-icons/fa'

export default function Intermediary() {
  const [isLagerThan768] = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <InputBar />
      {isLagerThan768 ? <Navbar></Navbar> : <></>}
      <Center mt={"15%"} mb="20%">
        <Flex display={["grid","grid","flex","flex","flex"]}>
          {/* <Box>
          <Link
            href={"/Connexion"}
            _hover={{
              textDecoration: "none",
            }}
          >
            <Box>
              <Icon as={FaRegUserCircle} fontSize={70} />
              <Text fontSize={30} fontWeight={'semibold'}>Client</Text>
            </Box>
          </Link>
          </Box>
           */}


          <Box mr={5} _hover={{color:"cyan.700"}}>
          <Link
            href={"/Connexion"}
            _hover={{ 
              textDecoration: "none",
            }}
          >
            <Box color={"cyan.700"}>
             <Center> <Icon as={FaRegUserCircle}  fontSize={50} /></Center>
             <Center><Text fontSize={20} fontWeight={'semibold'}>Client</Text></Center>
            </Box>
          </Link>
          </Box>


          
          


          {/* <Box mr={5} _hover={{color:"cyan.700"}}>
          <Link
           href="https://chapbackofficelivreur-regz6oep6-josiassehi-rschainnet.vercel.app/"
           isExternal
     
            _hover={{
              textDecoration: "none",
            }}
          >
            <Box color={"cyan.700"}>
            <Center> <Icon as={FaRegUserCircle} fontSize={50} /></Center>
              <Center><Text fontSize={20} fontWeight={'semibold'}>Livreur</Text></Center>
            </Box>
          </Link>
          </Box> */}
          <Box  _hover={{color:"cyan.700"}}>
        
          <Link
           href={"https://chapbackofficefournisseur.vercel.app/"}
           isExternal
            _hover={{
              textDecoration: "none",
            }}
          >
            <Box color={"cyan.700"}>
             <Center> <Icon as={FaRegUserCircle} mr={5}fontSize={50} /></Center>
             <Center><Text fontSize={20} fontWeight={'semibold'}>Fournisseur</Text></Center>
            </Box>
          </Link>
          </Box>

          {/* <Link
            href={"https://chapbackofficefournisseur.vercel.app/"}
            isExternal
            mr={10}
            _hover={{
                textDecoration: "none",
              }}
          >
            <Button bgColor={"cyan.50"} _hover={{
              bgColor:"cyan.700"
            }}>Connexion Fournisseur</Button>
          </Link> */}
          {/* <Link
            href="https://chapbackofficelivreur-regz6oep6-josiassehi-rschainnet.vercel.app/"
            isExternal
            mr={10}
            _hover={{
                textDecoration: "none",
              }}
          >
            <Button bgColor={"cyan.50"} _hover={{
              bgColor:"cyan.700"
            }}>Connexion Livreur</Button>
          </Link> */}
        </Flex>
      </Center>
      <FooterR/>
    </>
  );
}
