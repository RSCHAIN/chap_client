import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "@/FIREBASE/clientApp";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Center
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChevronDownIcon } from "@chakra-ui/icons";
export default function Showconnex() {
  const [users, setUsers] = useState("");
  const router = useRouter();

  const logout = () => {
    signOut(auth);
    router.reload();
  };

  const auth = getAuth(app);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsers(user);
      }
    });
  });
  if (users) {
    {
      console.log(users == false);
    }
    return (
      <Flex mr={{ base: 1, md: 10 }}>
        <Box flexDirection={"column"}>
          <Menu>
            <MenuButton rightIcon={<ChevronDownIcon/>}>
            <Avatar name={users.email.toString()} />
            </MenuButton>
            <MenuList>
              <Center>
             
                <Box textTransform={'capitalize'} cursor={'pointer'} >
                <Text pb={3} _hover={{color:'blue'}}>{users.email.toString()}</Text>
                  <Text pb={2} _hover={{color:'blue'}}>Profiles</Text>
                  <Text pb={2} _hover={{color:'blue'}}>Moyen de paeiments</Text>
                  <Text pb={2} _hover={{color:'blue'}}>Historique</Text>
                </Box>
              </Center>


             <Center><Button border={'none'} bgColor={'white'} _hover={{bgcolor:'white'}} onClick={() => logout()}> Deconnexion</Button></Center> 
            </MenuList>
          </Menu>
          
       
        </Box>
        {/* 
        
        */}
      </Flex>
    );
  } else {
    {
      console.log(users);
    }
    return (
      <Flex
        align={"center"}
        justifyContent={"center"}
        width={"auto"}
        height={"100%"}
        mr={"1em"}
      >
        <Link mr={{ base: "3", md: "3" }} href={"/Connexion"}>
          Se connecter
        </Link>
        <Link href={"/Inscription"}>Inscription</Link>
      </Flex>
    );
  }
}
