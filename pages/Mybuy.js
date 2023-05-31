import { db2 } from "@/FIREBASE/clientApp";
import InputBar from "@/components/InputBar";
import Navbar from "@/components/Navbar";
import {
  Badge,
  Box,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useMediaQuery,
} from "@chakra-ui/react";
import { onValue, ref } from "@firebase/database";
import { useState } from "react";
import { useEffect } from "react";

function Cancel({ items, email }) {
  // console.log(items.Status);
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
                EUR
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

function Valide({ items, email }) {
  // console.log(items.Status);
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
                EUR
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

function Launch({ items, email }) {
  // console.log(items.Status);
  if (items.Status == "En Cours" && items.initiateur == email) {
    return (
      <>
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
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
                EUR
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

export default function Buy() {
  const [isLagerThan768] = useMediaQuery("(min-width: 768px)");
  const [commandeListe, setCommandeListe] = useState([]);
  const [email, setEmail] = useState();
  const Getall = async () => {
    const starCountRef = ref(db2, "Commandes/");
    onValue(starCountRef, (snapshot) => {
      setCommandeListe(snapshot.val());
      // console.log(snapshot.val())
    });
  };

  useEffect(() => {
    Getall();
    setEmail(localStorage.getItem("email"));
   
  },[setCommandeListe]);
 
  return (
   
    <>
      <InputBar />
      {isLagerThan768 ? <Navbar></Navbar> : <></>}
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>VALIDEE</Tab>
          <Tab>EN COURS</Tab>
          <Tab>ANNULEE</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {Object.values(commandeListe).map((items) => (
              <Valide key={items.key} items={items} email={email} />
            ))}
          </TabPanel>
          <TabPanel>
            {Object.values(commandeListe).map((items) => (
              <Launch key={items.key} items={items} email={email} />
            ))}
          </TabPanel>
          <TabPanel>
            {Object.values(commandeListe).map((items) => (
              <Cancel key={items.key} items={items} email={email} />
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
