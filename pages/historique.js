import InputBar from "@/components/InputBar";
import Navbar from "@/components/Navbar";
import FooterR from "@/components/footerResponsif";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Text, Flex, Heading, SimpleGrid, Center, useMediaQuery } from "@chakra-ui/react";

export default function Histo() {
  const [isLagerThan768] = useMediaQuery("(min-width: 768px)");
  return (
    <>
     <InputBar />
      {isLagerThan768 ? <Navbar></Navbar> : <></>}

      <Tabs isLazy isFitted variant='enclosed-colored'>
        <TabList>
          <Tab>COMMANDES EN ATTENTE</Tab>
          <Tab>COMMANDES VALIDEES </Tab>
          <Tab>COMMANDES ANNULES</Tab>
        </TabList>
        <TabPanels>
          {/* initially mounted */}
          <TabPanel bgcolor={'#FAACA8'} bgGradient={'linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)'}>
          <Center>
            <SimpleGrid columns={{base:1,md:2}} >
          <Box  w='full' borderWidth='3px' px={10} mb={5} pb={10} shadow='md' borderRadius='lg' overflow='hidden'>
                <Text pt={5}>n°00056248</Text>
                <Flex>
                    <Box>
                    <Flex justify={'space-between'} w={'sm'}>
                      <Text>article 1</Text>
                      
                    
                    <Text>200$</Text>
                    </Flex>
                    
                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 2</Text>
                    <Text>200$</Text>

                    </Flex>

                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 3</Text>
                    <Text>200$</Text>

                    </Flex>

                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 4</Text>
                    <Text>200$</Text>

                    </Flex>
                    </Box>
                    <br/>
                    <br/>
                   
                </Flex>
                <Heading>
                      TOTAL -------------- 5000$
                    </Heading>
                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>ETAT : </Text>
                    <Text bg={'green.300'}>EN cours</Text>
                    </Flex>
                    
                    
            </Box>
            <Box  w='full' borderWidth='3px' px={10} mb={5} pb={10} shadow='md' borderRadius='lg' overflow='hidden'>
                <Text pt={5}>n°00056248</Text>
                <Flex>
                    <Box>
                    <Flex justify={'space-between'} w={'sm'}>
                      <Text>article 1</Text>
                      
                    
                    <Text>200$</Text>
                    </Flex>
                    
                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 2</Text>
                    <Text>200$</Text>

                    </Flex>

                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 3</Text>
                    <Text>200$</Text>

                    </Flex>

                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 4</Text>
                    <Text>200$</Text>

                    </Flex>
                    </Box>
                    <br/>
                    <br/>
                   
                </Flex>
                <Heading>
                      TOTAL -------------- 5000$
                    </Heading>
                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>ETAT : </Text>
                    <Text bg={'green.300'}>EN cours</Text>
                    </Flex>
                    
                    
            </Box>
            <Box  w='full' borderWidth='3px' px={10} mb={5} pb={10} shadow='md' borderRadius='lg' overflow='hidden'>
                <Text pt={5}>n°00056248</Text>
                <Flex>
                    <Box>
                    <Flex justify={'space-between'} w={'sm'}>
                      <Text>article 1</Text>
                      
                    
                    <Text>200$</Text>
                    </Flex>
                    
                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 2</Text>
                    <Text>200$</Text>

                    </Flex>

                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 3</Text>
                    <Text>200$</Text>

                    </Flex>

                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 4</Text>
                    <Text>200$</Text>

                    </Flex>
                    </Box>
                    <br/>
                    <br/>
                   
                </Flex>
                <Heading>
                      TOTAL -------------- 5000$
                    </Heading>
                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>ETAT : </Text>
                    <Text bg={'green.300'}>Livraison effectuée</Text>
                    </Flex>
                    
                    
            </Box>
            <Box  w='full' borderWidth='3px' px={10} mb={5} pb={10} shadow='md' borderRadius='lg' overflow='hidden'>
                <Text pt={5}>n°00056248</Text>
                <Flex>
                    <Box>
                    <Flex justify={'space-between'} w={'sm'}>
                      <Text>article 1</Text>
                      
                    
                    <Text>200$</Text>
                    </Flex>
                    
                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 2</Text>
                    <Text>200$</Text>

                    </Flex>

                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 3</Text>
                    <Text>200$</Text>

                    </Flex>

                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 4</Text>
                    <Text>200$</Text>

                    </Flex>
                    </Box>
                    <br/>
                    <br/>
                   
                </Flex>
                <Heading>
                      TOTAL -------------- 5000$
                    </Heading>
                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>ETAT : </Text>
                    <Text bg={'green.300'}>Livraison effectuée</Text>
                    </Flex>
                    
                    
            </Box>
            <Box  w='full' borderWidth='3px' px={10} mb={5} pb={10} shadow='md' borderRadius='lg' overflow='hidden'>
                <Text pt={5}>n°00056248</Text>
                <Flex>
                    <Box>
                    <Flex justify={'space-between'} w={'sm'}>
                      <Text>article 1</Text>
                      
                    
                    <Text>200$</Text>
                    </Flex>
                    
                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 2</Text>
                    <Text>200$</Text>

                    </Flex>

                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 3</Text>
                    <Text>200$</Text>

                    </Flex>

                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 4</Text>
                    <Text>200$</Text>

                    </Flex>
                    </Box>
                    <br/>
                    <br/>
                   
                </Flex>
                <Heading>
                      TOTAL -------------- 5000$
                    </Heading>
                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>ETAT : </Text>
                    <Text bg={'green.300'}>Livraison effectuée</Text>
                    </Flex>
                    
                    
            </Box>
            <Box  w='full' borderWidth='3px' px={10} mb={5} pb={10} shadow='md' borderRadius='lg' overflow='hidden'>
                <Text pt={5}>n°00056248</Text>
                <Flex>
                    <Box>
                    <Flex justify={'space-between'} w={'sm'}>
                      <Text>article 1</Text>
                      
                    
                    <Text>200$</Text>
                    </Flex>
                    
                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 2</Text>
                    <Text>200$</Text>

                    </Flex>

                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 3</Text>
                    <Text>200$</Text>

                    </Flex>

                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 4</Text>
                    <Text>200$</Text>

                    </Flex>
                    </Box>
                    <br/>
                    <br/>
                   
                </Flex>
                <Heading>
                      TOTAL -------------- 5000$
                    </Heading>
                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>ETAT : </Text>
                    <Text bg={'green.300'}>Livraison effectuée</Text>
                    </Flex>
                    
                    
            </Box>
            </SimpleGrid>
            </Center>
          </TabPanel>
          {/* initially not mounted */}
          <TabPanel bgcolor={'#3EECAC'} bgGradient={'linear-gradient(19deg, #3EECAC 0%, #EE74E1 100%)'}>
          <Center>
            <SimpleGrid columns={{base:1,md:2}} >
          <Box  w='full' borderWidth='3px' px={10} mb={5} pb={10} shadow='md' borderRadius='lg' overflow='hidden'>
                <Text pt={5}>n°00056248</Text>
                <Flex>
                    <Box>
                    <Flex justify={'space-between'} w={'sm'}>
                      <Text>article 1</Text>
                      
                    
                    <Text>200$</Text>
                    </Flex>
                    
                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 2</Text>
                    <Text>200$</Text>

                    </Flex>

                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 3</Text>
                    <Text>200$</Text>

                    </Flex>

                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 4</Text>
                    <Text>200$</Text>

                    </Flex>
                    </Box>
                    <br/>
                    <br/>
                   
                </Flex>
                <Heading>
                      TOTAL -------------- 5000$
                    </Heading>
                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>ETAT : </Text>
                    <Text bg={'green.300'}>EN cours</Text>
                    </Flex>
                    
                    
            </Box>
            <Box  w='full' borderWidth='3px' px={10} mb={5} pb={10} shadow='md' borderRadius='lg' overflow='hidden'>
                <Text pt={5}>n°00056248</Text>
                <Flex>
                    <Box>
                    <Flex justify={'space-between'} w={'sm'}>
                      <Text>article 1</Text>
                      
                    
                    <Text>200$</Text>
                    </Flex>
                    
                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 2</Text>
                    <Text>200$</Text>

                    </Flex>

                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 3</Text>
                    <Text>200$</Text>

                    </Flex>

                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 4</Text>
                    <Text>200$</Text>

                    </Flex>
                    </Box>
                    <br/>
                    <br/>
                   
                </Flex>
                <Heading>
                      TOTAL -------------- 5000$
                    </Heading>
                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>ETAT : </Text>
                    <Text bg={'green.300'}>EN cours</Text>
                    </Flex>
                    
                    
            </Box>
            <Box  w='full' borderWidth='3px' px={10} mb={5} pb={10} shadow='md' borderRadius='lg' overflow='hidden'>
                <Text pt={5}>n°00056248</Text>
                <Flex>
                    <Box>
                    <Flex justify={'space-between'} w={'sm'}>
                      <Text>article 1</Text>
                      
                    
                    <Text>200$</Text>
                    </Flex>
                    
                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 2</Text>
                    <Text>200$</Text>

                    </Flex>

                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 3</Text>
                    <Text>200$</Text>

                    </Flex>

                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 4</Text>
                    <Text>200$</Text>

                    </Flex>
                    </Box>
                    <br/>
                    <br/>
                   
                </Flex>
                <Heading>
                      TOTAL -------------- 5000$
                    </Heading>
                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>ETAT : </Text>
                    <Text bg={'green.300'}>Livraison effectuée</Text>
                    </Flex>
                    
                    
            </Box>
            <Box  w='full' borderWidth='3px' px={10} mb={5} pb={10} shadow='md' borderRadius='lg' overflow='hidden'>
                <Text pt={5}>n°00056248</Text>
                <Flex>
                    <Box>
                    <Flex justify={'space-between'} w={'sm'}>
                      <Text>article 1</Text>
                      
                    
                    <Text>200$</Text>
                    </Flex>
                    
                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 2</Text>
                    <Text>200$</Text>

                    </Flex>

                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 3</Text>
                    <Text>200$</Text>

                    </Flex>

                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 4</Text>
                    <Text>200$</Text>

                    </Flex>
                    </Box>
                    <br/>
                    <br/>
                   
                </Flex>
                <Heading>
                      TOTAL -------------- 5000$
                    </Heading>
                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>ETAT : </Text>
                    <Text bg={'green.300'}>Livraison effectuée</Text>
                    </Flex>
                    
                    
            </Box>
            <Box  w='full' borderWidth='3px' px={10} mb={5} pb={10} shadow='md' borderRadius='lg' overflow='hidden'>
                <Text pt={5}>n°00056248</Text>
                <Flex>
                    <Box>
                    <Flex justify={'space-between'} w={'sm'}>
                      <Text>article 1</Text>
                      
                    
                    <Text>200$</Text>
                    </Flex>
                    
                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 2</Text>
                    <Text>200$</Text>

                    </Flex>

                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 3</Text>
                    <Text>200$</Text>

                    </Flex>

                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 4</Text>
                    <Text>200$</Text>

                    </Flex>
                    </Box>
                    <br/>
                    <br/>
                   
                </Flex>
                <Heading>
                      TOTAL -------------- 5000$
                    </Heading>
                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>ETAT : </Text>
                    <Text bg={'green.300'}>Livraison effectuée</Text>
                    </Flex>
                    
                    
            </Box>
            <Box  w='full' borderWidth='3px' px={10} mb={5} pb={10} shadow='md' borderRadius='lg' overflow='hidden'>
                <Text pt={5}>n°00056248</Text>
                <Flex>
                    <Box>
                    <Flex justify={'space-between'} w={'sm'}>
                      <Text>article 1</Text>
                      
                    
                    <Text>200$</Text>
                    </Flex>
                    
                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 2</Text>
                    <Text>200$</Text>

                    </Flex>

                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 3</Text>
                    <Text>200$</Text>

                    </Flex>

                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 4</Text>
                    <Text>200$</Text>

                    </Flex>
                    </Box>
                    <br/>
                    <br/>
                   
                </Flex>
                <Heading>
                      TOTAL -------------- 5000$
                    </Heading>
                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>ETAT : </Text>
                    <Text bg={'green.300'}>Livraison effectuée</Text>
                    </Flex>
                    
                    
            </Box>
            </SimpleGrid>
            </Center>
          </TabPanel>
          <TabPanel bgcolor={'#A9C9FF'} bgGradient={'linear-gradient(180deg, #A9C9FF 0%, #FFBBEC 100%)'}>

            <Center>
            <SimpleGrid columns={{base:1,md:2}} >
          <Box  w='full' borderWidth='3px' px={10} mb={5} pb={10} shadow='md' borderRadius='lg' overflow='hidden'>
                <Text pt={5}>n°00056248</Text>
                <Flex>
                    <Box>
                    <Flex justify={'space-between'} w={'sm'}>
                      <Text>article 1</Text>
                      
                    
                    <Text>200$</Text>
                    </Flex>
                    
                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 2</Text>
                    <Text>200$</Text>

                    </Flex>

                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 3</Text>
                    <Text>200$</Text>

                    </Flex>

                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 4</Text>
                    <Text>200$</Text>

                    </Flex>
                    </Box>
                    <br/>
                    <br/>
                   
                </Flex>
                <Heading>
                      TOTAL -------------- 5000$
                    </Heading>
                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>ETAT : </Text>
                    <Text bg={'red'}>ANNULEE</Text>
                    </Flex>
                    
                    
            </Box>
            <Box  w='full' borderWidth='3px' px={10} mb={5} pb={10} shadow='md' borderRadius='lg' overflow='hidden'>
                <Text pt={5}>n°00056248</Text>
                <Flex>
                    <Box>
                    <Flex justify={'space-between'} w={'sm'}>
                      <Text>article 1</Text>
                      
                    
                    <Text>200$</Text>
                    </Flex>
                    
                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 2</Text>
                    <Text>200$</Text>

                    </Flex>

                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 3</Text>
                    <Text>200$</Text>

                    </Flex>

                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>article 4</Text>
                    <Text>200$</Text>

                    </Flex>
                    </Box>
                    <br/>
                    <br/>
                   
                </Flex>
                <Heading>
                      TOTAL -------------- 5000$
                    </Heading>
                    <Flex justify={'space-between'} w={'sm'}>
                    <Text>ETAT : </Text>
                    <Text bg={'red'}>ANNULEE</Text>
                    </Flex>
                    
                    
            </Box>
          </SimpleGrid>
            </Center>
          
          
          </TabPanel>
        </TabPanels>
      </Tabs>
      <FooterR/>
    </>
  );
}
