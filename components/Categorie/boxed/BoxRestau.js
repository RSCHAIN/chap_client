import { ChevronDownIcon, ChevronUpIcon, StarIcon } from '@chakra-ui/icons';
import { Box, Collapse, Flex, Heading, Image, Text,Link, Center, Button, SimpleGrid, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from '@chakra-ui/react';
import React,{useState} from 'react'
import { StarM } from '../Restaurant';
import { MdFastfood, MdIosShare, MdLocationOn } from 'react-icons/md';
import { TfiPencil, TfiWorld } from 'react-icons/tfi';
import { BsFillTelephoneOutboundFill, BsTelephone } from 'react-icons/bs';
import ReservationButton from '@/components/ReservationButton';
import ReservationCoiff from '@/components/ReservationCoiffure';
import Mapped from '../Map';
import { FaEdit } from 'react-icons/fa';
import { BsCashCoin } from "react-icons/bs";
import { BiRestaurant } from 'react-icons/bi';
import { FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from 'next-share';
import { useRouter } from 'next/router';

function BoxRestau({
    mag,categorie
}) {
    const day = [
        "lundi",
        "mardi",
        "mercredi",
        "jeudi",
        "vendredi",
        "samedi",
        "dimanche",
      ];
    
    const [show, setShow] = useState(false);
    const handleToggle = () => setShow(!show);
  
const router =useRouter()


  return (
    <>
     <Center>
    <Box bgColor={"white"}>
      
      <Center display={["none","none","none","grid","grid"]}  >
       
      
        <Flex width={"100%"} justifyContent={"space-between"} >  
      <Heading  width={"fit-content"}>{mag.organisation}</Heading>
      <Flex >
          <Button bgColor={"transparent"} as={"a"} href='#avis' _hover={{
              bgColor:'transparent',textDecor:"none"
          }} leftIcon={<FaEdit />}>Avis</Button>
           <Accordion defaultIndex={[1]} allowMultiple>
  <AccordionItem>
    <h2>
      <AccordionButton >
        <Box  flex='1' textAlign='left'>
        <Button bgColor={"transparent"} _hover={{
              bgColor:'transparent2'
          }} leftIcon={<MdIosShare />}>Partager</Button>
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} display={"flex"}>
    <FacebookShareButton url={`https://www.appchap.fr${router.asPath}`} > 
    <FacebookIcon className='h-10 w-10 rounded-full mr-10' />
                                          </FacebookShareButton> 
   
                                          <WhatsappShareButton url={`https://www.appchap.fr${router.asPath}`} >  
                                          <WhatsappIcon className='h-10 w-10 rounded-full' />
                                     </WhatsappShareButton> 
                                       
    </AccordionPanel>
  </AccordionItem>

  
</Accordion>
      </Flex>
      </Flex>


      <Flex justifyContent={"space-between"}  width={"100%"}  >
      <Box  bgColor={"white"} mb={10} mr={10} display={"flex"}flexDirection={"column" }>
       
      
       
        <Flex  mt={2} justifyContent={"left"}>
          
            <MdLocationOn color='red' fontSize={25}/>
            <Text>{mag.adresse}</Text>

        </Flex>
       
        
        
        <Flex mt={2}>
            <Box mt={2}>
            <StarM data={mag.feedback} />
            </Box>
        
        <Flex mb={2}  mt={2} as={Link} href={`tel:${mag.number}`}>
              <BsFillTelephoneOutboundFill fontSize={20} />
              <Text

                fontSize={"15px"}
                fontWeight={"medium"}
                ml={2}
                color={"green"}
              >
                {mag.number}
              </Text>
            </Flex>
            { categorie == "Restaurant" ?    <Flex mb={2}  mt={2}  ml={5} as={Link} href={"#carte"}>
              <MdFastfood fontSize={20} />
              <Text

                fontSize={"15px"}
                fontWeight={"medium"}
                ml={2}
                color={"green"}
              >
                Carte
              </Text>
            </Flex>     
            :

              <Flex mb={2}  mt={2}  mx={5} as={"a"} href={"#produit"} >
             
<img width="20" height="20" src="https://img.icons8.com/external-itim2101-fill-itim2101/64/external-Product-business-and-financial-itim2101-fill-itim2101.png" alt="external-Product-business-and-financial-itim2101-fill-itim2101"/>


              <Text

                fontSize={"15px"}
                fontWeight={"medium"}
                ml={2}
                color={"green"}
              >
                Produits
              </Text>
            </Flex>   }
           

            {(mag.siteWeb && mag.siteWeb != "undefined" && mag.siteWeb != "non defini" && mag.siteWeb != "Non défini" && mag.siteWeb != "non défini" && mag.siteWeb != "Non defini") ?
              <Flex mb={2} cursor={"pointer"} display={{ base: "flex", lg: "flex" }} mt={2}   ml={5} as={Link} isExternal href={`${mag.siteWeb}`} >
                <TfiWorld fontSize={20} />
                <Text

                  fontSize={"15px"}
                  fontWeight={"medium"}
                  ml={1}
                  width={'70px'}
                  color={"green"}
                >
                  Site web
                </Text>
              </Flex> : <Flex display={{ base: "flex", lg: "flex" }} mb={2} mt={2}  ml={5} >
                <TfiWorld fontSize={20} />
                <Text
                  fontSize={"15px"}
                  width={'90px'}
                  fontWeight={"medium"}
                  ml={2}
                  color={"green"}
                >
                  Non defini
                </Text>
              </Flex>
            }

<Flex width={"100%"}  mt={2}>
<BsCashCoin fontSize={20} />
            <Box display={ "flex"} ml={2} mt={-1} width={"full"} >
              {mag.methodeDePaiement != "undefined" &&
                mag.methodeDePaiement != null
                ? Object.values(mag.methodeDePaiement).map(methPaiement => {
                  return (
                    <Text key={methPaiement} mr={1} >
                      {methPaiement}, {" "}
                    </Text>
                  );
                })
                : "Espèces"}
            </Box>
          </Flex>
          </Flex>
       
       
        <Flex>
            <Text fontWeight={"bold"} pr={2}>
              Description :{" "}
            </Text>
            {mag.description == "undefined" ? (
              <Text width={"500px"} maxWidth={"500px"} >
                {`${mag.categorie} Africain`}
              </Text>
            ) : (
              <Text width={"500px"} maxWidth={"500px"} >
                {mag.description}
              </Text>
            )}
          </Flex>
       
        <Flex justifyContent={"space-between"}>
        <Flex>
            <Text fontWeight={"bold"}>Nationalité : </Text>
            {mag.nationalite == "undefined" ? (
              <Text ml={2} fontSize={"15px"}>
                Africaine
              </Text>
            ) : (
              <Text ml={2} fontSize={"15px"}>
                {`${(" ", mag.nationalite)} `}
              </Text>
            )}
          </Flex>
          <Flex>
            <Text fontWeight={"bold"}>Reservation : </Text>
            <Text  textAlign={"justify"}>
              {(categorie == "Restaurant" ) != 0 ? (
                <Text color={"messenger.500"} ml={2}>
                  En ligne
                </Text>
              ) : (
                <Text color={"red.400"} ml={2}>
                  Non Disponible
                </Text>
              )}
            </Text>
          </Flex>
          <Flex >
          <Heading
            as={"h3"}
            fontWeight={"bold"}
            _hover={{
              cursor: "pointer",
            }}
            onClick={handleToggle}
            color={"blue.700"}
            fontSize={"15px"}
          
          >
            {"Horaire"}
            {show ? (
              <ChevronUpIcon fontSize={"20px"} />
            ) : (
              <ChevronDownIcon fontSize={"20px"} />
            )}{" "}
            :
          </Heading>
          <Collapse in={show}>
            <Box ml={10}>
              {day.map((data, index) => (
                <Text key={index} fontSize={"15px"}>
                  {data}:
                  {mag.horaire != undefined && mag.horaire != null
                    ? `${" "} ${mag.horaire[index] ? mag.horaire[index] : "Non Renseigné"}`
                    : " Non Renseigné"}
                </Text>
              ))}
            </Box>
          </Collapse>
          </Flex>
        </Flex>
        <Center>
        {categorie == "Restaurant" ? <ReservationButton mag={mag.organisation} adresse={mag.adresse} imageMag={mag.imageUrl} /> : categorie == "Salon de Coiffure" ? <ReservationCoiff mag={mag.organisation} adresse={mag.adresse} imageMag={mag.imageUrl} /> : <></>}
        </Center>
      </Box>
      <Box  bgColor={"white"} mt={10} >
          <Mapped adresse={mag.adresse} numero={mag.number} web={mag.siteWeb} />
        </Box>
        </Flex>
        </Center>


      
    </Box>
    </Center>
      {/* Mobile */}
      <Box display={["grid","grid","grid","none","none"]}>
      <Flex width={"100%"}  >  
    <Heading  width={"fit-content"}  >{mag.organisation}</Heading>
    
    </Flex>

    <Box  width={"100%"}  >
    <Box  bgColor={"white"} mb={10}  display={"grid"} >
     
    
    
      <Flex  mt={2}  >
        
          <MdLocationOn color='red' fontSize={25}/>
          <Text>{mag.adresse}</Text>
          
      </Flex>
     
      
      <Box display={"grid"}>
      <Box ml={2} mt={2} >
          <StarM data={mag.feedback} />
          </Box>
          <Flex justifyContent={"space-between"} display={"flex"} mx={5} my={2}>
          <Box as={Link}   href={`tel:${mag.number}`} _hover={{textDecoration:"none"}}>
            <Box ml={4}>
        <BsTelephone fontSize={"20px"}/>
        </Box>
        <Text>Appeler</Text>
      </Box>
        
      <Box    _hover={{textDecoration:"none"}} as='a' href='#avis'>
            <Box >
        <TfiPencil fontSize={"20px"}/>
        </Box>
        <Text>Avis</Text>
      </Box>
     { categorie == "Restaurant" ?  <Box   _hover={{textDecoration:"none"}}>
            <Box  as='a' href='#carte' >
        <MdFastfood   fontSize={"20px"}/>
        </Box>
        <Text>Menu </Text>
      </Box>  : <Box   _hover={{textDecoration:"none"}} as='a' href='#produit'>
        <Center>
            <Box width={"fit-content"} height={"fit-content"}  ml={2}>
            <img width="20" height="20" src="https://img.icons8.com/external-itim2101-fill-itim2101/64/external-Product-business-and-financial-itim2101-fill-itim2101.png" alt="external-Product-business-and-financial-itim2101-fill-itim2101"/>
        </Box>
        </Center>
        <Text>Les Produits</Text>
      </Box> }
     
      {(mag.siteWeb && mag.siteWeb != "undefined" && mag.siteWeb != "non defini"&& mag.siteWeb != "Non défini"&& mag.siteWeb != "") ?
           
               <Box  as={Link} isExternal href={`${mag.siteWeb}`} _hover={{textDecoration:"none"}}>
            <Box width={"fit-content"} height={"fit-content"}  ml={8}>
        <TfiWorld   fontSize={"20px"}/>
        </Box>
        <Text>Site internet </Text>
      </Box>

              :  <Box    _hover={{textDecoration:"none"}}>
              <Box width={"fit-content"} height={"fit-content"}  ml={5}>
          <TfiWorld   fontSize={"20px"}/>
          </Box>
          <Text>Non défini </Text>
        </Box>
          }
     
      {/* <SimpleGrid columns={4} spacingX={2} mt={2}>
          
      <Box alignContent={"center"}>
        <BsTelephone/>
        <Text>Appeler</Text>
      </Box>
      <Flex  as={Link} href={`tel:${mag.number}`}>
            <BsFillTelephoneOutboundFill fontSize={20} />
            <Text

              fontSize={"15px"}
              fontWeight={"medium"}
              ml={2}
              color={"green"}
            >
              {mag.number}
            </Text>
          </Flex>
          <Flex  as={Link} href={`tel:${mag.number}`}>
            <MdFastfood fontSize={20} />
            <Text

              fontSize={"15px"}
              fontWeight={"medium"}
              ml={2}
              color={"green"}
            >
              Carte
            </Text>
          </Flex>      

          {(mag.siteWeb && mag.siteWeb != "undefined" && mag.siteWeb != "non defini") ?
            <Flex  cursor={"pointer"} display={{ base: "flex", lg: "flex" }}  as={Link} isExternal href={`${mag.siteWeb}`} >
              <TfiWorld fontSize={20} />
              <Text

                fontSize={"15px"}
                fontWeight={"medium"}
                ml={1}
                width={'70px'}
                color={"green"}
              >
                Site web
              </Text>
            </Flex> : <Flex display={{ base: "flex", lg: "flex" }} mb={2} mt={2}  ml={5} >
              <TfiWorld fontSize={20} />
              <Text
                fontSize={"15px"}
                width={'90px'}
                fontWeight={"medium"}
                ml={2}
                color={"green"}
              >
                Non defini
              </Text>
            </Flex>
          }

<Flex  mt={2} display={{ base: "flex", lg: "flex" }} >
<TfiWorld fontSize={20} />
    <BsCashCoin fontSize={20} />
          <Box display={ "flex"} ml={2} mt={-1} width={["400px","400px","400px","full","full"]} >
            {mag.methodeDePaiement != "undefined" &&
              mag.methodeDePaiement != null
              ? Object.values(mag.methodeDePaiement).map(methPaiement => {
                return (
                  <Text width={"fit-content"} key={methPaiement} mr={1} >
                    {methPaiement}, {" "}
                  </Text>
                );
              })
              : "Espèces"}
          </Box>
        </Flex>
        </SimpleGrid> */}
        </Flex>
        </Box>
     
      <Flex>
          <Text fontWeight={"bold"} pr={2}>
            Description :{" "}
          </Text>
          {mag.description == "undefined" ? (
            <Text width={"70%"} maxWidth={"70%"} >
              {`${mag.categorie} Africain`}
            </Text>
          ) : (
            <Text width={"70%"} maxWidth={"70%"} >
              {mag.description}
            </Text>
          )}
        </Flex>
     
      <SimpleGrid column={1}>
      <Flex>
          <Text fontWeight={"bold"}>Nationalité : </Text>
          {mag.nationalite == "undefined" ? (
            <Text ml={2} fontSize={"15px"}>
              Africaine
            </Text>
          ) : (
            <Text ml={2} fontSize={"15px"}>
              {`${(" ", mag.nationalite)} `}
            </Text>
          )}
        </Flex>
        <Flex>
          <Text fontWeight={"bold"}>Reservation : </Text>
          <Text  textAlign={"justify"}>
            {(categorie == "Restaurant" ) != 0 ? (
              <Text color={"messenger.500"} ml={2}>
                En ligne
              </Text>
            ) : (
              <Text color={"red.400"} ml={2}>
                Non Disponible
              </Text>
            )}
          </Text>
        </Flex>
        <Flex >
        <Heading
          as={"h3"}
          fontWeight={"bold"}
          _hover={{
            cursor: "pointer",
          }}
          onClick={handleToggle}
          color={"blue.700"}
          fontSize={"15px"}
        
        >
          {"Horaire"}
          {show ? (
            <ChevronUpIcon fontSize={"20px"} />
          ) : (
            <ChevronDownIcon fontSize={"20px"} />
          )}{" "}
          :
        </Heading>
        <Collapse in={show}>
          <Box ml={10}>
            {day.map((data, index) => (
              <Text key={index} fontSize={"15px"}>
                {data}:
                {mag.horaire != undefined && mag.horaire != null
                  ? `${" "} ${mag.horaire[index] ? mag.horaire[index] : "Non Renseigné"}`
                  : " Non Renseigné"}
              </Text>
            ))}
          </Box>
        </Collapse>
        </Flex>
      </SimpleGrid>
      <Center>
      {categorie == "Restaurant" ? <ReservationButton mag={mag.organisation} adresse={mag.adresse} imageMag={mag.imageUrl} /> : categorie == "Salon de Coiffure" ? <ReservationCoiff mag={mag.organisation} adresse={mag.adresse} imageMag={mag.imageUrl} /> : <></>}
      </Center>
    </Box>
    <Center>
    <Box  bgColor={"white"} mt={5}  pb={10}>
        <Mapped adresse={mag.adresse} numero={mag.number} web={mag.siteWeb} />
      </Box>
    </Center>
    
      </Box>
      </Box>
    </>
   
  )
}

export default BoxRestau