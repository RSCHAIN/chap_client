import Navbar from "@/components/Navbar";
import HeaderBar from "@/components/inscription/HeaderBar";
import { Box, Flex } from "@chakra-ui/react";

export default function Intermed1(){
    return (
        <>
        <HeaderBar/>
        <Navbar/>
        <Flex width={"100%"}>
            <Box width={"20%"}>
                logo
            </Box>
            <Box width={"70%"}>
                Informations Magasin
            </Box>
        </Flex>
        <Flex width={"100%"}>
            les images
        </Flex>
        <Flex width={"100%"}>
            les produits
        </Flex>
        </>
    )
}