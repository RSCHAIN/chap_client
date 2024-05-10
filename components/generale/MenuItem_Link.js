import { Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import Showconnex from "../ShowConnexion";
import Menucat from "../menucat";
import { AiOutlineHome } from "react-icons/ai";
import { MdSupportAgent } from "react-icons/md";
import { ChevronRightIcon } from "@chakra-ui/icons";

import Head from "next/head";

const MenuItem_Link = () => {
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
      <Flex
        width={{ base: "100%", md: "100%" }}
        height={{ base: "50vh", md: "100%" }}
        direction={{ base: "column", md: "column" }}
        // align={"center"}
        // justify={{ base: "space-around", md: "space-between" }}
      >
        <Flex
        borderBottom={"1px solid gray"}
          width={"full"}
          height={"fit-content"}
          // align={"center"}
          // justify={"space-between"}
          direction={{ base: "column", md: "column" }}
        >
          <Flex justifyContent={"space-between"} mb={5}>
            <Flex>
            <AiOutlineHome fontWeight={700} fontSize={"20px"} mr={5}/>
          <Link href="/"  ml={2}>Accueil</Link>
          </Flex>
          <ChevronRightIcon fontSize={"25px"}/>
          </Flex>
          
        
         
          {/* <Link href="/Cart">Panier</Link> */}
         
        </Flex>
        
        <Flex
        // borderBottom={"1px solid gray"}
          width={{ base: "100%", md: "100%" }}
          height={{ base: "80%", md: "100%" }}
          // align={"center"}
          // justify={"space-between"}
          direction={{ base: "column", md: "column" }}
        >
           <Showconnex />
        </Flex>
      </Flex>
    </>
  );
};

export default MenuItem_Link;
