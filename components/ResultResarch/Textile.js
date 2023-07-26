import { ArrowForwardIcon } from "@chakra-ui/icons"
import { Box, SimpleGrid, Text,Image, Link, Heading, Flex, Button } from "@chakra-ui/react"
import { useState } from "react"

export default function Textile (data){
    
    const [filtered,setFiltered] = useState ([])
    const [check,setCheck] = useState(0)
    data.data.map((datos,index)=>{
        if (datos.data().categorie== "Textile") {
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
                        <Heading>Textile</Heading> Aucun commerce de disponible pres de chez vous </>
                      ) : (
                        <>
                         <Flex justifyContent={"space-between"}>
                        <Heading>Cosmetique</Heading>
                        <Button mr={10} bgColor={"white"} _hover={{bgColor:"white"}} >voir plus <ArrowForwardIcon/> </Button>
                        </Flex>
                          <SimpleGrid columns={5}>
                            {filtered.slice(0,5).map((doc, index) => (
                              <>
                            
                                <Box
                                key={index}
                                m={2}
                                mt={5}
                                as={Link}
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
                                _hover={{ textDecoration: "none" }}
                                href={"/otherContent/intermed1"}
                              >
                                <Image
                                  alt={doc.organisation}
                                  src={doc.imageUrl}
                                  maxWidth={"150px"}
                                  maxHeight={"100px"}
                                  minHeight={"100px"}
                                  minWidth={"150px"}
                                />
                                <Text fontWeight={"bold"} fontSize={"20px"}>
                                  {doc.organisation}
                                </Text>
                                <Text fontWeight={"medium"}>
                                  {doc.adresse}
                                </Text>
                              </Box>
                             
                              </>
                            
                              
                            ))}
                          </SimpleGrid>
                        </>
                      )}
        </>
    )
}