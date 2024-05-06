import { db2 } from '@/FIREBASE/clientApp'
import { StarIcon } from '@chakra-ui/icons'
import { Box, Flex, Image, Link, Text, Tooltip } from '@chakra-ui/react'
import { onValue, ref } from '@firebase/database'
import React, { useEffect, useState } from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import { BsCashCoin } from 'react-icons/bs'
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



function DisplayFavlistWeb({datass,  datak}) {
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
    datass.map((dat,index) => (
      <Link key={index} 
      href={`/otherContent/intermed1?categorie=${datak}&magasin=${dat.organisation}`}
    
      _hover={{
        textDecoration:"none"
      }}
      >
       <Box
      
      key={index} my={[0,0,0,5,5]} height={"fit-content"} pb={10}   width={["150px","150px","150px","200px","200px"]} >
        <Image height={["100px","100px","150px","150px","150px"]}  width={["150px","150px","150px","200px","200px"]} src={dat.imageUrl}  alt={dat.nom} />
        <Box height={["10vh","10vh","10vh","10vh","10vh"]} >
        <Text width={["150px","150px","150px","200px","200px"]}  noOfLines={2}  fontSize={"15px"}>{dat.nom}</Text>
        <Text fontWeight={"bold"} width={"fit-content"} color={"orange.900"}   fontSize={"10px"}>{dat.organisation}</Text>
        <Flex >
          {}
          {/* {console.log("data",data)} */}
        
          {/* {console.log("feedback",data2)} */}
          {/* <Star id={Object.keys(dat)[index]} data={data2}/> */}
        </Flex>
        </Box>
        <Box>
        {dat.duree == "Expedié en 24h" ? <Text className={"Exp"}  mb={2}>Livré le {dateExp3} </Text> : <Text  className={"Exp"} mb={2}>{ dat.duree} </Text>}
        </Box>
        <Flex mb={1}>
          <BsCashCoin/>
          <Text ml={2} fontSize={"10px"} >Payez en espèce</Text>
        </Flex>
        
        

        <Flex  >
          <FaTruck />
          <Tooltip label={`Livraison à partir de 2,99€`} >
            <Flex>
          <Text ml={2} fontSize={"10px"} fontWeight={700}>Livraison partout en France </Text>
          <Text fontSize={"15px"} mt={-1} color={"red"}>*</Text>
          </Flex>
          </Tooltip>
        </Flex>
       
        <Flex justifyContent={"space-between"}  
        >
        <Text></Text>
     
        <Text color={"cyan.700"}  fontWeight={"bold"} fontSize={"20px"}>{dat.prix}€</Text>
        </Flex>
         
      </Box>  
      </Link> 
    ))
  )
}

export default DisplayFavlistWeb