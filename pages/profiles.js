import Navbar from "@/components/Navbar";
import InputBar from "@/components/InputBar";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Text,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import Footer from "@/components/footer";
import FooterR from "@/components/footerResponsif";
import { app, db } from "@/FIREBASE/clientApp";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  updateEmail,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { deleteDoc, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";

export default function Profiles() {
  const router = useRouter();
  const [users, setUsers] = useState("");
  const [email, setEmail] = useState("");
  const auth = getAuth(app);
  const toast = useToast();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const firestore = getFirestore(app);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUsers(user);
        setEmail(user.email);
        const docRef = doc(db, "Utilisateurs/" + user.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setAddress(docSnap.data().address);
          setName(docSnap.data().name);
          setNumber(docSnap.data().number);
          setSurname(docSnap.data().surname);
        }
      } else {
        router.push("/Choose");
      }
    });
  }, [auth,router]);
  const createNew=async ()=>{
    await deleteDoc(doc(db, "Utilisateurs", email));
        const _user = doc(firestore, `Utilisateurs/${users}`);
        // structure the todo data
        const Users = {
          name,
          surname,
          number,
          address,
          email: users,
          state: "active",
        };
        await setDoc(_user, Users);
        toast({
          title: "Mail Mise A Jour",
          description: "Bonne Continuation!!",
          status: "success",
          duration: 10000,
          isClosable: true,
        });
        signOut(auth);
  }

  const updateLang=async ()=>{
    const _user = doc(firestore, 'Utilisateurs/',email.toString());
    // structure the todo data
    const Users = {
      name:name,
      surname:surname,
      number:number,
      address:address,
      email: email,
      state: "active",
    };
    await updateDoc(_user, Users);
    toast({
      title: "Information Mise A Jour",
      description: "Bonne Continuation!!",
      status: "success",
      duration: 10000,
      isClosable: true,
    });
  }
  const updatEmail = () => {
    updateEmail(auth.currentUser, users)
      .then( () => {
        createNew()
      })
      .catch((error) => {
        console.log(error)
        toast({
          title: "Erreur",
          description: "Veuillez reesayer apres vous etes reconnecté(e)",
          status: "error",
          duration: 10000,
          isClosable: true,
        });
      });
  };
  const [isLagerThan768] = useMediaQuery("(min-width: 768px)");
  return (
    <>
     <InputBar />
        {isLagerThan768 ? <Navbar></Navbar> : <></>}
      <Box
        bgColor={"#FFDEE9"}
        bgGradient={"linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%);"}
      >
       
        <Center >
          <Box
            w="lg"
            borderWidth="1px"
            px={10}
            mb={5}
            pb={10}
            shadow="md"
            borderRadius="lg"
            overflow="hidden"
          >
            <Flex pt={5}>
              <Text pt={2}>Email</Text>
              <Input
                type={"text"}
                defaultValue={users.email}
                w={"xs"}
                onChange={(e) => setUsers(e.target.value)}
                ml={5}
              />
            </Flex>
            <Button onClick={() => updatEmail()}>Mise A Jour Email</Button>
            <Heading pt={5}>Informations Personnelles</Heading>
            <Flex pt={5}>
              <Text pt={2}>Nom</Text>
              <Input
                type={"text"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                w={"xs"}
                ml={5}
              />
            </Flex>
            <Flex pt={5}>
              <Text pt={2}>Addresse</Text>
              <Input
                type={"text"}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                w={"xs"}
                ml={5}
              />
            </Flex>
            <Flex pt={5}>
              <Text pt={2}>Prenom</Text>
              <Input
                type={"text"}
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                w={"xs"}
                ml={5}
              />
            </Flex>
            <Flex pt={5}>
              <Text pt={2}>Numero De Telephone</Text>
              <Input
                type={"text"}
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                w={"xs"}
                ml={5}
              />
            </Flex>
            <Center>
              <Flex mt={10}>
                <Button onClick={()=>updateLang()}>Mettre a jour les donnees</Button>
              </Flex>
            </Center>
          </Box>
        </Center>
        <FooterR />
      </Box>
    </>
  );
}
