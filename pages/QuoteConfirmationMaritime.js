import { faHome, faHomeUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Flex, Input, Button, ChakraProvider, VStack, HStack, Heading, Text, Box, Select, Radio, RadioGroup, Stack, useToast, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Center, Modal, ModalOverlay, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, useDisclosure, Menu, MenuButton, useBoolean, MenuList, MenuItem } from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons"
const departAfricolis= ["09/10/2023","13/10/2023","16/10/2023","20/10/2023","23/10/2023","27/10/2023","30/10/2023","03/11/2023"]
import Link from "next/link";
import PopUp from "@/components/DevisAddon/popUp";


function QuoteConfirmation() {
    const [width, setWidth] = useState()
    const [windowSize, setWindowSize] = useState([]);

    var besoin2 = 0;
    var prixContenant = 0;
  
    const [categorie, setCategorie] = useState([
        { contenu: "Textile", prix: 10 },
      ]);
    
      const [inputGroups, setInputGroups] = useState([
        [
          { id: 1, value: "", title: "Description" },
    
          { id: 2, value: "", title: "Valeur" },
    
          { id: 3, value: "", title: "Poids" },
        ],
      ]);

    useEffect(() => {
        const handleWindowResize = () => {
            if (typeof window !== 'undefined') {
                setWindowSize([window.innerWidth, window.innerHeight])
            }
        };
        window.addEventListener('resize', handleWindowResize);

        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
    }, []);


    const date = new Date();
    const dateDep = date.toLocaleDateString();
    const date2 = new Date();
    const dateExp = date2.setDate(date2.getDate() + 3);
    const dateExp2 = new Date(dateExp);
    const dateExp3 = dateExp2.toLocaleDateString();
    const date2C = new Date();
    const dateExpC = date2C.setDate(date2C.getDate() + 31);
    const dateExp2C = new Date(dateExpC);
    const dateExp3C = dateExp2C.toLocaleDateString();


 

    


    ////debut reforme
    const [addpostal, setAddpostal] = useState("");//code postal
    const [choixCarton, setChoixCarton] = useState([]);///le type de contenant
    const [valeurEnEuro, setValeurEnEuro] = useState([]);/// la valeur en euro
    const [descriptioncolis, setDescription] = useState([]);/// la description des colis
    const [partenaire, setPartenaire] = useState("");/// le nom du partenaire
    const [adr, setAdr] = useState("");/// l'adresse
    const [priseColis,setPriseColis] = useState("");///pays de recuperation du colis
    const [destinationColis,setDestinationColis] = useState("");///pays de livraison
    const [email,setEmail] = useState("");///email
    const[recup,setRecup] = useState("");///moyen de recuperation du colis
    const [ville,setVille] = useState("");///
    const [besoin,setBesoin] = useState([]);///
 


    useEffect(() => {
       

        ///debut recuperation des champs 
            setEmail(sessionStorage.getItem("email"));
            setChoixCarton(JSON.parse(sessionStorage.getItem("choixcarton")));
            setDescription(JSON.parse(sessionStorage.getItem("descriptioncolis")));
            setValeurEnEuro(JSON.parse(sessionStorage.getItem("valeureneuro")));
            setAddpostal(JSON.parse(sessionStorage.getItem("addpostal")));
            setAdr(JSON.parse(sessionStorage.getItem("addresse")))
            setPriseColis(JSON.parse(sessionStorage.getItem("arrivee")))
            setDestinationColis(JSON.parse(sessionStorage.getItem("dest")))
            setRecup(JSON.parse(sessionStorage.getItem("receptioncolis")))
            setVille(JSON.parse(sessionStorage.getItem("ville")))
            setBesoin(JSON.parse(sessionStorage.getItem("besoin")))
            
        ///Fin de la recuperation des champs




        // // Access count value from session storage
        // let poids = sessionStorage.getItem("detailscolis");
        // console.log("oui poids ::: ", typeof poids);
        // let currentData = JSON.parse(poids);
        // console.log("oui currentData ::: ", currentData);
        // setPoidsFromSession(parseFloat(currentData[0]))

        // // let detailsColis = sessionStorage.getItem("detailscolis");
        // // console.log("oui poids ::: ",typeof detailsColis);
        // // let currentDetailsColi = JSON.parse(detailsColis);
        // // setDetailscolisFromSession()

        // let reception = sessionStorage.getItem("receptioncolis");
        // console.log("oui poids ::: ", typeof reception);
        // let currentReception = JSON.parse(reception);
        // setReceptionColis(currentReception)

        // let description = sessionStorage.getItem("descriptioncolis");
        // console.log("oui poids ::: ", typeof description);
        // let currentDescription = JSON.parse(description);
        // setDescriptionColisFromSession(currentDescription)

        // let arrivee = sessionStorage.getItem("arrivee");
        // console.log("oui poids ::: ", typeof arrivee);
        // let currentarrivee = JSON.parse(arrivee);
        // setArriveeFromSession(currentarrivee)

        // let destination = sessionStorage.getItem("dest");
        // console.log("oui poids ::: ", typeof destination);
        // let currentDestination = JSON.parse(destination);
        // setDestFromSession(currentDestination)

        // let email = sessionStorage.getItem("email");
        // console.log("oui email ::: ", typeof email);
        // let currentEmail = JSON.parse(email);
        // setEmailFromSession(currentEmail)

        // let categoriechoix = sessionStorage.getItem("categoriechoix");
        // console.log("oui poids ::: ", typeof poids);
        // let currentCategoriechoix = JSON.parse(categoriechoix);
        // setCategorieChoix(currentCategoriechoix)

        // let addpostal = sessionStorage.getItem("addpostal");
        // console.log("oui addpostal ::: ", typeof addpostal);
        // let currentAddpostal = JSON.parse(addpostal);
        // setVille(currentAddpostal)

        // let ville = sessionStorage.getItem("ville");
        // console.log("oui poids ::: ", typeof poids);
        // let currentVille = JSON.parse(ville);
        // setAddpostal(currentVille)
    }, []);


    return (
        <>
            <section className='bg-white'>
                <nav className='m-6'>
                    <ol class="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
                        <li class="flex md:w-full items-center text-orange-600 dark:text-orange-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-2 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-orange-600">
                            <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                                <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                </svg>
                                Service <span class="hidden sm:inline-flex sm:ms-2">Info</span>
                            </span>
                        </li>
                        <li class="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-2 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                            <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                                <span class="me-2">2</span>
                                Expédition <span class="hidden sm:inline-flex sm:ms-2">Info</span>
                            </span>
                        </li>
                        <li class="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-2 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                            <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                                <span class="me-2">3</span>
                                Adresse <span class="hidden sm:inline-flex sm:ms-2">Info</span>
                            </span>
                        </li>
                        <li class="flex items-center">
                            <span class="me-2">4</span>
                            Paiement
                        </li>
                    </ol>

                </nav>
                {besoin.map((data, indexe) => {
                if (data ==true) {
                    besoin2 = parseInt(besoin2)+ 10
                } 
              })}
                {choixCarton.map((data, indexe) => {
                if (data == "Carton 200L") {
                    prixContenant = parseInt(prixContenant)+ 110
                } else if (data == "Barrique bleu 220L") {
                    prixContenant = parseInt(prixContenant)+ 130
                } else{
                    prixContenant = parseInt(prixContenant)+ 150
                }
                // console.log(tab1,"tab1")
              })}
                {/* <h2>Width: {windowSize[0]}</h2> */}
                <div className="container mx-auto my-20">
             
                    {/* {windowSize[0] <= 1024 ? */}
                        <div className='lg:hidden'>
                            <div className='px-6'>
                                <div className="bg-white p-4 border  shadow-[0_0_12px_rgba(0,0,0,0.2)] rounded-md flex flex-col gap-10 mt-6">
                                    <div className=" flex justify-between">
                                        <div className="bg-cyan-800 text-white flex items-center px-8 rounded-r-full -ml-4">
                                            <strong className='text-xl'>30</strong>
                                            <small className='ml-2'>Jours</small>
                                            <span className='ml-6'>Estimés</span>
                                        </div>
                                        <div className="flex flex-col h-10">
                                            <h3 className='font-bold self-end'>AFRICOLIS</h3>
                                            <img src="./images/transfer.png" alt="" className='size-16 self-end' />
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col gap-8">
                                            <div className="flex flex-col">
                                                <h2 className='uppercase font-bold text-sm'>Depôt</h2>
                                                <small className='text-slate-600'>{dateDep}</small>
                                                <small className='text-slate-600'>Massy-France</small>
                                            </div>
                                            <div className="flex flex-col">
                                                <h2 className='uppercase font-bold text-sm'>Retrait</h2>
                                                <small className='text-slate-600'>{dateExp3}</small>
                                                <small className='text-slate-600'>Retrait a Abidjan-cocody</small>
                                            </div>
                                        </div>
                                    
                                        <div className="self-end mb-4">
                                            <span className='bg-orange-600 text-2xl p-4 text-white rounded-md max-[370px]:text-lg max-[370px]:p-2'>
                                            {parseFloat(prixContenant) +parseInt(besoin2) + ((parseFloat(prixContenant )+parseInt(besoin2) )* 5) / 100}€
                                            </span>
                                        </div>
                                    </div>
                                    <button className='bg-orange-600 text-white rounded-sm py-2 px-6'>
                                        <PopUp PrixChoisi= {parseFloat(prixContenant) +parseInt(besoin2) + ((parseFloat(prixContenant )+parseInt(besoin2) )* 5) / 100}
                                            Partenaire={"AFRICOLIS"}
                                            email={email}
                                            dest={destinationColis}
                                            poste={addpostal}
                                            arriv={priseColis}
                                            radio2={recup}
                                            imageUri={"imageUri"}
                                            ville={ville}
                                            inputGroups={descriptioncolis}
                                            categorie={choixCarton}
                                            rue={adr}
                                            need={besoin}
                                            moyen={"Maritime"}
                                        />
                                    </button>
                                </div>
                                <div className="bg-white p-4 border  shadow-[0_0_12px_rgba(0,0,0,0.2)] rounded-md flex flex-col gap-10 mt-6">
                                    <div className=" flex justify-between">
                                        <div className="bg-cyan-800 text-white flex items-center px-8 rounded-r-full -ml-4">
                                            <strong className='text-xl'>30</strong>
                                            <small className='ml-2'>Jours</small>
                                            <span className='ml-6'>Estimés</span>
                                        </div>
                                        <div className="flex flex-col h-10">
                                            <h3 className='font-bold self-end'>CHALLENGE</h3>
                                            <img src="./images/transfer.png" alt="" className='size-16 self-end' />
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col gap-8">
                                            <div className="flex flex-col">
                                                <h2 className='uppercase font-bold text-sm'>Depôt</h2>
                                                <small className='text-slate-600'>{dateDep}</small>
                                                <small className='text-slate-600'>Massy-France</small>
                                            </div>
                                            <div className="flex flex-col">
                                                <h2 className='uppercase font-bold text-sm'>Retrait</h2>
                                                <small className='text-slate-600'>{dateExp3}</small>
                                                <small className='text-slate-600'>Retrait a Abidjan-cocody</small>
                                            </div>
                                        </div>
                                        <div className="self-end mb-4">
                                            <span className='bg-orange-600 text-2xl p-4 text-white rounded-md max-[370px]:text-lg max-[370px]:p-2'>
                                        {parseFloat(prixContenant) +parseInt(besoin2) + ((parseFloat(prixContenant )+parseInt(besoin2) )* 5) / 100}€
                                            </span>
                                        </div>
                                    </div>
                                    <button className='bg-orange-600 text-white rounded-sm py-2 px-6'>
                                    <PopUp PrixChoisi= {parseFloat(prixContenant) +parseInt(besoin2) + ((parseFloat(prixContenant )+parseInt(besoin2) )* 5) / 100}
                                            Partenaire={"CHALLENGE"}
                                            email={email}
                                            dest={destinationColis}
                                            poste={addpostal}
                                            arriv={priseColis}
                                            radio2={recup}
                                            imageUri={"imageUri"}
                                            ville={ville}
                                            inputGroups={descriptioncolis}
                                            categorie={choixCarton}
                                            rue={adr}
                                            need={besoin}
                                            moyen={"Maritime"}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    {/* :  */}
                        <div className="max-[1024px]:hidden">
                            <div className="flex justify-between items-center border shadow-[0_0_12px_rgba(0,0,0,0.2)] mt-6">
                                <div className="w-[10rem] flex flex-col items-center p-1 gap-2 bg-cyan-800 text-white rounded-tl-md">
                                    <strong className='text-6xl'>30</strong>
                                    <span>Jours</span>
                                    <span>Estimé(s)</span>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <h2 className='font-bold uppercase tracking-widest'>AFRICOLIS</h2>
                                    <div className=" h-10">
                                        <img src="./images/transfer.png" alt="" className='size-16'/> 
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <h2 className='font-bold uppercase'><FontAwesomeIcon icon={faHomeUser} className='mr-2'/>Depôt</h2>
                                    <span>{dateDep}</span>
                                    <small className='text-slate-600'>Massy-France</small>
                                </div>
                                <div className="flex flex-col">
                                    <h2 className='font-bold uppercase'><FontAwesomeIcon icon={faHomeUser} className='mr-2'/>Retrait</h2>
                                    <div>
                                        <Menu className="bg-red-500">
                                            <MenuButton>
                                                <Flex>
                                                    <h2 className="text-slate-800"> Voir Toutes les dates</h2>
                                                    <ChevronDownIcon className="text-slate-800" fontSize={30} />
                                                </Flex>
                                            </MenuButton>
                                            <MenuList className="bg-yellow-400">
                                                {departAfricolis.map((data,index)=>
                                                (
                                                <MenuItem className="bg-yellow-400" key={index}>{data}</MenuItem>
                                                ))}
                                            </MenuList>
                                        </Menu>
                                    </div>
                                    <small className='text-slate-600'>Retrait a Abidjan-cocody</small>
                                </div>
                                <div className="flex flex-col mr-2">
                                    <div className="self-end flex flex-col mb-4">
                                        <span className='text-3xl font-bold'>{parseFloat(prixContenant) +parseInt(besoin2) + ((parseFloat(prixContenant )+parseInt(besoin2) )* 5) / 100}<span className='ml-2'>€</span></span>
                                    </div>
                                    <button className='bg-orange-600 text-white rounded-sm py-2 px-6'>
                                    <PopUp PrixChoisi= {parseFloat(prixContenant) +parseInt(besoin2) + ((parseFloat(prixContenant )+parseInt(besoin2) )* 5) / 100}
                                        Partenaire={"AFRICOLIS"}
                                        email={email}
                                        dest={destinationColis}
                                        poste={addpostal}
                                        arriv={priseColis}
                                        radio2={recup}
                                        imageUri={"imageUri"}
                                        ville={ville}
                                        inputGroups={descriptioncolis}
                                        categorie={choixCarton}
                                        rue={adr}
                                        need={besoin}
                                        moyen={"Maritime"}
                                    />
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center border shadow-[0_0_12px_rgba(0,0,0,0.2)] mt-6">
                                <div className="w-[10rem] flex flex-col items-center p-1 gap-2 bg-cyan-800 text-white rounded-tl-md">
                                    <strong className='text-6xl'>30</strong>
                                    <span>Jours</span>
                                    <span>Estimé(s)</span>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <h2 className='font-bold uppercase tracking-widest'>CHALLENGE</h2>
                                    <div className=" h-10">
                                        <img src="./images/transfer.png" alt="" className='size-16'/> 
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <h2 className='font-bold uppercase'><FontAwesomeIcon icon={faHomeUser} className='mr-2'/>Depôt</h2>
                                    <span>{dateDep}</span>
                                    <small className='text-slate-600'>Massy-France</small>
                                </div>
                                <div className="flex flex-col">
                                    <h2 className='font-bold uppercase'><FontAwesomeIcon icon={faHomeUser} className='mr-2'/>Retrait</h2>
                                    <span>{dateExp3}</span>
                                    <small className='text-slate-600'>Retrait a Abidjan-cocody</small>

                                </div>
                                <div className="flex flex-col mr-2">
                                    <div className="self-end flex flex-col mb-4">
                                        <span className='text-3xl font-bold'>
                                        {parseFloat(prixContenant) +parseInt(besoin2) + ((parseFloat(prixContenant )+parseInt(besoin2) )* 5) / 100}€
                                        </span>
                                    </div>
                                    <button className='bg-orange-600 text-white rounded-sm py-2 px-6'>
                                    <PopUp PrixChoisi= {parseFloat(prixContenant) +parseInt(besoin2) + ((parseFloat(prixContenant )+parseInt(besoin2) )* 5) / 100}
                                        Partenaire={"CHALLENGE"}
                                        email={email}
                                        dest={destinationColis}
                                        poste={addpostal}
                                        arriv={priseColis}
                                        radio2={recup}
                                        imageUri={"imageUri"}
                                        ville={ville}
                                        inputGroups={descriptioncolis}
                                        categorie={choixCarton}
                                        rue={adr}
                                        need={besoin}
                                        moyen={"Maritime"}
                                    />
                                    </button>
                                </div>
                            </div>
                        </div> 
                    {/* } */}
                </div>
            </section>
        </>
    )
}

export default QuoteConfirmation