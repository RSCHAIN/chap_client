import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";


export default function Footer2(){
  return(
    <Center>
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
    <Flex w={'70%'}>
      <Box w={'20%'} mr={20}>
        <Heading mb={10}>CONTACT</Heading>
        <Text textAlign={'justify'} mb={10}>Lorem ipsum dolor sit amet, consectet adipis cing elit.Curabitur venenatis.</Text>
        <Text fontWeight={'bold'} textAlign={'justify'}>1528 BROADWAY, NEW YORK,NY 10036,UNITED STATES +12 34 567 891 EMAIL@YOUR.DOMAIN</Text>
      </Box>
      <Box w={'20%'}  mr={20}>
        <Heading mb={10}>
          JOURS DE LIVRAISON
        </Heading>
        <ul>
          <li>Mardi</li>
          <li>Vendredi</li>
        </ul>
      </Box>
      <Box w={'20%'}  mr={20}>
      <Heading mb={10}>
          AIDE
        </Heading>
        <ul>
          <li>FAQ</li>
          <li>Politique de confidentialite</li>
          <li>Support</li>
        </ul>
      </Box>
      <Box w={'25%'}>
      <Heading mb={10}>
          DECOUVREZ NOS RESEAUX
        </Heading>
        <Flex>
          liste des reseaux sociaux
        </Flex>
      </Box>
    </Flex>
    </Center>
  )
}