import React, { useState } from 'react'
// import Link from "next/link";

import { Link } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBillTransfer, faTruck, faStar } from '@fortawesome/free-solid-svg-icons'

import Carousel from "./Carousel";
import { authentic, db, db2 } from "@/FIREBASE/clientApp";
import { onValue, ref, update } from "@firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react';
import { addDoc, collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { Box, useToast } from '@chakra-ui/react';
import Head from 'next/head';
import InputBar from '@/components/InputBar';
import Navbar from '@/components/Navbar';

function Store() {

    const slides = [
        "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slider%2FabjPars.png?alt=media&token=c037631d-b5d7-47e8-b844-beb8b7fdca71",
        "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slide%2FBakery.png?alt=media&token=574eecdf-7fc8-449f-a8d0-e5f9e14f9325",
        "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slide%2FMicrosoftTeams-image1.png?alt=media&token=58788349-42b9-4b70-ae4e-6de227c5cb04",
        "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slider%2F3.png?alt=media&token=e5393663-2adf-4ea1-96be-a097839ec561",
        "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slider%2F4.png?alt=media&token=7eaa7ac6-28cb-4d7b-877f-e2014116b87a",
        "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slider%2F5.png?alt=media&token=513878-493e-4457-b4e4-f4217d7fba8c",
        "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slider%2F7.png?alt=media&token=9938ab34-a4eb-4fa5-9527-d1e741f048c3",
        "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slider%2F1.png?alt=media&token=b6f83978-875d-429f-88ab-1dd2d962b49e",
        "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slider%2F2.png?alt=media&token=caa391bd-bffb-491f-9679-a655d3fee05f",
        "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slider%2F6.png?alt=media&token=11b0ef49-fc5e-44bd-b104-bb750053d133"
    ];
    const router = useRouter()
    const toast = useToast()
    const [productImg, setProductImg] = useState([])
    const [epice, setEpice] = useState([])
    const [textille, setTextille] = useState([])
    const [cosmetic, setCosmetic] = useState([])
    const [massyProduct, setMassyProduct] = useState([])
    const [dissoaCajouProduct, setDissoaCajouProduct] = useState([])
    const [nayouProduct, setNayouProduct] = useState([])
    const [omarcheGouroProduct, setOmarcheGouroProduct] = useState([])

    const getEpicerieMarkets = async () => {
        // const starCountRef = ref(db2, "/All Products");
        const starCountRef = ref(db2, "/Epicerie/Massy Market");
        // const starCountRef = ref(db2, "/Epicerie");
        onValue(starCountRef, (snapshot) => {
            const epicerie = snapshot.val()
            const sliced = Object.fromEntries(
                Object.entries(epicerie).slice(0, 5)
            );
            setEpice(sliced)
                // console.log(epicerie)
            for(let epice in epicerie) {
                setProductImg(epicerie[epice].imageUrl)
            }
            
        });
    };

    const MassyMarket = () => {
        const starCountRef = ref(db2, "/Epicerie/Massy Market");
        onValue(starCountRef, (snapshot) => {
            const massyProduct = snapshot.val()
            const sliced = Object.fromEntries(
                Object.entries(massyProduct).slice(0, 1)
            );
            setMassyProduct(sliced)
                console.log("massyProduct ::: ", massyProduct)
            for(let epice in massyProduct) {
                setProductImg(massyProduct[epice].imageUrl)
            }
        });
    }

    const OmarcheGouro = () => {
        const starCountRef = ref(db2, "/Epicerie/O'marche Gouro(Epicerie)");
        onValue(starCountRef, (snapshot) => {
            const omarcheGouroProduct = snapshot.val()
            const sliced = Object.fromEntries(
                Object.entries(omarcheGouroProduct).slice(0, 1)
            );
            setOmarcheGouroProduct(sliced)
                console.log("omarcheGouroProduct ::: ", omarcheGouroProduct)
            for(let epice in omarcheGouroProduct) {
                setProductImg(omarcheGouroProduct[epice].imageUrl)
            }
        });
    }

    const Nayou = () => {
        // const starCountRef = ref(db2, "/Epicerie/Massy Market");
        const starCountRef = ref(db2, "/Epicerie/Nayou");
        onValue(starCountRef, (snapshot) => {
            const nayouProduct = snapshot.val()
            const sliced = Object.fromEntries(
                Object.entries(nayouProduct).slice(0, 1)
            );
            setNayouProduct(sliced)
                console.log("nayouProduct ::: ", nayouProduct)
            for(let epice in nayouProduct) {
                setProductImg(nayouProduct[epice].imageUrl)
            }
        });
    }
    const DissoaCajou = () => {
        // const starCountRef = ref(db2, "/Epicerie/Massy Market");
        const starCountRef = ref(db2, "/Epicerie/Dissoa Cajou");
        onValue(starCountRef, (snapshot) => {
            const dissoaCajouProduct = snapshot.val()
            const sliced = Object.fromEntries(
                Object.entries(dissoaCajouProduct).slice(0, 1)
            );
            setDissoaCajouProduct(sliced)
                console.log("dissoaCajouProduct ::: ", dissoaCajouProduct)
            for(let epice in dissoaCajouProduct) {
                setProductImg(dissoaCajouProduct[epice].imageUrl)
            }
        });
    };

    const getCosmeticMarkets = async () => {
        const starCountRef = ref(db2, "/Cosmetique/O'marche Gouro(Cosmetique)");
        onValue(starCountRef, (snapshot) => {
            const cosmetic = snapshot.val()
            const sliced = Object.fromEntries(
                Object.entries(cosmetic).slice(0, 5)
            );
            setCosmetic(sliced)

            // for(let epice in epicerie) {
            //     setProductImg(epicerie[epice].imageUrl)
            // }
            
        });
    }

    const getTextilleMarkets = async () => {
        // const starCountRef = ref(db2, "/Textile/Djeni Market");/
        const starCountRef = ref(db2, "/All Products");
        onValue(starCountRef, (snapshot) => {
            const textille = snapshot.val()
            const sliced = Object.fromEntries(
                Object.entries(textille).slice(0, 5)
            );
            setTextille(sliced)

            // for(let epice in epicerie) {
            //     setProductImg(epicerie[epice].imageUrl)
            // }
            
        });

    }

    
    useEffect(() => {
        getEpicerieMarkets()
        MassyMarket()
        Nayou()
        DissoaCajou()
        getCosmeticMarkets()
        getTextilleMarkets()
        OmarcheGouro()
    }, [])

    console.log("epice ::: ", epice.id);

    async function Exist(productKey, email, uid, product) {
        const cartRef = collection(db, 'orders'); // Supposons que la collection se nomme 'carts'.
        const q = query(cartRef, where('email', '==', email), where("productId", '==', productKey)); // Requête pour récupérer le panier par userId.
    
        const querySnapshot = await getDocs(q);
    
        if (querySnapshot.size === 1) {
          const cartDoc = querySnapshot.docs[0];
          const cartData = cartDoc.data();
          console.log(cartData)
          console.log(querySnapshot.docs[0].data().orderQte)
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
              orderQte:querySnapshot.docs[0].data().orderQte + 1,
              email: email
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
            email: email
          });
        }
    }

      
    function AddToCart(product, productKey) {
        onAuthStateChanged(authentic, async (user) => {
          if (!user) {
            toast({
              title: "Connectez vous!!!",
    
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            router.push("/Connexion");
            router.reload();
          } else {
            try {
              await Exist(productKey, user.email, user.uid, product);
              router.reload()
              toast({
                title: "Produit ajouté!!!",
    
                status: "success",
                duration: 9000,
                isClosable: true,
              });
            } catch (error) {
                console.log(error);
            }
    
          }
        })
    
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
            <InputBar />
            <Box display={{ base: "none", md: "grid" }} mt={10}>
                <Navbar />
            </Box>
        {/**Activer le overflow x du parent des card, pour qu'ils puissent être scrollable vers la droite */}
            <header className="py-10 bg-white">
                <div className='container mx-auto flex justify-center items-center'>
                    <div className="lg:w-[80%] lg:m-auto w-ful px-4 lg:px-0">
                        <Carousel slides={slides} />
                    </div>
                    {/* <div className="w-[40%] h-[28rem] bg-slate-200 flex justify-center items-center">
                        <h1 className='text-6xl text-orange-600'>Image ici !</h1>
                    </div> */}
                </div>
            </header>
            <section className="py-10 bg-gray-100 w-full">
                <div className='container mx-auto px-4 lg:px-0'>
                    {/* <div className="flex flex-col justify-between">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-2xl lg:text-4xl tracking-[0.1rem] font-bold">Epicerie</h2>
                            <Link className="text-xs lg:text-sm font-bold underline" href={"/StorePage/EpicerieProducts"}>Voir plus</Link>
                        </div>
                        <div className="flex -mx-4 overflow-x-scroll">
                            {epice && epice !== "" ? 
                            Object.values(epice).map((item, index) => (
                                <Link _hover={{
                                    textDecor:"none"
                                }} href={`/Details/details?c=${"Epicerie"}&m=${item.organisation}&p=${Object.keys(epice)[index]}`} key={index} className="w-full lg:w-1/5 px-4 mt-6">
                                    <div className="bg-white p-4 my-4 lg:my-0 flex flex-col items-center relative">
                                        <div className="w-full rounded-full mb-2">
                                            <img className="w-full h-[10rem]" src={item.imageUrl} alt="" />
                                        </div>
                                        <h3 className="uppercase font-bold mb-2 text-xs lg:text-sm">{item.nom}</h3>
                                        <small className="bg-green-600 p-1 rounded-2xl text-white absolute -top-2 left-0 capitalize">{item.etat}</small>
                                        <div className="text-yellow-300 mb-2">
                                            <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                            <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                            <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                            <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                            <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                            <span className="text-black">0 avis</span>
                                            <h1 className="text-6xl text-orange-600">{item.categorie}</h1>
                                        </div>
                                        <span className="italic text-slate-400 text-xs mb-2">Livré le 31/01/2024</span>
                                        <div className="flex flex-col mb-2">
                                            <span className="text-slate-700 max-[444px]:text-xs text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faTruck} />Livraison dans toute la France</span>
                                            <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faMoneyBillTransfer} />Payez en espèce</span>
                                        </div>
                                        <span className="self-end mb-2 text-xl lg:text-2xl text-red-600 font-bold">{item.prix}€</span>
                                        <div className="w-full mt-4 flex justify-between">
                                            <Link href={`/otherContent/intermed1?categorie=${"Epicerie"}&magasin=${item.organisation}`} color={"white"}
                                            className="text-white font-bold bg-amber-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl mx-2">Commerce</Link>
                                            <button className="text-white font-bold bg-cyan-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl mx-2" onClick={()=>AddToCart(item, Object.keys(epice)[index])}>+Ajouter</button>
                                        </div>
                                    </div>
                                </Link>
                            )): 
                            (
                              <p>Rien</p>
                            )}
                        </div>
                    </div> */}

                    <div className="flex flex-col justify-between">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-2xl lg:text-4xl tracking-[0.1rem] font-bold">Epicerie</h2>
                            <Link className="text-xs lg:text-sm font-bold underline" href={"/StorePage/EpicerieProducts"}>Voir plus</Link>
                        </div>
                        <div className="flex -mx-4 overflow-x-scroll">
                            <div className="w-full lg:w-1/5 px-4 mt-6 text-white">
                                {dissoaCajouProduct && dissoaCajouProduct !== " " ?
                                    Object.values(dissoaCajouProduct).map((item, index) => (
                                    <Link _hover={{ textDecor:"none"}} href={`/Details/details?c=${"Epicerie"}&m=${item.organisation}&p=${Object.keys(dissoaCajouProduct)[index]}`} key={index}>
                                        <div className="bg-white p-4 my-4 lg:my-0 flex flex-col items-center relative">
                                            <div className="w-full rounded-full mb-2">
                                                <img className="w-full h-[10rem]" src={item.imageUrl} alt="" />
                                            </div>
                                            <h3 className="uppercase font-bold mb-2 text-xs lg:text-sm">{item.nom}</h3>
                                            <small className="bg-green-600 p-1 rounded-2xl text-white absolute -top-2 left-0 capitalize">{item.etat}</small>
                                            <div className="text-yellow-300 mb-2">
                                                <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                                <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                                <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                                <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                                <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                                <span className="text-black">0 avis</span>
                                            </div>
                                            <span className='text-gray-700 my-2 font-semibold'>{item.organisation}</span>
                                            <div className="flex flex-col mb-2">
                                                <span className="text-slate-700 max-[444px]:text-xs text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faTruck} />Livraison dans toute la France</span>
                                                <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faMoneyBillTransfer} />Payez en espèce</span>
                                            </div>
                                            <span className="self-end mb-2 text-xl lg:text-2xl text-red-600 font-bold">{item.prix}€</span>
                                            <div className="w-full mt-4 flex justify-between">
                                                <Link href={`/otherContent/intermed1?categorie=${"Textile"}&magasin=${item.organisation}`} className="text-white font-bold bg-amber-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl mx-2">Commerce</Link>
                                                <button className="text-white font-bold bg-cyan-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl mx-2" onClick={()=>AddToCart(item, Object.keys(textille)[index])}>+Ajouter</button>
                                            </div>
                                        </div>
                                    </Link>
                                )) : 'null'}
                            </div>
                            <div className="w-full lg:w-1/5 px-4 mt-6 text-white">
                                {nayouProduct && nayouProduct !== " " ?
                                    Object.values(nayouProduct).map((item, index) => (
<Link _hover={{ textDecor:"none"}} href={`/Details/details?c=${"Epicerie"}&m=${item.organisation}&p=${Object.keys(nayouProduct)[index]}`} key={index}>
                                        <div className="bg-white p-4 my-4 lg:my-0 flex flex-col items-center relative">
                                            <div className="w-full rounded-full mb-2">
                                                <img className="w-full h-[10rem]" src={item.imageUrl} alt="" />
                                            </div>
                                            <h3 className="uppercase font-bold mb-2 text-xs lg:text-sm">{item.nom}</h3>
                                            <small className="bg-green-600 p-1 rounded-2xl text-white absolute -top-2 left-0 capitalize">{item.etat}</small>
                                            <div className="text-yellow-300 mb-2">
                                                <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                                <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                                <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                                <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                                <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                                <span className="text-black">0 avis</span>
                                            </div>
                                            <span className='text-gray-700 my-2 font-semibold'>{item.organisation}</span>
                                            <div className="flex flex-col mb-2">
                                                <span className="text-slate-700 max-[444px]:text-xs text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faTruck} />Livraison dans toute la France</span>
                                                <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faMoneyBillTransfer} />Payez en espèce</span>
                                            </div>
                                            <span className="self-end mb-2 text-xl lg:text-2xl text-red-600 font-bold">{item.prix}€</span>
                                            <div className="w-full mt-4 flex justify-between">
                                                <Link href={`/otherContent/intermed1?categorie=${"Textile"}&magasin=${item.organisation}`} className="text-white font-bold bg-amber-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl mx-2">Commerce</Link>
                                                <button className="text-white font-bold bg-cyan-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl mx-2" onClick={()=>AddToCart(item, Object.keys(textille)[index])}>+Ajouter</button>
                                            </div>
                                        </div>
</Link>
                                )) : 'null'}
                            </div>
                            <div className="w-full lg:w-1/5 px-4 mt-6 text-white">
                                {massyProduct && massyProduct !== " " ?
                                    Object.values(massyProduct).map((item, index) => (
                                        <Link _hover={{ textDecor:"none"}} href={`/Details/details?c=${"Epicerie"}&m=${item.organisation}&p=${Object.keys(epice)[index]}`} key={index}>
                                        <div className="bg-white p-4 my-4 lg:my-0 flex flex-col items-center relative">
                                            <div className="w-full rounded-full mb-2">
                                                <img className="w-full h-[10rem]" src={item.imageUrl} alt="" />
                                            </div>
                                            <h3 className="uppercase font-bold mb-2 text-xs lg:text-sm">{item.nom}</h3>
                                            <small className="bg-green-600 p-1 rounded-2xl text-white absolute -top-2 left-0 capitalize">{item.etat}</small>
                                            <div className="text-yellow-300 mb-2">
                                                <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                                <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                                <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                                <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                                <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                                <span className="text-black">0 avis</span>
                                            </div>
                                            <span className='text-gray-700 my-2 font-semibold'>{item.organisation}</span>
                                            <div className="flex flex-col mb-2">
                                                <span className="text-slate-700 max-[444px]:text-xs text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faTruck} />Livraison dans toute la France</span>
                                                <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faMoneyBillTransfer} />Payez en espèce</span>
                                            </div>
                                            <span className="self-end mb-2 text-xl lg:text-2xl text-red-600 font-bold">{item.prix}€</span>
                                            <div className="w-full mt-4 flex justify-between">
                                                <Link href={`/otherContent/intermed1?categorie=${"Textile"}&magasin=${item.organisation}`} className="text-white font-bold bg-amber-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl mx-2">Commerce</Link>
                                                <button className="text-white font-bold bg-cyan-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl mx-2" onClick={()=>AddToCart(item, Object.keys(textille)[index])}>+Ajouter</button>
                                            </div>
                                        </div>
                                        </Link>
                                )) : 'null'}
                            </div>
                            <div className="w-full lg:w-1/5 px-4 mt-6 text-white">
                                {omarcheGouroProduct && omarcheGouroProduct !== " " ?
                                    Object.values(omarcheGouroProduct).map((item, index) => (
                                        <Link _hover={{ textDecor:"none"}} href={`/Details/details?c=${"Epicerie"}&m=${item.organisation}&p=${Object.keys(omarcheGouroProduct)[index]}`} key={index}>
                                        <div className="bg-white p-4 my-4 lg:my-0 flex flex-col items-center relative">
                                            <div className="w-full rounded-full mb-2">
                                                <img className="w-full  h-[10rem]" src={item.imageUrl} alt="" />
                                            </div>
                                            <h3 className="uppercase font-bold mb-2 text-xs lg:text-sm">{item.nom}</h3>
                                            <small className="bg-green-600 p-1 rounded-2xl text-white absolute -top-2 left-0 capitalize">{item.etat}</small>
                                            <div className="text-yellow-300 mb-2">
                                                <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                                <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                                <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                                <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                                <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                                <span className="text-black">0 avis</span>
                                            </div>
                                            <span className='text-gray-700 my-2 font-semibold'>{item.organisation}</span>
                                            <div className="flex flex-col mb-2">
                                                <span className="text-slate-700 max-[444px]:text-xs text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faTruck} />Livraison dans toute la France</span>
                                                <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faMoneyBillTransfer} />Payez en espèce</span>
                                            </div>
                                            <span className="self-end mb-2 text-xl lg:text-2xl text-red-600 font-bold">{item.prix}€</span>
                                            <div className="w-full mt-4 flex justify-between">
                                                <Link href={`/otherContent/intermed1?categorie=${"Textile"}&magasin=${item.organisation}`} className="text-white font-bold bg-amber-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl mx-2">Commerce</Link>
                                                <button className="text-white font-bold bg-cyan-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl mx-2" onClick={()=>AddToCart(item, Object.keys(textille)[index])}>+Ajouter</button>
                                            </div>
                                        </div>
                                        </Link>
                                )) : 'null'}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between mt-10">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-2xl lg:text-4xl tracking-[0.1rem] font-bold">Textile</h2>
                            <Link className="text-xs lg:text-sm font-bold underline" href={"/StorePage/TextileProducts"}>Voir plus</Link>
                        </div>
                        <div className="flex -mx-4 overflow-x-scroll">{/**flex-wrap */}
                            {textille && textille !== " " ?
                                Object.values(textille).map((item, index) => (
                                <Link _hover={{
                                    textDecor:"none"
                                }}  href={`/Details/details?c=${"Textile"}&m=${item.organisation}&p=${Object.keys(textille)[index]}`} key={index} className="w-full lg:w-1/5 px-4 mt-6 text-white">
                                    <div className="bg-white p-4 my-4 lg:my-0 flex flex-col items-center relative">
                                        <div className="w-full rounded-full mb-2">
                                            <img className="w-full h-[10rem]" src={item.imageUrl} alt="" />
                                        </div>
                                        <h3 className="uppercase font-bold mb-2 text-xs lg:text-sm">{item.nom}</h3>
                                        <small className="bg-green-600 p-1 rounded-2xl text-white absolute -top-2 left-0 capitalize">{item.etat}</small>
                                        <div className="text-yellow-300 mb-2">
                                            <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                            <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                            <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                            <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                            <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                            <span className="text-black">0 avis</span>
                                        </div>
                                        {/* <span className="italic text-slate-400 text-xs mb-2">Livré le 31/01/2024</span> */}
                                        <div className="flex flex-col mb-2">
                                            <span className="text-slate-700 max-[444px]:text-xs text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faTruck} />Livraison dans toute la France</span>
                                            <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faMoneyBillTransfer} />Payez en espèce</span>
                                        </div>
                                        <span className="self-end mb-2 text-xl lg:text-2xl text-red-600 font-bold">{item.prix}€</span>
                                        <div className="w-full mt-4 flex justify-between">
                                            <Link href={`/otherContent/intermed1?categorie=${"Textile"}&magasin=${item.organisation}`} className="text-white font-bold bg-amber-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl mx-2">Commerce</Link>
                                            <button className="text-white font-bold bg-cyan-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl mx-2" onClick={()=>AddToCart(item, Object.keys(textille)[index])}>+Ajouter</button>
                                        </div>
                                    </div>
                                </Link>
                            )) : (<p>Rien</p>)}
                        </div>
                    </div>

                    <div className="flex flex-col justify-between mt-10">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-2xl lg:text-4xl tracking-[0.1rem] font-bold">Cosmetique</h2>
                            <Link className="text-xs lg:text-sm font-bold underline" href={"/StorePage/CosmeticProducts"}>Voir plus</Link>
                        </div>
                        <div className="flex -mx-4 overflow-x-scroll">{/**flex-wrap */}
                            {cosmetic && cosmetic !== " " ?
                            Object.values(cosmetic).map((item, index) => (
                                <Link _hover={{
                                    textDecor:"none"
                                }}  href={`/Details/details?c=${"Cosmetique"}&m=${item.organisation}&p=${Object.keys(cosmetic)[index]}`} key={index} className="w-full lg:w-1/5 px-4 mt-6">
                                    <div className="bg-white p-4 my-4 lg:my-0 flex flex-col items-center relative">
                                        <div className="w-full rounded-full mb-2">
                                            <img className="w-full h-[10rem]" src={item.imageUrl} alt="" />
                                        </div>
                                        <h3 className="uppercase font-bold mb-2 text-xs lg:text-sm">{item.nom}</h3>
                                        <small className="bg-green-600 p-1 rounded-2xl text-white absolute -top-2 left-0 capitalize">{item.etat}</small>
                                        <div className="text-yellow-300 mb-2">
                                            <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                            <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                            <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                            <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                            <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                            <span className="text-black">0 avis</span>
                                        </div>
                                        {/* <span className="italic text-slate-400 text-xs mb-2">Livré le 31/01/2024</span> */}
                                        <div className="flex flex-col mb-2">
                                            <span className="text-slate-700 max-[444px]:text-xs text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faTruck} />Livraison dans toute la France</span>
                                            <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faMoneyBillTransfer} />Payez en espèce</span>
                                        </div>
                                        <span className="self-end mb-2 text-xl lg:text-2xl text-red-600 font-bold">{item.prix}€</span>
                                        <div className="w-full mt-4 flex justify-between">
                                            <Link href={`/otherContent/intermed1?categorie=${"Cosmetique"}&magasin=${item.organisation}`} className="text-white font-bold bg-amber-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl mx-2">Commerce</Link>
                                            <button className="text-white font-bold bg-cyan-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl mx-2" onClick={()=>AddToCart(item, Object.keys(cosmetic)[index])}>+Ajouter</button>
                                        </div>
                                    </div>
                                </Link>
                            )) : (<p>rien</p>)}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Store