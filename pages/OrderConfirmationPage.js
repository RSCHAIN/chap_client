import { Box, Center, Flex, Text, Image, Button, Input, Heading, Icon, SimpleGrid, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, InputGroup, FormControl, FormLabel, Tabs, TabList, Tab, TabPanels, TabPanel, Radio, RadioGroup, Stack, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Code, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaTrashAlt } from "react-icons/fa";
import { ref as rf, set, push,serverTimestamp } from "@firebase/database";
import { authentic, db, db2 } from "@/FIREBASE/clientApp";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { BsCashCoin, BsPaypal } from "react-icons/bs";
import secureLocalStorage from "react-secure-storage";
import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPhone, faCity, faRoad, faArrowRightToCity, faArrowUp19, faMailBulk } from '@fortawesome/free-solid-svg-icons'
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import Navbar from "@/components/Navbar";


import {usePathname} from 'next/navigation'
import { getCartsByUserId } from "../components/getcart";
import sha256 from 'crypto-js/sha256';
import CryptoJS from "crypto-js";
import { useMediaQuery } from "@chakra-ui/react";
import InputBar from "@/components/InputBar";


function OrderConfirmationPage() {
    
    const toast = useToast();
    const router = useRouter();
    const [isLagerThan768] = useMediaQuery("(min-width: 768px)");

    ///Variable d'affichage
    const [sect1, setSect1] = useState("none");
    const [sect2, setSect2] = useState("none");
    const [sect4, setSect4] = useState("none");
    const [sect3, setSect3] = useState("none");

    const [day, setDay] = useState("");
    const [moyen, setMoyen] = useState("");
    const [hours, setHours] = useState("");
    const [way, setWay] = useState("");
    const [toggle, setToggle] = useState(false);

    const [getDeliveryDay, setGetDeliveryDay] = useState("")
    const [methodPayment, setMethodPayment] = useState("")
    const [deliveryTimes, setDeliveryTimes] = useState("")


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


    const toggleFunc = () => {
        setToggle(!toggle)
    }


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
                livraison:methodPayment,
                modelivraison:methodPayment,
                email,
                way:methodPayment,
                address:secureLocalStorage.getItem("addresse"),
                status: "En attente",
                ville: ville,
                rue: rue,
                code_postal: postal,
                batiment: batiment,
                lieu: lieu,
                receveur: nom,
                numero: numero,
                jour: getDeliveryDay,
                paiement: methodPayment,
                modePaiement: methodPayment,
                moment: getDeliveryDay,
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
                // router.reload();
            }
        return (
            <>
                <div className="bg-slate-300">
                    <div className="container mx-auto px-10 lg:px-0 flex flex-col justify-center items-center">
                        <h1 className="text-xl lg:text-3xl py-10 font-bold">Validation de la commande</h1>
                        <div className="flex flex-col gap-6">
                            <div className="bg-white p-10 rounded-lg shadow-[0_0_12px_rgba(0,0,0,0.2)]">
                                <div className="flex flex-col lg:flex-row justify-between items-center gap-2">
                                    <div className="flex flex-col lg:flex-row justify-between items-center gap-2">
                                        <h2 className="text-xl lg:text-2xl font-bold">Votre adresse : </h2>
                                        <ul className="list-none ml-10">
                                            <li>{secureLocalStorage.getItem("name")} {secureLocalStorage.getItem("surname")}</li>
                                            <li>{secureLocalStorage.getItem("addresse")}</li>
                                            <li>{secureLocalStorage.getItem("number")}</li>
                                        </ul>
                                    </div>
                                    <button onClick={toggleFunc} className="bg-cyan-800 text-white p-2 rounded-md">Changer d{"'"}adresse</button>
                                </div>
                            </div>
                            {toggle ?
                                <div className="w-full lg:w-3/6 mx-auto bg-white p-10 rounded-lg shadow-[0_0_12px_rgba(0,0,0,0.9)]">
                                    <form className="flex flex-col justify-center items-center gap-3">
                                        <div className="flex justify-start w-full">
                                            <span className="size-10 flex justify-center items-center bg-cyan-800 text-white"><FontAwesomeIcon icon={faUser}/></span>
                                            <input type="text" className="border w-full focus:outline-none focus:border-cyan-800 placeholder:text-slate-400 block bg-white rounded-sm py-2 pl-9 pr-3 shadow-sm focus:ring-cyan-800 focus:ring-1 sm:text-sm" placeholder="Nom"/>
                                        </div>
                                        <div className="flex justify-start w-full">
                                            <span className="size-10 flex justify-center items-center bg-cyan-800 text-white"><FontAwesomeIcon icon={faPhone}/></span>
                                            <input type="text" className="border w-full focus:outline-none focus:border-cyan-800 placeholder:text-slate-400 block bg-white rounded-sm py-2 pl-9 pr-3 shadow-sm focus:ring-cyan-800 focus:ring-1 sm:text-sm" placeholder="Numéro de téléphone"/>
                                        </div>
                                        <div className="flex justify-start w-full">
                                            <span className="size-10 flex justify-center items-center bg-cyan-800 text-white"><FontAwesomeIcon icon={faCity}/></span>
                                            <input type="text" className="border w-full focus:outline-none focus:border-cyan-800 placeholder:text-slate-400 block bg-white rounded-sm py-2 pl-9 pr-3 shadow-sm focus:ring-cyan-800 focus:ring-1 sm:text-sm" placeholder="Ville"/>
                                        </div>
                                        <div className="flex justify-start w-full">
                                            <span className="size-10 flex justify-center items-center bg-cyan-800 text-white"><FontAwesomeIcon icon={faRoad}/></span>
                                            <input type="text" className="border w-full focus:outline-none focus:border-cyan-800 placeholder:text-slate-400 block bg-white rounded-sm py-2 pl-9 pr-3 shadow-sm focus:ring-cyan-800 focus:ring-1 sm:text-sm" placeholder="Nom de la rue"/>
                                        </div>
                                        <div className="flex justify-start w-full">
                                            <span className="size-10 flex justify-center items-center bg-cyan-800 text-white"><FontAwesomeIcon icon={faArrowUp19}/></span>
                                            <input type="text" className="border w-full focus:outline-none focus:border-cyan-800 placeholder:text-slate-400 block bg-white rounded-sm py-2 pl-9 pr-3 shadow-sm focus:ring-cyan-800 focus:ring-1 sm:text-sm" placeholder="Numéro du batiment"/>
                                        </div>
                                        <div className="flex justify-start w-full">
                                            <span className="size-10 flex justify-center items-center bg-cyan-800 text-white"><FontAwesomeIcon icon={faMailBulk} /></span>
                                            <input type="text" className="border w-full focus:outline-none focus:border-cyan-800 placeholder:text-slate-400 block bg-white rounded-sm py-2 pl-9 pr-3 shadow-sm focus:ring-cyan-800 focus:ring-1 sm:text-sm" placeholder="Code postal"/>
                                        </div>
                                    </form>
                                </div>
                            :
                                null
                            }
                            <div className="bg-white p-10 rounded-lg shadow-[0_0_12px_rgba(0,0,0,0.2)]">
                                <div className="flex flex-col justify-center items-center">
                                    <h2 className="text-xl lg:text-2xl mb-6 font-bold">Mode de paiement</h2>
                                    <ul className="flex justify-between items-center w-full lg:text-[1rem] text-sm font-medium text-gray-900 bg-white sm:flex">
                                        <li className="w-full border-gray-200 dark:border-gray-600">
                                            <div className="flex items-center ps-3">
                                                <input id="horizontal-list-radio-license" type="radio" value="Espèce" name="paiement" className="w-4 h-4 text-cyan-800 bg-slate-800 border-l-slate-800 focus:ring-cyan-800 dark:focus:ring-cyan-800"
                                                onClick={(e) => setMethodPayment(e.target.value)}/>
                                                <label for="horizontal-list-radio-license" className="w-full py-3 ms-2 lg:text-[1rem] text-sm font-medium text-gray-900 dark:text-lateborder-l-slate-800"><BsCashCoin/>Espèces</label>
                                            </div>
                                        </li>
                                        <li className="w-full border-gray-200 dark:border-gray-600">
                                            <div className="flex items-center ps-3">
                                                <input id="horizontal-list-radio-id" type="radio" value="Paypal" name="paiement" className="w-4 h-4 text-cyan-800 bg-slate-800 border-l-slate-800 focus:ring-cyan-800 dark:focus:ring-cyan-800"
                                                onClick={(e) => setMethodPayment(e.target.value)}/>
                                                <label for="horizontal-list-radio-id" className="w-full py-3 ms-2 lg:text-[1rem] text-sm font-medium text-gray-900 dark:text-lateborder-l-slate-800"><BsPaypal/>Paypal</label>
                                            </div>
                                        </li>
                                    </ul>
                                    <Box display={methodPayment == "Paypal"? "Block" : "none"}>
                                    <PayPalButtons
                                          
                                          createOrder={(data, actions) => {
                                            return actions.order.create({
                                              purchase_units: [
                                                {
                                                  amount: {
                                                    value: `${parseFloat(prix +parseFloat(frais)).toFixed(2)}`,
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
                                                  toast({
                                                    title: "Achat effectué avec succès",
                                                    description: `Merci ${name} pour votre achat!!! `,
                                                    status: "success",
                                                    duration: 9000,
                                                    isClosable: true,
                                                  });
                                                  // secureLocalStorage.removeItem("Cart");
                                                  await DeleteAll()
                                                  // router.reload();
                                              });
                                          }}
                                        />
                                        </Box>
                                </div>
                            </div>
                            {/* <div className="bg-white p-10 rounded-lg shadow-[0_0_12px_rgba(0,0,0,0.2)]">
                                <div className="flex flex-col justify-center items-center">
                                    <h2 className="text-xl lg:text-2xl mb-6 font-bold">Date de livraison</h2>
                                    <ul className="flex justify-between items-center w-full lg:text-[1rem] text-sm font-medium text-gray-900 bg-white sm:flex">{/** onChange={setDay} value={day} onClick={() => setSect2("grid")}  
                                        <li className="w-full border-gray-200 dark:border-gray-600">
                                            <div className="flex items-center ps-3">
                                                <input id="horizontal-list-radio-license" type="radio" value="Mercredi" name="date-livraison" className="w-4 h-4 text-cyan-800 bg-slate-800 border-l-slate-800 focus:ring-cyan-800 dark:focus:ring-cyan-800"
                                                onClick={(e) => setGetDeliveryDay(e.target.value)}/>
                                                <label for="horizontal-list-radio-license" id="list-radio" className="w-full py-3 ms-2 lg:text-[1rem] text-sm font-medium text-gray-900 dark:text-lateborder-l-slate-800">Mercredi</label>
                                            </div>
                                        </li>
                                        <li className="w-full border-gray-200 dark:border-gray-600">
                                            <div className="flex items-center ps-3">
                                                <input id="horizontal-list-radio-id" type="radio" value="Vendredi" name="date-livraison" className="w-4 h-4 text-cyan-800 bg-slate-800 border-l-slate-800 focus:ring-cyan-800 dark:focus:ring-cyan-800"
                                                onClick={(e) => setGetDeliveryDay(e.target.value)}/>
                                                <label for="horizontal-list-radio-id" id="list-radio" className="w-full py-3 ms-2 lg:text-[1rem] text-sm font-medium text-gray-900 dark:text-lateborder-l-slate-800">Vendredi</label>
                                            </div>
                                        </li>
                                        <li className="w-full border-gray-200 dark:border-gray-600">
                                            <div className="flex items-center ps-3">
                                                <input id="horizontal-list-radio-id" type="radio" value="Samedi" name="date-livraison" className="w-4 h-4 text-cyan-800 bg-slate-800 border-l-slate-800 focus:ring-cyan-800 dark:focus:ring-cyan-800"
                                                onClick={(e) => setGetDeliveryDay(e.target.value)}/>
                                                <label for="horizontal-list-radio-id" id="list-radio" className="w-full py-3 ms-2 lg:text-[1rem] text-sm font-medium text-gray-900 dark:text-lateborder-l-slate-800">Samedi</label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div> */}
                            {/*   */}
                        </div>
                        <button onClick={()=>{ saveCommande3()}} className="bg-cyan-800 text-white rounded-md py-2 px-6 my-6">Confirmer l{"'"}achat</button>
                    </div>
                </div>
            </>
        )
    }else {
        return (
            <>
                <InputBar />
                {isLagerThan768 ? <Navbar></Navbar> : <></>}
                <div className="bg-slate-200">
                    <div className="container mx-auto">
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="text-3xl mt-10 mb-10 font-bold text-teal-800">Panier</h1>
                            <div className="w-full flex justify-center items-center p-8">
                                <div className="bg-cyan-800 p-8 min-w-96 min-h-48 flex justify-center items-center px-10 lg:px-0">
                                    <h3 className="text-2xl font-bold text-white">Votre panier est vide</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default OrderConfirmationPage