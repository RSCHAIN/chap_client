import { db2 } from '@/FIREBASE/clientApp'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Heading,
    Center,
    useDisclosure,
    Button, SimpleGrid, InputGroup, Input, Select, Box, Text, useToast, Textarea
} from '@chakra-ui/react'
import { onValue, push, ref, set } from '@firebase/database'
import { useEffect, useState } from 'react'
import sha256 from 'crypto-js/sha256';
import CryptoJS from "crypto-js";
import Head from "next/head";


export default function ReservationCoiff({ mag, adresse, imageMag, categorie,produit }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    
    const [nom, setNom] = useState("")
    const [email, setEmail] = useState("Non connecté")
    const [numero, setNumero] = useState("")
    const [journée, setJournée] = useState("")
    const [note, setNote] = useState("")
    const [coiffure, setCoiffure] = useState("None")
    const [personnes, setPersonnes] = useState(1)
    const [heures, setHeures] = useState("")
    const toast = useToast()
    const [loader, setLoader] = useState(false)

    const horaire = ["10:00 - 10:30","10:30 - 11:00","11:00 - 11:30","11:30 - 12:00","12:00 - 12:30", "12:30 - 13:00", "13:00 - 13:30", "13:30 - 14:00", "14:00 - 14:30", "14:30 - 15:00","15:00 - 15:30","15:30 - 16:00","16:00 - 16:30","16:30 - 17:00","17:00 - 17:30", "17:30 - 18:00", "18:00 - 18:30", "18:30 - 19:00", "19:00 - 19:30", "19:30 - 20:00"]
    const [colour, setColour] = useState(["white", "white", "white", "white", "white", "white","white", "white", "white", "white", "white", "white","white", "white", "white", "white", "white", "white", "white", "white"])
    const [tcolour, setTColour] = useState(["black", "black", "black", "black", "black", "black","black", "black", "black", "black", "black", "black","black", "black", "black", "black", "black", "black", "black", "black"])

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

        return `RE${formattedTimestamp}`;
    }

    const handleSubmit = () => {
        setLoader(true)
        const dat = new Date;

        const year = dat.getUTCFullYear();
        const day = dat.getUTCDate();
        const month = dat.getUTCMonth() + 1;
        const hours = dat.getUTCHours();
        const minutes = dat.getUTCMinutes();
        const seconds = dat.getUTCSeconds();

        const idRes = generateCustomKey()


        const hashDigest = sha256("RE" + year + month + day + hours + minutes + seconds).toString(CryptoJS.enc.Hex);

        const hash = hashDigest.slice(0, 3).toString()
        set(ref(db2, `Reservation/${idRes}${hash}`), {
            nom,
            numero,
            reservationId: `${idRes}${hash}`,
            note,
            coiffure,
            type: "Reservation coiffure",
            heures, magasin: mag, status: "En attente", email, adresse, imageMag
        }).then((response) => {
            toast({
                description: "Nous vous contacterons pour la confirmation",
                title: "Reservation enregistrée",
                status: "success",
                duration: 9000,

            })
            onClose()
            setLoader(false)
        }).catch((error) => {
            setLoader(false)
            toast({
                description: "Veuillez reesayer",
                title: "Erreur lors de la reservation",
                status: "error",
                duration: 9000,

            })
        });
    }
  


    const handleSaveHours = (data,index) => {
        setHeures(data),
        colour.map((couleur,indexed)=>{
            if(index == indexed ){
               colour[indexed] = "cyan.600";
               tcolour[indexed] = "white";
               console.log(indexed,"cyan.600");
            }else{
                colour[indexed] = "white";
                tcolour[indexed] = "black";
            }
        })
    }


    useEffect(() => {
        try {
           
          
            setEmail(sessionStorage.getItem("email"))
        } catch {
            console.log("inexistant")
        }
    }, [])




    return (<>
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
        <Button colorScheme='blue' my={5} onClick={onOpen} mr={3} py={2} px={4} >
            Reserver un créneau
        </Button>

        <Modal isOpen={isOpen} onClose={onClose} >
            <ModalOverlay />
            <ModalContent >
                <ModalHeader>Reservation chez {mag}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                    <SimpleGrid columns={[1, 1, 1, 2, 2]} spacingX={5} spacingY={5}>
                        <InputGroup display={"grid"}>
                            <Text>Nom : </Text>
                            <Input type="text" onChange={(e) => setNom(e.target.value)} bgColor={"white"} placeholder="Nom" />
                        </InputGroup>
                        <InputGroup display={"grid"}>
                            <Text>Numéro : </Text>
                            <Input type="number" maxLength={10} onChange={(e) => setNumero(e.target.value)} bgColor={"white"} placeholder="Numéro" />
                        </InputGroup>

                        <Box>
                            <Text mb={0}>Date : </Text>
                            <Input type="date" onChange={(e) => setJournée(e.target.value)} bgColor={"white"} /></Box>
                        <Box>
                            <Text mb={0}>Coiffure : </Text>
                            <Select onChange={(e) => setCoiffure(e.target.value)} bgColor={"white"}>
                                {produit ? produit.map((d, i) => (  
                                    <option key={i} value={d.nom}>{d.nom}</option>
                                )):<></>}
                            </Select>
                        </Box>
                    </SimpleGrid>
                    <Box mt={5}>
                        <Text color>heure :</Text>
                        <Box bgColor={"white"} width={"100%"} pl={10} height={"fit-content"} py={2} border={"1px solid black"} mt={2} borderRadius={"5px"}>

                            <SimpleGrid  columns={3} >
                            {horaire.map((data, index) => <Text p={2} cursor={"pointer"} color={tcolour[index]} borderRadius={"25px"} w={"fit-content"} key={index} onClick={() => { handleSaveHours(data,index) }}bgColor={colour[index]}>{data < 10 ? `0${data}` : data}</Text>)}
                            </SimpleGrid>

                        </Box>
                    </Box>
                    <Box>
                        <Text mr={2} fontWeight={700}>
                            Note:
                        </Text>
                        <Textarea bgColor={"white"} onChange={(e) => setNote(e.target.value)} />
                    </Box>

                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' isLoading={loader} onClick={() => { handleSubmit() }} mr={3} py={2} px={4} >
                        Reserver
                    </Button>
                    <Button color={"white"} py={2} px={4} bgColor={"red"} _hover={{
                        bgColor: "red.700"
                    }} onClick={onClose}>Annuler</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>)
}