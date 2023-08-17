import { db2 } from "@/FIREBASE/clientApp";
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useMediaQuery,
} from "@chakra-ui/react";
import { onValue, ref, update } from "@firebase/database";
import { useEffect, useState } from "react";
import Profiles from "./profiles";
import Navbar from "@/components/Navbar";
import InputBar from "@/components/InputBar";
import FooterR from "@/components/footerResponsif";

function Cancel2(id, state) {
  // console.log(id);
  update(ref(db2, "Commandes/" + String(id)), {
    Status: state,
  });
}

function Valide({ items, email }) {
  // console.log(items.Status);
  if (items.Status == "VALIDE" && items.initiateur == email) {
    return (
      <>
       <Box
       mt={2}
          maxW="full"
          maxH={"150px"}
          display={"flex"}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden" 
        >
          <Image src={items.imageUrl} alt={items.nom} h="120px" w="150px"/>

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
              {items.totalPrix + " "}
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
function Cancel({ items, email }) {
  // console.log(items.Status);
  if (items.Status == "ANNULE" && items.initiateur == email) {
    return (
     <>
        <Box
        mt={2}
          maxW="full"
          maxH={"150px"}
          display={"flex"}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden" 
        >
          <Image src={items.imageUrl} alt={items.nom} h="150px" w="150px"/>

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
              {items.totalPrix + " "}
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
function Launch({ items, email,id }) {
  // console.log(items);
  if (items.Status == "En Cours" && items.initiateur == email) {
    return (
      <>
        <Box
        mt={2}
          maxW="full"
          maxH={"150px"}
          display={"flex"}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden" 
        >
          <Image src={items.imageUrl} alt={items.nom} h="150px" w="150px"/>

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
              {items.totalPrix + " "}
              <Box as="span" color="gray.600" fontSize="sm">
                €
              </Box>
            </Box>
            <Box>
              <Button bgColor={'red.500'} _hover={{
                bgColor:'#FF6969'
              }} color={'white'} onClick={() => Cancel2(id, "ANNULE")}>
                Annuler
              </Button>
            </Box>
          </Box>
        </Box>
      </>
    );
  } else {
    return <></>;
  }
}

export default function Commande() {
  const [commandeListe, setCommandeListe] = useState([]);
  const [email, setEmail] = useState();
  const [id, setId] = useState([]);
  const [inde, setInde] = useState();
  const Getall = async () => {
    const starCountRef = ref(db2, "Commandes/");
    onValue(starCountRef, (snapshot) => {
      setCommandeListe(snapshot.val());
      if (snapshot.val() != undefined || snapshot.val() != null) {
        setId(Object.keys(snapshot.val()));
      }

      // console.log(snapshot.val())
    });
  };

  useEffect(() => {
    Getall();
    setEmail(sessionStorage.getItem("email"));

    setInde(parseInt(localStorage.index));
  }, [setCommandeListe]);
  const [isLagerThan768] = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <InputBar />
      {isLagerThan768 ? <Navbar></Navbar> : <></>}
      {/* <Box width="100%">
        {commandeListe ? (
          Object.values(commandeListe).map((items) => (
            <Valide key={items.key} items={items} id={id} email={email} />
          ))
        ) : (
          <Box>Aucune donnee</Box>
        )} */}
      {/* </Box> */}
      <Center>
        <Tabs
          isManual
          orientation={"vertical"}
          variant="outfitted"
          isLazy
          w={"1400px "}
          // defaultIndex={1}
          mt={10}
        >
          <TabList width={"300px"} h={"10em"} >
            <Tab id="Commandes"> Vos commandes</Tab>
            <Tab id="Compte" isSelected={true}>
              Votre compte
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Tabs isManual isLazy ml={10} w={"80% "}>
                <TabList>
                  <Tab>COMMANDES LIVRÉES/EN COURS</Tab>
                  <Tab>COMMANDES ANNULÉES</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Box >
                      {commandeListe ? (
                        Object.values(commandeListe).map((items,index) => (
                          <Launch
                            key={items.key}
                            items={items}
                            id={id[index]}
                            email={email}
                          />
                        ))
                      ) : (
                        <Box>Aucune donnee</Box>
                      )}
                    </Box>
                    <Box >
                      {commandeListe ? (
                        Object.values(commandeListe).map((items) => (
                          <Valide
                            key={items.key}
                            items={items}
                            id={id}
                            email={email}
                          />
                        ))
                      ) : (
                        <Box>Aucune donnee</Box>
                      )}
                    </Box>
                  </TabPanel>
                  <TabPanel>
                  <Box >
                    {commandeListe ? (
              Object.values(commandeListe).map((items) => (
                <Cancel key={items.key} items={items} email={email} />
              ))
            ) : (
              <Box>Aucune donnee</Box>
            )}
            </Box>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </TabPanel>
            <TabPanel>
              <Profiles />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Center>
      <FooterR />
    </>
  );
}
