import { Box, Center, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import secureLocalStorage from "react-secure-storage";
import Head from "next/head";


export default function Slide(){
    const [carde,setCarde] = useState([])
    useEffect(()=>
     
      {JSON.parse(secureLocalStorage.getItem("AlimentationDatos")).map((card, index) => 
          {
              setCarde(card)
          })
    },[])
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
        <Center backgroundColor={'#FFFFEA'} mt={5}>
        <Flex >
        <Carousel showThumbs={true} autoPlay>
          {Object.values(carde).map((card, index) =>
          (
            <Box key={index}>
                <Image alt={'image du slider'} src={card.imageUrl}/>
                <Text>{card.nom}</Text>
            </Box>  
          )
           
          )}
          </Carousel>
        </Flex>
    
      </Center>
      </>
    )
}