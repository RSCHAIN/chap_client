import { Text,SimpleGrid,Box,Image,Link, Center } from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/FIREBASE/clientApp";
import Restaurant from "./Restaurant";
import Epicerie from "./Epicerie";
import Cosmetique from "./Cosmetique";
import Coiffure from "./Coiffure";
import Meches from "./Meches";
import Textile from "./Textile";
import Fret from "./Fret";
import InputBar from "../InputBar";
import Navbar from "../Navbar";


export default function All (){
    const [postal,setPostal] = useState()
    const [modalData, setModalData] = useState([]);


    const recherche = async (terms) => {
        // console.log("Hello all i need help")
        // console.log(terms)
        // console.log(categorie)
        const q = query(
          collection(db, "Admin"),
          where("codePostal", "==", String(terms).trim())
        );
    
        const querySnapshot = await getDocs(q);
        // if (querySnapshot.docs) {
        //     querySnapshot.docs.forEach((doc)=>{
        //         console.log(doc.data())
        //     })
        // }
        setModalData(querySnapshot.docs);
        // console.log(querySnapshot.docs)
        // querySnapshot.forEach((doc) => {
    
        // // doc.data() is never undefined for query doc snapshots
        // modalData.push(doc.data())
        // });
      };
    useEffect(()=>{
        setPostal(localStorage.getItem("postal"))
        recherche(localStorage.getItem("postal"))
    },[postal])
    return(
        <>
        {/* <InputBar />
        <Navbar /> */}
        
        <Center mt={10}>
        <Box width={"80%"}>
        <Restaurant data={modalData} />
        <Epicerie data={modalData} />
        <Cosmetique data={modalData} />
        <Coiffure data={modalData} />
        <Meches data={modalData} />
        <Textile data={modalData} />
        <Fret data={modalData} />
        </Box>
        </Center>
        {/* {modalData.length == 0 ? (
                        <> Aucun commerce de disponible pres de chez vous </>
                      ) : (
                        <>
                          <SimpleGrid columns={3}>
                            {modalData.map((doc, index) => (
                              <>
                                <Box
                                key={index}
                                m={2}
                                mt={5}
                                as={Link}
                                onClick={() => {
                                  sessionStorage.setItem(
                                    "savefrom",
                                    doc.data().number
                                  ),
                                    sessionStorage.setItem(
                                      "image",
                                      doc.data().imageUrl
                                    ),
                                    sessionStorage.setItem(
                                      "nom",
                                      doc.data().organisation
                                    ),
                                    sessionStorage.setItem(
                                      "adresse",
                                      doc.data().adresse
                                    ),
                                    sessionStorage.setItem(
                                      "categorie",
                                      doc.data().categorie
                                    );
                                  sessionStorage.setItem(
                                    "description",
                                    doc.data().description
                                  );
                                  sessionStorage.setItem(
                                    "horaire",
                                    JSON.stringify(doc.data().horaire)
                                  );
                                  sessionStorage.setItem(
                                    "paiement",
                                    JSON.stringify(doc.data().methodeDePaiement)
                                  );
                                }}
                                _hover={{ textDecoration: "none" }}
                                href={"/otherContent/intermed1"}
                              >
                                <Image
                                  alt={doc.data().organisation}
                                  src={doc.data().imageUrl}
                                  maxWidth={"150px"}
                                  maxHeight={"100px"}
                                  minHeight={"100px"}
                                  minWidth={"150px"}
                                />
                                <Text fontWeight={"bold"} fontSize={"20px"}>
                                  {doc.data().organisation}
                                </Text>
                                <Text fontWeight={"medium"}>
                                  {doc.data().adresse}
                                </Text>
                              </Box>
                              <Restaurant data={modalData}/>
                              </>
                            
                              
                            ))}
                          </SimpleGrid>
                        </>
                      )} */}
        </>
    )
}