import { Avatar, Box, Button, Center, Fade, Flex, Heading, Text, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { StarAvis, StarM2 } from './Restaurant';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

function AffichageComM({data}) {
    const { isOpen, onToggle } = useDisclosure()
    const [clicked,setClicked] = useState(false)
    const toggleChange = () =>{ setClicked(!clicked) }
  return (

    <Box>
        <Flex mx={10} mt={10} onClick={onToggle} justifyContent={'space-between'}  borderBottom={"1px solid gray"}>
        <Flex >
    <Text mr={2}>Avis  </Text>
    <StarM2 data={data.feedback} />
    </Flex>

    {clicked ? <ChevronUpIcon fontSize={"25px"} onClick={toggleChange}/> : <ChevronDownIcon  fontSize={"25px"} onClick={toggleChange}/>}
    
        </Flex>
    
    
    <Fade in={isOpen} >
        
    {data.feedback ? (Object.values(data.feedback).map((data,index) => {
              return (<Center display={"grid"} ml={5} key={index} mt={5}>
                <Flex  width={"200px"} >
                    <Avatar/>
                    <Box ml={2}>
                    <Heading fontSize={"15px"}>{data.avisTitle}</Heading>
                    <StarAvis data={data.rating} />
                    </Box>
                </Flex>

                <Box width={"350px"} justifyContent={"flex-start"} m={5} ml={0} bgColor={"white"}>
                  <Box bgColor={"#f3f3f3"} mx={2} >
                  <Text>{data.avisDesc}</Text>
                  <Flex justifyContent={"space-between"} mt={2}>
                  <Text fontSize={"15px"} >{data.usermail}</Text>
                  <Text   fontSize={"15px"}>{data.dateDep ?? ""}</Text>
                  </Flex>
                    


                  </Box>
                 
                  
                  
                </Box>
              </Center>)
            })):<></>}
           
     
    
   
    </Fade>
  </Box>
  )
}

export default AffichageComM;