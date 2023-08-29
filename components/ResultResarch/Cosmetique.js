import { ArrowForwardIcon } from "@chakra-ui/icons"
import { Box, SimpleGrid, Text,Image, Link, Heading, Flex, Button } from "@chakra-ui/react"
import { useState } from "react"

export default function Cosmetique (data){
   
    const [filtered,setFiltered] = useState ([])
    const [check,setCheck] = useState(0)
    data.data.map((datos,index)=>{
        if (datos.data().categorie== "Cosmetique" ) {
            if (check == 0 ) {
                setCheck(check+1)
                filtered.push(datos.data())
            }
          
        }
    })


    return(
        <>
              {filtered.length == 0 ? (
                        <>
                        <Heading>Cosmetique</Heading>
                         Aucun commerce de disponible pres de chez vous </>
                      ) : (
                        <>
                       <Flex
              height={"auto"}
              position={"relative"}
              width={"100%"}
              mt={10}
              mb={2}
              direction={"column"}
              alignItems={"center"}
              // pb={20}
              justifyContent={"center"}
            >
<Flex
        width={"95%"}
        height={"auto"}
        // mb={10}
        // pb={10}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        {/* la box de l'entete de la cartegorie  */}
        <Flex
        
          height={"auto"}
          width={"100%"}
          mt={2}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Heading
            height={"auto"}
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
           Cosmetique
          </Heading>
          
          <Link
            href="/Customize/showMore"
            onClick={() => {
              localStorage.setItem("service", "Cosmetique");
            }}
            _hover={{ textDecoration: "none" }}
          >
            <Button
              border={"none"}
              rightIcon={<ArrowForwardIcon />}
              colorScheme="#08566f"
              variant="outline"
              fontSize={"14px"}
            >
              Voir Plus
            </Button>
          </Link>
          </Flex>
          <Flex
          maxHeight={"auto"}
          width={"100%"}
          flexWrap={"wrap"}
          direction={"row"}
          alignItems={{ base: "center", md: "normal" }}
          justifyContent={{ base: "center", md: "space-between" }}
        >
          {filtered.slice(0,5).map((doc, index) => (
 <Box
 key={index}
 mt={5}
 height={["20vh", "20vh", "20vh", "20vh", "20vh"]}
 width={{ base: "25%", md: "15%" }}
 marginBottom={40}
 mr={5}
 borderRadius={25}
>
 <Link
   height={"15vh"}
   width={{ base: "80%", md: "30%" }}
   mt={5}
  //  mb={5}
   onClick={() => {
     sessionStorage.setItem(
       "savefrom",
       doc.number
     ),
       sessionStorage.setItem(
         "image",
         doc.imageUrl
       ),
       sessionStorage.setItem(
         "nom",
         doc.organisation
       ),
       sessionStorage.setItem(
         "adresse",
         doc.adresse
       ),
       sessionStorage.setItem(
         "categorie",
         doc.categorie
       );
     sessionStorage.setItem(
       "description",
       doc.description
     );
     sessionStorage.setItem(
       "horaire",
       JSON.stringify(doc.horaire)
     );
     sessionStorage.setItem(
       "paiement",
       JSON.stringify(doc.methodeDePaiement)
     );
   }}
   mr={{ base: "0%", md: "0%" }}
   _hover={{ textDecoration: "none" }}
   href={"/otherContent/intermed1"}
 >
   <Flex
     height={"100%"}
     width={"100%"}
     alignItems={"center"}
     justifyContent={"center"}
     borderRadius={25}
     backgroundImage={doc.imageUrl}
     backgroundPosition={"center"}
     backgroundSize={"cover"}
     backgroundRepeat={"no-repeat"}
   >
     <Flex
       alignItems={"center"}
       justifyContent={"center"}
       borderRadius={25}
       height={"100%"}
       width={"100%"}
       bg={"rgba(0, 0, 0, 0.277)"}
     >
       <Text
         fontSize={"xl"}
         color={"#fff"}
         textAlign={"center"}
         fontWeight={"bold"}
       >
         {doc.organisation}
       </Text>
     </Flex>
   </Flex>
 </Link>
 <Box>
   <Text as={"h4"} pb={5} align={"center"}>
     {doc.adresse}
   </Text>
 </Box>
</Box>

          ))} 
        
        </Flex>


















              </Flex>
              </Flex>

                       
                        </>
                      )}
        </>
    )
}