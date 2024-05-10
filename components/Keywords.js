import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import Head from "next/head";

export default function Keyword() {
  const motCle = [
    "Attieke",
    "Placali",
    "Huile Rouge",
    "Ivoirien",
    "Fret",
    "Mêches",
  ];
  return (
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
      <Flex mt={3} ml={-240} >
        {motCle.map((data, index) => (
          <Box
            key={index}
            m={2}
            color={"black"}
            minWidth={"150px"}
            boxSizing={"border-box"}
            border={"1px solid black"}
            height={"100%"}
            backgroundColor={"white"}
            p={"11px 16px"}
            fontSize={"16px"}
            fontWeight={"semibold"}
            textAlign={"left"}
            cursor={"pointer"}
            borderRadius={"12px"}
            width={"150px"}
            onClick={() => alert("Nous y travaillons")}
            _hover={{
                color:"white",
                bgColor:"black"
            }}
          >
            <Text>{motCle[index]}</Text>
          </Box>
        ))}
      </Flex>
    </>
  );
}
