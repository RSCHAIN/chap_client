import React, { useEffect, useState } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, SimpleGrid, Input, useToast, Button, useDisclosure, Box, Text, Center, Switch, Stack, Radio, RadioGroup } from '@chakra-ui/react'
import { authentic, db, db2, storage } from "@/FIREBASE/clientApp";
import axios from 'axios';
import { push, ref, serverTimestamp, set } from "@firebase/database";
import { onAuthStateChanged } from 'firebase/auth';
import sha256 from 'crypto-js/sha256';
import CryptoJS from "crypto-js";
import secureLocalStorage from 'react-secure-storage';
import { useRouter } from 'next/router';
import { BraintreePayPalButtons, PayPalButtons } from '@paypal/react-paypal-js';

function PopUp({ PrixChoisi, Partenaire, email, dest, need, poste, arriv, radio2, imageUri, ville, inputGroups, categorie, rue, moyen,description,  poids,  }) {



  const [numeroExp, setNumeroExp] = useState("")
  const [numeroDest, setNumeroDest] = useState("")
  const [nomDest, setNomDest] = useState("")
  const [prenomDest, setPrenomDest] = useState("")
  const toast = useToast()
  const router = useRouter()

  function generateCustomKey() {
    // Obtenez le timestamp actuel en millisecondes
    const timestamp = Date.now();

    // Utilisez un format de date pour formater le timestamp
    const dateFormat = new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'UTC'
    });

    const [{ value: month }, , { value: day }, , { value: year }, , { value: hour }, , { value: minute }, , { value: second }] = dateFormat.formatToParts(timestamp);

    // Créez la clé personnalisée en utilisant le timestamp formaté
    const formattedTimestamp = `${year}${day}${month}${hour}${minute}${second}`;

    return `DE${formattedTimestamp}`;
  }

  const [isOpenModal1, setIsOpenModal1] = useState(false);
  const toggleModal1 = () => setIsOpenModal1(!isOpenModal1);
  const [password, setPassword] = useState();
  const [email2, setEmail2] = useState();
  const [nom2, setNom2] = useState();
  const [prenom2, setPrenom2] = useState();
  const [villeDest, setVilleDest] = useState("");
  const [adresseDest, setAdresseDest] = useState("");
  const [posteDest, setPosteDest] = useState(0);
  const [emailDest, setEmailDest] = useState("");
  const [reglement, setReglement] = useState("");
  const [methodeDePaiement, setMethodeDePaiement] = useState("None");

  const loginUSer = async () => {
    await signInWithEmailAndPassword(authentic, email2, password)
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

          signOut(auth);

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

  const isError = email2 === "";
  //fin ogin variable

  //Variable inscription//

  //////Fin des variables

  //variable commune insc/conn//
  const [interup, setInterup] = useState(false);
  //fin des variables

  const makeDevis = async () => {
    console.log("dans le else",poste,poste.length)
    
    if (poste.length == 5) {
      const idDev = generateCustomKey();
      const hashDigest = sha256(idDev).toString(CryptoJS.enc.Hex);
      const hash = hashDigest.slice(0, 3).toString()

      if (moyen == "Aerien") {
        set(ref(db2, `DevisPerso/${idDev}${hash}`), {
          email: email,
          villeDest,
          adresseDest,
          posteDest,
          methodeDePaiement,

          numeroExpediteur: numeroExp,
          numeroDestinataire: numeroDest,
          nomDestinataire: nomDest,
          prenomDestinataire: prenomDest,
          depart: dest,
          CodePostalDepart: poste,
          arrive: arriv,
          moyen: "Aerien",
          retrait_depot: radio2,
          imageColis: imageUri,
          ville: ville,
          status: "En attente",
          devisId: `${idDev}${hash}`,
          rue: rue,
          description,
          poids,
          createdAt: serverTimestamp(),
          partenaire: Partenaire,
          total: PrixChoisi,
          produit: inputGroups,
          categories: categorie,
          nomExpediteur: nom2,
          prenomExpediteur: prenom2,
          emailDest
        }).then(async (response) => {
          //  console.log(response.key)
          toast({
            title: "Devis envoyé",
            description: "Nous vous contacterons!!",
            status: "success",
            duration: 10000,
            isClosable: true,
          });
          await axios.post("/api/sendDevis", {
            id: `${idDev}${hash}`,
            email: email.toString(),
            partenaire: Partenaire,
            devisId: `${idDev}${hash}`,
            nomExp: nom2,
            description: description,
            poids:poids,
            nomDest: nomDest,
            prenomDest: prenomDest,
            depot: radio2,
            category: categorie,
            rue: rue,
            postal: poste,
            ville: ville,
            details: inputGroups,
            moyen: "Aerien",
            subject: `Demande de devis `,
            price: PrixChoisi,
            jour: "2 jours estimés",
            quantity: inputGroups.length,
          })
            .then((response) => {
              alert(
                "Veuillez verifier vos mails afin de prendre connaissance des details de votre devis"
              );
              router.push('/SuccesDevis')
              router.reload();
            });
        });
      }
      else if (moyen == "Maritime") {
        set(ref(db2, `DevisPerso/${idDev}${hash}`), {
          email: email,
          villeDest,
          adresseDest,
          posteDest,
          devisId: `${idDev}${hash}`,
          depart: dest,
          methodeDePaiement,
          CodePostalDepart: poste,
          arrive: arriv,
          numeroExpediteur: numeroExp,
          numeroDestinataire: numeroDest,
          nomDestinataire: nomDest,
          prenomDestinataire: prenomDest,
          createdAt: serverTimestamp(),
          moyen: "Maritime",
          status: "En attente",
          contenant: categorie,
          retrait_depot: radio2,
          total: PrixChoisi,
          partenaire: Partenaire,
          ville: ville,
          codePostal: poste,
          nomExpediteur: nom2,
          prenomExpediteur: prenom2,
          rue: rue,

          besoin: need,
          produit: inputGroups,
          emailDest
        }).then(async (response) => {
          toast({
            title: "Devis envoyé",
            description: "Nous vous contacterons!!",
            status: "success",
            duration: 10000,
            isClosable: true,
          });
          onClose();
          await axios
            .post("/api/sendDevis", {
              id: `${idDev}${hash}`,
              email: email.toString(),
              devisId: `${idDev}${hash}`,
              adresse: rue,
              nomExp: nom2,
              prenomExp: prenom2,
              besoin: need,
              nomDest: nomDest,
              prenomDest: prenomDest,
              moyen: "Maritime",
              category: categorie,
              subject: `Recapitulatif du devis`,
              rue: rue,
              ville: ville,
              postal: poste,
              details: inputGroups,
              depot: radio2,
              jour: "30 jours estimés",
              quantity: categorie.length,
            })
            .then((response) => {
              alert(
                "Veuillez verifier vos mails afin de prendre connaissance des details de votre devis"
              );
              router.push('/SuccesDevis')
              router.reload();
            }).catch((error) => {
              alert(
                "Une erreur est survenu lors de l'enregistrement, veuillez reesayer ou le referer à notre support "
              );
            });
        });
      }


      //   onAuthStateChanged(authentic, (user) => {
      //     if (!user) {
      //       toggleModal1();
      //     } 
      //     else {




      //       const idDev = generateCustomKey();


      //       const hashDigest = sha256(idDev).toString(CryptoJS.enc.Hex);

      //       const hash = hashDigest.slice(0, 3).toString()



      //       set(ref(db2, `DevisPerso/${idDev}${hash}`), {
      //         email: email,
      //         numeroExpediteur:numeroExp,
      //         numeroDestinataire:numeroDest,
      //         nomDestinataire:nomDest,
      //         prenomDestinataire:prenomDest,
      //         depart: dest,
      //         CodePostalDepart: poste,
      //         arrive: arriv,
      //         moyen: "Aerien",
      //         retrait_depot: radio2,
      //         imageColis: imageUri,
      //         ville: ville,
      //         status: "En cours",
      //         devisId: `${idDev}${hash}`,
      //         rue: rue,
      //         partenaire: Partenaire,
      //         total: PrixChoisi,
      //         produit: inputGroups,
      //         categories: categorie,
      //       }).then(async (response) => {
      //         //  console.log(response.key)
      //         toast({
      //           title: "Devis envoyé",
      //           description: "Nous vous contacterons!!",
      //           status: "success",
      //           duration: 10000,
      //           isClosable: true,
      //         });

      //         await axios.post("/api/sendDevis", {

      //           email : email.toString(),
      //           partenaire : Partenaire,

      //           nomDest:nomDest,
      //           prenomDest:prenomDest,
      //           depot : radio2,
      //           category : categorie,
      //           rue : rue,
      //           postal : poste,
      //           ville : ville,


      //           subject : `Demande de devis `,
      //           price : PrixChoisi,
      //           jour : "2 jours estimés",
      //           quantity : inputGroups.length,
      //         })
      //           .then((response) => {
      //             alert(
      //               "Veuillez verifier vos mails afin de prendre connaissance des details de votre devis"
      //             );
      //             router.push('/SuccesDevis')
      //             router.reload();
      //           }); 
      //       });
      //     }
      //   });
    } else {
      toast({
        title: "Devis impossible",
        description:
          "Nos services se limite qu'a une certaine zone",
        status: "error",
        duration: 10000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    setNumeroExp(secureLocalStorage.getItem("number") ?? "")
    setNom2(secureLocalStorage.getItem("name") ?? "")
    setPrenom2(secureLocalStorage.getItem("surname") ?? "")
  }, [])
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <button onClick={onOpen}>Choisir</button>

      <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className='text-center uppercase text-2xl mb-4'>Informations supplémentaires</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className='flex flex-col gap-4'>
              {/* <div className="client flex"> */}
                <div className='flex flex-col'>
                  <label className='font-bold uppercase text-[0.9rem] tracking-wide'>Nom expediteur</label>
                  <input className='border p-2 shadow-[0_0_12px_rgba(0,0,0,0.2)]' type="text" placeholder='John' onChange={(e) => setNom2(e.target.value)} value={nom2} />
                </div>
                <div className='flex flex-col'>
                  <label className='font-bold uppercase text-[0.9rem] tracking-wide'>Prenom expediteur</label>
                  <input className='border p-2 shadow-[0_0_12px_rgba(0,0,0,0.2)]' type="text" placeholder='John' onChange={(e) => setPrenom2(e.target.value)} value={prenom2} />
                </div>
              {/* </div> */}

              <div className='flex flex-col'>
                <label className='font-bold uppercase text-[0.9rem] tracking-wide'>Numéro expediteur</label>
                <input className='border p-2 shadow-[0_0_12px_rgba(0,0,0,0.2)]' type="number" placeholder="0605799059" value={numeroExp} onChange={(e) => setNumeroExp(e.target.value)} />
              </div>
              <div className='flex flex-col'>
                <label className='font-bold uppercase text-[0.9rem] tracking-wide'>Numéro du destinataire</label>
                <input className='border p-2 shadow-[0_0_12px_rgba(0,0,0,0.2)]' type="number" placeholder="2250605799059" onChange={(e) => setNumeroDest(e.target.value)} />
              </div>
              {/* <div className="dest flex"> */}
                <div className='flex flex-col'>
                  <label className='font-bold uppercase text-[0.9rem] tracking-wide'>Nom du destinataire</label>
                  <input className='border p-2 shadow-[0_0_12px_rgba(0,0,0,0.2)]' type="text" placeholder='John' onChange={(e) => setNomDest(e.target.value)} />
                </div>
                <div className='flex flex-col'>
                  <label className='font-bold uppercase text-[0.9rem] tracking-wide'>Prénom du destinataire</label>
                  <input className='border p-2 shadow-[0_0_12px_rgba(0,0,0,0.2)]' type="text" placeholder="Doe" onChange={(e) => setPrenomDest(e.target.value)} />
                </div>
              {/* </div> */}
              <div className='flex flex-col'>
                <label className='font-bold uppercase text-[0.9rem] tracking-wide'>Email du destinataire</label>
                <input className='border p-2 shadow-[0_0_12px_rgba(0,0,0,0.2)]' type="text" placeholder="johnDoe@.....com" onChange={(e) => setEmailDest(e.target.value)} />
              </div>
              <div className='flex flex-col'>
                <label className='font-bold uppercase text-[0.9rem] tracking-wide'>Adresse du destinataire</label>
                <input className='border p-2 shadow-[0_0_12px_rgba(0,0,0,0.2)]' type="text" placeholder="14 Avenue De Bourgogne" onChange={(e) => setAdresseDest(e.target.value)} />
              </div>
              <div className='flex flex-col'>
                <label className='font-bold uppercase text-[0.9rem] tracking-wide'>Ville du destinataire</label>
                <input className='border p-2 shadow-[0_0_12px_rgba(0,0,0,0.2)]' type="text" placeholder="Massy" onChange={(e) => setVilleDest(e.target.value)} />
              </div>
              <div className='flex flex-col'>
                <label className='font-bold uppercase text-[0.9rem] tracking-wide'>Code postal du destinataire</label>
                <input className='border p-2 shadow-[0_0_12px_rgba(0,0,0,0.2)]' type="number" maxLength={5} placeholder="95300" onChange={(e) => setPosteDest(e.target.value)} />
              </div>
            </div>
            <Center color={"cyan.700"} fontFamily={"-apple-system"} fontWeight={"bold"} fontSize={"20px"} mb={2} mt={5}>Méthode de paiement</Center>
            <Center>
              <div className="dest flex">
                <RadioGroup onChange={setMethodeDePaiement} value={methodeDePaiement}>
                  <Stack direction='row'>
                    <Radio value='Espèces'>Espèces</Radio>
                    <Radio value='Paypal'>Paypal</Radio>

                  </Stack>
                </RadioGroup>
              </div>
            </Center>
            <Center>
              {methodeDePaiement == "Paypal" ? <Box width={"300px"}> <PayPalButtons

                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: `${PrixChoisi}`,
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order
                    .capture()
                    .then(async (details) => {
                      const name =
                        details.payer.name.given_name;
                      setReglement("yes")
                      toast({
                        title: "Achat effectué avec succès",
                        description: `Merci ${name} pour votre achat!!! `,
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                      });
                      // secureLocalStorage.removeItem("Cart");
                      // await DeleteAll()
                      // router.reload();
                    });
                }}
              /></Box> : <></>}
            </Center>
          </ModalBody>
          <ModalFooter>
            <div className='w-full flex justify-between'>
              <button className='bg-orange-600 font-bold uppercase text-[0.9rem] text-white py-3 px-6 rounded-md' variant='ghost' onClick={onClose}>Fermer</button>
              <Button colorScheme={"cyan"} className='bg-cyan-800 font-bold uppercase text-[0.9rem] text-white py-3 px-6 rounded-md' isDisabled={numeroExp.length < 8 || numeroDest.length < 8 || nomDest.length < 2 || prenomDest.length < 2 || methodeDePaiement == "None" || (methodeDePaiement == "Paypal" && reglement == "")} onClick={() => makeDevis()}>Valider</Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>



      {/* CONNEXION ET INCRIPTION */}
      {/* <Modal
        isCentered
        isOpen={isOpenModal1}
        onClose={toggleModal1}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connexion/Inscription</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <>
              <Center>
                <Text mr={4}>Connexion</Text>
                <Switch
                  size="lg"
                  onChange={(e) => setInterup(e.target.checked)}
                  value={interup}
                />
                <Text ml={4}>Inscription</Text>
              </Center>
              {interup ? (
                <>
                  <SignUpForm2/>
                </>
              ) : (
                <Center display={"grid"}>
                  {verif ? (
                    <Alert status="error" w={"fit-content"}>
                      <AlertIcon />
                      <Box>
                        <AlertTitle>Mail Pas Verifié!</AlertTitle>
                        <AlertDescription>
                          <p>
                            {" "}
                            Merci de bien vouloir consulter vos mails afin de
                            confirmer votre inscription sur notre site{" "}
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
                    <Center width={"fit-content"}>
                      <Box width={"full"} color={"black"}>
                        <FormControl isInvalid={isError}>
                          <Stack spacing={4}>
                            <Heading
                              display={["none", "none", "none", "grid", "grid"]}
                              ml={["10%", "10%", "10%", "0%", "0%"]}
                            >
                              Bienvenue
                            </Heading>
                            <Text
                              display={["none", "none", "none", "grid", "grid"]}
                            >
                              Connectez-vous á votre compte
                            </Text>
                            <Center display={"grid"}>
                              <Input
                                mb={2}
                                type={"text"}
                                placeholder="Email"
                                border={"2px solid gray"}
                                // borderRadius={"50px"}
                                width={[
                                  "200px",
                                  "200px",
                                  "350px",
                                  "350px",
                                  "350px",
                                ]}
                                onChange={(ev) =>
                                  setEmail2(
                                    ev.target.value.trim().toLowerCase()
                                  )
                                }
                                color={"gray.500"}
                              />
                              <InputGroup>
                                <Input
                                  onChange={(e) => setPassword(e.target.value)}
                                  width={[
                                    "200px",
                                    "200px",
                                    "350px",
                                    "350px",
                                    "350px",
                                  ]}
                                  type={show ? "text" : "password"}
                                  placeholder="Entrez le mot de passe"
                                />
                                {/* <InputRightElement width="fit-content">
        <Button h='1.75rem'  onClick={handleClick}>
          {show ? 'Masquer' : 'voir'}
        </Button>
      </InputRightElement> 
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
                                as={LinkC}
                                bgColor={"white"}
                                _hover={{
                                  textDecoration: "none",
                                  bgColor: "white",
                                }}
                              >
                                Pas de compte? Créer un compte
                              </Button>
                              {/* <Button
                    display={["none","none","none","grid","grid"]}
                      as={ LinkC}
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
                    </Button> 
                            </Box>
                          </Stack>
                          {!isError ? (
                            <FormHelperText></FormHelperText>
                          ) : (
                            <FormErrorMessage>
                              Email is required.
                            </FormErrorMessage>
                          )}
                        </FormControl>
                      </Box>
                    </Center>
                  </Flex>
                </Center>
              )}
            </>
          </ModalBody>
        </ModalContent>
      </Modal> */}
    </>
  )
}

export default PopUp