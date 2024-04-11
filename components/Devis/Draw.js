import { db2 } from '@/FIREBASE/clientApp'
import { Box, Button, Center, Flex, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Text, useDisclosure, useToast } from '@chakra-ui/react'
import { ref, update } from '@firebase/database'
import axios from 'axios'
import React, { useState } from 'react'

function Draw({ id, nomDest, prenomDest, adrDest, villeDest, posteDest, telDest, emailDest, nomArr, prenomArr, adrArr, villeArr, telArr, emailArr, }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [idD, setIdD] = useState(id)
  const [nomD, setNomD] = useState(nomDest)
  const [prenomD, setPrenomD] = useState(prenomDest)
  const [adrD, setAdrD] = useState(adrDest)
  const [villeD, setVilleD] = useState(villeDest)
  const [posteD, setPosteD] = useState(posteDest)
  const [telD, setTelD] = useState(telDest)
  const [emailD, setEmailD] = useState(emailDest)
  const [nomE, setNomE] = useState(nomArr)
  const [prenomE, setPrenomE] = useState(prenomArr)
  const [adrE, setAdrE] = useState(adrArr)
  const [villeE, setVilleE] = useState(villeArr)

  const [telE, setTelE] = useState(telArr)
  const [emailE, setEmailE] = useState(emailArr)

  const toast = useToast()


  function updateAll() {
    // console.log(id);
    axios.post('/api/AskMod', {
      status: "En attente",
      id:idD,
      nomDestinataire: nomD,
      prenomDestinataire: prenomD,
      adresseDest:adrD,
      numeroDestinataire:telD,
      villeDest:villeD,
      posteDest:posteD,
      emailDest:emailD,
      nomExpediteur:nomE,
      prenomExpediteur:prenomE,
      ville:villeE,
      rue:adrE,
      numeroExpediteur:telE,
      email:emailE
    }).then((res)=>{
      update(ref(db2, "DevisPerso/" + String(idD)), {
        status: "En attente"
      }).then((res)=>{toast({title:"Succès",description:"Vos informations ont bien été transmis et sont en cours de validation",duration:9000,status:"success"}),onClose()})
    }).catch((err)=>{})
   
  }


  return (
    <>
      <Text
        bgColor={"cyan.800"}
        color={"white"}
        width={"150px"}
        px={4}
        py={2}
        fontWeight={600}
        textAlign={"center"}
        borderRadius={"xl"} cursor={"pointer"} _hover={{
          bgColor: "cyan.500",
        }} height={"fit-content"} onClick={onOpen}>Demander une modification</Text>



      <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modification des informations</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid spacingX={10} columns={[1, 1, 1, 2, 2, 2]}>
              <Box>
                <Center>
                  <Heading fontSize={"20px"}>informations destinataire</Heading>
                </Center>
                <Box>
                  <Text>Nom : </Text>
                  <Input placeholder={nomD} value={nomD} onChange={(e) => setNomD(e.target.value)} />
                  <Text>Prénom : </Text>
                  <Input placeholder={prenomD} value={prenomD} onChange={(e) => setPrenomD(e.target.value)} />
                  <Box>
                    <Box>
                      <Text>Adresse : </Text>

                      <Input placeholder={adrD} value={adrD} onChange={(e) => setAdrD(e.target.value)} />
                    </Box>
                    <Flex>
                      <Box mr={5}>
                        <Text>Ville : </Text>
                        <Input placeholder={villeD} value={villeD} onChange={(e) => setVilleD(e.target.value)} />
                      </Box>
                      <Box>
                        <Text>Poste : </Text>
                        <Input placeholder={posteD} value={posteD} onChange={(e) => setPosteD(e.target.value)} />
                      </Box>
                    </Flex>
                  </Box>

                  <Text>Contact : </Text>
                  <Input placeholder={telD} value={telD} onChange={(e) => setTelD(e.target.value)} />
                  <Text>E-mail : </Text>
                  <Input placeholder={emailD} value={emailD} onChange={(e) => setEmailD(e.target.value)} />
                </Box>
              </Box>
              <Box>
                <Center>
                  <Heading fontSize={"20px"}>informations expediteur</Heading>
                </Center>
                <Box>
                  <Text>Nom : </Text>
                  <Input placeholder={nomE} value={nomE} onChange={(e) => setNomE(e.target.value)} />

                  <Text>Prénom : </Text>

                  <Input placeholder={prenomE} value={prenomE} onChange={(e) => setPrenomE(e.target.value)} />

                  <Text>Adresse : </Text>

                  <Input placeholder={adrE} value={adrE} onChange={(e) => setAdrE(e.target.value)} />
                  <Text>Ville : </Text>
                  <Input placeholder={villeE} value={villeE} onChange={(e) => setVilleE(e.target.value)} />
                  <Text>Contact : </Text>

                  <Input disabled placeholder={telE} value={telE} onChange={(e) => setTelE(e.target.value)} />

                  <Text>E-mail : </Text>
                  <Input disabled placeholder={emailE} value={emailE} onChange={(e) => setEmailE(e.target.value)} />
                </Box>
              </Box>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Fermer
            </Button>
            <Button colorScheme={"blue"} onClick={updateAll}>Valider</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


    </>
  )
}

export default Draw