import React, { useEffect, useState } from 'react'
import secureLocalStorage from "react-secure-storage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
// import Link from "next/link";
import { useRouter } from "next/router";
import { Button, useToast } from "@chakra-ui/react";
import { useDisclosure, Link } from "@chakra-ui/react";
import { ref as _rf, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/FIREBASE/clientApp';
// import QuoteConfirmation from "./pages/QuoteConfirmation"

function Aerien() {
    const [selection, setSelection] = useState([{ id: "Textile" }]);
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [destination, setDestination] = useState("France");
    const [arrivee, setArrivee] = useState("Côte D'Ivoire");
    const [radio2, setRadio2] = useState("");
    const [email, setEmail] = useState("");
    const [ville, setVille] = useState("");
    const [poste, setPoste] = useState("");
    const [rue, setRue] = useState("");
    const [reception, setReception] = useState("")
    const [description, setDescription] = useState([""])
    const [categorieChoix, setCategorieChoice] = useState(["Textile"])
    const [poids, setPoids] = useState([0])
    const [longueur, setLongueur] = useState([0])
    const [hauteur, setHauteur] = useState([0])
    const [largueur, setLargueur] = useState([0])
    const [NbDoc, setNbDoc] = useState([0])


    useEffect(() => {
        setSelection(selection);
        setEmail(sessionStorage.getItem("email"));
        setRue(secureLocalStorage.getItem("addresse"));
        setPoste(secureLocalStorage.getItem("po"));
    }, [selection]);

    const [fileInputsVisible, setFileInputsVisible] = useState([false]);
    var tab1 = 0;
    var tab2 = 0;
    var tab3 = 0;
    var checker = 0;
    var PrixPc = 0;

    const [categorie, setCategorie] = useState([
        { contenu: "Textile", prix: 10 },
    ]);
    const [image, setImage] = useState([{ file: " ", nom: "" }]);
    const [imageUri, setImageUri] = useState([{ link: [], collection: "" }]);
    const toast = useToast();


    const [inputGroups, setInputGroups] = useState([
        [
            { id: 1, value: "", title: "Description" },

            { id: 2, value: "", title: "Valeur" },

            { id: 3, value: "", title: "Poids" },
        ],
    ]);

    const Option = [
        { id: "Textile", prix: "12/k" },
        { id: "Document", prix: "prix en fonction du nombre de feuille, 1 feuille = 5e" },
        { id: "Aliment", prix: "12/k" },
        { id: "Ordinateur portable", prix: 50 },
        { id: "Appareil electronique", prix: "12/k" },
        { id: "Bijou", prix: 0 },
        { id: "Cosmétique", prix: 0 },
    ];

    const handleAddGroup = (e) => {
        e.preventDefault()
        const newGroup = Array.from({ length: 3 }, (_, index) => ({
            id: inputGroups.length > 0 ? inputGroups[0].length + 1 + index : 1,

            value: "",
        }));
        categorie.push({
            contenu: "Textile",
            prix: 10,
        });
        image.push({ file: "" });
        imageUri.push({ link: [], collection: "" });
        setFileInputsVisible([...fileInputsVisible, false]);
        setInputGroups([...inputGroups, newGroup]);
        ///prise en compte des champs lier au produit lors de l'appui sur le boutton +
        description.push("");
        categorieChoix.push("Textile");
        poids.push(0);
        longueur.push(0);
        hauteur.push(0);
        largueur.push(0);
        NbDoc.push(0);
    };


    //sauvegarde dans la session storage 
    const handleSaveDataInSessionStorage = (arrivee, destination, email, poste, rue, ville, reception, description, categorieChoix, InfoProd) => {
        image.map((data,index)=>Tester(data, index))
        
        
        sessionStorage.setItem("arrivee", JSON.stringify(arrivee));
        sessionStorage.setItem("dest", JSON.stringify(destination));
        sessionStorage.setItem("NbDoc", JSON.stringify(NbDoc));
        sessionStorage.setItem("addpostal", JSON.stringify(poste));
        sessionStorage.setItem("rue", JSON.stringify(rue));
        sessionStorage.setItem("ville", JSON.stringify(ville));
      
        sessionStorage.setItem("receptioncolis", JSON.stringify(reception));
        sessionStorage.setItem("descriptioncolis", JSON.stringify(description));
        sessionStorage.setItem("categoriechoix", JSON.stringify(categorieChoix));
        sessionStorage.setItem("InputGroups", JSON.stringify(inputGroups));
        sessionStorage.setItem("detailscolis", JSON.stringify(InfoProd));

      
    }

    const handleRemoveGroup = (groupId) => {
        console.log("inputgroupes", inputGroups[groupId]);
        console.log("categorie", categorie[groupId]);


        ///gestion des champs lors de la suppression d'un colis
        const descriptionUpdate = description.filter((_, index) => index !== groupId);
        const categorieChoixUpdate = categorieChoix.filter((_, index) => index !== groupId);
        const poidsUpdate = poids.filter((_, index) => index !== groupId);
        const longueurUpdate = longueur.filter((_, index) => index !== groupId);
        const hauteurUpdate = hauteur.filter((_, index) => index !== groupId);
        const largueurUpdate = largueur.filter((_, index) => index !== groupId);

        ///Mise a jour des differents champs
        setDescription(descriptionUpdate);
        setCategorieChoice(categorieChoixUpdate);
        setPoids(poidsUpdate);
        setLongueur(longueurUpdate);
        setHauteur(hauteurUpdate);
        setLargueur(largueurUpdate);
        ///fin de la gestion





        const updatedInputGroups = inputGroups.filter(
            (_, index) => index !== groupId
        );
        const updatedCat = categorie.filter((_, index) => index !== groupId);
        const updatedimage = image.filter((_, index) => index !== groupId);
        const updatedimageUri = imageUri.filter((_, index) => index !== groupId);
        setCategorie(updatedCat);
        setInputGroups(updatedInputGroups);
        setImage(updatedimage);
        setImageUri(updatedimageUri);

        fileInputsVisible[groupId] = false;
    };

    const handleInputChange = (groupId, id, value) => {
        const updatedInputGroups = inputGroups.map((group, index) => {
            if (index === groupId) {
                const updatedFields = group.map((field) => {
                    if (field.id === id) {
                        return { ...field, value };
                    }
                    return field;
                });
                return updatedFields;
            }
            return group;
        });
        setInputGroups(updatedInputGroups);
    };

    const LaunchAll = () => {
        {
            inputGroups.map((group, groupId) => {
                {
                    checker = checker + parseFloat(group[2].value);
                }
            });
        }
        if (checker > 0) {
            onOpen();
            image.map((data, index) => {
                Tester(data, index);
            });
        } else {
            alert("merci de bien vouloir renseigner le poids de chaque article");
        }
    };

///enregistrer les images
    const handleFileUpload = async (ed, files, emai) => {
        const storageRef = _rf(storage, `Devis/${emai}/${files.name}`);
    
        const snapshot = await uploadBytes(storageRef, files);
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log("downloadURL", downloadURL)
       
          if (ed > imageUri.length) {
         
            const getInd = ed - 1
            imageUri[getInd].collection = `colis${ed}`
            imageUri[getInd].link.push(downloadURL)
            console.log("imageUri", imageUri)
          } else {
            imageUri[ed].collection = `colis${ed}`
            imageUri[ed].link.push(downloadURL)
            console.log("imageUri2", imageUri)
          }
          sessionStorage.setItem("imageUri", JSON.stringify(imageUri));
      };
    

      const Tester = (data, index) => {
        console.log(data)
        const donnee = data.file;
    
    
        for (let i = 0; i < donnee.length; i++) {
          console.log("for de tester", donnee[i])
          // makeDevis(0,0,0,index,donnee[i])
          handleFileUpload(index, donnee[i], email)
        }
    
      }
    
  ////fin d'enregistrement

    return (
        <>
            <div className="container mx-auto flex flex-col lg:flex-row justify-between">
                <div className="left flex-1 w-full lg:w-3/6 shadow-[0_0_12px_rgba(0,0,0,0.2)]">
                    <form className="bg-white p-10">
                        <div className="">
                            <div className="">
                                <div className="flex flex-col self-start lg:flex-row">
                                    <div className="mb-4 lg:mb-0">
                                        <label className="uppercase text-sm" htmlFor="">Email</label>
                                        <input type="text" value={email}
                                            onChange={(e) => { setEmail(e.target.value), console.log(e.target.value) }}
                                            placeholder="Votre adresse email" className="sm:text-sm w-full lg:w-[21rem] border border-slate-800 p-3 rounded-sm" />
                                    </div>
                                    <div className="lg:ml-4">
                                        <label className="uppercase text-sm" htmlFor="">Code Postal</label>
                                        <input type="text" onChange={(e) => {
                                            setPoste(e.target.value), console.log(e.target.value);
                                        }}
                                            value={poste} placeholder="Code postal ou ville" className="sm:text-sm w-full lg:w-[21rem] border border-slate-800 p-3 rounded-sm" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10">
                                <div className="flex flex-col self-start lg:flex-row justify-between">
                                    <div className="mb-4 lg:mb-0">
                                        <label className="uppercase text-sm" htmlFor="">Adresse</label>
                                        <input type="text" onChange={(e) => {
                                            setRue(e.target.value), console.log(e.target.value);
                                        }}
                                            value={rue} placeholder="Votre adresse" className="sm:text-sm w-full lg:w-[21rem] border border-slate-800 p-3 rounded-sm" />
                                    </div>
                                    <div className="">
                                        <label className="uppercase text-sm" htmlFor="">Ville</label>
                                        <input type="text" onChange={(e) => {
                                            setVille(e.target.value), console.log(e.target.value);
                                        }} placeholder="Ville ou code postal" className="sm:text-sm w-full lg:w-[21rem] border border-slate-800 p-3 rounded-sm" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10">
                                <span className="text-sm">DE</span>
                                <div className="flex justify-between">
                                    <select onChange={(e) => { setDestination(e.target.value), console.log(e.target.value) }} placeholder="Pays" className="w-full p-3 focus:outline-none bg-zinc-100">
                                        <option value={"France"}>France</option>
                                        <option value={"Côte d'Ivoire"}>Côte d{"'"}Ivoire</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-10">
                                <span className="text-sm">À</span>
                                <div className="flex justify-between">
                                    <select onChange={(e) => { setArrivee(e.target.value), console.log(e.target.value) }} placeholder="Pays" className="w-full p-3 focus:outline-none bg-zinc-100">
                                        <option value={"Côte D'Ivoire"}>Côte d{"'"}Ivoire</option>
                                        <option value={"France"}>France</option>
                                    </select>
                                </div>
                            </div>
                            <div onChange={setRadio2}
                                value={radio2} className="mt-10">
                                <h2 className="text-2xl text-center font-bold">Reception du colis par la structure</h2>
                                <div className="mt-6 mb-6">
                                    <ul className="flex flex-col lg:flex-row justify-between items-center w-full text-sm font-medium text-gray-900 bg-white border 
                                        rounded-sm sm:flex dark:text-white gap-4 lg:gap-0">
                                        <li className="w-full border border-gray-600">
                                            <div className="flex items-center ps-3">
                                                <input id="horizontal-list-radio-license" type="radio" value="En agence" name="list-radio" onClick={(e) => setReception(e.target.value)}
                                                    className="w-4 h-4 text-cyan-800 bg-gray-100 border-gray-300 focus:ring-cyan-800 dark:focus:ring-cyantext-cyan-800 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label for="horizontal-list-radio-license" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-800">Dépôt en agence</label>
                                            </div>
                                        </li>
                                        <li className="w-full border border-gray-600">
                                            <div className="flex items-center ps-3">
                                                <input id="horizontal-list-radio-id" type="radio" value="Retrait à domicile" name="list-radio" onClick={(e) => setReception(e.target.value)}
                                                    className="w-4 h-4 text-cyan-800 bg-gray-100 border-gray-300 focus:ring-cyan-800 dark:focus:ring-cyantext-cyan-800 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label for="horizontal-list-radio-id" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-800">Retrait à domicile</label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <span className="text-sm">COLIS</span>
                                {inputGroups.map((group, groupId) => (
                                    <div key={groupId} className="mb-6">
                                        <div className="flex justify-between">
                                            <textarea placeholder="Description ici..." cols="30" rows="3" onChange={e => description[groupId] = e.target.value}
                                                className="w-full border border-slate-800 resize-none focus:outline-none">
                                            </textarea>
                                            <select onChange={(e) => { categorieChoix[groupId] = e.target.value, console.log(e.target.value) }}
                                                className="w-full border border-slate-800 focus:outline-none lg:border-none">
                                                {/* <option  value={"Epicerie"}>Epicerie</option> */}
                                                {Option.map((data, index) => (
                                                    <option key={index} className='w-full' value={`${data.id}`}>{data.id}</option>
                                                ))}

                                                {/* <option  value={"Cosmétic"}>Cosmétic</option> */}
                                            </select>
                                        </div>
                                        {/* {
                                            categorieChoix && categorieChoix[groupId] === "Document" ?

                                            <div className="fl ex flex-col lg:flex-row justify-between items-center">
                                                <div className="flex flex-col justify-between lg:flex-row mt-6 w-full gap-4 lg:gap-0">
                                                    <input onChange={(e) => console.log(e.target.value)} type="number" placeholder="Veuillez saisir le nombre de page ici svp." className="w-full p-2 border placeholder:text-slate-400 block bg-white border-slate-800 rounded-sm py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-cyan-800 focus:ring-cyan-800 focus:ring-1 sm:text-sm" />
                                                </div>
                                                <button className="rounded-md text-cyan-800 mt-8">
                                                    <div className="">
                                                        {groupId === 0 ? (
                                                            <FontAwesomeIcon onClick={handleAddGroup} className="size-8 ml-2" icon={faPlusCircle} />
                                                        ) : (
                                                            <FontAwesomeIcon onClick={() => handleRemoveGroup(groupId)} className="size-8 ml-2" icon={faMinusCircle} />
                                                        )}
                                                    </div>
                                                </button>
                                            </div>
                                            :
                                            <div className="flex flex-col lg:flex-row justify-between items-center">
                                                <div className="flex flex-col justify-between lg:flex-row mt-6 w-full gap-4 lg:gap-0">
                                                    <input onChange={(e) => poids[groupId] = e.target.value} type="text" placeholder="Poids(kg)" className="w-full p-2 border placeholder:text-slate-400 block bg-white border-slate-800 rounded-sm py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-cyan-800 focus:ring-cyan-800 focus:ring-1 sm:text-sm" />
                                                    <input onChange={(e) => longueur[groupId] = e.target.value} type="text" placeholder="Longueur(cm)" className="w-full p-2 border placeholder:text-slate-400 block bg-white border-slate-800 rounded-sm py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-cyan-800 focus:ring-cyan-800 focus:ring-1 sm:text-sm" />
                                                    <input onChange={(e) => hauteur[groupId] = e.target.value} type="text" placeholder="Hauteur(cm)" className="w-full p-2 border placeholder:text-slate-400 block bg-white border-slate-800 rounded-sm py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-cyan-800 focus:ring-cyan-800 focus:ring-1 sm:text-sm" />
                                                    <input onChange={(e) => largueur[groupId] = e.target.value} type="text" placeholder="Largueur(cm)" className="w-full p-2 border placeholder:text-slate-400 block bg-white border-slate-800 rounded-sm py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-cyan-800 focus:ring-cyan-800 focus:ring-1 sm:text-sm" />
                                                </div>
                                                <button className="rounded-md text-cyan-800 mt-8">
                                                    <div className="">
                                                        {groupId === 0 ? (
                                                            <FontAwesomeIcon onClick={handleAddGroup} className="size-8 ml-2" icon={faPlusCircle} />
                                                        ) : (
                                                            <FontAwesomeIcon onClick={() => handleRemoveGroup(groupId)} className="size-8 ml-2" icon={faMinusCircle} />
                                                        )}
                                                    </div>
                                                </button>
                                            </div>
                                        } */}


                                        {categorieChoix && categorieChoix[groupId] === "Document" ?
                                            <div className="flex flex-col lg:flex-row justify-between items-center">
                                                <div className="flex flex-col justify-between lg:flex-row mt-6 w-full gap-4 lg:gap-0">
                                                    <input onChange={(e) => { NbDoc[groupId] = e.target.value, console.log(e.target.value) }} type="number" placeholder="Veuillez saisir le nombre de page ici svp." className="w-full p-2 border placeholder:text-slate-400 block bg-white border-slate-800 rounded-sm py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-cyan-800 focus:ring-cyan-800 focus:ring-1 sm:text-sm" />
                                                </div>
                                                <button className="rounded-md text-cyan-800 mt-8">
                                                    <div className="">
                                                        {groupId === 0 ? (
                                                            <FontAwesomeIcon onClick={handleAddGroup} className="size-8 ml-2" icon={faPlusCircle} />
                                                        ) : (
                                                            <FontAwesomeIcon onClick={() => handleRemoveGroup(groupId)} className="size-8 ml-2" icon={faMinusCircle} />
                                                        )}
                                                    </div>
                                                </button>
                                            </div>

                                            :
                                            <div className="flex flex-col lg:flex-row justify-between items-center">
                                                <div className="flex flex-col justify-between lg:flex-row mt-6 w-full gap-4 lg:gap-0">
                                                    <input onChange={(e) => poids[groupId] = e.target.value} type="text" placeholder="Poids(kg)" className="w-full p-2 border placeholder:text-slate-400 block bg-white border-slate-800 rounded-sm py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-cyan-800 focus:ring-cyan-800 focus:ring-1 sm:text-sm" />
                                                    <input onChange={(e) => longueur[groupId] = e.target.value} type="text" placeholder="Longueur(cm)" className="w-full p-2 border placeholder:text-slate-400 block bg-white border-slate-800 rounded-sm py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-cyan-800 focus:ring-cyan-800 focus:ring-1 sm:text-sm" />
                                                    <input onChange={(e) => hauteur[groupId] = e.target.value} type="text" placeholder="Hauteur(cm)" className="w-full p-2 border placeholder:text-slate-400 block bg-white border-slate-800 rounded-sm py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-cyan-800 focus:ring-cyan-800 focus:ring-1 sm:text-sm" />
                                                    <input onChange={(e) => largueur[groupId] = e.target.value} type="text" placeholder="Largueur(cm)" className="w-full p-2 border placeholder:text-slate-400 block bg-white border-slate-800 rounded-sm py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-cyan-800 focus:ring-cyan-800 focus:ring-1 sm:text-sm" />
                                                </div>
                                                <button className="rounded-md text-cyan-800 mt-8">
                                                    <div className="">
                                                        {groupId === 0 ? (
                                                            <FontAwesomeIcon onClick={handleAddGroup} className="size-8 ml-2" icon={faPlusCircle} />
                                                        ) : (
                                                            <FontAwesomeIcon onClick={() => handleRemoveGroup(groupId)} className="size-8 ml-2" icon={faMinusCircle} />
                                                        )}
                                                    </div>
                                                </button>
                                            </div>

                                                && categorieChoix && (categorieChoix[groupId] === "Ordinateur portable" || categorieChoix[groupId] === "Cosmétique" || categorieChoix[groupId] === "Bijou") ?

                                                <div className="flex flex-col lg:flex-row justify-between items-center">
                                                    <div className="flex flex-col justify-between lg:flex-row mt-6 w-full gap-4 lg:gap-0">
                                                        <input onChange={(e) => {
                                                            image[groupId].file = e.target.files;
                                                            image[groupId].nom = `colis${groupId}`;
                                                        }} multiple type="file" placeholder="Insérer un fichier" className="w-full p-2 border placeholder:text-slate-400 block bg-white border-slate-800 rounded-sm py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-cyan-800 focus:ring-cyan-800 focus:ring-1 sm:text-sm" />
                                                    </div>
                                                    <button className="rounded-md text-cyan-800 mt-8">
                                                        <div className="">
                                                            {groupId === 0 ? (
                                                                <FontAwesomeIcon onClick={handleAddGroup} className="size-8 ml-2" icon={faPlusCircle} />
                                                            ) : (
                                                                <FontAwesomeIcon onClick={() => handleRemoveGroup(groupId)} className="size-8 ml-2" icon={faMinusCircle} />
                                                            )}
                                                        </div>
                                                    </button>
                                                </div>
                                                :
                                                <div className="flex flex-col lg:flex-row justify-between items-center">
                                                    <div className="flex flex-col justify-between lg:flex-row mt-6 w-full gap-4 lg:gap-0">
                                                        <input onChange={(e) => poids[groupId] = e.target.value} type="text" placeholder="Poids(kg)" className="w-full p-2 border placeholder:text-slate-400 block bg-white border-slate-800 rounded-sm py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-cyan-800 focus:ring-cyan-800 focus:ring-1 sm:text-sm" />
                                                        <input onChange={(e) => longueur[groupId] = e.target.value} type="text" placeholder="Longueur(cm)" className="w-full p-2 border placeholder:text-slate-400 block bg-white border-slate-800 rounded-sm py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-cyan-800 focus:ring-cyan-800 focus:ring-1 sm:text-sm" />
                                                        <input onChange={(e) => hauteur[groupId] = e.target.value} type="text" placeholder="Hauteur(cm)" className="w-full p-2 border placeholder:text-slate-400 block bg-white border-slate-800 rounded-sm py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-cyan-800 focus:ring-cyan-800 focus:ring-1 sm:text-sm" />
                                                        <input onChange={(e) => largueur[groupId] = e.target.value} type="text" placeholder="Largueur(cm)" className="w-full p-2 border placeholder:text-slate-400 block bg-white border-slate-800 rounded-sm py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-cyan-800 focus:ring-cyan-800 focus:ring-1 sm:text-sm" />
                                                    </div>
                                                    <button className="rounded-md text-cyan-800 mt-8">
                                                        <div className="">
                                                            {groupId === 0 ? (
                                                                <FontAwesomeIcon onClick={handleAddGroup} className="size-8 ml-2" icon={faPlusCircle} />
                                                            ) : (
                                                                <FontAwesomeIcon onClick={() => handleRemoveGroup(groupId)} className="size-8 ml-2" icon={faMinusCircle} />
                                                            )}
                                                        </div>
                                                    </button>
                                                </div>

                                            // && categorieChoix &&  ?

                                            //     <div className="flex flex-col lg:flex-row justify-between items-center">
                                            //         <div className="flex flex-col justify-between lg:flex-row mt-6 w-full gap-4 lg:gap-0">
                                            //             <input onChange={(e) => { categorieChoix[groupId] = e.target.value, console.log(e.target.value) }} type="file" placeholder="Insérer un fichier" className="w-full p-2 border placeholder:text-slate-400 block bg-white border-slate-800 rounded-sm py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-cyan-800 focus:ring-cyan-800 focus:ring-1 sm:text-sm" />
                                            //         </div>
                                            //         <button className="rounded-md text-cyan-800 mt-8">
                                            //             <div className="">
                                            //                 {groupId === 0 ? (
                                            //                     <FontAwesomeIcon onClick={handleAddGroup} className="size-8 ml-2" icon={faPlusCircle} />
                                            //                 ) : (
                                            //                     <FontAwesomeIcon onClick={() => handleRemoveGroup(groupId)} className="size-8 ml-2" icon={faMinusCircle} />
                                            //                 )}
                                            //             </div>
                                            //         </button>
                                            //     </div>
                                            //     :
                                            //     <div className="flex flex-col lg:flex-row justify-between items-center">
                                            //         <div className="flex flex-col justify-between lg:flex-row mt-6 w-full gap-4 lg:gap-0">
                                            //             <input onChange={(e) => poids[groupId] = e.target.value} type="text" placeholder="Poids(kg)" className="w-full p-2 border placeholder:text-slate-400 block bg-white border-slate-800 rounded-sm py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-cyan-800 focus:ring-cyan-800 focus:ring-1 sm:text-sm" />
                                            //             <input onChange={(e) => longueur[groupId] = e.target.value} type="text" placeholder="Longueur(cm)" className="w-full p-2 border placeholder:text-slate-400 block bg-white border-slate-800 rounded-sm py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-cyan-800 focus:ring-cyan-800 focus:ring-1 sm:text-sm" />
                                            //             <input onChange={(e) => hauteur[groupId] = e.target.value} type="text" placeholder="Hauteur(cm)" className="w-full p-2 border placeholder:text-slate-400 block bg-white border-slate-800 rounded-sm py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-cyan-800 focus:ring-cyan-800 focus:ring-1 sm:text-sm" />
                                            //             <input onChange={(e) => largueur[groupId] = e.target.value} type="text" placeholder="Largueur(cm)" className="w-full p-2 border placeholder:text-slate-400 block bg-white border-slate-800 rounded-sm py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-cyan-800 focus:ring-cyan-800 focus:ring-1 sm:text-sm" />
                                            //         </div>
                                            //         <button className="rounded-md text-cyan-800 mt-8">
                                            //             <div className="">
                                            //                 {groupId === 0 ? (
                                            //                     <FontAwesomeIcon onClick={handleAddGroup} className="size-8 ml-2" icon={faPlusCircle} />
                                            //                 ) : (
                                            //                     <FontAwesomeIcon onClick={() => handleRemoveGroup(groupId)} className="size-8 ml-2" icon={faMinusCircle} />
                                            //                 )}
                                            //             </div>
                                            //         </button>
                                            //     </div>

                                            // && categorieChoix &&  ? 

                                            //     <div className="flex flex-col lg:flex-row justify-between items-center">
                                            //         <div className="flex flex-col justify-between lg:flex-row mt-6 w-full gap-4 lg:gap-0">
                                            //             <input onChange={(e) => {categorieChoix[groupId] = e.target.value, console.log(e.target.value)}} type="file" placeholder="Insérer un fichier" className="w-full p-2 border placeholder:text-slate-400 block bg-white border-slate-800 rounded-sm py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-cyan-800 focus:ring-cyan-800 focus:ring-1 sm:text-sm" />
                                            //         </div>
                                            //         <button className="rounded-md text-cyan-800 mt-8">
                                            //             <div className="">
                                            //                 {groupId === 0 ? (
                                            //                     <FontAwesomeIcon onClick={handleAddGroup} className="size-8 ml-2" icon={faPlusCircle} />
                                            //                 ) : (
                                            //                     <FontAwesomeIcon onClick={() => handleRemoveGroup(groupId)} className="size-8 ml-2" icon={faMinusCircle} />
                                            //                 )}
                                            //             </div>
                                            //         </button>
                                            //     </div>
                                            // :
                                            //     <div className="flex flex-col lg:flex-row justify-between items-center">
                                            //         <div className="flex flex-col justify-between lg:flex-row mt-6 w-full gap-4 lg:gap-0">
                                            //             <input onChange={(e) => poids[groupId] = e.target.value} type="text" placeholder="Poids(kg)" className="w-full p-2 border placeholder:text-slate-400 block bg-white border-slate-800 rounded-sm py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-cyan-800 focus:ring-cyan-800 focus:ring-1 sm:text-sm" />
                                            //             <input onChange={(e) => longueur[groupId] = e.target.value} type="text" placeholder="Longueur(cm)" className="w-full p-2 border placeholder:text-slate-400 block bg-white border-slate-800 rounded-sm py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-cyan-800 focus:ring-cyan-800 focus:ring-1 sm:text-sm" />
                                            //             <input onChange={(e) => hauteur[groupId] = e.target.value} type="text" placeholder="Hauteur(cm)" className="w-full p-2 border placeholder:text-slate-400 block bg-white border-slate-800 rounded-sm py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-cyan-800 focus:ring-cyan-800 focus:ring-1 sm:text-sm" />
                                            //             <input onChange={(e) => largueur[groupId] = e.target.value} type="text" placeholder="Largueur(cm)" className="w-full p-2 border placeholder:text-slate-400 block bg-white border-slate-800 rounded-sm py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-cyan-800 focus:ring-cyan-800 focus:ring-1 sm:text-sm" />
                                            //         </div>
                                            //         <button className="rounded-md text-cyan-800 mt-8">
                                            //             <div className="">
                                            //                 {groupId === 0 ? (
                                            //                     <FontAwesomeIcon onClick={handleAddGroup} className="size-8 ml-2" icon={faPlusCircle} />
                                            //                 ) : (
                                            //                     <FontAwesomeIcon onClick={() => handleRemoveGroup(groupId)} className="size-8 ml-2" icon={faMinusCircle} />
                                            //                 )}
                                            //             </div>
                                            //         </button>
                                            //     </div>

                                        }

                                    </div>

                                ))
                                }
                            </div>
                        </div>
                        {/* <QuoteConfirmation/> */}
                        <Link  href={"/QuoteConfirmationAerien"} >
                            <Button
                                bgColor={"cyan.800"}
                                w={"full"}
                                fontWeight={"bold"}
                                color={"white"}
                                p={2}
                                borderRadius={"md"}
                                mt={20}
                                _hover={{
                                    bgColor: "cyan.700",
                                    color: "white",
                                }}
                                onClick={() => { handleSaveDataInSessionStorage(arrivee, destination, email, poste, rue, ville, reception, description, categorieChoix, [poids, longueur, hauteur, largueur]), console.log(arrivee, destination, email, poste, rue, ville) }}
                                // isDisabled={email.length < 10 || dest.length < 4 || radio2.length < 3}
                                // onClick={() => {
                                // LaunchAll();
                                // }} 
                                >Envoyez dès maintenant</Button>
                        </Link>
                    </form>
                </div>
                <div className="right bg-green-100 flex-1 w-full lg:w-3/6">
                    <div className="flex flex-col p-10">
                        <h2 className="text-2xl lg:text-6xl font-bold">Comparer différents transporteur et faites des économies avec CHAP.</h2>
                        <p className="text-sm lg:text-lg mt-10">
                            Envoyez vos colis vers vers l{"'"}Afrique de l{"'"}ouest par nos partenaires. Remplissez le formulaire et
                            attendez notre retour mail si vous ne possédez pas un CHAP, sinon vérifiez l{"'"}onglet devis de votre compte.
                            Un fois reçu les différentes propositions de nos partenaires, vous pourrez choisir, payer et préparer le colis
                            pour le transporteur.
                        </p>
                        <div className="lg:-mt-20">
                            <img className="w-[36rem]" src="./images/livraison.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Aerien