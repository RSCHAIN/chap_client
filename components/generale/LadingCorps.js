import { ArrowForwardIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  Heading,
  Link,
  Text,

} from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";

import { db, db2 } from "@/FIREBASE/clientApp";
import { ref, onValue } from "firebase/database";
import Location from "../location";
import { useRouter } from "next/router";
import { collection, query, where, getDocs } from "firebase/firestore";

// les card des differntes cartegories qui seront mapés
export  function ItemCard ({ item, card }) {
  const [imageUrl,setImageUrl]= useState()
  const [adresse,setAdresse]= useState()
  // const location = localStorage.getItem("location").length;
  // const toast = useToast();
  const update = async ()=>{
    // console.log('item',item.id)
    const q = query(collection(db, "Admin"), where("organisation", "==",item.id ));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach( (doc) => {
      // doc.data() is never undefined for query doc snapshots
      setAdresse(doc.data().adresse);
      setImageUrl(doc.data().imageUrl)
    });
  }

// console.log(item.id)

    Object.values(item).map((data,index)=>{
     
      update()
     
    })
 
 
  // if (location > 2) {
    return (
      
      <>
        {/* card  */}
        <Box height={["20vh","20vh","20vh","40vh","40vh"]}
          width={{ base: "30%", md: "30%" }} marginBottom={{base:"5em",md:"45px"}} mr={5} borderRadius={50}>
        <Link
          height={"15vh"}
          width={{ base: "80%", md: "30%" }}
          mt={"5"}
          
          mr={{ base: "0%", md: "0%" }}
          _hover={{ textDecoration: "none" }}
          href={"/" + card + "/" + item.id}
        >
          <Flex
            height={"100%"}
            width={"100%"}
            alignItems={"center"}
            justifyContent={"center"}
             borderRadius={50}
            backgroundImage={imageUrl}
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
              <Text
               
                fontSize={"xl"}
                color={"#fff"}
                textAlign={"center"}
              >
                {item.id}
              </Text>
            </Flex>
          </Flex>
         
        </Link>
        <Box>
        <Text as={"h2"} mb={10}
          pb={20} fontWeight={'semibold'} align={'center'}  >{adresse}</Text>
        </Box>
        
        </Box>
      
      </>
    );
  // } else {
  //   return (
  //     <>
  //       {/* card  */}
  //       <Link
  //         height={"40vh"}
  //         width={{ base: "70%", md: "30%" }}
  //         mt={"5"}
  //         mr={{ base: "0%", md: "0%" }}
  //         _hover={{ textDecoration: "none" }}
  //         // onClick={() =>  toast({
  //         //   title: 'POSITION REQUISE',
  //         //   description: "Nous vous prions de fournir votre position",
  //         //   status: 'info',
  //         //   duration: 9000,
  //         //   isClosable: true,
  //         // })}
  //       >
  //         <Flex
  //           height={"100%"}
  //           width={"100%"}
  //           alignItems={"center"}
  //           justifyContent={"center"}
  //           backgroundImage={item.imageUrl}
  //           backgroundPosition={"center"}
  //           backgroundSize={"cover"}
  //           backgroundRepeat={"no-repeat"}
  //         >
  //           <Flex
  //             alignItems={"center"}
  //             justifyContent={"center"}
  //             borderRadius={"10px"}
  //             height={"100%"}
  //             width={"100%"}
  //             bg={"rgba(0, 0, 0, 0.277)"}
  //           >
  //             <Text
  //               fontWeight={"bold"}
  //               fontSize={"2xl"}
  //               color={"#fff"}
  //               textAlign={"center"}
  //             >
  //               {item.id}
  //             </Text>
  //           </Flex>
  //         </Flex>
  //       </Link>
  //     </>
  //   );
  // }
}

export function ContainerCard({ card }) {
 
  const router = useRouter()
  const [datas,setDatas]=useState([])
  useEffect(()=>{
    const datos = localStorage.getItem(card.id+"Datos");
   setDatas(JSON.parse(datos))
  },[card.id])
  if (datas == null) {
   
    router.reload()
  }
 
    return (
      <>
        {/* categorie*/}
        <Flex
          width={"95%"}
          height={"auto"}
          mb={10}
          pb={10}
          direction={"column"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          {/* la box de l'entete de la cartegorie  */}
          <Flex
          id={card.id}
            height={"auto"}
            width={"100%"}
            mt={5}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Heading
              height={"auto"}
              id={card.id}
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              {card.id}
             
            </Heading>
            {/* <Link
                          href={card.link}
                          _hover={{textDecoration : 'none'}}
                      >
                          <Button rightIcon={<ArrowForwardIcon />} colorScheme='#08566f' variant='outline'>
                              Voir Plus
                          </Button>
                      </Link> */}
          </Flex>
  
          {/* contient les card's  */}
          <Flex
            height={"auto"}
            width={"100%"}
            flexWrap={"wrap"}
            direction={"row"}
            alignItems={{ base: "center", md: "normal" }}
            justifyContent={{ base: "center", md: "space-between" }}
          >
            {
        //  console.log(datas)     
            datas.map((item, key) => (
              <ItemCard key={key} item={item} card={card.id}></ItemCard>
              
            ))
            }
          </Flex>
        </Flex>
      </>
    );
  
 
}

// le rendu final qui sera affiché
const LadingCorps = () => {
  
  const [cat, setCat] = useState([]);
  const [datos, setDatos] = useState([]);
  const update = () =>{
    const starCountRef = ref(db2, "/");
    onValue(starCountRef, (snapshot) => {
      const donnes = snapshot.val();
      
      if (donnes != null) {
        const categorie = Object.keys(donnes).map((key) => ({
          id: key,
          ...donnes[key],
        }))
        setCat(categorie);
       
        
      }
        

    })
  }
  // const updateAll = () => {
  //   console.log("okay")
  //   cat.map((index, key) => {
  //     const starCountRef2 = ref(db2, index.id + "/");
  //     onValue(starCountRef2, (snapshot) => {
  //       const donnees = snapshot.val();
  //       if (donnees != null) {
  //         const categorie = Object.keys(donnees).map((key) => ({
  //           id: key,
  //           ...donnees[key],
  //         }))
  //         setDatos(categorie);
          
  //         localStorage.setItem(index.id + "Datos", JSON.stringify(categorie));
  //       }
  //     })
  //   })
  // }
  useEffect(() => {
   
    update()
    //updateAll()

  }, []);
 

  return (
    

    <>
      {/* <Location /> */}
      <Center width={"100%"} height={"auto"}>
        <Box height={"95%"} width={"95%"}>
          {/* l'entet principale */}
          <Heading textAlign={"start"} color={"#08566e"} mb={5}>
            Nos Services
          </Heading>

          {/* la box de toutes les cartegorie */}
          <Flex
            height={"auto"}
            width={"100%"}
            mt={10}
            mb={10}
            direction={"column"}
            alignItems={"center"}
            pb={20}
            justifyContent={"center"}
          >
            {cat.map((card, key) => 
            {
              // console.log('card',card)
              
              if (card.id!="Commandes") {
               return (
                  <ContainerCard key={key} card={card}></ContainerCard>
                )
            }
          }
            
            )}
          </Flex>
        </Box>
      </Center>
    </>
  );
};

export default LadingCorps;
