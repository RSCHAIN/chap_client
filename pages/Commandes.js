import { db2 } from "@/FIREBASE/clientApp";
import { Badge, Box, Button, Flex, Image, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { onValue, ref, update } from "@firebase/database";
import { useEffect, useState } from "react";


function Cancel2(id, state) {
    console.log(id)
    update(ref(db2, "Commandes/" + String(id)), {
      Status: state,
    });
  }







function Valide({ items, email ,id}) {
    console.log("items",id);
    if (items.Status == "VALIDE" && items.initiateur == email) {
      return (
        <>
          <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image src={items.imageUrl} alt={items.nom} />
  
            <Box p="6">
              <Box display="flex" alignItems="baseline">
                <Badge borderRadius="full" px="2" colorScheme="green">
                  {items.Status}
                </Badge>
              </Box>
  
              <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                noOfLines={1}
              >
                {items.nom}
              </Box>
  
              <Box>
                {items.totalPrice + " "}
                <Box as="span" color="gray.600" fontSize="sm">
                  €
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      );
    } else {
        if (items.Status == "En Cours" && items.initiateur == email) {
            return (
              <>
                <Box
                  maxW="fit-content"
                  display={"flex"}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                >
                  <Image src={items.imageUrl} alt={items.nom} />
        
                  <Box p="6">
                    <Box display="flex" alignItems="baseline">
                      <Badge borderRadius="full" px="2" colorScheme="blue">
                        {items.Status}
                      </Badge>
                    </Box>
        
                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                      noOfLines={1}
                    >
                      {items.nom}
                    </Box>
        
                    <Box>
                      {items.totalPrice + " "}
                      <Box as="span" color="gray.600" fontSize="sm">
                        €
                      </Box>
                    </Box>
                    <Box>
                      <Button bgColor={'red'} _hover={{
                        bgColor:'#FF6969'
                      }} color={'white'} onClick={() => Cancel2(id, "ANNULE")}>
                        ANNULER COMMANDE
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </>
            );
          } else {
            if (items.Status == "ANNULE" && items.initiateur == email) {
                return (
                  <>
                    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
                      <Image src={items.imageUrl} alt={items.nom} />
            
                      <Box p="6">
                        <Box display="flex" alignItems="baseline">
                          <Badge borderRadius="full" px="2" colorScheme="red">
                            {items.Status}
                          </Badge>
                        </Box>
            
                        <Box
                          mt="1"
                          fontWeight="semibold"
                          as="h4"
                          lineHeight="tight"
                          noOfLines={1}
                        >
                          {items.nom}
                        </Box>
            
                        <Box>
                          {items.totalPrice + " "}
                          <Box as="span" color="gray.600" fontSize="sm">
                            €
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </>
                );
              } else {
                return <></>;
              }
          }
        }
    }

export default function Commande() {
    const [commandeListe, setCommandeListe] = useState([]);
    const [email, setEmail] = useState();
    const [id,setId] =useState()
    const Getall = async () => {
      const starCountRef = ref(db2, "Commandes/");
      onValue(starCountRef, (snapshot) => {
        setCommandeListe(snapshot.val());
        if (snapshot.val()!=undefined || snapshot.val()!=null) {
          setId(Object.keys(snapshot.val()))
        }
       
        // console.log(snapshot.val())
      });
    };
  
    useEffect(() => {
      Getall();
      setEmail(sessionStorage.getItem("email"));
    }, [setCommandeListe]);
  
  return (
    <>
      <Box width="100%"  >
      {commandeListe ? (
              Object.values(commandeListe).map((items) => (
                <Valide  key={items.key} items={items}  id={id} email={email} />
              ))
            ) : (
              <Box>Aucune donnee</Box>
            )}
      </Box>
    </>
  );
}
