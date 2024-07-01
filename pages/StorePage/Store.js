import React, { useState } from 'react'

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
    
    const [test, setTest] = useState()

    // const getEpicerieMarkets = async () => {
    //     // const starCountRef = ref(db2, "/All Products");
    //     // const starCountRef = ref(db2, "/Epicerie/Massy Market");
    //     const starCountRef = ref(db2, "/Epicerie");
    //     onValue(starCountRef, (snapshot) => {
    //         const epicerie = snapshot.val()
    //         const sliced = Object.fromEntries(
    //             Object.entries(epicerie).slice(0, 5)
    //         );
    //         setEpice(sliced)
    //             // console.log(epicerie)
    //         for(let epice in epicerie) {
    //             setProductImg(epicerie[epice].imageUrl)
    //         }
            
    //     });
    // };

    const getEpicerieMarkets = async () => {
        let data = ref(db2, "/courseEpicerie");
        onValue(data, (snapshot) => {
            const epicerie = snapshot.val()
            const sliced = Object.fromEntries(
                Object.entries(epicerie).slice(0, 5)
            );
        setEpice(Object.values(sliced))
        });
    }

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
            console.log("sliced ::: ", sliced);
            setTextille(sliced)

            // for(let epice in epicerie) {
            //     setProductImg(epicerie[epice].imageUrl)
            // }
            
        });

    }
    const getAllEpicerieMarkets = async () => {
        // let datas = ref(db2, "/Epicerie/Massy Market");
        let datas = ref(db2, "/courseEpicerie");
        onValue(datas, snapshot => {
            const data = snapshot.val()
            const sliced = Object.fromEntries(
                Object.entries(data).slice(0, 5)
            );
            setTest(Object.values(sliced))
            // setEpicerieDetails(data)
            // console.log("les datas ::: ", data);
            // for(let epice in data) {
            //     // console.log("epicerie[epice] ::", data[epice].imageUrl);
            //     setImage(data[epice].imageUrl)
            // }
        })
    }
    
    useEffect(() => {
        getAllEpicerieMarkets()
        getEpicerieMarkets()
        
        getCosmeticMarkets()
        getTextilleMarkets()
    }, [])

    async function Exist(productKey, email, uid, product) {
        const cartRef = collection(db, 'orders'); // Supposons que la collection se nomme 'carts'.
        const q = query(cartRef, where('email', '==', email), where("productId", '==', productKey)); // Requête pour récupérer le panier par userId.
    
        const querySnapshot = await getDocs(q);
    
        if (querySnapshot.size === 1) {
          const cartDoc = querySnapshot.docs[0];
          const cartData = cartDoc.data();
        //   console.log(cartData)
        //   console.log(querySnapshot.docs[0].data().orderQte)
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
                // console.log(error);
            }
    
          }
        })
    
    }

    console.log("epice ::: ", epice);

    return (
        <>
            <Head>
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-RFSVQTGJ87"></script>
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
            <section className='african-shop py-10 bg-gray-100 w-full'>
                <header className="bg-white">
                    <div className='container mx-auto flex justify-center items-center'>
                        <div className="lg:w-[80%] lg:m-auto w-ful px-4 lg:px-0">
                            <Carousel slides={slides} />
                        </div>
                    </div>
                </header>
                <div className='flex flex-col gap-10 py-10 container mx-auto px-4 lg:px-0'>
                    <div className="flex flex-col py-10 px-10">
                        <div className='flex justify-between items-center'>
                            <h2 className="text-2xl lg:text-4xl tracking-[0.1rem] font-bold">Epicérie</h2>
                            <Link className="text-xs lg:text-sm font-bold underline" href={"/StorePage/EpicerieProducts"}>Voir plus</Link>
                        </div>
                        <div class="flex overflow-x-scroll py-10"> {/** hide-scroll-bar */}
                            {epice.map((item, index) => (
                                <div key={index} class="flex flex-nowrap">
                                    <div class="inline-block px-3">
                                        <div class="w-72 h-72 max-w-xs p-4 overflow-hidden rounded-md shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out relative">
                                            <div className='flex justify-center items-center'>
                                                <img key={index} className='h-32 w-52' src={item.imageUrl}/>
                                            </div>
                                            <h3 className='text-sm font-semibold'>{item.nom}</h3>
                                            <small className={`${item.etat === 'Disponible'? 'bg-green-600 ' : 'bg-red-600'} p-1 text-white absolute -top-2 left-0 capitalize`}>{item.etat}</small>
                                            <div className="text-yellow-300 text-xs">
                                                <i className="text-[0.5rem]"><FontAwesomeIcon className="mr-1" icon={faStar} /></i>
                                                <i className="text-[0.5rem]"><FontAwesomeIcon className="mr-1" icon={faStar} /></i>
                                                <i className="text-[0.5rem]"><FontAwesomeIcon className="mr-1" icon={faStar} /></i>
                                                <i className="text-[0.5rem]"><FontAwesomeIcon className="mr-1" icon={faStar} /></i>
                                                <i className="text-[0.5rem]"><FontAwesomeIcon className="mr-1" icon={faStar} /></i>
                                                <span className="text-black text-xs">0 avis</span>
                                            </div>
                                            <span className='text-sm font-semibold'>{item.organisation}</span>
                                            <div className="flex flex-col text-xs">
                                                <span className=""><FontAwesomeIcon className="mr-1" icon={faTruck} />Livraison dans toute la France</span>
                                                <span className=""><FontAwesomeIcon className="mr-1" icon={faMoneyBillTransfer} />Payez en espèce</span>
                                            </div>
                                            <div className='flex justify-end'>
                                                <span className="text-lg text-red-600">{item.prix}€</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col py-10 px-10">
                        <div className='flex justify-between items-center'>
                            <h2 className="text-2xl lg:text-4xl tracking-[0.1rem] font-bold">Cosmétique</h2>
                            <Link className="text-xs lg:text-sm font-bold underline" href={"/StorePage/EpicerieProducts"}>Voir plus</Link>
                        </div>
                        <div class="flex overflow-x-scroll py-10"> {/** hide-scroll-bar */}
                            {Object.values(cosmetic).map((item, index) => (
                                <div key={index} class="flex flex-nowrap">
                                    <div class="inline-block px-3">
                                        <div class="w-72 h-72 max-w-xs p-4 overflow-hidden rounded-md shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out relative">
                                            <div className='flex justify-center items-center'>
                                                <img key={index} className='h-32 w-52' src={item.imageUrl}/>
                                            </div>
                                            <h3 className='text-sm font-semibold'>{item.nom}</h3>
                                            <small className={`${item.etat === 'Disponible'? 'bg-green-600 ' : 'bg-red-600'} p-1 text-white absolute -top-2 left-0 capitalize`}>{item.etat}</small>
                                            <div className="text-yellow-300 text-xs">
                                                <i className="text-[0.5rem]"><FontAwesomeIcon className="mr-1" icon={faStar} /></i>
                                                <i className="text-[0.5rem]"><FontAwesomeIcon className="mr-1" icon={faStar} /></i>
                                                <i className="text-[0.5rem]"><FontAwesomeIcon className="mr-1" icon={faStar} /></i>
                                                <i className="text-[0.5rem]"><FontAwesomeIcon className="mr-1" icon={faStar} /></i>
                                                <i className="text-[0.5rem]"><FontAwesomeIcon className="mr-1" icon={faStar} /></i>
                                                <span className="text-black text-xs">0 avis</span>
                                            </div>
                                            <span className='text-sm font-semibold'>{item.organisation}</span>
                                            <div className="flex flex-col text-xs">
                                                <span className=""><FontAwesomeIcon className="mr-1" icon={faTruck} />Livraison dans toute la France</span>
                                                <span className=""><FontAwesomeIcon className="mr-1" icon={faMoneyBillTransfer} />Payez en espèce</span>
                                            </div>
                                            <div className='flex justify-end'>
                                                <span className="text-lg text-red-600">{item.prix}€</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col py-10 px-10">
                        <div className='flex justify-between items-center'>
                            <h2 className="text-2xl lg:text-4xl tracking-[0.1rem] font-bold">Textile</h2>
                            <Link className="text-xs lg:text-sm font-bold underline" href={"/StorePage/EpicerieProducts"}>Voir plus</Link>
                        </div>
                        <div class="flex overflow-x-scroll py-10"> {/** hide-scroll-bar */}
                            {Object.values(textille).map((item, index) => (
                                <div key={index} class="flex flex-nowrap">
                                    <div class="inline-block px-3">
                                        <div class="w-72 h-72 max-w-xs p-4 overflow-hidden rounded-md shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out relative">
                                            <div className='flex justify-center items-center'>
                                                <img key={index} className='h-32 w-52' src={item.imageUrl}/>
                                            </div>
                                            <h3 className='text-sm font-semibold'>{item.nom}</h3>
                                            <small className={`${item.etat === 'Disponible'? 'bg-green-600 ' : 'bg-red-600'} p-1 text-white absolute -top-2 left-0 capitalize`}>{item.etat}</small>
                                            <div className="text-yellow-300 text-xs">
                                                <i className="text-[0.5rem]"><FontAwesomeIcon className="mr-1" icon={faStar} /></i>
                                                <i className="text-[0.5rem]"><FontAwesomeIcon className="mr-1" icon={faStar} /></i>
                                                <i className="text-[0.5rem]"><FontAwesomeIcon className="mr-1" icon={faStar} /></i>
                                                <i className="text-[0.5rem]"><FontAwesomeIcon className="mr-1" icon={faStar} /></i>
                                                <i className="text-[0.5rem]"><FontAwesomeIcon className="mr-1" icon={faStar} /></i>
                                                <span className="text-black text-xs">0 avis</span>
                                            </div>
                                            <span className='text-sm font-semibold'>{item.organisation}</span>
                                            <div className="flex flex-col text-xs">
                                                <span className=""><FontAwesomeIcon className="mr-1" icon={faTruck} />Livraison dans toute la France</span>
                                                <span className=""><FontAwesomeIcon className="mr-1" icon={faMoneyBillTransfer} />Payez en espèce</span>
                                            </div>
                                            <div className='flex justify-end'>
                                                <span className="text-lg text-red-600">{item.prix}€</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Store