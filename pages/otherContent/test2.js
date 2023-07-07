import { db } from "@/FIREBASE/clientApp";
import { Box, Button, Flex, Heading, Link, SimpleGrid, Text } from "@chakra-ui/react";
import { collection, getDocs, query } from "firebase/firestore";
import React, {useState,useEffect} from "react"
const PagButton = (props) => {
    const activeStyle = {
      bg: "brand.600",
      _dark: {
        bg: "brand.500",
      },
      color: "white",
    };
    return (
      <Button
        mx={1}
        px={4}
        py={2}
        rounded="md"
        bg="white"
        color="gray.700"
        _dark={{
          color: "white",
          bg: "gray.800",
        }}
        opacity={props.disabled && 0.6}
        _hover={!props.disabled && activeStyle}
        cursor={props.disabled && "not-allowed"}
        {...(props.active && activeStyle)}
      >
        {props.children}
      </Button>
    );
  };
export default function Tested(){
   
    
    const [imageUrl, setImageUrl] = useState([]);
    const [adresse, setAdresse] = useState([]);
    const [numero, setNumero] = useState([]);
    const [nom, setNom] = useState([]);
    const [categorie, setCategorie] = useState([]);
    const [datas, setDatas] = useState(0);



    // pagination element
    const [tout,setTout] = useState([])
    const [parPage,setParpage] = useState(12)
    const [actu, setActu] = useState(1)
    const TotalPage = parseInt(adresse.length/parPage)
    const pages = [...Array(TotalPage + 1).keys()].slice(1)
    const dernier = actu * parPage;
    const premier = dernier - parPage;
    const visible = categorie.slice(premier, dernier)
  


const Get = async ()=>{
    if (adresse.length == 0 || adresse.length == null || adresse.length== undefined) {
        const q = query(collection(db, "Admin"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      adresse.push(doc.data().adresse);
      imageUrl.push(doc.data().imageUrl);
      numero.push(doc.data().number);
      nom.push(doc.data().organisation);
      categorie.push(doc.data().categorie);
      console.log("okay");
      
    });
    setDatas(1);
    }
    
}
useEffect( ()=>{
    if (datas == 0) {
   Get()
    }
},[Get])



    return(
        <>
    
    {TotalPage} pages
    <Flex>
    <Button>Precedent</Button>
    <Heading>
    <Flex >{pages.map(page=> <Button bgColor={"white"} onClick={() => {setActu(page),console.log(page),console.log(premier)}} _hover={{fontSize:"30px" ,bgColor:"cyan.500"}} key={page} >{page}</Button>)}</Flex>
    </Heading>
    <Button>Suivant</Button>
    </Flex>
    {/* <Flex
      bg="#edf3f8"
      _dark={{
        bg: "#3e3e3e",
      }}
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Flex>
        <PagButton disabled>previous</PagButton>
       {pages.map(page=> <Box _active={{bgColor:"red"}}><PagButton key={page} >{page}</PagButton></Box>)}
        <PagButton>Next</PagButton>
      </Flex>
    </Flex> */}
        <SimpleGrid
        
          columns={[2, 2, 2, 3, 4]}
          spacing={2}
          width={"100%"}
          mt={10}
          ml={[10, 10, 10, 20, 20]}
        >
          {console.log("launched")}
          {visible.map((data, index) => (
            <Box
              key={index}
              height={["50%", "20vh", "20vh", "20vh", "20vh"]}
              width={{ base: "70%", md: "45%" }}
              marginBottom={40}
              mr={5}
              borderRadius={[10,10,50,50,50]}
            >
              <Link
                height={"15vh"}
                width={{ base: "80%", md: "30%" }}
                mt={5}
                mb={5}
                onClick={() => {
                  sessionStorage.setItem("savefrom", numero[index]),
                    sessionStorage.setItem("image", imageUrl[index]),
                    sessionStorage.setItem("nom", nom[index]),
                    sessionStorage.setItem("adresse", adresse[index]),
                    sessionStorage.setItem("categorie", categorie[index]);
                }}
                mr={{ base: "0%", md: "0%" }}
                _hover={{ textDecoration: "none" }}
                href={"/otherContent/intermed1"}
              >
                <Flex
                  height={"100%"}
                  width={"100%"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  borderRadius={50}
                  backgroundImage={imageUrl[index]}
                  backgroundPosition={"center"}
                  backgroundSize={"cover"}
                  backgroundRepeat={"no-repeat"}
                >
                  <Flex
                    alignItems={"center"}
                    justifyContent={"center"}
                    borderRadius={50}
                    height={"100%"}
                    width={"100%"}
                    bg={"rgba(0, 0, 0, 0.277)"}
                  >
                    <Text fontSize={"xl"} color={"#fff"} textAlign={"center"}>
                      {nom[index]}
                    </Text>
                  </Flex>
                </Flex>
              </Link>
              <Box>
                <Text as={"h4"} pb={5} align={"center"}>
                  {adresse[index]}
                </Text>
              </Box>

            </Box>
          ))}
        </SimpleGrid>
               
       
      </>
    )
}