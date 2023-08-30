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
  Center,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Firestore, collection, doc, getDocs, where } from "firebase/firestore";
import { query } from "@firebase/database";
import { AiOutlineUser } from "react-icons/ai";

export default function Showconnex() {
  const [users, setUsers] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const logout = () => {
    signOut(auth);
    localStorage.clear()
    router.reload();
  };

  const getData = async (email) => {
    const constraints = [];

    const livings = await collection(db, "Utilisateurs");
    let q = query(livings, ...constraints);

    const qSnapshot = await getDocs(q);

    const dataQ = await qSnapshot.docs.map((doc) => ({
      // console.log("doc data",doc.id)
      ...doc.data(),
      id: doc.id,
    }));
    for (let index = 0; index < dataQ.length; index++) {
      // console.log(dataQ[index].email,email,dataQ[index].email==email )
      if (dataQ[index].email == email) {
        localStorage.setItem("addresse", dataQ[index].address);
        setName(dataQ[index].name);
        localStorage.setItem("name", dataQ[index].name);
        localStorage.setItem("number", dataQ[index].number);
      } else {
        // console.log("echec")
      }
    }

    // console.log("first datas");
    // console.log(dataQ);
  };
  const auth = getAuth(app);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsers(user);
        sessionStorage.setItem("email", user.email);
        getData(user.email);
      }
    });
  }, [auth]);
  if (users) {
    return (
      <>
        <Flex
            display={["none","none","none","flex","flex"]}
          align={"center"}
          justifyContent={"center"}
          width={"auto"}
          height={"100%"}
        >
          {/* <Link display={'flex'} mr={{ base: "3", md: "3" }} fontSize={20} href={"/Connexion"}>
          <Icon as={AiOutlineUser} fontSize={30} mr={2}/> Se connecter
        </Link> */}
          <Popover>
            <PopoverTrigger>
              <Button
               _hover={{
                color: "cyan.700",
                textDecoration: "none",
              }}
                leftIcon={
                  <Icon
                    as={AiOutlineUser}
                   
                    fontSize={30}
                  />
                }
                rightIcon={<ChevronDownIcon />}
                bgColor={"white"}
              >
                Bon retour,{name}
              </Button>
            </PopoverTrigger>
            <PopoverContent width={"210px"}>
              <PopoverArrow />

              {/* <PopoverBody>
              <Center><Button as={Link} href="/Connexion" bgColor="#08566E" color={"white"}_hover={{
                bgColor:"#0f7493",
                textDecoration: "none"
              }}> SE CONNECTER</Button></Center>
            </PopoverBody> */}
              <PopoverBody>
                <Link
                onClick={()=>localStorage.setItem("index",0)}
                  href="/Commandes/#1"
                  width={"full"}
                  _hover={{
                    textDecoration: "none",
                  }}
                >
                  <Button width={"full"} bgColor={"white"}>
                    {" "}
                    Mes commandes
                  </Button>
                </Link>
                <Link
                onClick={()=>localStorage.setItem("index",1)}
                href="/Commandes/#2"
                width={"full"}
                  _hover={{
                    textDecoration: "none",
                  }}
                >
                  <Button width={"full"} bgColor={"white"}>
                    {" "}
                    Mon profils
                  </Button>
                </Link>
                {/* <Link href="/Mybuy" ><Button>Mes commandes</Button></Link> */}
              </PopoverBody>
              <PopoverFooter>
                <Center>
                  <Button
                    border={"none"}
                    bgColor={"white"}
                    _hover={{ bgcolor: "white", color: "red.800" }}
                    onClick={() => logout()}
                  >
                    {" "}
                    Deconnexion
                  </Button>
                </Center>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </Flex>
        
        <Flex
            display={["grid","grid","grid","none","none"]}
         
          width={"auto"}
          height={"100%"}
        >
             
                <Link
                onClick={()=>localStorage.setItem("index",0)}
                  href="/Commandes/#1"
                  width={"full"}
                  _hover={{
                    textDecoration: "none",
                  }}
                >
                  <Button width={"full"} bgColor={"white"}>
                    {" "}
                    Mes commandes
                  </Button>
                </Link>
                <Link
                onClick={()=>localStorage.setItem("index",1)}
                href="/Commandes/#2"
                width={"full"}
                  _hover={{
                    textDecoration: "none",
                  }}
                >
                  <Button width={"full"} bgColor={"white"}>
                    {" "}
                    Mon profils
                  </Button>
                </Link>
                {/* <Link href="/Mybuy" ><Button>Mes commandes</Button></Link> */}
              
                <Center>
                  <Button
                    border={"none"}
                    bgColor={"white"}
                    _hover={{ bgcolor: "white", color: "red.800" }}
                    onClick={() => logout()}
                  >
                    {" "}
                    Deconnexion de {name}
                  </Button>
                </Center>
              
        </Flex>
      
      </>
    );
  } else {
    return (
      <>
      <Flex
      display={["none","none","none","flex","flex"]}
        align={"center"}
        justifyContent={"center"}
        width={"auto"}
        height={"100%"}
      >
        {/* <Link display={'flex'} mr={{ base: "3", md: "3" }} fontSize={20} href={"/Connexion"}>
          <Icon as={AiOutlineUser} fontSize={30} mr={2}/> Se connecter
        </Link> */}
        <Popover>
          <PopoverTrigger>
            <Button
              leftIcon={<Icon as={AiOutlineUser} fontSize={30} mr={2} />}
              rightIcon={<ChevronDownIcon />}
              bgColor={"white"}
            >
              Se connecter
            </Button>
          </PopoverTrigger>
          <PopoverContent width={"210px"}>
            <PopoverArrow />

            <PopoverBody>
              <Center>
                <Button
                  as={Link}
                  href="/Choose"
                  bgColor="#08566E"
                  color={"white"}
                  _hover={{
                    bgColor: "#0f7493",
                    textDecoration: "none",
                  }}
                >
                  {" "}
                  SE CONNECTER
                </Button>
              </Center>
            </PopoverBody>
            <PopoverFooter>
              <Link
                href="/Mybuy"
                width={"full"}
                _hover={{
                  textDecoration: "none",
                }}
              >
                <Button width={"full"} bgColor={"white"}>
                  {" "}
                  Mes commandes
                </Button>
              </Link>
              <Link
                href="/profiles"
                width={"full"}
                _hover={{
                  textDecoration: "none",
                }}
              >
                <Button width={"full"} bgColor={"white"}>
                  {" "}
                  Mon profils
                </Button>
              </Link>
              {/* <Link href="/Mybuy" ><Button>Mes commandes</Button></Link> */}
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </Flex>

<Flex
display={["grid","grid","grid","none","none"]}
  align={"center"}
  justifyContent={"center"}
  width={"auto"}
  height={"100%"}
>
  {/* <Link display={'flex'} mr={{ base: "3", md: "3" }} fontSize={20} href={"/Connexion"}>
    <Icon as={AiOutlineUser} fontSize={30} mr={2}/> Se connecter
  </Link> */}
  <Popover>
    <PopoverTrigger>
      <Button
        leftIcon={<Icon as={AiOutlineUser} fontSize={30} mr={2} />}
        rightIcon={<ChevronDownIcon />}
        bgColor={"white"}
      >
        Se connecter
      </Button>
    </PopoverTrigger>
    <PopoverContent width={"210px"}>
      <PopoverArrow />

      <PopoverBody>
        <Center>
          <Button
            as={Link}
            href="/Choose"
            bgColor="#08566E"
            color={"white"}
            _hover={{
              bgColor: "#0f7493",
              textDecoration: "none",
            }}
          >
            {" "}
            SE CONNECTER
          </Button>
        </Center>
      </PopoverBody>
      <PopoverFooter>
        <Link
          href="/Mybuy"
          width={"full"}
          _hover={{
            textDecoration: "none",
          }}
        >
          <Button width={"full"} bgColor={"white"}>
            {" "}
            Mes commandes
          </Button>
        </Link>
        <Link
          href="/profiles"
          width={"full"}
          _hover={{
            textDecoration: "none",
          }}
        >
          <Button width={"full"} bgColor={"white"}>
            {" "}
            Mon profils
          </Button>
        </Link>
        {/* <Link href="/Mybuy" ><Button>Mes commandes</Button></Link> */}
      </PopoverFooter>
    </PopoverContent>
  </Popover>
</Flex>
</>
    );
  }
}
