import React, { useEffect, useState } from 'react'
import { authentic, db, db2 } from "@/FIREBASE/clientApp";
import { onValue, ref, update } from "@firebase/database";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBillTransfer, faTruck, faStar } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";
import Head from 'next/head';
import InputBar from '@/components/InputBar';
import { Box, useToast, Link as Lk } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
function CosmeticProducts() {
    let epicerieItems = []
    const [ordersDatas, setOrdersDatas] = useState([])
    const [imgg, setImg] = useState()
    const toast = useToast()
    const router = useRouter()

    const getOrdersDatas = async () => {
        let datas = ref(db2, "/Cosmetique/O'marche Gouro(Cosmetique)");
        onValue(datas, snapshot => {
            const data = snapshot.val()
            // console.log("data ::: ", data)
            setOrdersDatas(data)
            // imageUrl
            for(let epice in data) {
                console.log("epicerie[epice] ::", data[epice].imageUrl);
                setImg(data[epice].imageUrl)
                // setProductImg(data[epice].imageUrl)
                // console.log("epicerie[epice] ::", epicerie[epice].imageUrl[0]);
                // setProductImg(epicerie[epice].imageUrl[0])
            }
        })
    }

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

    useEffect(() => {
        getOrdersDatas()
    }, [])

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
            <section className="py-10 bg-gray-100 w-full">
                <div className='container mx-auto px-4 lg:px-0'>
                    <div className="flex flex-col justify-between">
                        <div className="mb-14 ">
                            <h1 className='text-center text-2xl lg:text-4xl font-bold'>Tous nos produits du marché de cosmétique.</h1>
                            <img src="../StorePage/legumes.jpg" alt="" />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">{/** overflow-x-scroll*/}
                            {ordersDatas && ordersDatas !== "" ?
                                Object.values(ordersDatas).map((order, index) => (
                                    <Lk href={`/Details/details?c=${"Cosmetique"}&m=${order.organisation}&p=${Object.keys(ordersDatas)[index]}`} key={index} className="">{/**md:grid md:grid-rows-4 md:grid-flow-col md:gap-4 */}
                                        <div className="bg-white p-4 flex flex-col mb-10 relative">{/** bg-orange-500 my-4 lg:my-0  */}
                                            <div className="w-ful rounded-full mb-2">
                                                <img className="w-full h-[10rem]" key={index} src={order.imageUrl} alt="" />
                                            </div>
                                            <h3 className="uppercase font-bold mb-2 text-xs lg:text-sm">{order.nom}</h3>
                                            <small className="bg-green-600 p-1 rounded-2xl text-white absolute -top-2 left-0 capitalize">{order.etat}</small>
                                            <div className="text-yellow-300 mb-2">
                                                <i className="text-[10px]"><FontAwesomeIcon className="mr-1" icon={faStar} /></i>
                                                <i className="text-[10px]"><FontAwesomeIcon className="mr-1" icon={faStar} /></i>
                                                <i className="text-[10px]"><FontAwesomeIcon className="mr-1" icon={faStar} /></i>
                                                <i className="text-[10px]"><FontAwesomeIcon className="mr-1" icon={faStar} /></i>
                                                <i className="text-[10px]"><FontAwesomeIcon className="mr-1" icon={faStar} /></i>
                                                <span className="text-black">0 avis</span>
                                            </div>
                                            {/* <span className="italic text-slate-400 text-xs mb-2">Livré le 31/01/2024</span> */}
                                            <div className="flex flex-col mb-2">
                                                <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faTruck} />Livraison dans toute la France</span>
                                                <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faMoneyBillTransfer} />Payez en espèce</span>
                                            </div>
                                            <span className="self-end mb-2 text-xl lg:text-2xl text-red-600 font-bold">{order.prix}€</span>
                                            <div className="w-full mt-4 flex flex-col gap-2 lg:gap-0 lg:flex-row justify-between">
                                                <Lk href={`/otherContent/intermed1?categorie=${"Cosmetique"}&magasin=${order.organisation}`} className="text-white font-bold bg-amber-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl">Commerce</Lk>
                                                <button className="text-white font-bold bg-cyan-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl" onClick={()=>AddToCart(order, Object.keys(ordersDatas)[index])}> +Ajouter</button>
                                            </div>
                                        </div>
                                    </Lk>
                                )): (
                                <p>Aucune donnee</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CosmeticProducts