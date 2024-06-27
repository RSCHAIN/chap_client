"use client";
import Navbar from "@/components/Navbar";
import InputBar from "@/components/InputBar";
import {
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  Modal,
  InputGroup,
  InputRightAddon,
  SimpleGrid,
  InputRightElement,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Label,
  FormControl,
  Flex,
  FormLabel,
  Input,
  Link,
  Stack,
  Checkbox,
  Box,
  Image,
  Alert,
  useToast,
  Toast,
  Center,
  Heading,
  Text,
  FormHelperText,
  FormErrorMessage, Divider,
  AbsoluteCenter
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  getAuth,
  getRedirectResult,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/router";
import { app, authentic, db, provider, provider2, signinWithGoogle } from "@/FIREBASE/clientApp";
import secureLocalStorage from "react-secure-storage";
import TransitionExample from "@/components/forgetPassword";
// import ScriptComponent from '../components/ScriptComponent';
import Head from "next/head";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { FacebookIcon } from "next-share";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Connexion() {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const {
    isOpen,
    onClose,
    onOpen,
  } = useDisclosure();
  const [isLagerThan768] = useMediaQuery("(min-width: 768px)");
  const [password, setPassword] = useState("");
  const [connected, setConnected] = useState(0);
  const [redirectLink, setRedirectLink] = useState("/");


  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [code, setCode] = useState(" ");
  const [ville, setVille] = useState(" ");
  const [verif, setVerif] = useState();
  const auth = getAuth(app);
  const router = useRouter();
  const toast = useToast();




  const getTime = () => {
    const currentTime = new Date();
    const timestanp = currentTime.getTime();
    secureLocalStorage.setItem("time", timestanp);
    // console.log("okay")
  };

  const loginUSer = async () => {
    await signInWithEmailAndPassword(authentic, email.toLowerCase(), password)
      .then(async (userCredential) => {

        getTime();
        if (userCredential.user.emailVerified) {
          setEmail(userCredential.user.email);
          sessionStorage.setItem("email", userCredential.user.email);
          const docRef = doc(db, "Utilisateurs/" + userCredential.user.email);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            secureLocalStorage.setItem("surname", docSnap.data().surname);

          } else {
            secureLocalStorage.setItem("surname", "undefini");
          }
          // router.back()
          toast({
            title: "ACCES AUTORISE.",
            description: "Bon Achat",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
          if (localStorage.getItem("redirect_url")) {
            // console.log("Redirection")
            localStorage.removeItem("redirect_url")
            localStorage.removeItem("displayed")
            router.back()
          } else {
            router.push("/")
            router.reload();
          }



          // router.push("/")
          // router.reload();
        } else {

          signOut(authentic);

          setVerif(true);

        }
      })
      .catch((error) => {
        // throw error;
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(error.message)
        // console.log(error.message)
        if (errorMessage == "Firebase: Error (auth/user-not-found).") {
          // console.log("VEUILLEZ VERIFIER VOS INFOS DE CONNEXION");
          toast({
            title: "ACCES REFUSE.",
            description: "Utilisateur introuvable, veuillez vous inscrire.∂",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else if (
          errorMessage == "Firebase: Error (auth/too-many-requests)."
        ) {
          toast({
            title: "Trop de tentatives.",
            description: "Veuillez reessayer plus tard",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else {
          if (errorMessage == "Firebase: Error (auth/wrong-password).") {
            toast({
              title: "MOT DE PASSE/IDENTIFIANT INCORRECT",
              description: "VEUILLEZ VERIFIER VOS ACCES",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          }
          else {
            if (errorMessage == "Firebase: Error (auth/invalid-email).") {
              toast({
                title: "MOT DE PASSE/IDENTIFIANT INCORRECT",
                description: "VEUILLEZ VERIFIER VOS ACCES",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            } else {
              toast({
                title: "Mot de passe ou identifiant inconnu ",
                description: "Veuillez verifier vos informations.",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
              // console.log(error);
            }
          }
        }
      });
  };



  const handleSaved = async () => {
    secureLocalStorage.setItem("number", phoneNumber);
    secureLocalStorage.setItem("addresse", address);
    secureLocalStorage.setItem("po", code);
    const _user = doc(db, `Utilisateurs/${email.toString()}`);
    // structure the todo data
    const Users = {
      name: username,
      number: phoneNumber,
      address,
      email,

      ville,
      code,

      state: "active",
    };
    await setDoc(_user, Users);
    toast({
      title: "Connexion établie", duration: 9000, status: "success"
    })
    if (sessionStorage.getItem("redirect_url")) {
      router.back()
    }

    router.push("/")
    router.reload();

    // handleRedirect()
  }

  const handleRedirect = () => {

  }

  const loginGoogle = async () => {
    try {
      const response = await signinWithGoogle()
        .then((res) => {
          secureLocalStorage.setItem("name", response.user.displayName),
            router.push("/")
        }
        );

    } catch (error) {

    }




  }




  const signinWithGoogle = () => {
    // console.log("connexion")
    signInWithPopup(authentic, provider).then(async (res) => {
      secureLocalStorage.setItem("name", res.user.displayName)
      setUsername(res.user.displayName)
      setEmail(res.user.email)
      const docRef = doc(db, "Utilisateurs/" + res.user.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        secureLocalStorage.setItem("surname", docSnap.data().surname);
        // setVerified("verify")
        //  router.push("/"); 
        //  router.reload()
        if (localStorage.getItem("redirect_url")) {
          // console.log("Redirection")
          setConnected(1)
          localStorage.removeItem("redirect_url")
          localStorage.removeItem("displayed")
          // router.back()
        } else {
          setConnected(1)
          // router.push("/")
          // router.reload();
        }
      } else {
        console.log("dans le else")

        onOpen()

      }

      toast({
        title: "ACCES AUTORISE.",
        description: "Bon Achat",
        status: "success",
        duration: 3000,
        isClosable: true,
      })


    }).catch((error) => { })
  }

  
  const signinWithFacebook = () => {
    // console.log("connexion")
    signInWithPopup(authentic, provider2).then(async (res) => {
      console.log(res.user)
      secureLocalStorage.setItem("name", res.user.displayName)
      setUsername(res.user.displayName)
      setEmail(res.user.email)
      const docRef = doc(db, "Utilisateurs/" + res.user.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        secureLocalStorage.setItem("surname", docSnap.data().surname);
        // setVerified("verify")
      //  router.push("/"); 
      //  router.reload()
      if ( localStorage.getItem("redirect_url")) {
        // console.log("Redirection")
        localStorage.removeItem("redirect_url")
        localStorage.removeItem("displayed")
        router.back()
      }else{
         router.push("/") 
      router.reload(); 
      }
      } else {
       onOpen();
       return
      }

      toast({
        title: "ACCES AUTORISE.",
        description: "Bon Achat",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      // router.push("/"); 
      //  router.reload()
   



      // 
      // console.log("donnees google", res.user.email)

    }).catch((error) => {})
    // signInWithRedirect(auth, provider2);
    // getRedirectResult(auth)
    //   .then((result) => {
    //     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    //     const credential = FacebookAuthProvider.credentialFromResult(result);
    //     const token = credential.accessToken;

    //     const user = result.user;
    //     // IdP data available using getAdditionalUserInfo(result)
    //     // ...
    //   }).catch((error) => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     const email = error.customData.email;
    //     // AuthCredential type that was used.
    //     const credential = FacebookAuthProvider.credentialFromError(error);
    //     // ...
    //   });
  }

  useEffect(() => {
    onAuthStateChanged(authentic, async (user) => {
      if (user) {
        console.log("user", user.email)

        const docRef = doc(db, "Utilisateurs/" + user.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setConnected(1)
          secureLocalStorage.setItem("surname", docSnap.data().surname);
          // setVerified("verify")
          //  router.push("/"); 
          //  router.reload()
          if (localStorage.getItem("redirect_url")) {
            // console.log("Redirection")
            setRedirectLink(localStorage.getItem("redirect_url"))
            localStorage.removeItem("redirect_url")
            localStorage.removeItem("displayed")
            // router.back()
          } else {
            setConnected(1)
            // router.push("/")
            // router.reload();
          }
        } else {
          console.log("dans le else")

          onOpen()

        }

      }
    })
  }, [authentic, connected])


  if (connected == 0) {
    return (
      <>
        <Head>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-RFSVQTGJ87"
          ></script>
          <script strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments)}
             gtag('js', new Date()); 
             gtag('config', 'G-RFSVQTGJ87');
             `}

          </script>
        </Head>
        <InputBar />
        {isLagerThan768 ? <Navbar></Navbar> : <></>}
        {/* <Navbar /> */}

        <Center display={"grid"} height={"fit-content"} mb={40}>
          {verif ? (
            <Alert status="error" w={"fit-content"}>
              <AlertIcon />
              <Box>
                <AlertTitle>Mail Pas Verifié!</AlertTitle>
                <AlertDescription>
                  <p>
                    {" "}
                    Merci de bien vouloir consulter vos mails afin de confirmer
                    votre inscription sur notre site{" "}
                  </p>
                </AlertDescription>
              </Box>
              <CloseButton
                alignSelf="flex-start"
                position="relative"
                right={-1}
                top={-1}
                onClick={onClose}
              />
            </Alert>
          ) : (
            <></>
            // <Butto   n onClick={onOpen}>Show Alert</Butto>
          )}
          <Flex
            textAlign={"center"}
            bgColor={["white", "white", "white", "white", "white"]}
            borderRadius={5}
            w={"90%"}
            h={500}
            mx={[5, 5, 5, 5, 12]}
            my={5}
          // boxShadow={"0px 4px 24px "}
          >
            <SimpleGrid columns={[1, 1, 1, 2, 2]}>
              <Box px={{base:"30%",lg:0}} h={[200, 200, 300, 500, 500]}>
                <Image
                  h={[200, 200, 300, 500, 500]}
                  alt={"logo"}
                  width={[300, 300, 400, 650, 650]}
                  src="/logo1.png"

                />
              </Box>
              <Center>
                <Box width={"full"} color={"black"}>
                  <FormControl>
                    <Stack spacing={4}>
                      <Heading
                        display={["none", "none", "none", "grid", "grid"]}
                        ml={["10%", "10%", "10%", "0%", "0%"]}
                      >
                        Bienvenue
                      </Heading>
                      <Text display={["none", "none", "none", "grid", "grid"]}>
                        Connectez-vous á votre compte
                      </Text>
                      <Center  display={"grid"} >
                        <Button mb={2}
                          width={"fit-content"} borderBottom={"2px solid black"}
                          leftIcon={<FaGoogle />}

                          // borderRadius={"50px"}
                          bgColor={"#fff"}
                          color={"black"}
                          _hover={{
                            bg: "#ccf",
                          }}
                          border={"1px solid black"}
                          onClick={signinWithGoogle}
                        >
                          Connexion avec Google
                        </Button>

                      </Center>
                      {/* <Center  display={"grid"} >
                        <Button mb={2}
                          width={"fit-content"} borderBottom={"2px solid black"}
                          leftIcon={<FaGoogle />}

                          // borderRadius={"50px"}
                          bgColor={"#fff"}
                          color={"black"}
                          _hover={{
                            bg: "#ccf",
                          }}
                          border={"1px solid black"}
                          onClick={signinWithFacebook}
                        >
                          Connexion avec Facebook
                        </Button>

                      </Center> */}
                      {/* <Center display={"grid"} >
                        <Button mb={2}
                          width={"fit-content"} borderBottom={"2px solid black"}
                          leftIcon={<FaFacebook />}
  
                          // borderRadius={"50px"}
                          bgColor={"#fff"}
                          color={"black"}
                          _hover={{
                            bg: "#ccf",
                          }}
                          border={"1px solid black"}
                          onClick={signinWithFacebook}
                        >
                          Connexion avec Facebook
                        </Button>
  
                      </Center> */}
                      <Box position='relative' padding='5'>
                        <Divider />
                        <AbsoluteCenter bg='white' px='4'>
                          Où
                        </AbsoluteCenter>
                      </Box>
                      <Center display={"grid"}>
                        <Input
                          mb={2}
                          type={"text"}
                          placeholder="Email"
                          border={"2px solid gray"}
                          value={email}
                          // borderRadius={"50px"}
                          width={["200px", "200px", "350px", "350px", "350px"]}
                          onChange={(ev) =>
                            setEmail(ev.target.value.toLowerCase().trim())
                          }
                          color={"gray.500"}
                        />
                        <InputGroup >
                          <Input
                            onChange={(e) => setPassword(e.target.value)}
                            width={["200px", "200px", "350px", "350px", "350px"]}
                            type={show ? 'text' : 'password'}
                            placeholder='Entrez le mot de passe'
                          />
                          {/* <InputRightElement width="fit-content">
          <Button h='1.75rem'  onClick={handleClick}>
            {show ? 'Masquer' : 'voir'}
          </Button>
        </InputRightElement> */}
                        </InputGroup>
                      </Center>

                      <TransitionExample />
                      <Box display={"grid"}>
                        <Center display={"grid"} width={{base:"75%",lg:"100%"}}>
                          <Button
                            ml={10}
                            mb={2}
                            width={"fit-content"}
                            // borderRadius={"50px"}
                            bgColor={"#08566e"}
                            color={"white"}
                            _hover={{
                              bg: "#08566e",
                            }}

                            onClick={() => loginUSer()}
                          >
                            Connexion{" "}
                          </Button>

                        </Center>
                        <Button
                          as={Link}
                          href={"/Inscription"}
                          bgColor={"white"}
                          _hover={{
                            textDecoration: "none",
                            bgColor: "white"
                          }}
                        >
                          Pas de compte?  Créer un compte
                        </Button>

                      </Box>

                    </Stack>

                  </FormControl>
                </Box>
              </Center>
            </SimpleGrid>
          </Flex>
        </Center>


        <Modal isOpen={isOpen} onClose={onClose}>

          <ModalContent>
            <ModalHeader>Informations supplémentaires</ModalHeader>

            <ModalBody>
              <Box>
                <Text>Numéro de téléphone :</Text>
                <Input type="number" onChange={(e) => (setNumber(e.target.value))} />
                <Text>Adresse :</Text>
                <Input type="text" onChange={(e) => (setAddress(e.target.value))} />
                <Text>Ville:</Text>
                <Input type="text" onChange={(e) => (setVille(e.target.value))} />
                <Text>Code postal:</Text>
                <Input type="number" maxLength={5} onChange={(e) => (setCode(e.target.value))} />
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={() => { handleSaved() }}>
                Enregistrer
              </Button>

            </ModalFooter>
          </ModalContent>
        </Modal>


      </>
    );
  } else {

    return (
      <>
        <Box className=' h-screen w-screen'>
          <Center pt={{ base: "50%", lg: 10 }}>
            <Image src={"/userin.jpg"} alt="#" width={"100px"} height={"100px"} />
          </Center>
          <Text textAlign={"center"}>Veuillez cliquer <Link href={redirectLink} color={'blue'} fontWeight={"bold"} >ici</Link>  afin d{"‘"}être redirigé, si vous n{"‘"}êtes pas redirigé automatiquement  </Text>

        </Box>
      </>
    )
  }

}
