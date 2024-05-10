import { Box, Center, Flex, Text, Image, Button,Link, Input, Heading, Icon, SimpleGrid, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, InputGroup, FormControl, FormLabel, Tabs, TabList, Tab, TabPanels, TabPanel, Radio, RadioGroup, Stack, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Code, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import FooterR from "./footerResponsif";
import { useRouter } from "next/router";
import { FaTrashAlt } from "react-icons/fa";
import { ref as rf, set, push,serverTimestamp } from "@firebase/database";
import { authentic, db, db2 } from "@/FIREBASE/clientApp";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { BsCashCoin, BsPaypal } from "react-icons/bs";
import secureLocalStorage from "react-secure-storage";
import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { getCartsByUserId } from "./getcart";
import {usePathname} from 'next/navigation'
import sha256 from 'crypto-js/sha256';
import CryptoJS from "crypto-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPhone, faCity, faRoad, faArrowRightToCity, faArrowUp19, faMailBulk } from '@fortawesome/free-solid-svg-icons'
import { onAuthStateChanged } from "firebase/auth";
import Head from "next/head";



export default function Carte() {
    const toast = useToast();
    const router = useRouter();







    
    ///Variable d'affichage
    const [sect1, setSect1] = useState("none");
    const [sect2, setSect2] = useState("none");
    const [sect4, setSect4] = useState("none");
    const [sect3, setSect3] = useState("none");

    //fin

    ///// variable du drawner
    const [moyen, setMoyen] = useState("");
    
    const [day, setDay] = useState("");
    const [hours, setHours] = useState("");
    const [way, setWay] = useState("");
    // const [lieu,setLieu]= useState("")
    const [rue, setRue] = useState("NON DEFINI");
    const [postal, setPostal] = useState("NON DEFINI");
    const [ville, setVille] = useState("non renseigner");
    const [batiment, setBatiment] = useState("NON DEFINI");

    ////fin
    const [email,setEmail] = useState("")
    const [cart, setCart] = useState([]);
    const [lieu, setLieu] = useState(" NON DEFINI");
    const [numero, setNumero] = useState("NON DEFINI ");
    const [nom, setNom] = useState(" NON DEFINI");
    const [prix, setPrix] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const path =usePathname()
    

    const [frais, setFrais] = useState();
    const [dis, setDis] = useState();
    const [month2, setMonth2] = useState("");
    const [day2, setDay2] = useState("");

    ////ACCESS AU PANIER
    const getCart2 = async (email)=>{
        try {
            const cartRef = collection(db, 'orders'); // Assurez-vous que la collection est correcte.
            const q = query(cartRef, where('email', '==', email));
        
            const querySnapshot = await getDocs(q);
            if (querySnapshot.size >= 1) {
                const cartDoc = querySnapshot.docs;
                const po = secureLocalStorage.getItem("po")
                // console.log("po",po)
                let PrixT = 0;
                
                const All = cartDoc;
            
                
                if (All != null) {
                    All.map((data, index) => {
                        PrixT = parseFloat(data.data().orderPrice) + PrixT;
                    });
                    setPrix(PrixT);
                    }
                    if (PrixT <= 30) {
                        setDis("grid");
                        (po.slice(0, 2) == 91 ||
                        po.slice(0, 2) == 94 ||
                        po.slice(0, 2) == 93 ||
                        po.slice(0, 2) == 92 ||
                        po.slice(0, 2) == 78 ||
                        po.slice(0, 2) == 77 ||
                        po.slice(0, 2) == 75) ?setFrais("2.99") : setFrais("5.99");
                
                    } else {
                        setDis("grid");
                        if (PrixT < 40 && PrixT > 29) {
                            setFrais((PrixT * 10) / 100);
                        }   
                        else {
                            if (PrixT < 51) {
                                setFrais((PrixT * 9) / 100);
                            } else {
                                if (PrixT < 71) {
                                    setFrais((PrixT * 8) / 100);
                                } else {
                                    if (PrixT < 81) {
                                        setFrais((PrixT * 7) / 100);
                                    } else {
                                        if (PrixT < 91) {
                                            setFrais((PrixT * 6) / 100);
                                        } else {
                                            if (90 < PrixT) {
                                                setFrais((PrixT * 5) / 100);
                                            }
                                        }
                                    }
                                }    
                            }
                        }
                                
                                
                            
                    }
            
                secureLocalStorage.setItem("prix", PrixT);
            
                return cartDoc;
            } else {
                return null; // Aucun panier trouvé pour cet utilisateur.
            }
        } catch (error) {
            console.error("Erreur lors de la récupération du panier :", error);
            return null;
        }
    }

    const DeleteProduct = async (product)=>{
        try{
            const cartRef = collection(db, 'orders'); // Supposons que la collection se nomme 'carts'.
            const q = query(cartRef, where('email', '==', email),where("productId", '==' , product));
            const querySnapshot = await getDocs(q);
            const cartDoc = querySnapshot.docs[0]; 
            await deleteDoc(cartDoc.ref)
            router.replace(path)
        }catch(error){
            toast({
                title: "Veuillez reesayer!!!",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    
    }

    const DeleteAll = async ()=>{
        try{
            console.log(email)
            const cartRef = collection(db, 'orders'); // Supposons que la collection se nomme 'carts'.
            const q = query(cartRef, where('email', '==', email));
            const querySnapshot = await getDocs(q);
            const size = querySnapshot.size
            querySnapshot.docs.map(async (data,index)=>{
                await deleteDoc(data.ref)
            })
            // const cartDoc = querySnapshot.docs[0]; 
            toast({
                title: "Merci pour votre confiance!!!",

                status: "success",
                duration: 9000,
                isClosable: true,
            });
            router.replace(path)
        }catch(error){
            toast({
                title: "Veuillez reesayer!!!",

                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    }

    const Increment = async (product)=>{
        try{
            const cartRef = collection(db, 'orders'); // Supposons que la collection se nomme 'carts'.
            const q = query(cartRef, where('email', '==', email),where("productId", '==' , product));
            const querySnapshot = await getDocs(q);
            const cartDoc = querySnapshot.docs[0]; 
            await updateDoc(cartDoc.ref,{orderQte:querySnapshot.docs[0].data().orderQte+1})
            router.replace(path)
        }catch(error){
            toast({
                title: "Veuillez reesayer!!!",

                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    }

    const Decrement = async (product)=>{
        try{
            const cartRef = collection(db, 'orders'); // Supposons que la collection se nomme 'carts'.
            const q = query(cartRef, where('email', '==', email),where("productId", '==' , product));
            const querySnapshot = await getDocs(q);
            const cartDoc = querySnapshot.docs[0]; 
            if(querySnapshot.docs[0].data().orderQte<2){
                await DeleteProduct(product)
            }else{
                await updateDoc(cartDoc.ref,{orderQte:querySnapshot.docs[0].data().orderQte-1})
            }

            router.replace(path)
        }catch(error){
            toast({
                title: "Veuillez reesayer!!!",

                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    }
    const [ref,setRef] = useState([])

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

        const [{ value: month },,{ value: day },,{ value: year },,{ value: hour },,{ value: minute },,{ value: second }] = dateFormat.formatToParts(timestamp);

        // Créez la clé personnalisée en utilisant le timestamp formaté
        const formattedTimestamp = `${year}${day}${month}${hour}${minute}${second}`;

        return `CO${formattedTimestamp}`;
    }

    useEffect(() => {
       
        setEmail(sessionStorage.getItem("email"))
    
        getCartsByUserId(email).then((userCarts) => {
        
            if (userCarts.length > 0) {
                setCart(userCarts);
                const po = secureLocalStorage.getItem("po")
                // console.log("po",po)
                let PrixT = 0;
                
                const All = userCarts;

            
                if (All != null) {
                    All.map((data, index) => {
                        PrixT = (parseFloat(data.orderPrice)* data.orderQte )+ PrixT;
                    });
                    setPrix(PrixT);
                }
                if (PrixT <= 30) {
                    setDis("grid");
                    (po.slice(0, 2) == 91 ||
                    po.slice(0, 2) == 94 ||
                    po.slice(0, 2) == 93 ||
                    po.slice(0, 2) == 92 ||
                    po.slice(0, 2) == 78 ||
                    po.slice(0, 2) == 77 ||
                    po.slice(0, 2) == 75) ?setFrais("2.99") : setFrais("5.99");
                    
                } else {
                    setDis("grid");
                    if (PrixT < 40 && PrixT > 29) {
                        setFrais((PrixT * 10) / 100);
                    } else {
                        if (PrixT < 51) {
                            setFrais((PrixT * 9) / 100);
                        } else {
                            if (PrixT < 71) {
                                setFrais((PrixT * 8) / 100);
                            } else {
                                if (PrixT < 81) {
                                    setFrais((PrixT * 7) / 100);
                                } else {
                                    if (PrixT < 91) {
                                        setFrais((PrixT * 6) / 100);
                                    } else {
                                        if (90 < PrixT) {
                                            setFrais((PrixT * 5) / 100);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                secureLocalStorage.setItem("prix", PrixT);
            } else {
                // console.log("Aucun panier trouvé pour cet utilisateur.");
                setCart([])
            }
        });
        
    }, [email,cart]);

    
    if (cart != undefined && cart.length != 0){
        async function saveCommande3() {
        
        let email = sessionStorage.getItem("email");
        let Cart = cart;
        const dat = new Date;
        
        const year =dat.getUTCFullYear();
        const day =dat.getUTCDate();
        const month =dat.getUTCMonth()+1;
        const hours =dat.getUTCHours();
        const minutes =dat.getUTCMinutes();
        const seconds =dat.getUTCSeconds();

        const idCom = generateCustomKey();

        
        const hashDigest = sha256(idCom).toString(CryptoJS.enc.Hex);
        
        const hash = hashDigest.slice(0,3).toString()

        const dateCommande = `${day}/${month}/${year}`
            
            set(rf(db2, `Commandes/${idCom}${hash}`), {
                cartlist:Cart,
                payment: moyen,
                commandeId:`${idCom}${hash}`,
                livraison:way,
                email,
                way:way,
                address:secureLocalStorage.getItem("addresse"),
                status: "En attente",
                ville: ville,
                rue: rue,
                code_postal: postal,
                batiment: batiment,
                lieu: lieu,
                receveur: nom,
                numero: numero,
                jour: day,
                modePaiement: moyen,
                moment: hours,
                dateCommande,
                subtotalPrice:`€${prix}`,
                totalPrice:`€${parseFloat(prix +parseFloat(frais)).toFixed(2)}`,
                createdAt: serverTimestamp()}
            );
            
        
            await axios
            .post("/api/sendmail", {
                adresse:lieu,
                commandeId:`${idCom}${hash}`,
                email: email.toString(),
                way:way,
                paiement: moyen,
                adresse:secureLocalStorage.getItem("addresse"),
                paiement:moyen,
                name:secureLocalStorage.getItem("name"),
                product:Cart,
                totalPrice:`€${parseFloat(prix +parseFloat(frais)).toFixed(2)}`,
                frais:parseFloat(frais).toFixed(2)
            })
            .then((response) => {
                toast({
                    title: "SUCCES",
                    description: `merci pour la confiance`,
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                });
            })
            .catch((error)=>{});
            await  DeleteAll()
                setLieu("");
                setNom("");
                setNumero("");
            }
        
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
                <div className="card-parent flex justify-center items-center gap-4 max-[680px]:flex-col max-[1390px]:flex-col">
                    <div className="card-right min-w-[60%] flex flex-col p-4">
                        <h2 className="text-end min-w-[44rem] bg-slate-300 font-bold p-4 max-[1024px]:min-w-[24rem]">{cart.length}  éléments</h2>
                        {cart.map((data) => (
                            <div className="" key={data.productId}>
                                <div className="min-w-[44rem] bg-white flex justify-between items-center p-4 mt-4 max-[680px]:flex-col max-[1024px]:flex-col max-[1024px]:min-w-[24rem] max-[1390px]:">
                                    <div className="flex justify-between max-[1024px]:min-w-[24rem] p-2 max-[680px]:flex-col max-[1390px]:flex-col max-[680px]:items-center max-[1390px]:items-center">
                                        <img src={data.orderImageUrl} className="h-28 w-28" alt="" />
                                        <div className="flex flex-col justify-center items-start ml-8">
                                            <span className="font-bold text-xl">{data.orderName}</span>
                                            <span>{data.orderorganisation || data.orderOrganisation}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col gap-2 max-[1024px]:min-w-[24rem] p-2">
                                        <div className="price flex self-end">
                                            <span className="text-red-600 font-bold text-center text-2xl "> {data.orderPrice} €</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="mr-4 border">
                                                <button className="rounded-l-md px-2 py-1 border-r bg-white text-xl font-bold" onClick={() => Decrement(data.productId)}>-</button>
                                                <span className=" px-2 py-1">{data.orderQte == NaN ? 1:data.orderQte}</span>
                                                <button className="rounded-r-md px-2 py-1 border-l bg-white text-xl font-bold" onClick={() => Increment(data.productId)}>+</button>
                                            </div>
                                                <button className="bg-red-600 text-white rounded-md p-2" onClick={() => DeleteProduct(data.productId )}> Supprimer</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        ))}
                    </div>
                    <div className="recap-items flex self-start min-w-[40%] p-4 ml-10 max-[680px]:ml-0 max-[1390px]:ml-0">
                        <div className="min-h-96 flex flex-col gap-8 p-4 text-black bg-white max-[680px]:min-w-[26rem] max-[1024px]:min-w-[26rem] max-[1390px]:min-w-[44rem]">
                            <h3 className="text-xl font-bold text-center">Recapitulatif de la commande</h3>
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between">
                                    <span>Prix commande : </span>
                                    <strong className="text-red-600"> {parseFloat(prix).toFixed(2)} €</strong>
                                </div>
                                <div className="flex justify-between">
                                    <span>Frais de livraison : </span>
                                    <strong className="text-red-600"> {parseFloat(frais).toFixed(2)} €</strong>
                                </div>
                            </div>
                            
                            <div>
                                <div className="flex justify-between">
                                    <span> Total  : </span>
                                    <strong className="text-red-600 text-2xl"> {parseFloat(prix +parseFloat(frais)).toFixed(2)} €</strong>
                                </div>
                            </div>
                            <Link href={"/OrderConfirmationPage"} className="flex justify-center items-center">
                                <button className="bg-cyan-800 w-full text-white rounded-md font-bold p-2">Valider commande</button>
                            </Link>
                            {/* <button className="bg-cyan-800  text-white rounded-md font-bold p-2" onClick={onOpen}> Valider commande </button> */}
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <div className="w-full flex justify-center items-center p-8 ">
                    <div className="bg-teal-800 p-8 min-w-96 min-h-48 flex justify-center items-center">
                        <h3 className="text-2xl font-bold text-white">Votre panier est vide</h3>
                    </div>
                </div>
            </>
        );
    }
    
}
