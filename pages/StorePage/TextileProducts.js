import React, { useEffect, useState } from 'react'
import { authentic, db2 } from "@/FIREBASE/clientApp";
import { onValue, ref, update } from "@firebase/database";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBillTransfer, faTruck, faStar } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";
import Head from 'next/head';
import InputBar from '@/components/InputBar';
import Navbar from '@/components/Navbar';
import { Box,Link as Lk } from '@chakra-ui/react';
import Favlist2 from '@/components/generale/FavLists2';

function TextileProducts() {
    let epicerieItems = []
    const [ordersDatas, setOrdersDatas] = useState([])
    const [imgg, setImg] = useState()


    const getOrdersDatas = async () => {
        let datas = ref(db2, "/Textile/Djeni Market");
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
                            <h1 className='text-center text-2xl lg:text-4xl font-bold'>Tous nos produits du marché de textille.</h1>
                            <img src="../StorePage/legumes.jpg" alt="" />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">{/** overflow-x-scroll*/}
                            {ordersDatas && ordersDatas !== "" ?
                                Object.values(ordersDatas).map((order, index) => (
                                    <Lk href={`/Details/details?c=${"Textile"}&m=${order.organisation}&p=${Object.keys(ordersDatas)[index]}`} key={index} className="">{/*w-full lg:w-1/5 px-4 min-[1025px]:w-1/4*/}
                                        <div className="bg-white p-4 flex flex-col mb-10 relative">{/** my-4 lg:my-0  */}
                                            <div className="w-full rounded-full bg-orange-500 mb-2">
                                                <img className="w-full h-[10rem]" key={index} src={order.imageUrl} alt="" />
                                                {/* <img src={productImg} alt="" /> */}
                                            </div>
                                            <h3 className="uppercase font-bold mb-2 text-xs lg:text-sm">{order.nom}</h3>
                                            <small className="bg-green-600 p-1 rounded-2xl text-white absolute -top-2 left-0">{order.etat}</small>
                                            <div className="text-yellow-300 mb-2">
                                                <i className="text-[10px]"><FontAwesomeIcon className="mr-1" icon={faStar} /></i>
                                                <i className="text-[10px]"><FontAwesomeIcon className="mr-1" icon={faStar} /></i>
                                                <i className="text-[10px]"><FontAwesomeIcon className="mr-1" icon={faStar} /></i>
                                                <i className="text-[10px]"><FontAwesomeIcon className="mr-1" icon={faStar} /></i>
                                                <i className="text-[10px]"><FontAwesomeIcon className="mr-1" icon={faStar} /></i>
                                                <span className="text-black">0 avis</span>
                                            </div>
                                            <span className="italic text-slate-400 text-xs mb-2">Livré le 31/01/2024</span>
                                            <div className="flex flex-col mb-2">
                                                <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faTruck} />Livraison dans toute la France</span>
                                                {/* <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faMoneyBillTransfer} />Payez en espèce</span> */}
                                            </div>
                                            <span className="self-end mb-2 text-xl lg:text-2xl text-red-600 font-bold">{order.prix}€</span>
                                            {/* <div className="w-full mt-4 flex flex-col gap-2 lg:gap-0 lg:flex-row justify-between">
                                                <Link href={`/otherContent/intermed1?categorie=${"Textile"}&magasin=${order.organisation}`} className="text-white font-bold bg-amber-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl">Commerce</Link>
                                                <button className="text-white font-bold bg-cyan-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl" onClick={()=>AddToCart(order, Object.keys(ordersDatas)[index])}>+Ajouter</button>
                                            </div> */}
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

export default TextileProducts