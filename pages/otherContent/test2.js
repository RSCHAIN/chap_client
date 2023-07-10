import { db } from "@/FIREBASE/clientApp";
import { Box, Button, Center, Flex, Heading, Link, Select, SimpleGrid, Text } from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
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
    const [count, setCount] = useState(0);




    // pagination element
    const [tout,setTout] = useState([])
    const [etat,setEtat] = useState(true)
    const [etat1,setEtat1] = useState(false)
    const [parPage,setParpage] = useState(4)
    const [actu, setActu] = useState(1)
    const TotalPage = Math.ceil(tout.length/parPage)
    // numero.push(Math.ceil(tout.length/parPage))
    const pages = [...Array(TotalPage + 1).keys()].slice(1)
   
    const dernier = (actu * parPage );
    const premier = dernier - (parPage);
    const visible = tout.slice(premier, dernier)
    
function Next() {
  if (actu == 0) {
    setEtat(true)
  }
    if (actu == 1   ) {
      setEtat(true)
    }else{setEtat(false)}
    
    if (actu == TotalPage ) {
        setEtat1(true)
    }else{setEtat1(false)}
}

const Get = async ()=>{
  
    if (adresse.length == 0 || adresse.length == null || adresse.length== undefined) {
        const q = query(collection(db, "Admin"), where("categorie","==", `${localStorage.getItem("service")}`));
      
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      adresse.push(doc.data().adresse);
    //   imageUrl.push(doc.data().imageUrl);
    //   numero.push(doc.data().number);
    //   nom.push(doc.data().organisation);
    //   categorie.push(doc.data().categorie);
     
  
      tout.push(doc.data())
      
    });
    setDatas(1);
    }
    
}
useEffect( ()=>{
  setCategorie(localStorage.getItem("service"))
    if (datas == 0) {
   Get()
   
   Next()
   setDatas(1);
    }
   
},[Get])



    return(
        <>
    
  
  
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
                  sessionStorage.setItem("savefrom", data.number),
                    sessionStorage.setItem("image", data.imageUrl),
                    sessionStorage.setItem("nom", data.name),
                    sessionStorage.setItem("adresse", data.adresse),
                    sessionStorage.setItem("categorie", data.categorie);
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
                  backgroundImage={data.imageUrl}
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
                      { data.name}
                    </Text>
                  </Flex>
                </Flex>
              </Link>
              <Box>
                <Text as={"h4"} pb={5} align={"center"}>
                    { data.adresse}
                </Text>
              </Box>
              
            </Box>
            
          ))}
        </SimpleGrid>
        {/* {numero[4] == 1 ? <>
          
        </>:<> */}
        <Center><Text>Vous êtes sur la page {actu}</Text>
          <Select onChange={(e)=>setParpage(e.target.value)}>
          <option value="4" selected>4</option>
          <option value="8">8</option>
            <option value="12">12</option>
            <option value="16">16</option>
            <option value="20">20</option>
          </Select>
        </Center>
        <Center>
         
        <SimpleGrid columns={[1,1,2,3,3]} spacingX={20}>
       
       <Button width={"fit-content"}  onClick={()=>{setActu(actu-1),Next(),setEtat1(false)}} isDisabled={etat}>Precedent</Button>
       <Heading>
       <Flex width={"75%"} >{pages.map(page=> <Button bgColor={"white"} onClick={() =>{setActu(page),Next(),Next()} } _hover={{fontSize:"30px" ,bgColor:"cyan.500"}} key={page} >{page}</Button>)}</Flex>
       </Heading>
       <Button width={"fit-content"}  onClick={()=>{setActu(actu+1),Next(),setEtat(false)}} isDisabled={etat1}>Suivant</Button>
       </SimpleGrid> 
       </Center>
        {/* </>} */}
       
      
       
      </>
    )
}