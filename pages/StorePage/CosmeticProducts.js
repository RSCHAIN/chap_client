import React, { useEffect, useState } from 'react'
import { authentic, db2 } from "@/FIREBASE/clientApp";
import { onValue, ref, update } from "@firebase/database";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBillTransfer, faTruck, faStar } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";
import Head from 'next/head';
import InputBar from '@/components/InputBar';
import { Box } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
function CosmeticProducts() {
    let epicerieItems = []
    const [ordersDatas, setOrdersDatas] = useState([])
    const [imgg, setImg] = useState()


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
                        <div className="flex -mx-4 flex-wrap md:overflow-x-scroll">{/** overflow-x-scroll*/}
                            {ordersDatas && ordersDatas !== "" ?
                                Object.values(ordersDatas).map((order, index) => (
                                    <Link href={`/Details/details?c=${"Cosmetique"}&m=${order.organisation}&p=${Object.keys(ordersDatas)[index]}`} key={index} className="bg-red-600 w-full lg:w-1/5 px-4 md: ">{/**md:grid md:grid-rows-4 md:grid-flow-col md:gap-4 */}
                                        <div className="bg-white p-4 flex flex-col mb-10 items-center relative">{/** bg-orange-500 my-4 lg:my-0  */}
                                            <div className="h-20 w-20 rounded-full mb-2">
                                                <img className="h-20 w-20" key={index} src={order.imageUrl} alt="" />
                                            </div>
                                            <h3 className="uppercase font-bold mb-2 text-xs lg:text-sm">{order.nom}</h3>
                                            <small className="bg-green-600 p-1 rounded-2xl text-white absolute -top-2 left-0 capitalize">{order.etat}</small>
                                            <div className="text-yellow-300 mb-2">
                                                <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                                <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                                <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                                <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                                <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                                <span className="text-black">0 avis</span>
                                            </div>
                                            <span className="italic text-slate-400 text-xs mb-2">Livré le 31/01/2024</span>
                                            <div className="flex flex-col mb-2">
                                                <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faTruck} />Livraison dans toute la France</span>
                                                <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faMoneyBillTransfer} />Payez en espèce</span>
                                            </div>
                                            <span className="self-end mb-2 text-xl lg:text-2xl text-red-600 font-bold">{order.prix}€</span>
                                            <div className="w-full mt-4 flex justify-between">
                                                <Link href={`/otherContent/intermed1?categorie=${"Cosmetique"}&magasin=${order.organisation}`} className="text-white font-bold bg-amber-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl">Commerce</Link>
                                                <button className="text-white font-bold bg-cyan-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl" onClick={()=>AddToCart(order, Object.keys(ordersDatas)[index])}> +Ajouter</button>
                                            </div>
                                        </div>
                                    </Link>
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