import { Text,SimpleGrid,Box,Image,Link, Center, Flex } from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"
import { collection, query, where, getDocs, limit } from "firebase/firestore";
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
import secureLocalStorage from "react-secure-storage";
import Carousel from "react-multi-carousel";
import { useRouter } from "next/router";
import Favlist2 from "../generale/FavLists2";
import Favlist from "../generale/FavLists";


const responsive = {
  superLargeDesktop: {
    breakpoint: { max:4000, min: 3000 },
    items: 12
  }, 
  MDesktop: {
    breakpoint: { max: 3000, min: 2500 },
    items: 11
  }, 
  LargeDesktop: {
    breakpoint: { max: 2500, min: 2050 },
    items: 10
  }, 
  desktopM: {
    breakpoint: { max: 2050, min: 1750 },
    items: 8
  },
  desktopL: {
    breakpoint: { max: 1750, min: 1550 },
    items: 7
  },
  desktop: {
    breakpoint: { max: 1050, min: 850 },
    items: 5
  },
  tabletl: {
    breakpoint: { max: 850, min: 650 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 650, min: 450 },
    items: 3
  }, 
  mobile: {
    breakpoint: { max: 450, min: 0 },
    items: 2
  }
}; 




export function ItemCard({ item}) {
  const [imageUrl, setImageUrl] = useState();
  const [adresse, setAdresse] = useState();
  const [numero, setNumero] = useState();
  const [url, se] = useState();
  const [etat, setEtat] = useState("Voir details");
  const router = useRouter();

  useEffect(() => {
    const jour = new Date();
    const heure = jour.getHours();
    const minute = jour.getMinutes();
    try {
      if (item.horaire != undefined && item.horaire != null) {
        Object.values(item.horaire)[parseInt(jour.getDay())];
        //  console.log( Object.values(item.horaire)[parseInt(jour.getDay())].length)
  
        // console.log(Object.values(item.horaire)[parseInt(jour.getDay())].slice(0,5))
        if (Object.values(item.horaire)[parseInt(jour.getDay())] === "24h/24") {
          setEtat("Ouvert 24h/24h");
        } else if (
          Object.values(item.horaire)[parseInt(jour.getDay())].length == 0
        ) {
          setEtat("Non défini");
        } else if (
          Object.values(item.horaire)[parseInt(jour.getDay())] === "Fermé"
        ) {
          setEtat("Fermé");
        } else {
          //  console.log(((Object.values(item.horaire)[parseInt(jour.getDay())])).slice(6,8));
          //  console.log(((Object.values(item.horaire)[parseInt(jour.getDay())])).slice(0,2));
          //  console.log(item.horaire);
          // console.log(parseInt(((Object.values(item.horaire)[parseInt(jour.getDay())])).slice(6,8))+24>parseInt(heure))
          if (
            Object.values(item.horaire)[parseInt(jour.getDay())].slice(0, 2) <=
            `${heure}`
          ) {
            if (
              parseInt(
                Object.values(item.horaire)[parseInt(jour.getDay())].slice(6, 8)
              ) +
                24 >
              parseInt(heure)
            ) {
              setEtat("Ouvert");
            } else {
              setEtat("Fermé");
            }
          } else {
            setEtat("Fermé");
          }
        }
  
        secureLocalStorage.setItem("jour", parseInt(jour.getDay()));
      }
    } catch (error) {
      
    }
    
  }, [item.horaire, etat]);

  const [categorie, setCategorie] = useState();

  return (
    <>
      {/* card  */}
      <Box
        mt={2}
        height={["15vh", "15vh", "15vh", "20vh", "20vh"]}
        width={"200px"}
        marginBottom={[40, 40, 40, 10, 10]}
        mr={5}
        borderRadius={25}
      >
        <Link
          height={"10vh"}
          width={"200px"}
          mt={5}
          mr={{ base: "0%", md: "0%" }}
          _hover={{ textDecoration: "none" }}
          href={`/otherContent/intermed1?categorie=${item.categorie}&magasin=${item.organisation}`}
        >
          <Box
            height={"100%"}
            width={"200px"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={25}
           >

           
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              borderRadius={25}
              height={"100px"}
              width={"100%"}
              bg={"rgba(0, 0, 0, 0.277)"}
            >
               <Image src={item.imageUrl} alt={"image du magasin"} width={"100%"} height={"100%"} borderRadius={25}/>
              
            </Flex>
            
            <Box mt={"-50px"}>
                <Text
                  fontSize={"lg"}
                  color={"#fff"}
                  textAlign={"center"}
                  fontWeight={"bold"}
                >
                  {item.organisation}
                </Text>
              </Box>
          </Box>
         
        </Link>
        <Box
        mt={-5}
          bgColor={"white"}
          width={"100%"}
          borderBottom={"1px solid black"}
          textAlign={"center"}
        >
          {etat == "Ouvert" || etat == "Ouvert 24h/24h" ? (
            <Text fontSize={"12px"} color={"green"}>
              {etat}
            </Text>
          ) : (
            <Text fontSize={"12px"} color={"red"}>
              {etat}
            </Text>
          )}
        </Box>
        <Box>
          <Text fontSize={"13px"} pb={2} align={"center"}>
            {item.adresse}
          </Text>
        </Box>
      </Box>
    </>
  );
}




export default function AllWeb ({postal}){
   
    const [modalData, setModalData] = useState([]);
    const [checker,setChecker] = useState(0)
    const [loader,setLoader] = useState("flex")
    const [result,setResult] = useState("none")
    
    const recherche = async () => {
      if (postal.length > 4) {
  
        const q = query(
          collection(db, "Admin"),
          where("codePostal", "==", String(postal).trim()),
          limit(20)
        );
    
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
         
      modalData.push(doc.data())
    })
    setLoader("none")
setResult("flex")
      } else {
      
        const q = query(collection(db, "favorisMagasinAppMobile"));
  
      const querySnapshot = await getDocs(q);
    
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
    // console.log(doc.data())
    // console.log(doc.data())
    modalData.push(doc.data())
  })
  setLoader("none")
setResult("flex")
      }
      
       
      };
    useEffect(()=>{
      recherche()
      setChecker(1)
    },[checker])
    return(
        <>
       
       {/* {console.log(modalData)} */}
        <Box display={result} overflowX={"auto"}  my={2}>
         
       {modalData.length>=1 ?
        modalData.slice(0,modalData.length/2).map((mag,index) => (
          <ItemCard item={mag} key={index}/>
)

):
<Center w={"full"} ><Text textAlign={"center"} fontWeight={600}>Aucun commerce près de chez vous</Text></Center>}
    

        


        </Box>
        <Flex justifyContent={"center"} display={loader} width={"full"}><img src={"./loading.gif"} width={"100px"} alt="loading.gif" /> </Flex>
       
      
        </>
    )
}





