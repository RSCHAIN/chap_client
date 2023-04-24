import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app, db, db2 } from "@/FIREBASE/clientApp";
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
import { Firestore, collection, doc, getDocs } from "firebase/firestore";
import { query } from "@firebase/database";
export default function Showconnex() {
  const [users, setUsers] = useState("");
  const router = useRouter();
  const [data,setData] = useState([])

  const logout = () => {
    signOut(auth);
    router.reload();
  };
 
  const getData = async () => {
    const constraints = [];

    const livings = await collection(db, "Utilisateurs");
    let q = query(livings, ...constraints);

    const qSnapshot = await getDocs(q);

    const dataQ = await qSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
   
  setData(dataQ)

    // console.log("first datas");
    // console.log(datas);
  };
  const auth = getAuth(app);
  useEffect(  () => {
   
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsers(user);
        getData()
      }
    });
   
  },[]);
  if (users) {
   
    return (
      <Flex mr={{ base: 1, md: 10 }}>
        <Box flexDirection={"column"}>
          <Menu>
            <MenuButton rightIcon={<ChevronDownIcon/>}>
            <Avatar />

            </MenuButton>
            <MenuList>
              <Center>
             
                <Box textTransform={'capitalize'} cursor={'pointer'} flexDirection={'column'} >
                <Text pb={3} _hover={{color:'blue'}}>{users.email.toString()}</Text>
                {/* <Text pb={3} textAlign={'center'} cursor={'auto'}fontSize={20}>Bienvenue,{data[0].name}</Text> */}
                  <Link pb={2} _hover={{color:'blue'}} href="/profiles">Profiles</Link><br/><br/>
                  <Link pb={2} _hover={{color:'blue'}} href="/#">Moyen de paeiments</Link><br/><br/>
                  <Link pb={2} _hover={{color:'blue'}} href="/historique">Historique</Link><br/><br/>
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
