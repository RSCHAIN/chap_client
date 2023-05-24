import { Box, Center, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";

export default function Slide(){
    const [carde,setCarde] = useState([])
    useEffect(()=>
     
      {JSON.parse(localStorage.getItem("AlimentationDatos")).map((card, index) => 
          {
              setCarde(card)
          })
    },[])
    return(
        <Center backgroundColor={'#FFFFEA'} mt={5}>
        <Flex >
        <Carousel showThumbs={true} autoPlay>
          {Object.values(carde).map((card, index) =>
          (
            <Box>
                <Image src={card.imageUrl}/>
                <Text>{card.nom}</Text>
            </Box>  
          )
           
          )}
          </Carousel>
        </Flex>
    
      </Center>
    )
}