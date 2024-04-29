import { Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'

function Horaire({ data }) {
    const [etat, setEtat] = useState("");
    useEffect(() => {
       
        const jour = new Date();
        const heure = jour.getHours();
        const minute = jour.getMinutes();
        // console.log("Horaire",Object.values(data.horaire)[parseInt(jour.getDay())], "mag",data.organisation,data.email)
        if (data.horaire != undefined && data.horaire != null) {
            // Object.values(data.horaire)[parseInt(jour.getDay())];
            //  console.log(Object.values(data.horaire)[parseInt(jour.getDay())] ? `horaire defini,${Object.values(data.horaire)[parseInt(jour.getDay())]}` :  `indefini,${Object.values(data.horaire)[parseInt(jour.getDay())]}`)

            // console.log(Object.values(item.horaire)[parseInt(jour.getDay())].slice(0,5))
            if (Object.values(data.horaire)[parseInt(jour.getDay())] === "24h/24") {
                setEtat("Ouvert 24h/24h");
            } else if (
                Object.values(data.horaire)[parseInt(jour.getDay())] === "Fermé"
              ) {
                setEtat("Fermé");
              } else if (Object.values(data.horaire)[parseInt(jour.getDay())]!="undefined" && Object.values(data.horaire)[parseInt(jour.getDay())]!=undefined  && Object.values(data.horaire)[parseInt(jour.getDay())]!="") {
                setEtat(`Ouvert de : ${Object.values(data.horaire)[parseInt(jour.getDay())]}`);
            }
              else {
              
                setEtat( "Non défini");

            }


        }else{
            setEtat("Non défini");
        }
    },[]);
    return (
        etat == "Non défini"  ? (
            <Text fontSize={"15px"} color={"red"}>
              {etat}
            </Text>
          ) : (
            <Text fontSize={"15px"} color={"green"}>
              {etat}
            </Text>
          )
    )
}

export default Horaire