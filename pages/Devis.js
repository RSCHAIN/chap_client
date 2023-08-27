import {Heading,Center,Box,SimpleGrid,Text,Input,Button} from "@chakra-ui/react"
import {useState} from "react"
import InputBar from "@/components/InputBar";
import Navbar from "@/components/Navbar";

export default function Devis(){
    const {data1,setData1}=useState()
    const {data2,setData2}=useState()
    const {data3,setData3}=useState()
    const {data4,setData4}=useState()
    const {data5,setData5}=useState()
    const {data6,setData6}=useState()
    const {data7,setData7}=useState()
    
    return(
        <>
         <InputBar />
   <Navbar/>
        <Box width="100%" alignContent={"center"} textAlign={"center"}>
        <Heading>Demande de Devis</Heading>
                   
                   <Center width="100%">
                   <Box >
                     <Text>Date & heure expedition: </Text>

                     <Input
                       type="datetime-local"
                       width={"180px"}
                       onChange={(e) => setData1(e.target.value)}
                     />
                   </Box>
                   </Center>
                  
                   <SimpleGrid columns={2}>
                   <Box >
                     <Text>Destination: </Text>
                     <Input
                       placeholder="lieu de destination"
                       type="text"
                       width={"180px"}
                       onChange={(e) => setData2(e.target.value)}
                     />
                   </Box>
                     <Box>
                           <Text >Votre Numero : </Text>
                           <Input
                           placeholder="votre numero"
                           value={data7}
                         //   isDisabled={etat1}
                             type="number"
                             width={"180px"}
                             onChange={(e) => setData7(e.target.value)}
                           />
                         </Box>
                  
                   <Box >
                     <Text>Longueur: </Text>
                     <Input
                       placeholder="longueur en metres"
                       type="number"
                       width={"180px"}
                       onChange={(e) => setData3(e.target.value)}
                     />
                   </Box>
                   
                   <Box>
                     <Text>Largeur: </Text>
                     <Input
                       placeholder="largeur en metres"
                       type="number"
                       width={"180px"}
                       onChange={(e) => setData4(e.target.value)}
                     />
                   </Box>
                  
                   <Box>
                     <Text>hauteur : </Text>
                     <Input
                       placeholder="hauteur en metres"
                       type="number"
                       width={"180px"}
                       onChange={(e) => setData5(e.target.value)}
                     />
                   </Box>
                  
                   <Box >
                     <Text>Poids: </Text>
                     <Input
                       placeholder="poids  en kg"
                       type="number"
                       width={"180px"}
                       onChange={(e) => setData6(e.target.value)}
                     />
                   </Box>
                   </SimpleGrid>
                   
                 
                 
              
               

                   <Button
                     bgColor={"cyan.700"}
                     color={"white"}
                     _hover={{ bgColor: "cyan.900" }}
                     onClick={() => {
                       alert("Devis en cours de traitement")
                     }}
                   >
                     Valider
                   </Button>
                
        </Box>
                    
        </>
    )
}