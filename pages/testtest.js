<div>
    <DrawerOverlay />
    <DrawerContent>
        <div className="bg-slate-200 h-full" >
            <DrawerCloseButton />
            <DrawerBody className="container mx-auto w-7/12 h-full" >
                <div className="overflow-hidden min-h-[32rem] rounded-md p-8 flex flex-col justify-center items-center gap-4 md:p-8">
                    <h1 className="text-3xl text-teal-900 font-bold mb-8">Validation de la commande</h1>
                    <div className="user-datas bg-white w-full flex justify-between items-center border p-4 max-[680px]:flex-col max-[680px]:items-center max-[1133px]:justify-center max-[1133px]:flex-col max-[680px]:justify-center max-[1133px]:items-center">
                        <span className="font-bold self-start text-2xl max-[680px]:self-auto max-[1133px]:self-auto">Votre adresse :</span>
                        <ul className="list-none">
                            <li>{secureLocalStorage.getItem("name")} {secureLocalStorage.getItem("surname")}</li>
                            <li>{secureLocalStorage.getItem("addresse")}</li>
                            <li>{secureLocalStorage.getItem("number")}</li>
                        </ul>
                        <button className="bg-cyan-800 rounded-md text-white p-2" onClick={() =>setWay("other")}>Changer d{`'`}adresse</button>
                    </div>

                    <div className=" w-full bg-white rounded-md shadow-lg flex flex-col justify-center items-center p-8 gap-4 max-[680px]:">
                        <h2 className="text-2xl font-bold mb-10 max-[680px]:text-xl max-[687px]:text-center">
                            {" "}
                            Mode de paiement
                        </h2>
    
                        <RadioGroup className="w-full flex justify-around items-center" onChange={setMoyen} value={moyen} onClick={() => { setSect1("flex"); }}>
                            <div>
                                <Radio value="Especes">
                                    <div>
                                        <BsCashCoin/>
                                        <span> Espèces</span>
                                    </div>
                                </Radio>
                            </div>
                            <div>
                                <Radio value="Paypal">
                                    <div>
                                        <BsPaypal/>
                                        <span> Paypal</span>
                                    </div>
                                </Radio>
                            </div>
                        </RadioGroup>
                    </div>
                    <Box className="w-full bg-white shadow-lg shadow-gray-300 rounded-md flex flex-col justify-center items-center p-4 gap-4 md:flex-col" >
                        <Text className="text-2xl text-black mb-4 font-bold max-[780px]:text-center max-[780px]:mb-1">
                            Date de livraison
                        </Text> 
                        <Box>
                            <RadioGroup className="max-[680px]:flex-col max-[680px]:items-center max-[1133px]:items-center max-[1133px]:flex-col max-[1390px]: bg-green-200 text-black rounded-md flex justify-between items-center p-4 text-xl max-[780px]:flex-col max-[780px]:items-start" onChange={setDay} value={day} onClick={() => setSect2("grid")} >
                                <Radio mr={20} className="w-4 h-4 text-slate-600 bg-gray-100 border-gray-300 focus:ring-slate-500 dark:focus:ring-slate-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-cyan-800 dark:border-cyan-800" value="Mercredi">
                                    Mercredi{" "}
                                </Radio>
                                <Radio mr={20} className="w-4 h-4 text-slate-600 bg-gray-100 border-gray-300 focus:ring-slate-500 dark:focus:ring-slate-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-cyan-800 dark:border-cyan-800" value="Vendredi">
                                    {" "}
                                    Vendredi
                                </Radio>
                                <Radio mr={20} className="w-4 h-4 text-slate-600 bg-gray-100 border-gray-300 focus:ring-slate-500 dark:focus:ring-slate-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-cyan-800 dark:border-cyan-800" value="Samedi">
                                    {" "}
                                    Samedi
                                </Radio>
                            </RadioGroup>
                        </Box>
                        <Box className="rounded-md flex flex-col justify-center items-center gap-4 p-4">
                            <Text className="text-2xl text-black mb-4 font-bold">Heure de livraison</Text>
                            {day == "Samedi" ? (
                                <RadioGroup className="bg-green-700 text-white flex justify-center items-center gap-4 p-4"  onChange={setHours} value={hours} onClick={() => { setSect3("flex") }}>
                                    <Radio value="Soir(13h-16h)">
                                        Apres-Midi (de 13h -- 16h)
                                        </Radio>
                                        <br />
                                        <Radio value="Soir(16h-20h)">
                                        Soir (de 16h -- 20h)
                                        </Radio>
                                        <br />
                                        <Radio value="Soir(20h-00h)">
                                        Nuit (de 20h -- 00h)
                                    </Radio>            
                                </RadioGroup>
                            ) : (
                                <RadioGroup className="bg-slate-200 text-black flex justify-center items-center gap-4 p-4 max-[780px]:flex-col max-[780px]:justify-center max-[780px]:items-start max-[780px]:gap-1 max-[780px]:rounded-md max-[780px]:bg-white max-[780px]:shadow-lg max-[780px]:shadow-black max-[780px]:text-black" onChange={setHours} value={hours} onClick={() => { setSect3("flex") }}>
                                    <Radio className="w-4 h-4 text-slate-600 bg-gray-100 border-gray-300 focus:ring-slate-500 dark:focus:ring-slate-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-cyan-800 dark:border-cyan-800" value="Matin">
                                        Matin(de 09h30 -- 12h)
                                    </Radio>
                                        <br />
                                    <Radio className="w-4 h-4 text-slate-600 bg-gray-100 border-gray-300 focus:ring-slate-500 dark:focus:ring-slate-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-cyan-800 dark:border-cyan-800" value="Soir(13h-16h)">
                                        Apres-Midi (de 13h -- 16h)
                                    </Radio>
                                        <br />
                                    <Radio className="w-4 h-4 text-slate-600 bg-gray-100 border-gray-300 focus:ring-slate-500 dark:focus:ring-slate-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-cyan-800 dark:border-cyan-800" value="Soir(16h-20h)">
                                        Soir (de 16h -- 20h)
                                    </Radio>
                                        <br />
                                    <Radio className="w-4 h-4 text-slate-600 bg-gray-100 border-gray-300 focus:ring-slate-500 dark:focus:ring-slate-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-cyan-800 dark:border-cyan-800" value="Soir(20h-00h)">
                                        Nuit (de 20h -- 00h)
                                    </Radio>
                                </RadioGroup>
                            )}
                        </Box>
                        </Box>
                        <Box mb={10} className="min-w-[100%] flex flex-col justify-center items-center p-4 gap-4">
                            ici
                            
                            {
                                way == "other" ?
                                <>
                                    <Box className="min-w-[80%] flex flex-col gap-2 mt-6 bg-white rounded-md shadow-md shadow-black p-12">
                                        <FormControl className="flex flex-col justify-start items-center w-full">
                                            <FormLabel className="w-full text-black"><FontAwesomeIcon icon={faUser}/> Nom :  </FormLabel>
                                            <Input placeholder="Elloh" className="min-w-[34rem] -ml-1 mb-2 w-96" onChange={(e) => setNom(e.target.value) }/>
                                        </FormControl>
                                        <FormControl className="flex flex-col justify-start items-center w-full">
                                            <FormLabel className="w-full text-black"><FontAwesomeIcon icon={faPhone}/>Numero :  </FormLabel>
                                            <Input placeholder="+33 00 00 00 00" className="min-w-[34rem] -ml-1 mb-2 w-96" type="number" onChange={(e) =>setNumero(e.target.value)}/>
                                        </FormControl>
                                        <FormControl  className="flex flex-col justify-start items-center w-full">
                                            <FormLabel className="w-full text-black"><FontAwesomeIcon icon={faCity}/>Ville : </FormLabel>
                                            <Input placeholder="Massy" className="-ml-1 mb-2 w-96 border border-teal-800 " onChange={(e) => setVille(e.target.value) } />
                                        </FormControl>
                                        
                                        <FormControl className="flex flex-col justify-start items-center w-full">
                                            <FormLabel className="w-full text-black"><FontAwesomeIcon icon={faRoad}/>Nom de la Rue : </FormLabel>
                                            <Input placeholder="Orly" className="min-w-[34rem] -ml-1 mb-2 w-96" onChange={(e) => setRue(e.target.value) } />
                                        </FormControl>
                                        <FormControl className="flex flex-col justify-start items-center w-full">
                                            <FormLabel className="w-full text-black"><FontAwesomeIcon icon={faArrowUp19}/>Numero du batiment : </FormLabel>
                                            <Input placeholder="712" className="min-w-[34rem] -ml-1 mb-2 w-96" type="number" onChange={(e) => setBatiment(e.target.value) } />
                                        </FormControl>
                                        <FormControl className="flex flex-col justify-start items-center w-full">
                                            <FormLabel className="w-full text-black"><FontAwesomeIcon icon={faMailBulk} />Code Postal : </FormLabel>
                                            <Input placeholder="AB 31 BP" className="min-w-[34rem] -ml-1 mb-2 w-96" onChange={(e) => setPostal(e.target.value) } />
                                        </FormControl>
                                    </Box>
                                </>
                                :
                                <></>
                            }
                        </Box>
                        <Box className="p-8">
                            {
                                moyen == "Paypal" ? <Box width={"300px"}> <PayPalButtons
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    value: `${prix + frais}`,
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
                            :
                            <button className="-mt-80 py-2 px-10 rounded-md text-white border border-teal-800 bg-teal-800" onClick={()=>{ saveCommande3()}}>Confirmer achat</button>
                            // <Box className="">
                            // </Box>
                        }
                    </Box>
                </div>
            </DrawerBody>
        </div>
    </DrawerContent>
</div>