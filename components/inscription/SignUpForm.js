"use client";
import {
  Box,
  Button,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
// fontawesone Icone
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faPhone,
  faHome,
  faEnvelope,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
// React icone
import { } from "react-icons/fa";
import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { app, authentic } from "@/FIREBASE/clientApp";
import { getFirestore } from "firebase/firestore";
import { doc } from "@firebase/firestore"; // for creating a pointer to our Document
import { setDoc } from "firebase/firestore"; // for adding the Document to Collection
import FooterR from "../footerResponsif";
import axios from "axios";
import Head from "next/head";

const SignUpForm = () => {
/// couleur des differents elements
const [color1, setColor1] = useState("gray.400");
const [color2, setColor2] = useState("gray.400");
const [color3, setColor3] = useState("gray.400");
const [color4, setColor4] = useState("gray.400");
const [color5, setColor5] = useState("gray.400");
const [color6, setColor6] = useState("gray.400");
const [color7, setColor7] = useState("gray.400");
const [color8, setColor8] = useState("gray.400");
const [color9, setColor9] = useState("gray.400");

const [width1, setWidth1] = useState("1px");
const [width2, setWidth2] = useState("1px");
const [width3, setWidth3] = useState("1px");
const [width4, setWidth4] = useState("1px");
const [width5, setWidth5] = useState("1px");
const [width6, setWidth6] = useState("1px");
const [width7, setWidth7] = useState("1px");
const [width8, setWidth8] = useState("1px");
const [width9, setWidth9] = useState("1px");

/// fin de la def


  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [number, setNumber] = useState();
  const [address, setAdress] = useState();
  const [rue, setRue] = useState();
  const [ville, setVille] = useState("");
  const [code, setCode] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const auth = getAuth(app);
  const router = useRouter();
  const toast = useToast();
  const firestore = getFirestore(app);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const createUSer = async () => {
    const event = new Date(Date.now());
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    if (password == password2) {
      setColor8("gray.400")
      setColor9("gray.400")
      setWidth8("1px")
      setWidth9("1px")
      if (name && name.length > 2) {
        setColor1("gray.400")
        setWidth1("1px")
        if (surname && surname.length > 2) {
          setColor2("gray.400")
        setWidth2("1px")
          if (number && number.length >= 8) {
            setColor3("gray.400")
            setWidth3("1px")
            if (address && address != null && address.length > 0 && address != " ") {
              setColor4("gray.400")
              setWidth4("1px")
              if (email && email != null && email.length > 0 && email != " " && email.includes("@")) {
                setColor5("gray.400")
                setWidth5("1px")
                if (ville && ville != null && ville.length > 0 && ville != " ") {
                  setColor6("gray.400")
                  setWidth6("1px")
                  if (code && code != null && code.length >= 5 && code != " ") {
                    setColor7("gray.400")
                    setWidth7("1px")
                    // create a pointer to our Document
                    const _user = doc(firestore, `Utilisateurs/${email.toString()}`);
                    // structure the todo data
                    const Users = {
                      name,
                      surname,
                      number,
                      address,
                      email,

                      ville,
                      code,
                      createdAt: event.toLocaleDateString('fr-FR', options),
                      state: "active",
                    };
                    await setDoc(_user, Users);

                    await createUserWithEmailAndPassword(auth, email, password)
                      .then(async (userCredential) => {
                        await axios.post("/api/SendWelcome", {
                          message: "Bienvenue Sur CHAP",
                          email: userCredential.user.email,
                        });
                        await sendEmailVerification(userCredential.user);
                        // console.log(userCredential.user);
                        setEmail(userCredential.user.email);
                        // router.back()
                        signOut(authentic);
                        alert(`Veuillez consulter vos mails pour valider votre inscription. \nNB: N'hésitez pas à consulter vos spams si vous ne recevez pas le mail de validation`);
                        router.push("/Connexion")
                        toast({
                          title: "SUCCES.",
                          description: "INSCRIPTION VALIDEE",
                          status: "success",
                          duration: 3000,
                          isClosable: true,
                        });
                        router.push("/Connexion")
                      })
                      .catch((error) => {
                        // throw error;
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        //   console.log(errorMessage)
                        //   console.log(errorCode)
                        if (errorCode == "auth/email-already-in-use") {
                          // console.log("VEUILLEZ VERIFIER VOS INFOS DE CONNEXION");
                          toast({
                            title: "VEUILLEZ VOUS CONNECTER",
                            description: "CET EMAIL EXISTE DEJA DANS NOTRE BASE DE DONNEE",
                            status: "error",
                            duration: 5000,
                            isClosable: true,
                          });
                        }
                      })
                      router.push("/Connexion");


                  }
                  else {
                    setColor7("red")
                    setWidth7("3px")
                    // toast({
                    //   title: "ERREUR",
                    //   description: "Le code postal n'est pas correct",
                    //   status: "error",
                    //   duration: 3000,
                    //   isClosable: true,
                    // });
                  }
                }
                else {
                  setColor6("red")
                  setWidth6("3px")
                  // toast({
                  //   title: "ERREUR",
                  //   description: "La ville n'est pas renseignée",
                  //   status: "error",
                  //   duration: 3000,
                  //   isClosable: true,
                  // });
                }
              }
              else {
                setColor5("red")
                setWidth5("3px")
                // toast({
                //   title: "ERREUR",
                //   description: "L'email n'est pas correct",
                //   status: "error",
                //   duration: 3000,
                //   isClosable: true,
                // });
              }
            }
            else {
              setColor4("red")
              setWidth4("3px")
              // toast({
              //   title: "ERREUR",
              //   description: "L'adresse n'est pas correct",
              //   status: "error",
              //   duration: 3000,
              //   isClosable: true,
              // })
            }
          }
          else {
            setColor3("red")
            setWidth3("3px")
            // toast({
            //   title: "ERREUR",
            //   description: "Le numéro doit contenir au moins 8 caractères",
            //   status: "error",
            //   duration: 3000,
            //   isClosable: true,
            // });
          }
        }
        else {
          setColor2("red")
          setWidth2("3px")
          // toast({
          //   title: "ERREUR",
          //   description: "Le prénom n'est pas correct",
          //   status: "error",
          //   duration: 3000,
          //   isClosable: true,
          // });
        }
      }
      else {
        setColor1("red")
        setWidth1("3px")
        // toast({
        //   title: "ERREUR",
        //   description: "Le nom n'est pas correct",
        //   status: "error",
        //   duration: 3000,
        //   isClosable: true,
        // });
      }

    } else {
      setColor8("red")
      setColor9("red")
      setWidth8("3px")
      setWidth9("3px")
      // console.log("okay la");
      // toast({
      //   title: "MAUVAISE SAISIE",
      //   description: "MOT DE PASSE NON IDENTIQUE",
      //   status: "error",
      //   duration: 7000,
      //   isClosable: true,
      // });
    }
  };

  const terms1 = ` Nous utilisons vos données personnelles pour vous offrir une expérience personnalisée, ainsi que pour mieux comprendre et améliorer notre service. Pour plus de détails, cliquez ici.`
  const terms = " En continuant, vous acceptez nos "
  const welcome = "Bienvenue sur la page d'inscription";

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
      <Center width={"100%"} minHeight={"80vh"} mt={""}>
        <Box
          width={{ base: "95%", md: "50%", xl: "40%", "2xl": "30%" }}
          height={{ base: "fit-content" }}

        >
          <Text fontWeight={"bold"} fontSize={"2xl"}>
            Bonjour!
          </Text>
          <Text fontWeight={"light"}>{welcome}</Text>
          <Stack spacing={5} marginTop={"1em"} width={{ base: "100%" }}>
            {/* le nom  */}
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FontAwesomeIcon icon={faAdd} color={"gray"} />
              </InputLeftElement>
              <Input
                type="text"
                onChange={(ev) => setName(ev.target.value)}
                placeholder="Nom"
                _placeholder={{ color: "gray.400" }}
                variant={"outline"}
                color={color1}
                borderColor={color1}
                borderRadius={"full"}
                borderWidth={width1}
                required
              />
            </InputGroup>

            {/* le prenom */}
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FontAwesomeIcon icon={faAdd} color={"gray"} />
              </InputLeftElement>
              <Input
                required
                type="text"
                onChange={(ev) => setSurname(ev.target.value)}
                placeholder="Prenom"
                _placeholder={{ color: "gray.400" }}
                variant={"outline"}
                color={color2}
                borderColor={color2}
                borderWidth={width2}
                borderRadius={"full"}
              />
            </InputGroup>

            {/* le telephone  */}
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FontAwesomeIcon icon={faPhone} color={"gray"} />
              </InputLeftElement>
              <Input
                type="number"
                required
                onChange={(ev) => setNumber(ev.target.value)}
                placeholder="Telephone"
                _placeholder={{ color: "gray.400" }}
                variant={"outline"}
                color={color3}
                borderColor={color3}
                borderWidth={width3}
                borderRadius={"full"}
              />
            </InputGroup>

            {/* le adresse */}
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FontAwesomeIcon icon={faHome} color={"gray"} />
              </InputLeftElement>
              <Input
                type="text"
                required
                onChange={(ev) => setAdress(ev.target.value)}
                placeholder="Adresse"
                _placeholder={{ color: "gray.400" }}
                variant={"outline"}
                color={color4}
                borderColor={color4}
                borderWidth={width4}
                borderRadius={"full"}
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FontAwesomeIcon icon={faHome} color={"gray"} />
              </InputLeftElement>
              <Input
                type="text"
                required
                onChange={(ev) => setCode(ev.target.value)}
                placeholder="Code postal"
                _placeholder={{ color: "gray.400" }}
                variant={"outline"}
                color={color5}
                borderColor={color5}
                borderWidth={width5}
                borderRadius={"full"}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FontAwesomeIcon icon={faHome} color={"gray"} />
              </InputLeftElement>
              <Input
                type="text"
                required
                onChange={(ev) => setVille(ev.target.value)}
                placeholder="Ville"
                _placeholder={{ color: "gray.400" }}
                variant={"outline"}
                color={color6}
                borderColor={color6}
                borderWidth={width6}
                borderRadius={"full"}
              />
            </InputGroup>

            {/* le Email  */}
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FontAwesomeIcon icon={faEnvelope} color={"gray"} />
              </InputLeftElement>
              <Input
                type="text"
                required
                onChange={(ev) =>
                  setEmail(ev.target.value.trim().toLowerCase())
                }
                placeholder="Email"
                _placeholder={{ color: "gray.400" }}
                variant={"outline"}
                color={color7}
                borderColor={color7}
                borderWidth={width7}
                borderRadius={"full"}
              />
            </InputGroup>

            {/* mot de passe */}
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FontAwesomeIcon icon={faLock} color={"gray"} />
              </InputLeftElement>
              <Input
                required
                type={show ? "text" : "password"}
                placeholder="mot de passe"
                _placeholder={{ color: "gray.400" }}
                onChange={(ev) => setPassword(ev.target.value)}
                variant={"outline"}
                color={color8}
                borderColor={color8}
                borderWidth={width8}
                borderRadius={"full"}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>

            {/* confimer mot de passe */}
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FontAwesomeIcon icon={faLock} color={"gray"} />
              </InputLeftElement>
              <Input
                required
                onChange={(ev) => setPassword2(ev.target.value)}
                type={show ? "text" : "password"}
                placeholder="confimer  mot de passe"
                _placeholder={{ color: "gray.400" }}
                variant={"outline"}
                color={color9}
                borderWidth={width9}
                borderColor={color9}
                borderRadius={"full"}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Stack>
          <Button
            colorScheme="blue"
            variant="solid"
            mt={"2em"}
            // borderRadius={"full"}
            width={"100%"}
            onClick={() => createUSer()}
            bgColor={"#08566e"}
            _hover={{
              bgColor: "#08566e",
            }}
          >
            Inscription
          </Button>
          <Text width={{ md: "350px", lg: "480px" }} pb={20} ml={5}>
            {terms}<Link href="/Terms" color={"blue"} _hover={{ textDecoration: "none" }}>Termes et Conditions.</Link>{terms1}

          </Text>
        </Box>
      </Center>




      <FooterR />
    </>
  );
};

export default SignUpForm;
