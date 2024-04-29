                                    <Lk href={`/Details/details?c=${"Epicerie"}&m=${order.organisation}&p=${Object.keys(epicerieDetails)[index]}`} key={index} className="">
                                        <div className="bg-amber-500 p-4 flex flex-col mb-10 relative">
                                            <div className="w-full rounded-full mb-2">
                                                <img className="w-full h-[6rem] lg:h-[10rem]" src={order.imageUrl} alt="" />
                                                <img className="w-full h-[6rem] lg:h-[10rem]" src={order.imageUrl} alt="" />
                                            </div>
                                            <h3 className="uppercase font-bold mb-2 text-xs lg:text-sm">{order.nom}</h3>
                                            <small className="bg-green-600 p-1 rounded-2xl capitalize text-white absolute -top-2 left-0">{order.etat}</small>
                                            <div className="text-yellow-300 mb-2">
                                                <i className="text-[10px]"><FontAwesomeIcon className="mr-1" icon={faStar} /></i>
                                                <i className="text-[10px]"><FontAwesomeIcon className="mr-1" icon={faStar} /></i>
                                                <i className="text-[10px]"><FontAwesomeIcon className="mr-1" icon={faStar} /></i>
                                                <i className="text-[10px]"><FontAwesomeIcon className="mr-1" icon={faStar} /></i>
                                                <i className="text-[10px]"><FontAwesomeIcon className="mr-1" icon={faStar} /></i>
                                                <span className="text-black">0 avis</span>
                                            </div>
                                            <span className="my-2 font-semibold">{order.organisation}</span>
                                            <span className="italic text-slate-400 text-xs mb-2">Livré le 31/01/2024</span>
                                            <div className="flex flex-col mb-2">
                                                <span className="text-slate-700 text-sm mb-2 max-[538px]:text-[10px]"><FontAwesomeIcon className="mr-2" icon={faTruck} />Livraison dans toute la France</span>
                                                <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faMoneyBillTransfer} />Payez en espèce</span>
                                            </div>
                                            <span className="self-end mb-2 text-xl lg:text-2xl text-red-600 font-bold">{order.prix}€</span>
                                            <div className="w-full mt-4 flex flex-col gap-2 lg:gap-0 lg:flex-row justify-between">
                                                <Link href={`/otherContent/intermed1?categorie=${"Epicerie"}&magasin=${order.organisation}`} className="text-white font-bold bg-amber-800 text-xs lg:text-[1rem] py-2 px-4 rounded-lg lg:rounded-3xl">Commerce</Link>
                                                <button className="text-white font-bold bg-cyan-800 text-xs lg:text-[1rem] py-2 px-4 rounded-lg lg:rounded-3xl" onClick={()=>AddToCart(order, Object.keys(epicerieDetails)[index])}>+Ajouter</button>
                                            </div>
                                        </div>
                                    </Lk>