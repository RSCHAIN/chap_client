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
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/router";
import { app } from "@/FIREBASE/clientApp";
import secureLocalStorage from "react-secure-storage";
import TransitionExample from "@/components/forgetPassword";

export default function Connexion() {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true });
  const [isLagerThan768] = useMediaQuery("(min-width: 768px)");
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
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
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        getTime();
        if (userCredential.user.emailVerified) {
          setEmail(userCredential.user.email);
          sessionStorage.setItem("email", userCredential.user.email);
          // router.back()
          toast({
            title: "ACCES AUTORISE.",
            description: "Bon Achat",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          router.back();
        } else {
          // sendEmailVerification(auth.currentUser)
          signOut(auth);
          // toast({
          //   title: "Email Non Verifié.",
          //   description: "Verifier Vos Mails Afin De Confirmer La Transaction",
          //   status: "error",
          //   duration: 200000,
          //   // isClosable: true,
          // });
          setVerif(true);
          // setTimeout( router.reload(), "10000")
          // router.reload()
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
            description: "VEUILLEZ VERIFIER VOS ACCES",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else if (
          errorMessage == "Firebase: Error (auth/too-many-requests)."
        ) {
          toast({
            title: "TROP DE TENTATIVES.",
            description: "VEUILLEZ REESAYER PLUS TARD",
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
          } else {
            if (errorMessage == "Firebase: Error (auth/invalid-email).") {
              toast({
                title: "MOT DE PASSE/IDENTIFIANT INCORRECT",
                description: "VEUILLEZ VERIFIER VOS ACCES",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            } else {
              // console.log(error);
            }
          }
        }
      });
  };
  const isError = email === "";

  return (
    <>
      <InputBar />
      {isLagerThan768 ? <Navbar></Navbar> : <></>}
      {/* <Navbar /> */}

      <Center display={"grid"}>
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
          <SimpleGrid columns={[1,1,1,2,2]}>
          <Box h={[300,300,300,500,500]}>
            <Image
              h={[300,300,300,500,500]}
              alt={"logo"}
              width={[350,350,400,650,650]}
              src="/logo1.png"
            
            />
          </Box>
          <Center>
            <Box width={"full"} color={"black"}>
              <FormControl isInvalid={isError}>
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
                  <Center display={"grid"}>
                  <Input
                 mb={2}
                    type={"text"}
                    placeholder="Email"
                    border={"2px solid gray"}
                    // borderRadius={"50px"}
                    width={["200px", "200px", "350px", "350px", "350px"]}
                    onChange={(ev) =>
                      setEmail(ev.target.value.trim().toLowerCase())
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
                    <Center>
                    <Button
                    
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
                    bgColor={"white"}
                    _hover={{
                      textDecoration:"none",
                      bgColor:"white"
                    }}
                    >
                  Pas de compte?  Créer un compte
                    </Button>
                    {/* <Button
                    display={["none","none","none","grid","grid"]}
                      as={Link}
                      width={"fit-content"}
                      mt={10}
                      fontSize={20}
                      // textAlign={"center"}
                      height={"40px"}
                      border={"1px solid #08566e"}
                      borderRadius={"5%"}
                      _hover={{
                        color: "#C0C0C0",
                      }}
                      href={"/Inscription"}
                    >
                      Inscription
                    </Button> */}
                    </Box>
                
                </Stack>
                {!isError ? (
                  <FormHelperText></FormHelperText>
                ) : (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
              </FormControl>
            </Box>
          </Center>
          </SimpleGrid>
        </Flex>
      </Center>
    </>
  );
}
