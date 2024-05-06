import { db2 } from '@/FIREBASE/clientApp'
import { StarIcon } from '@chakra-ui/icons'
import { Box, Flex, Image, Text, Tooltip } from '@chakra-ui/react'
import { onValue, ref } from '@firebase/database'
import React, { useEffect, useState } from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import { FaTruck } from 'react-icons/fa'
export function Star ({id,data}){
  let total = 0
  let star = 0
  if(data){
    Object.values(data).map((dat,key)=>{
      if(id== dat.productID)
      {
        star = star + parseInt(dat.rate)
        total = total+1
       
      }
     }
     )
     
  }
  
    
  
    return(
      <>
      {total ? <Flex  fontSize={"12px"}>
       
        {Array(5)
              .fill('')
              .map((_, i) => (
                <StarIcon
                  key={i}
                  fontSize={"12px"}
                  color={i < star/total ? 'yellow' : 'gray.500'}
                />
              ))}
                <Text ml={1} mt={-1}>({total})</Text>
      </Flex> : <Flex> 
      
      {Array(5)
              .fill('')
              .map((_, i) => (   
                <StarIcon
                  key={i}
                  fontSize={"12px"}
                  color={'gray.500'}
                 
                />
              ))}
              <Text ml={2} mt={-1} fontSize={"12px"}>{total} avis</Text>
              </Flex>}
      
    
      </>
    )
  }



function DisplayFavlistMobileM({datass, tout, datak}) {
  const [data1, setData1] = useState([]);
  const Feeds = async () => {
    const starCountRef = ref(db2, "Feedback");
    onValue(starCountRef, (snapshot) => {
        setData1(snapshot.val());
    });
};
useEffect(() =>{
  Feeds();
},[]);
  return (
    Object.values(datass).map((data,index) => (
        <Box as="a"   key={index} href={`/Details/details?c=${tout}&m=${data.organisation}&p=${datak[index]}`}   mx={[2, 2, 2, 5, 5]} mb={5} bgColor={"white"}>
              
                <Box
                 mx={2}
                 key={data.id}
                 maxW={"200px"}
                 // height={"400px"}
                 my={[0, 0, 0, 5, 5]}
                 pl={5}
                 borderRadius="lg"
                 display={"grid"}
                //  pb={10}
                 bgColor={"white"}
                 boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}

                  // bgColor={"white"}
                  // p={5}
                  // pb={10}
                  // key={index}
                  // my={5}
                  // height={"21.25rem"}
                  // width={"13rem"}
                >
                  {data.etat == "Disponible" ? (
                    <Box
                    mb={2}
                    ml={-5}
                    px={2}
                    color={"white"}
                  fontSize={"15px"}
                    borderRadius={25}
                    width={"fit-content"}
                    height={"fit-content"}
                    bgColor="#7ed957"
                    
                    >
                      Disponible
                    </Box>
                  ) : (
                    <Box
                  
                    mb={2}
                    ml={-5}
                    px={2}
                    color={"white"}
                  fontSize={"15px"}
                    borderRadius={25}
                    width={"fit-content"}
                    height={"fit-content"}
                    bgColor="red"
                    >
                      Rupture
                    </Box>
                  )}
                  {data.imageUrl ? <Image
                    height={["150px", "150px", "150px", "100px", "100px"]}
                    width={["150px", "150px", "150px", "100px", "100px"]}
                    src={data.imageUrl}
                    alt={data.nom}
                  />: <Image
                  height={["150px", "150px", "150px", "100px", "100px"]}
                  width={["150px", "150px", "150px", "100px", "100px"]}
                  src={"https://placehold.co/600x400@3x.png"}
                  alt={data.nom}
                /> }
                  
                  <Box height={"fit-content"} >
                    <Text
                      width={["150px", "150px", "150px", "100px", "100px"]}
                      noOfLines={2}
                      fontSize={"12px"}
                      fontWeight={700}
                    >
                      {data.nom}
                    </Text>
                    <Text
                    cursor={"pointer"}
                     as="a"  href={`/otherContent/intermed1?categorie=${tout}&magasin=${data.organisation}`}
                      fontWeight={"bold"}
                      width={"fit-content"}
                      color={"orange.900"}
                      fontSize={"10px"}
                     
                    >
                      {data.organisation}
                    </Text>
                  </Box>
                  <Flex mb={2}>
                  <Star id={datak[index]} data={data1}/>
                  </Flex>
                  {data.duree == "Expedié en 24h" ? (
                    <Text fontWeight={"thin"} fontSize={10}>
                      Livré le {dateExp3}{" "}
                    </Text>
                  ) : (
                    <Text fontWeight={"thin"} fontSize={"12px"}>{data.duree} </Text>
                  )}
                  <Flex mb={2}>
                    <FaTruck />
                    <Tooltip
                      label={`Prix superieur à 30€ Ou être en île-de-france`}
                    >
                      <Flex>
                        <Text ml={2} fontSize={"10px"} fontWeight={700}>
                          Livraison partout en France{" "}
                        </Text>
                        <Text fontSize={"15px"} mt={-1} color={"red"}>
                          *
                        </Text>
                      </Flex>
                    </Tooltip>
                  </Flex>

                  <Flex justifyContent={"space-between"} width={["90%","80%","100%","100%","100%"]}>
                    <Text></Text>
                    <Text
                      color={"cyan.700"}
                      
                      fontWeight={"bold"}
                      // fontSize={"20px"}
                    >
                      {data.prix}€
                    </Text>
                  </Flex>
                </Box>
               
               
              </Box>
    ))
  )
}

export default DisplayFavlistMobileM