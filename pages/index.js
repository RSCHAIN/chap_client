import FooterR from "@/components/footerResponsif";
import BarBleu from "@/components/generale/BarBleu";
import LadingCorps from "@/components/generale/LadingCorps";
import SliderComponents from "@/components/generale/SliderComponents";
import InputBar from "@/components/InputBar";
import Navbar from "@/components/Navbar";
import Location from "@/components/location";
import {
  Box,
  Button,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useMediaQuery,
  Link,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiCurrentLocation } from "react-icons/bi";
import { BsGeoAlt } from "react-icons/bs";
import { onValue, ref } from "@firebase/database";
import { db2 } from "@/FIREBASE/clientApp";
import Cookies from "cookies";
import { useRouter } from "next/router";
import { MdLocationOn } from "react-icons/md";
import {RiSendPlaneLine} from "react-icons/ri"

export default function Home() {
  const [locate, setLocate] = useState("");
const [code,setCode] = useState([]);
    const [final,setFinal] = useState([""]);
  const router = useRouter()
  const [getter,setGetter] = useState([])
  const [isLagerThan768] = useMediaQuery("(min-width: 768px)");
  const [cat, setCat] = useState([]);
  const [check, setCheck] = useState(0);
  const [data, setData] = useState([]);


  async function  coordonnees (pos)  {
    let crd = pos.coords;
  
    let latitude = crd.latitude;
    let longitude = crd.longitude;
    await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAoJQLE8uAbWnyPHCv-_udEUhH7HQooJlM`).then((response)=>{
      
    if(response.data.results[0].address_components.length >4){
      
      localStorage.setItem("location",response.data.results[0].address_components[2].long_name);
      localStorage.setItem("postal",response.data.results[0].address_components[6].long_name);
      router.reload();
    }else{
      
      localStorage.setItem("location",response.data.results[0].address_components[2].long_name);
      localStorage.setItem("postal",response.data.results[0].address_components[1].long_name);
      router.reload();
    }
   
    }).catch((error)=>console.error(error))
  
    
  }
  
  const handleLocate = () => {
    navigator.geolocation.watchPosition(coordonnees)
  }
  








  useEffect(()=>{
    setFinal((localStorage.getItem("location"))?? "")
  setLocate(localStorage.getItem("postal") ?? "0")
    const updateAll = () => {
  
      cat.map((index, key) => {
        const starCountRef2 = ref(db2, index.id + "/");
        onValue(starCountRef2, (snapshot) => {
          const donnees = snapshot.val();
          // console.log(snapshot.val())
          if (donnees != null) {
            const categorie = Object.keys(donnees).map((key) => ({
              id: key,
              ...donnees[key],
            }))
            
            
            // localStorage.setItem(index.id + "Datos", JSON.stringify(categorie));
            // setGetter(JSON.parse(localStorage.getItem(index.id + "Datos")))
          }
        })
      })
      
    }
  
    if (check == 0 || check == 1) {
      const GetAll = async () => {
        await axios.get("/api/GetJson").then((response) => {
          // console.log(response.data);
          // console.log("object values", Object.values(response.data))
          setData(JSON.parse(Object.values(response.data)));
        });
      };
      GetAll();
      setLocate(localStorage.getItem("postal") ?? "0");
     
      // console.log("check",check)
      setCheck(check + 1);
    }





    localStorage.setItem("index",0)
   
    update()
    updateAll()
  },[final,router,check,cat])



  const Search = (id) => {
    if (data.filter((order) => order.num_dep === id).length != 0) {
      const Final = data.filter((order) => order.num_dep === id);
      localStorage.setItem("location", Object.values(Final[0])[1]);
    } 
  };


  const update = () =>{
    const starCountRef = ref(db2, "/");
    onValue(starCountRef, (snapshot) => {
      const donnes = snapshot.val();
      if (donnes != null) {
        const categorie = Object.keys(donnes).map((key) => ({
          id: key,
          ...donnes[key],
        }))
        setCat(categorie)
       
        
      }
        
    })
  }
 





  return (
    <>
      {/* <BarBleu /> */}
      <InputBar />
      {isLagerThan768 ? <Navbar></Navbar> : <></>}
      <Box width={"100%"} height={"3em"}  mb={4} display={["grid","grid","grid","none","none"]}>
        <Center>  <Text fontSize={"25px"} color={"black"} fontWeight={"semibold"} fontFamily={"system-ui"}>Bienvenue sur Chap</Text></Center>
    
      </Box>
      <Center
              width={"100%"}
              display={["grid", "grid", "grid", "none", "none"]}
            >
              <Box>
                <InputGroup mt={2}  borderRadius={"100px"} mb={2}>
                  <InputRightElement as={Text} width={"fit-content"} pr={2}>
                  {final}
                  <RiSendPlaneLine color={"cyan.700"} fontSize={"25px"}  onClick={()=>handleLocate()} _hover={{
                    cursor: "pointer"

                  }} />
                  </InputRightElement>
                  <Input
                    borderRadius={"100px"}
                    type={"number"}
                    placeholder="Code postal "
                    w={"14em"}
                    maxLength={5}
                    value={locate}
                   
                    onChange={(e) => {
                      localStorage.setItem("postal", e.target.value),
                        setLocate(e.target.value),
                        Search(locate.slice(0, 2));
                        if((e.target.value).length>4){
                          router.reload()
                         }
                    }}
                    // onClick={onOpen}
                  />
                  <InputLeftElement
                    as={Link}
                    href={"#"}
                    borderRaduis={"50%"}
                    _hover={{
                      textDecoration: "none",
                    }}
                    cursor={"pointer"}
                  >
                    <MdLocationOn />
                  </InputLeftElement>
                </InputGroup>
              </Box>
            </Center>
      <SliderComponents />
      
      <LadingCorps />

      <FooterR />
    </>
  );
}
