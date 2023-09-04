import { Box,Flex,Center,Heading,Text,Image, Input,Button,InputGroup,InputRightElement, Select, SimpleGrid, useToast } from "@chakra-ui/react";
import InputBar from "@/components/InputBar";
import Navbar from "@/components/Navbar";
import {useState} from "react"
import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { app, db } from "@/FIREBASE/clientApp";

export default function Devis(){
  const [email,setEmail] = useState("")
  const [numero,setNumero] = useState("")
  const [dest,setDest] = useState("")
  const [codeDest,setCodeDest] = useState("")
  const [arriv,setArriv] = useState("")
  const [codeArriv,setCodeArriv] = useState("")
  const [poids,setPoids] = useState("")
  const [longueur,setLongueur] = useState("")
  const [largeur,setLargeur] = useState("")
  const [hauteur,setHauteur] = useState("")
  const [details,setDetails] = useState("")
  const [valeur,setValeur] = useState("")
  const firestore = getFirestore(app);
  const toast = useToast()
  const makeDevis = async  ()=>{
    await addDoc(collection(db, "DevisPerso"), {
      email,
      numero,
      dest,
      codeDest,
      arriv,
      codeArriv,
      poids,
      longueur,
      largeur,
      hauteur,
      details,
      valeur
    }).then(()=>{ toast({
      title: "Devis envoyé",
      description: "Nous vous contacterons!!",
      status: "success",
      duration: 10000,
      isClosable: true,
    })});
   
    
  }


  const CI = "Côte d'Ivoire"
  const slog="Comparer différents transporteur et faites des économies avec CHAP  "
  const slog1 = "Envoyez vos colis vers vers l'Afrique de l'ouest par nos partenaires. Remplissez le formulaire et attendez notre retour mail si vous ne possédez pas un CHAP, sinon vérifiez l'onglet devis de votre compte. Un fois reçu les différentes propositions de nos partenaires, vous pourrez choisir, payer et préparer le colis pour le transporteur."
  return(
    <>
    <InputBar />
    <Navbar></Navbar>
    <Center width="100%" mt={20} height="fit-content" mb={10}>
      
    <Box width="70%" >
      <Flex>
      <SimpleGrid columns={[1,1,1,2,2]} width={"100%"}>
        <Box width={["100%","100%","100%","70%","70%"]} height={"fit-content"} boxShadow={"lg"} rounded={'xl'} p={5} border={"1px solid black"} mr={10} >
          <Box  mb={5} display={"flex"} width={"100%"}>
            <Box width={"50%"} mr={5}>
            <Text  mb={2}>Email : </Text>
          <Input width={"100%"} placeholder={"email"} onChange={(e)=>setEmail(e.target.value)} /> 
            </Box>
            <Box width={"50%"}>
            <Text  mb={2}>Numéro : </Text>
          <Input width={"100%"} placeholder={"Numero"} onChange={(e)=>setNumero(e.target.value)}/> 
            </Box>
          </Box>
          <Box>
            <Box mb={5}>
              <Text mb={2}>De</Text>
              <Flex>
              <Select variant='outline' placeholder='Pays' onChange={(e)=>setDest(e.target.value)} mr={5}>
                <option value={"france"}>France</option>
                <option value={"mali"}>Mali</option>
                <option value={"senegal"}>Senegal</option>
                <option value={"Côte D'Ivoire"}>{CI}</option>
              </Select>
              {dest == "france" ? <Input placeholder="entrez votre code postal" onChange={(e)=>setCodeDest(e.target.value)}/> : <></>}
              {/* <Select variant='outline' placeholder='Ville ou code postal' /> */}
              </Flex>
            </Box>
            <Box mb={5}>
              <Text mb={2}>A</Text>
              <Flex>
              <Select variant='outline' placeholder='Pays' onChange={(e)=>setArriv(e.target.value)} mr={5}>
                <option value={"france"}>France</option>
                <option value={"mali"}>Mali</option>
                <option value={"senegal"}>Senegal</option>
                <option value={"Côte D'Ivoire"}>{CI}</option>
              </Select>
              {arriv == "france" ? <Input placeholder="entrez le code postal" onChange={(e)=>setCodeArriv(e.target.value)}/> : <></>}
              {/* <Select variant='outline' placeholder='Ville ou code postal' /> */}
              </Flex>
            </Box>
            <Box  mb={5} display={"flex"} width={"100%"}>
            <Box width={"50%"} mr={5}>
            <Text  mb={2}>Details : </Text>
          <Input width={"100%"} placeholder={"details"} onChange={(e)=>setDetails(e.target.value)} /> 
            </Box>
            <Box width={"50%"}>
            <Text  mb={2}>Valeur du colis : </Text>
          <Input width={"100%"} placeholder={"Valeur du colis"} onChange={(e)=>setValeur(e.target.value)}/> 
            </Box>
          </Box>
            <Box mb={5} width={"100%"}>
              <Text mb={2}>COLIS</Text>
              <Flex width={"100%"}>
                <InputGroup width={"40%"}>
                <Input type={"Text"} onChange={(e)=>setPoids(e.target.value)} placeholder={"Poids"} mr={2}/> 
                <InputRightElement>
               <Text>kg</Text>
               </InputRightElement>
                </InputGroup>
               <InputGroup width={"40%"} >
               <Input type={"Text"} placeholder={"Longueur"}   onChange={(e)=>setLongueur(e.target.value)}/>
               <InputRightElement>
               <Text>cm</Text>
               </InputRightElement>
               </InputGroup>
               <InputGroup width={"40%"}>
               <Input type={"Text"} placeholder={"Largeur"}  onChange={(e)=>setLargeur(e.target.value)} />
               <InputRightElement>
               <Text>cm</Text>
               </InputRightElement>
               </InputGroup>
               <InputGroup width={"40%"} >
               <Input type={"Text"} placeholder={"hauteur"}  onChange={(e)=>setHauteur(e.target.value)}/>
               <InputRightElement>
               <Text>cm</Text>
               </InputRightElement>
               </InputGroup>
              </Flex>
            </Box>
            <Button width={"100%"} bgColor={"cyan.900"} color={"white"}
            onClick={()=>makeDevis()}
            >Envoyer dès maintenant</Button>
          </Box>

        </Box>
        <Box width={["100%","100%","100%","50%","50%"]}>
        <Image src='./pic2.jpg' alt="image livraison" />
          <Heading fontSize={"20px"} textAlign={["right","right","right","left","left"]}>{slog}</Heading>
       
         
        
        </Box>
        </SimpleGrid>
      </Flex>
      <Text fontWeight={"semibold"} textAlign={"justify"} width={"100%"} my={"40px"}>
           {slog1}
          </Text>
    </Box>
  
    </Center>
    </>
  ) 
}