import { db } from "@/FIREBASE/clientApp";
import FooterR from "@/components/footerResponsif";
import { Box, Button, Center, Flex, Heading, Image, Link, Select, SimpleGrid, Text } from "@chakra-ui/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import React, {useState,useEffect} from "react"
import secureLocalStorage from "react-secure-storage";
import Head from "next/head";
import Horaire from "./Horaire";
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
   const router = useRouter()
   const [jour,setJour] =useState(0)
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
    const [parPage,setParpage] = useState(8)
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
  
    if (datas==0) {
        const q = query(collection(db, "Admin"), where("categorie","==", `${secureLocalStorage.getItem("service")}`),orderBy("organisation"));
      
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {

      tout.push(doc.data()) 
      
    })
    setDatas(datas+1);
  }
    
  setDatas(datas+1);
    
}
useEffect( ()=>{
  
  setJour(secureLocalStorage.getItem("jour"))
  setCategorie(secureLocalStorage.getItem("service"))
    if (datas == 0 || datas ==1) {
 
      
   Get();
 
   Next();
   
   
    }
    
},[Get,datas,Next,tout])

const jours = new Date();
const heure = jours.getHours();
const minute = jours.getMinutes();

    return(
        <>
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
           <>
           
            <Box
              key={index}
              height={["50%", "20vh", "20vh", "20vh", "20vh"]}
              width={{ base: "70%", md: "100%" }}
              marginBottom={40}
              mr={5}
              borderRadius={[10,10,50,50,50]}
            >
                
              <Link
                height={"15vh"}
                width={{ base: "80%", md: "30%" }}
                mt={5}
                mb={5}
               
                mr={{ base: "0%", md: "0%" }}
                _hover={{ textDecoration: "none" }}
                href={`/otherContent/intermed1?categorie=${data.categorie}&magasin=${data.organisation}`}
              >
                 <Box
        mt={5}
        height={["20vh", "20vh", "20vh", "20vh", "20vh"]}
        width={{ base: "100%", md: "50%" }}
        marginBottom={[40, 40, 40, 10, 10]}
        mr={5}
        borderRadius={25}
      >
        <Link
          height={"15vh"}
          width={{ base: "80%", md: "100%" }}
          mt={5}
          mr={{ base: "0%", md: "0%" }}
          _hover={{ textDecoration: "none" }}
          href={`/otherContent/intermed1?categorie=${data.categorie}&magasin=${data.organisation}`}
        >
           <Box
            height={"100%"}
            width={"100%"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={25}
           >

           
           
               <Image src={data.imageUrl} alt={"image du magasin"} width={"100%"} height={"100%"} borderRadius={25}/>
              
           
            <Box mt={"-100px"}>
                <Text
                  fontSize={"lg"}
                  color={"#fff"}
                  textAlign={"center"}
                  fontWeight={"bold"}
                >
                  {data.organisation}
                </Text>
              </Box>
          </Box> 
         
        </Link>
         <Box
          bgColor={"white"}
          width={"100%"}
          borderBottom={"1px solid black"}
          textAlign={"center"}
        >
         




              {(data.horaire != undefined && data.horaire != null)?
              console.log(Object.values(data.horaire)[parseInt(jours.getDay())],data.organisation) : console.log(data.organisation) }


         {(data.horaire != undefined && data.horaire != null)? (
         Object.values(data.horaire)[parseInt(jours.getDay())] === "24h/24"?
         <Text fontSize={"15px"} color={"green"}>Ouvert 24h/24h</Text>
         : Object.values(data.horaire)[parseInt(jours.getDay())] === "Fermé"?
         <Text fontSize={"15px"} color={"red"}>Fermé</Text> :
          (Object.values(data.horaire)[parseInt(jours.getDay())]!="undefined" 
            && Object.values(data.horaire)[parseInt(jours.getDay())]!=undefined  
            && Object.values(data.horaire)[parseInt(jours.getDay())]!="") ? <Text fontSize={"15px"} color={"green"}>Ouvert de : {Object.values(data.horaire)[parseInt(jours.getDay())]}</Text> :  <Text fontSize={"15px"} color={"red"}>Non défini</Text>
        )    
         :
         <Text fontSize={"15px"} color={"red"}>
         Non défini
            </Text>}

        
        </Box>
        <Box>
          <Text as={"h4"} pb={2} align={"center"}>
            {data.adresse}
          </Text>
        </Box> 
      </Box>
                                 
                {/* <Flex
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
                      { data.organisation}
                    </Text>
                  </Flex>
                </Flex> */}
              </Link>
              <Box>
              {/* <Box bgColor={"white"}width={"100%"} borderBottom={"1px solid black"}> */}
              {/* {Object.values(data.horaire)[jour].length >5 ?  <Text
                fontSize={"sm"}
                color={"green"}
                textAlign={"center"}
                fontWeight={"bold"}
              >
              Ouvert : {" ",Object.values(data.horaire)[jour]} 
              </Text> : <Text
                fontSize={"sm"}
                color={"red"}
                textAlign={"center"}
                fontWeight={"bold"}
              >
               
               {Object.values(data.horaire)[jour].length <4 ? " " : `${" ",Object.values(data.horaire)[jour]}`} 
                  
              </Text> }  */}
              {/* </Box>  */}
                {/* <Text as={"h4"} pb={5} align={"center"}>
                    { data.adresse}
                </Text> */}
              </Box>
              
            </Box>
            </>
          ))}
        </SimpleGrid>
        {/* {numero[4] == 1 ? <>
          
        </>:<> */}
        <Center><Flex alignItems={"center"} justifyContent={"space-around"} >
        <Box><Text>Vous êtes sur la page {actu}</Text></Box>
         <Box ml={10}> <Select onChange={(e)=>setParpage(e.target.value)} width={"100px"}>
          <option value="4" >4</option>
          <option value="8" selected>8</option>
            <option value="12">12</option>
            <option value="16">16</option>
            <option value="20">20</option>
          </Select>
          </Box>
          </Flex>
        </Center>
        <Center mb={20}>
         
        {/* <SimpleGrid columns={[2,2,2,3,3]} spacingX={20}> */}
       
       {/* <Button width={"fit-content"} 
       bgColor={"white"} */}
        {/* // onClick={()=>{setActu(actu-1),Next(),setEtat1(false)}} */}
        {/* isDisabled={etat}></Button> */}
       <Heading>
       <Flex  width={"fit-content"} ><SimpleGrid width={"fit-content"}  columns={[5,5,5,9,9]} height={`fit-content`}>{pages.map(page=>{return (<Button key={`${page}`} bgColor={"white"} onClick={() =>{setActu(page),Next(),Next()} } _hover={{fontSize:"20px" ,bgColor:"cyan.500"}} >{page}</Button>)}
       )}
       </SimpleGrid></Flex>
       </Heading>
       {/* <Button width={"fit-content"} 
        // bgColor={"white"}
        // // onClick={()=>{setActu(actu+1),Next(),setEtat(false)}}
        // isDisabled={etat1}></Button> */}
       {/* </SimpleGrid>  */}
       </Center>
        {/* </>} */}
       
      
       <FooterR/>
      </>
    )
}