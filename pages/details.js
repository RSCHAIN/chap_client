`use client`
import { Box, Container, Stack, Text, Image, Center, Flex, VStack, Button, Heading, SimpleGrid, StackDivider, List, ListItem, useToast, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, Textarea, Icon,Link, Avatar, Select, AbsoluteCenter } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage'
import Navbar from "@/components/Navbar";
import InputBar from '@/components/InputBar'
import FooterR from '@/components/footerResponsif'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { StarIcon } from '@chakra-ui/icons'
import { ref, set, push, onValue } from "@firebase/database";
import { authentic, db, db2 } from "@/FIREBASE/clientApp";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "@/FIREBASE/clientApp";
import { storeCartInFirestore } from '/components/firestore/firestore';
import { addDoc, collection, getDocs, query as qs, updateDoc, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from 'next-share';
import Head from "next/head";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBillTransfer, faTruck, faStar, faMap, faLocation, faLocationDot, faBoxesStacked, faBoxOpen } from '@fortawesome/free-solid-svg-icons'
// import Link from "next/link";
// import Favlist2 from "../generale/FavLists2";
import Favlist2 from "../components/generale/FavLists2"


const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
};

const settings2 = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
};



export function Comment({ id, data }) {
    if (id == data.productID) {
        return (
            <>
                <Box>
                    <Flex>
                        <Avatar size='md' name='' src='' mr={5} />
                        <Box>
                            <Flex justify={"space-around"} >
                                <Text width={"70%"} fontWeight={700} mr={5}>{data.title}</Text>
                                <Text fontWeight={700}>{data.date}</Text>
                            </Flex>

                            <Text fontWeight={"light"} width={"200px"}>{data.message}</Text>
                            {Array(5)
                                .fill('')
                                .map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        color={i < data.rate ? 'yellow' : 'gray.300'}
                                    />
                                ))}
                        </Box>
                    </Flex>
                </Box>
            </>
        )
    }
}

export function Star({ id, data }) {
    let total = 0
    let star = 0
    if (data) {
        Object.values(data).map((dat, key) => {
            if (id == dat.productID) {
                star = star + parseInt(dat.rate)
                total = total + 1
            }
        })
    }

    return (
        <>
            {total ? <Box display={"flex"}>
                {/* {data.length} */}
                {/* {star} */}
                { }
                {Array(5)
                    .fill('')
                    .map((_, i) => (
                        <StarIcon
                            key={i}
                            color={i < star / total ? 'yellow' : 'gray.500'}
                        />
                    ))}
                <Text mt={-1} ml={2}>({total})</Text>
            </Box> : <></>}
        </>
    )
}

