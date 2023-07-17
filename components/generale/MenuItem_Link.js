import { Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import Showconnex from "../ShowConnexion";
import Menucat from "../menucat";
const MenuItem_Link = () => {
  return (
    <>
      <Flex
        width={{ base: "100%", md: "70%" }}
        height={{ base: "50vh", md: "100%" }}
        direction={{ base: "column", md: "row" }}
        align={"center"}
        justify={{ base: "space-around", md: "space-between" }}
      >
        <Flex
          width={{ base: "100%", md: "60%" }}
          height={{ base: "80%", md: "100%" }}
          align={"center"}
          justify={"space-between"}
          direction={{ base: "column", md: "row" }}
        >
          <Link href="/">Accueil</Link>
          <Menucat />
          <Link
            href={"/Whoami"}
            mr={3}
            fontSize={"1rem"}
            _hover={{ textDecoration: "none", color: "#068DA9" }}
          >
            Qui sommes-nous?
          </Link>
          <Link
            href={"/Contactus"}
            mr={3}
            fontSize={"1rem"}
            _hover={{ textDecoration: "none", color: "#068DA9" }}
          >
            Nous-contacter
          </Link>
          <Link href="/Cart">Panier</Link>
          {/* <Link href='#'>Service</Link>
                    <Link href='#'>Paiement</Link> */}
        </Flex>

        <Flex
          width={{ base: "100%", md: "auto" }}
          height={{ base: "20%", md: "100%" }}
          align={"center"}
          justify={{ base: "space-around", md: "space-between" }}
        >
          <Showconnex />
        </Flex>
      </Flex>
    </>
  );
};

export default MenuItem_Link;