export default function DisplayArticleDetails() {
    const router = useRouter();

    const { asPath, query } = router;
    const [data, setData] = useState([])
    const [data1, setData1] = useState([])
    const [indexed, setIndexed] = useState(0)
    const [taille, setTaille] = useState("Default")
    const [color, setColor] = useState("Default")
    const [displayed, setDisplayed] = useState(1)
    const [id, setId] = useState("")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    const Fav = async () => {
        const starCountRef = ref(db2, "Feedback");
        onValue(starCountRef, (snapshot) => {
            setData1(snapshot.val());
        });
    };
    const RetreiveProd = (cat, org, pid) => {
        
        if (String(query.p).length > 5) {
            const starCountRef = ref(
                db2,
                `${cat}/${org}/${pid}`
            );
    
            onValue(starCountRef, (snapshot) => {
                // console.log(snapshot.val());
                const donnes = snapshot.val();
                setData(donnes);
                // console.log(donnes);
            })
    
            setId(pid) 
        }else{
           
            const starCountRef = ref(
                db2,
                `${cat}/${org}/`
            );
    
            onValue(starCountRef, (snapshot) => {
                // console.log(snapshot.val());
                try {
                    const donnes = snapshot.val();
                
                setData(Object.values(donnes)[0]);
                setId(Object.keys(donnes)[0]) 
                // console.log(donnes);
                } catch (error) {
                    // setData(Object.values(donnes)[0]);
                    // setId(Object.keys(donnes)[0]) 
                }
                
            })
    
            
        }
      
    }
    
    useEffect(() => {
        // onAuthStateChanged(authentic,  (user) => {
        //     if (!user) {
        //         router.push("/Choose")
               
        //         // 
        //     }
        // })
        Fav()
        // localStorage.setItem("displayed","none")
       
        RetreiveProd(query.c, query.m, query.p)
    
    }, [authentic,data, query,router])

    const avis = "Titre de l'avis"
    const [avisTitle, setAvisTitle] = useState("")
    const [avisDesc, setAvisDesc] = useState("")
    const [detailsLink, setDetailsLink] = useState("")
    const [] = useState("")

    const [rating, setRating] = useState(0);

    const handleRatingClick = (selectedRating) => {
        setRating(selectedRating);
    };


    const SendReport = () => {
        const auth = getAuth(app);

        onAuthStateChanged(auth, (user) => {
            if (!user) {
                toast({
                    title: "Veuillez vous connecter SVP!!!",

                    status: "error",
                    duration: 10000,
                    isClosable: true,
                })
            } else {
                const date = new Date();
                const dateDep = date.toLocaleDateString();
                push(ref(db2, "Feedback"), {
                    productID: id,
                    rate: rating,
                    title: avisTitle,
                    message: avisDesc,
                    date: dateDep,
                });
                toast({
                    title: "Avis sauvegardé",
                    position:"top",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                })
                onClose();
            }
        });
    }
    //fonction du panier


    async function Exist(productKey, email,uid, product, color, taille) {
        try {
            const cartRef = collection(db, 'orders'); // Supposons que la collection se nomme 'carts'.
        const q = qs(cartRef, where('email', '==', email), where("productId", '==', productKey)); // Requête pour récupérer le panier par userId.

        const querySnapshot = await getDocs(q);

        if (querySnapshot.size === 1) {
            const cartDoc = querySnapshot.docs[0];
            const cartData = cartDoc.data();
            // console.log(cartData)
            const itemIndex = Object.values(cartData).find((item) => item.productId === productKey);
            if (itemIndex !== -1) {
             
                await updateDoc(cartDoc.ref, {
                    productId: productKey,
                    currentUID: uid,
                    orderDescription: product.description,
                    orderEtat: product.etat,
                    orderNote: product.note,
                    orderImageUrl: product.imageUrl,
                    orderName: product.nom,
                    orderPrice: product.prix,
                    orderOrganisation: product.organisation,
                    orderQte: querySnapshot.docs[0].data().orderQte + 1,
                    email: email,
                    livrable: product.fournisseur && product.fournisseur != "CHAP"?product.fournisseur: "CHAP",
                    taxe: product.taxe ? product.taxe : 0
                });
            }
        } else {
            await addDoc(collection(db, 'orders'), {
                productId: productKey,
                currentUID: uid,
                orderDescription: product.description,
                orderEtat: product.etat,
                orderNote: product.note,
                orderImageUrl: product.imageUrl,
                orderName: product.nom,
                orderPrice: product.prix,
                orderOrganisation: product.organisation,
                orderQte: 1,
                email: email,
                livrable: product.fournisseur && product.fournisseur != "CHAP"?product.fournisseur: "CHAP",
                taxe: product.taxe ? product.taxe : 0
            });
        }
        } catch (error) {
            console.log(error);
        }
        
    }

    function AddToCartW(product, productKey, color, taille) {
        onAuthStateChanged(authentic,  (user) => {
            if (!user) {
                
                localStorage.setItem("redirect_url",router.asPath)
                
                router.push("/Connexion")
                toast({
                    title: "Veuiller vous identifiez, merci!!!",

                    status: "error",
                    duration: 9000,
                    isClosable: true,
                }); 
                
                router.reload();
               setDisplayed(0)
                // redirect('/Connexion')
                
                
            } else {
               
                try {
                    Exist(productKey, user.email, user.uid,product, color, taille);
                    toast({
                        title: "Produit ajouté!!!",

                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    });
                } catch (error) {
                    // console.error("Error adding document: ", error);
                    toast({
                        title: "veuillez reessayer svp!!!",

                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    });
                }
            }
        })

    }

    function AddToCartM(product, productKey, color, taille) {
        onAuthStateChanged(authentic,  (user) => {
            if (!user) {
                setDisplayed(0)
                localStorage.setItem("redirect_url",router.asPath)
                
                // router.push("/Connexion")
                toast({
                    title: "Veuiller vous identifiez, merci!!!",

                    status: "error",
                    duration: 9000,
                    isClosable: true,
                }); 
                
                // router.reload();
           
                // redirect('/Connexion')
                
                
            } else {
                
                try {
                    Exist(productKey, user.email, user.uid,product, color, taille);
                    toast({
                        title: "Produit ajouté!!!",

                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    });
                } catch (error) {
                    // console.error("Error adding document: ", error);
                    toast({
                        title: "veuillez reessayer svp!!!",

                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    });
                }
            }
        })

    }
    const redirect = () =>{
        try {
            router.push(localStorage.getItem("redirect_url"))
        } catch (error) {
            router.push("/")
        }
    }
    ////ffin fonction de la cart  
    const Preced = () => {
        try {
            router.back()
        } catch (error) {
            router.push("/")
        }
    }

    if (data != null && displayed >0) {
        if (Object.values(data).length > 0) {
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
                    <Navbar />
                    <div className="w-full py-10 px-10">
                        <div className="container mx-auto lg:flex">
                            <div className="left w-full lg:w-2/6">
                                <div className="img w-5/6 lg:">
                                    <div className="img-main w-full flex items-center justify-center">{/** border border-cyan-500 */}
                                        <Image className='w-4/6 lg:w-[40rem] ' src={data.imageUrl[indexed]} alt="" />
                                    </div>
                                    <div className="img-cards flex items-center">
                                        {/* <div className="h-20 w-20 border">
                                            {data.imageUrl.length > 1 ?
                                                <div {...settings} className='h-20 w-20 flex'>
                                                    {data.imageUrl.map((image, index) => (
                                                        <Image className='h-20 w-20' key={index} src={image} onClick={() => setIndexed(index)} cursor={"pointer"} alt={`Product Image ${index}`} px={2} />
                                                    ))}
                                                </div>
                                                :
                                                <>
                                                    <Image className='h-20 w-20' src={data.imageUrl} cursor={"pointer"} alt={`Product Image `} />
                                                </>
                                            }
                                        </div> */}
                                        {/* <div className="h-20 w-20 border border-pink-500">
                                            {data.imageUrl.length > 1 ?
                                            <div {...settings2}>
                                                {data.imageUrl.map((image, index) => (
                                                    <Image key={index} src={image} onClick={()=>setIndexed(index)} cursor={"pointer"} alt={`Product Image ${index}`}  px={2}/>
                                                ))}
                                            </div> : <> <Image  src={data.imageUrl} cursor={"pointer"} alt={`Product Image `} /></>} 
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="right w-full lg:w-4/6 ml-0 lg:ml-10 mt-14 lg:mt-0">
                                <div className="items flex flex-col gap-6">
                                    <div className='flex  justify-between lg:items-center'>
                                        <div className="reseaux flex justify-start items-center gap-2">
                                            <FacebookShareButton url={`https://www.appchap.fr${router.asPath}`} > 
                                                <FacebookIcon className='h-10 w-10 rounded-full' />
                                            </FacebookShareButton> 
        
                                            <WhatsappShareButton url={`https://www.appchap.fr${router.asPath}`} >  
                                                <WhatsappIcon className='h-10 w-10 rounded-full' />
                                            </WhatsappShareButton> 
                                        </div>
                                        <div className="">
                                            <span className="text-2xl font-bold text-black">{data.prix} € </span>
                                            <small className='-mb-2'>TTC</small>
                                        </div>
                                    </div>
                                    <div className="flex flex-col lg:flex-row justify-between lg:items-center">
                                        <span className="font-bold uppercase">{data.nom}</span>
                                        {/* <div className="">
                                            <span className="text-2xl font-bold">{data.prix} € </span>
                                            <small className='-mb-2'>TTC</small>
                                        </div> */}
                                    </div>
                                    <div className="-mt-4">
                                        {/* <small className='text-yellow-300 max-[600px]:'>
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                        </small>
                                        <span className='ml-2'>{Object.keys(data1).length} avis</span> */}
                                        <Star id={query.p} data={data1}/>
                                    </div>
                                    <div className="">
                                        <p>{data.description}</p>
                                    </div>  
                                    <div className="">
                                        {data.taille ? <h2 className='font-bold text-xl'>Couleur</h2> : <h2 className='font-bold text-xl'>Produit(s)</h2>}
                                        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:items-center lg:gap-0 p-4">
                                            <div className="img flex -ml-5">
                                                <div className='h-20 w-20'>
                                                    {data.imageUrl.length > 1 ?
                                                        <div {...settings} className='h-20 w-20 flex'>
                                                            {data.imageUrl.map((image, index) => (
                                                                <Image className='h-20 w-20' key={index} src={image} onClick={() => setIndexed(index)} cursor={"pointer"} alt={`Product Image ${index}`} px={2} />
                                                            ))}
                                                        </div>
                                                        :
                                                        <>
                                                            <Image className='h-20 w-20' src={data.imageUrl} cursor={"pointer"} alt={`Product Image `} />
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                            {data.etat == "Indisponible"? <Button bgColor={"red.800"} alignSelf={"end"} _hover={{bgColor:"red.700"}} p={2} w={{base:"full", lg: "10rem"}} color={"white"}  onClick={() => { toast({title:"Produit en rupture",duration:9000,status:"warning"}) }} >Ajouter au panier</Button> : <>
                                            {/* web */}
                                            <Button bgColor={"cyan.800"} alignSelf={"end"} _hover={{bgColor:"cyan.700"}} p={2} w={{base:"full", lg: "10rem"}} color={"white"}  onClick={() => { AddToCartW(data, id, color, taille) }} >Ajouter au panier</Button>
                                            {/* mobile */}
                                            <Button bgColor={"cyan.800"} display={{base:"block",lg:"none"}} alignSelf={"end"} _hover={{bgColor:"cyan.700"}} p={2} w={{base:"full", lg: "10rem"}} color={"white"}  onClick={() => { AddToCartM(data, id, color, taille) }} >Ajouter au panier</Button>
                                            </>}
                                            
                                        </div>
                                    </div>

                                    {data.taille ?
                                        <div className="w-3/6">
                                            <h2 className='font-bold text-xl'>Taille</h2>
                                            <div className="flex justify-between items-center mt-4 -mx-4">
                                                <button onClick={""} className='bg-cyan-800 w-11 h-8 text-white rounded-full text-center py-1 ml-1 hover:opacity-80 cursor-pointer focus:bg-white focus:border focus:border-cyan-800 focus:text-cyan-800'>S</button>
                                                <button onClick={""} className='bg-cyan-800 w-11 h-8 text-white rounded-full text-center py-1 ml-1 hover:opacity-80 cursor-pointer focus:bg-white focus:border focus:border-cyan-800 focus:text-cyan-800'>M</button>
                                                <button onClick={""} className='bg-cyan-800 w-11 h-8 text-white rounded-full text-center py-1 ml-1 hover:opacity-80 cursor-pointer focus:bg-white focus:border focus:border-cyan-800 focus:text-cyan-800'>L</button>
                                                <button onClick={""} className='bg-cyan-800 w-11 h-8 text-white rounded-full text-center py-1 ml-1 hover:opacity-80 cursor-pointer focus:bg-white focus:border focus:border-cyan-800 focus:text-cyan-800'>XL</button>
                                                <button onClick={""} className='bg-cyan-800 w-11 h-8 text-white rounded-full text-center py-1 ml-1 hover:opacity-80 cursor-pointer focus:bg-white focus:border focus:border-cyan-800 focus:text-cyan-800'>2XL</button>
                                                <button onClick={""} className='bg-cyan-800 w-11 h-8 text-white rounded-full text-center py-1 ml-1 hover:opacity-80 cursor-pointer focus:bg-white focus:border focus:border-cyan-800 focus:text-cyan-800'>3XL</button>
                                            </div>
                                        </div>
                                        : null}
                                    <div className="flex flex-col gap-2 mt-4 mb-2">
                                        <span><FontAwesomeIcon icon={faTruck} className='mr-2' />Expédié par {(data.fournisseur == "CHAP" || data.fournisseur == "" || data.fournisseur == undefined) ? "CHAP" : data.fournisseur}</span>
                                        <span><FontAwesomeIcon icon={faLocationDot} className='mr-2' />Expédie en 48H</span>
                                        <span className='capitalize'><FontAwesomeIcon icon={faBoxesStacked} className='mr-2' />{data.etat}</span>
                                    </div>
                                    <div className="">
                                        <h2 className='font-bold text-xl'>Details produits</h2>
                                        <div className="flex justify-start items-center mt-4">
                                            <span><FontAwesomeIcon icon={faBoxOpen} className="size-8 mr-2" /></span>
                                            <ul>
                                                <li>Quantité : {data.quantite}</li>
                                                <li>Origine : {data.origine}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container mx-auto ">
                        <h2 className="text-xl font-bold mb-5">Produits recommandés</h2>
                        <Favlist2 categorie={"Textile"} magasin={"magasin"} />
                    </div>
                    <Flex display={["none","none","none","flex","flex"]} justifyContent={{base:"center",lg:"space-around"}}>
                                    <Box mr={20}>
                                        <Text mt={10} fontSize={["20px","20px","20px","25px","25px"]} fontWeight={600}>Avis des clients</Text>
                                        
                                        <Box > 
                                            {data1 ?Object.values(data1).map((data,key)=>(<Comment key={key} id={id} data={data}/>)) : <></>}
                                        </Box>
                                       
                                    </Box>
                                    <Button  bgColor={"cyan.500"} color={"white"} _hover={{
                                        bgColor:"cyan.900"
                                    }} mt={10}  onClick={onOpen} width={"fit-content"}>Donner votre avis </Button>
                                </Flex>  
                    <Box display={["grid","grid","grid","none","none"]}>
                    <Box mr={20}>
                                        <Text mt={10} fontSize={["20px","20px","20px","25px","25px"]} fontWeight={600}>Avis des clients</Text>
                                        <Box> 
                                            {data1 ?Object.values(data1).map((data,key)=>(<Comment key={key} id={id} data={data}/>)) : <></>}
                                        </Box>
                                    </Box>
                                    <Button  bgColor={"cyan.500"} color={"white"} _hover={{
                                        bgColor:"cyan.900"
                                    }} mt={10}  onClick={onOpen} width={"fit-content"}>Donner votre avis </Button>
                    </Box>
                                <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Votre avis sur {data.nom}</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                            <Stack direction="row" spacing={2}> {[1, 2, 3, 4, 5].map((star,index) => (
                                <Box key={index} as="button" onClick={() => handleRatingClick(star)}>
                                    <Icon as={StarIcon} w={6} h={6} color={star <= rating ? "yellow.400" : "gray.300"}/>
                                </Box>
                            ))}
                            </Stack>
                            <Box>

                                <Text>{avis} : </Text>
                                <Input type='text' onChange={(e)=>setAvisTitle(e.target.value)} maxLength={50}/>

                                <Text>Avis : </Text>
                                <Textarea width={"full"}onChange={(e)=>setAvisDesc(e.target.value)} maxLength={220} height={"20vh"} />

                            </Box>
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='blue' isDisabled={avisTitle.length<3|| avisDesc.length<3} mr={3} onClick={()=>{SendReport()}}>
                                    Enregistrer
                                </Button>
                                <Button  onClick={onClose} variant='ghost'>Fermer</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                    <FooterR/>
                    {/* <Center>
                    <Box mt={2}  >
                        <Text fontWeight={700} fontSize={"20px"} ml={5}>Produits recommandés</Text>
                        <Favlist2 categorie={categorie} magasin={magasin} />
                    </Box>
                    </Center>
                    <Box display={["none","none","none","block","block"]}>
                    <AvisMag mag={magasin} email={mag.email} />
                    </Box>
                    <Center bgColor={"white"} >
                        <SimpleGrid mt={2} columns={[1,1,1,2,2]} ml={['30%','30%','30%','20%','20%']} spacingX={20} display={["none","none","none","flex","flex"]} >
                        <Box mr={10} display={["none","none","none","block","block"]}>
                            <StarM2 data={mag.feedback} />
                        </Box>
                        <SimpleGrid columns={1}  bgColor={"white"} ml={[0, 0, 0, 10, 10]} >
                            {mag.feedback ? (Object.values(mag.feedback).map((data) => {
                            return (<>
                                <Box width={"400px"} justifyContent={"flex-start"} m={5} ml={0} bgColor={"white"}>
                                <Flex justifyContent={"start"}>
                                    <StarAvis data={data.rating} />
                                    <Text fontWeight={600} ml={10} mt={-1} fontSize={"12px"}>{data.dateDep ?? ""}</Text>


                                </Flex>
                                <Heading fontSize={"15px"}>{data.avisTitle}</Heading>
                                <Text fontSize={"15px"} fontWeight={"hairline"} fontFamily={"-apple-system"}>{data.avisDesc}</Text>
                                <Text fontSize={"15px"} fontWeight={"hairline"} fontFamily={"-apple-system"}>{data.usermail}</Text>
                                </Box>
                            </>)
                            }
                            )
                            )

                            : <></>}
                        </SimpleGrid>
                        <Box mr={10} display={["block","block","block","none","none"]}>
                            <StarM2 data={mag.feedback} />
                        </Box>
                        </SimpleGrid>
                    </Center>
                    <Box bgColor={"white"} height={"fit-content"} pb={10} display={["block","block","block","none","none"]}>
                    <AvisMag mag={magasin} email={mag.email} />
                    <AffichageComM data={mag}/>
                    </Box> */}
                </>
            )
        }
    }
    else {
       
        return (
            <>
            
                <Text textAlign={"center"}>Veuillez cliquer <Link href='/Connexion' color={'blue'} fontWeight={"bold"} >ICI</Link> afin d{"'"}être redirigé</Text>
           
            </>
        )
    }

    // if(data != null){
    //     if(Object.values(data).length>0){
    //         return (
    //             <>
    //                 <Head>
    //                     <script
    //                     async
    //                     src="https://www.googletagmanager.com/gtag/js?id=G-RFSVQTGJ87"
    //                     ></script>
    //                     <script strategy="lazyOnload">
    //                     {`
    //                         window.dataLayer = window.dataLayer || [];
    //                         function gtag(){dataLayer.push(arguments)}
    //                     gtag('js', new Date()); 
    //                     gtag('config', 'G-RFSVQTGJ87');
    //                     `}

    //                     </script>
    //                 </Head>
    //                 <InputBar />
    //                 <Navbar />
    //                 <Container maxW={'7xl'}>
    //                     <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, md: 10 }} py={{ base: 18, md: 24 }}>
    //                         <Box>
    //                             <Image mb={5} alt={'product image'} src={ data.imageUrl[indexed]}
    //                             w={{ base: '200px', sm: '300px', lg: '600px' }}
    //                             ml={[10,10,10,10,20]}
    //                             h={{ base: '200px', sm: '300px', lg: '600px' }}/>

    //                             <Box  width={"500px"} display={["none","none","none","block","block"]}>
    //                                 {data.imageUrl.length > 1 ?
    //                                 <Slider {...settings}>
    //                                     {data.imageUrl.map((image, index) => (
    //                                         <Image key={index} src={image} width={["100px","100px","100px","150px","150px"]} height={["100px","100px","100px","150px","150px"]} onClick={()=>setIndexed(index)} cursor={"pointer"} alt={`Product Image ${index}`}  px={2}/>
    //                                     ))}
    //                                 </Slider> : <> <Image  src={data.imageUrl} width={["100px","100px","100px","150px","150px"]} height={["100px","100px","100px","150px","150px"]} cursor={"pointer"} alt={`Product Image `} /></>} 
    //                             </Box>

    //                             <Box  width={"350px"} display={["block","block","block","none","none"]}>
    //                                 {data.imageUrl.length > 1 ?
    //                                 <Slider {...settings2}>
    //                                     {data.imageUrl.map((image, index) => (
    //                                         <Image key={index} src={image} width={["100px","100px","100px","150px","150px"]}  height={["100px","100px","100px","150px","150px"]} onClick={()=>setIndexed(index)} cursor={"pointer"} alt={`Product Image ${index}`}  px={2}/>
    //                                     ))}
    //                                 </Slider> : <> <Image  src={data.imageUrl} width={["100px","100px","100px","150px","150px"]} height={["100px","100px","100px","150px","150px"]} cursor={"pointer"} alt={`Product Image `} /></>} 
    //                             </Box>
    //                         </Box> 
    //                         <Stack spacing={{ base: 6, md: 10 }}>
    //                             <Box as={'header'}>
    //                                 <Flex py={5}>
    //                                     <Box mr={5}>
    //                                         <FacebookShareButton url={`https://www.appchap.fr${router.asPath}`} > 
    //                                             <FacebookIcon size={32} m round /> 
    //                                         </FacebookShareButton> 
    //                                     </Box>

    //                                     <WhatsappShareButton url={`https://www.appchap.fr${router.asPath}`} >  
    //                                         <WhatsappIcon size={32} round /> 
    //                                     </WhatsappShareButton> 
    //                                 </Flex>
    //                             </Box>
    //                             <Box as={'header'}>
    //                                 <Flex mt={5} justifyContent={"space-between"}>  
    //                                     <Heading mb={5} fontWeight={600} fontSize={"25px"} width={"50%"}> {data.nom} </Heading>
    //                                     {/* {console.log("data",data)} */}
    //                                     <Flex>
    //                                         <Text width={"fit-content"} color={"black"} fontSize={["25px","25px","25px","30px","30px"]} fontWeight={"hairline"} mr={2}>
    //                                             {data.prix} € 
    //                                         </Text>
    //                                         <Text as={"sub"} mt={["20px","20px","20px","30px","30px"]}>TTC</Text>
    //                                     </Flex>
    //                                 </Flex>
    //                                 <Text mb={5} color={'gray.500'} fontSize={'xl'} fontWeight={'300'}>{data.description}</Text>
    //                             </Box>
    //                             <Star id={id} data={data1}/>
    //                             <Stack spacing={{ base: 4, sm: 6 }} direction={'column'} divider={<StackDivider borderColor={'gray.200'} /> }>
    //                                 <VStack spacing={{ base: 4, sm: 6 }}>
    //                                     <Flex>
    //                                         <Text mr={2}>Expédié par </Text>
    //                                         <Text color={"cyan.700"} fontWeight={"bold"}>CHAP</Text>
    //                                     </Flex>
    //                                 </VStack>
    //                                 {data.taille ? <Box><Text fontSize={'15px'} fontWeight={'700'}>Taille :  </Text>
    //                                     <Flex textAlign={"center"}  width={"100px"}>
    //                                         <Select>
    //                                             {data.taille.map((data,index)=><option key={index} onClick={()=>{setTaille(data)}} cursor={"pointer"} border={"1px solid black"} p={2} mr={10} borderRadius={"25px"}>{data}</option>)}
    //                                         </Select>
    //                                     </Flex>
    //                                     </Box> : 
    //                                     <></>}
    //                                 <Box>
    //                                     <Text fontSize={{ base: '16px', lg: '18px' }} fontWeight={'700'}mb={'4'}>
    //                                         <u>Détails du produit</u>
    //                                     </Text>

    //                                     <List spacing={2}>
    //                                         <ListItem>
    //                                             <Text as={'span'} fontSize={"15px"}fontWeight={'bold'}>
    //                                             Quantité:
    //                                             </Text>{' '}
    //                                             {data.quantite}
    //                                         </ListItem>
    //                                         <ListItem>
    //                                             <Text as={'span'}  fontSize={"15px"}fontWeight={'bold'}>
    //                                             Origine:
    //                                             </Text>{' '}
    //                                             {data.origine}
    //                                         </ListItem>
    //                                         <ListItem width={"fit-content"} display={"flex"}>
    //                                             <Text as={'span'} mr={2}  fontSize={"15px"} fontWeight={'bold'}>
    //                                             Etat:
    //                                             </Text>{' '}
    //                                             <Text  textTransform={"capitalize"}>{data.etat}</Text>
    //                                         </ListItem>
    //                                     </List>
    //                                 </Box>
    //                             </Stack>
    //                             <Center display={"grid"}>
    //                                 <Button className={"button-85"} onClick={()=>{AddToCart(data,id,color,taille)}}>
    //                                     Ajouter au panier
    //                                 </Button>

    //                                 <Flex mt={2} ml={5}>
    //                                     <Text mr={2}>Expédié en  </Text>
    //                                     <Text color={"green"}>48H</Text>
    //                                 </Flex>
    //                             </Center>
                              
    //                         </Stack>
    //                     </SimpleGrid>
    //                 </Container>
                    
    //                 <FooterR/>
    //             </>
    //         )
    //     }
    // }
    // else{
    //     return(
    //         <>
    //             <Head>
    //                 <script
    //                 async
    //                 src="https://www.googletagmanager.com/gtag/js?id=G-RFSVQTGJ87"
    //                 ></script>
    //                 <script strategy="lazyOnload">
    //                 {`
    //                     window.dataLayer = window.dataLayer || [];
    //                     function gtag(){dataLayer.push(arguments)}
    //                 gtag('js', new Date()); 
    //                 gtag('config', 'G-RFSVQTGJ87');
    //                 `}

    //                 </script>
    //             </Head>
    //             <Navbar/>
    //             <Center display={"grid"}>
    //                 <Text fontWeight={700} mb={5}>Produit introuvable</Text>
    //                 <Button fontWeight={600} ml={-5} bgColor={"transparent"} _hover={{bgColor:"transparent"}} fontSize={"20px"} color={"blue.700"} onClick={()=>Preced()}>Page précedente</Button>
    //             </Center>
    //         </>
    //     )
    // }
}