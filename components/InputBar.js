import {
  Flex,
  Heading,
  Input,
  Image,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useMediaQuery,
  Box,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverFooter,
  Button,
  Center,
  useToast,
  InputLeftElement
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { ChevronDownIcon } from "@chakra-ui/icons";
import LoginSignButton from "./generale/LoginSignButton";
import InputLg from "./generale/InputLg";
import HeaderBar from "./inscription/HeaderBar";
import SearcheIcone from "./generale/SearcheIcone";
import ResponsiveMenu from "./generale/ResponsiveMenu";
import { Image as Ok } from "next/image";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { TfiHelpAlt } from "react-icons/tfi";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app, authentic } from "@/FIREBASE/clientApp";
import { useRouter } from "next/router";
import CookieConsent from "react-cookie-consent";
import {MdLocationOn} from 'react-icons/md'
import axios from "axios";

const InputBar = () => {
  const auth = getAuth(app);
  const router = useRouter();
  const [locate,setLocate] = useState("")
  const [total, setTotal] = useState("");
  const [lastTime, setLastTime] = useState();
  const [data,setData] = useState([]);
  const [code,setCode] = useState([]);
  const [final,setFinal] = useState([""]);
  const [check,setCheck] = useState(0);

  const Search =(id)=>{
 
    if(data.filter(order => (order.num_dep === id)).length!=0){
      setFinal(data.filter(order => (order.num_dep === id))) 
   
     
   } 
   else{
    setFinal([""])
   }
  
   
}



  useEffect(() => {
    
  if(check == 0 || check == 1){
    const  GetAll= async ()=>{
      await axios.get("api/GetJson").then((response)=>{
          // console.log(response.data);
          // console.log("object values", Object.values(response.data))
          setData(JSON.parse(Object.values(response.data)))
      })
  };
    GetAll();
    setLocate(localStorage.getItem("postal") ?? "0");
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setTotal(2);
      }
    });
    console.log("check",check)
    setCheck(check+1);
  }
  
   
  },[locate,total,auth,data,check]);
 

  const [isLagerThan768] = useMediaQuery("(min-width: 420px)");
  const toast = useToast()
  

  return (
    <>
     
     <CookieConsent
  location="bottom"
  buttonText="J'accepte"
  cookieName="CNSTMTCOOKIE"
  declineButtonText="Je Refuse"
  style={{ background: "#2B373B" }}
  buttonStyle={{ backgroundColor: "#00CCBC", fontSize: "13px",color:"white" }}
  expires={3}
  enableDeclineButton
> 
  Nous utilisons des cookies dans le but de personnaliser, d’améliorer notre contenu et nos services et de diffuser des publicités pertinentes.
 
</CookieConsent>
      <Flex
        width={"100%"}
        height={"4em"}
        align={"center"}
        justifyContent={"space-evenly"}
      >
        {/* le logo  */}
        <Flex
          color={"yellow.400"}
          width={"fit-content"}
          height={"100%"}
          align={"center"}
          justifyContent={"center"}
          fontWeight={"bold"}
          ml={[0, 0, 0, "5em", "5em"]}
        >
          <Link href={"/"}>
            <Image
              src={"/logo1.png"}
              alt={"Chap"}
              width={"80px"}
              mt={[2,2,2,2,2]}
              mr={[0, 0, 0, "2px", "2px"]}
            />
          </Link>

          {/* <Ok src={"./logo1.png"} /> */}
        </Flex>

        {/* l'input et les button  */}
        <Flex
          align={"center"}
          justifyContent={"center"}
          width={"auto"}
          height={"full"}
          mr={3}
        > 
         

           <InputLg /> 
        </Flex>

        {/* butons se connecter et s'inscrire  */}
        <Flex
          align={"center"}
          justifyContent={"center"}
          width={"auto"}
          height={"full"}
        >
           <LoginSignButton />  <ResponsiveMenu />

          <Flex
          display={["none","none","none","flex","flex"]}
            align={"center"}
            justifyContent={"center"}
            width={"auto"}
            height={"100%"}
            mr={"1em"}
          >
            {/* <Link display={'flex'} mr={{ base: "3", md: "3" }} fontSize={20} href={"/Connexion"}>
          <Icon as={AiOutlineUser} fontSize={30} mr={2}/> Se connecter
        </Link> */}
            <Popover>
            <InputGroup   bgColor={"#ddd"} borderRadius={"100px"}>
            <InputRightElement as={Text} width={"10em"}>
                  {Object.values(final[0])[1]}
                  </InputRightElement>
                  <Input
                  borderRadius={"100px"}
                    type={"number"}
                    placeholder="Entrez votre code postal"
                    w={"20em"}
                    maxLength={5}
                    
                    value={locate}
                    // value={postal}
                    onChange={(e)=>{localStorage.setItem("postal",e.target.value),setLocate(e.target.value),Search(locate.slice(0,2))}}
                    // onClick={onOpen}
                  />
                  <InputLeftElement as={Link} href={"#"} borderRaduis={"50%"}   _hover={{
                    textDecoration: "none",
                  
                  }} cursor={"pointer"} >
                    <MdLocationOn/>
                  </InputLeftElement>
                </InputGroup>
              <PopoverContent width={"210px"}>
             
             {locate.length <=4 ?  <InputGroup   bgColor={"#ddd"} borderRadius={"100px"}>
             <InputRightElement as={Text} width={"10em"}>
                  KOLO
                  </InputRightElement>
                  <Input
                  borderRadius={"100px"}
                    type={"number"}
                    placeholder="Entrez votre code posta"
                    w={"15em"}
                    maxLength={5}
                    value={locate} 
                    onChange={(e)=>{localStorage.setItem("postal",e.target.value),setLocate(e.target.value),Search(locate.slice(0,2))}}
                  />
                  <InputLeftElement as={Link} href={"#"} borderRaduis={"50%"}   _hover={{
                    textDecoration: "none",
                  
                  }} cursor={"pointer"} >
                    <MdLocationOn/>
                  </InputLeftElement>
                </InputGroup> : <> <InputGroup   bgColor={"#ddd"} borderRadius={"100px"}>
           
                  <Input
                  borderRadius={"100px"}
                    type={"number"}
                    placeholder="Entrez votre code posta"
                    w={"15em"}
                    maxLength={5}
                    value={locate} 
                    onChange={(e)=>{localStorage.setItem("postal",e.target.value),setLocate(e.target.value),Search(locate.slice(0,2))}}
                  />
                  <InputLeftElement as={Link} href={"#"} borderRaduis={"50%"}   _hover={{
                    textDecoration: "none",
                  
                  }} cursor={"pointer"} >
                    <MdLocationOn/>
                  </InputLeftElement>
                </InputGroup> </>} 
              </PopoverContent>
            </Popover>
          </Flex>
         

          <Flex
          display={["none","none","none","flex","flex"]}
            align={"center"}
            justifyContent={"center"}
            width={"auto"}
            height={"100%"}
            mr={"1em"}
          >
      
            <Popover>
              <PopoverTrigger>
                <Link
                  href={"/Cart"}
                  _hover={{
                    bgColor: "white",
                    textDecoration: "none",
                  }}
                >
                  {" "}
                  <Button
                    _hover={{
                      bgColor: "white",
                      color: "cyan.700",
                      textDecoration: "none",
                    }}
                    leftIcon={<Icon as={HiOutlineShoppingBag} fontSize={30} />}
                    bgColor={"white"}
                  >
                    Panier
                  </Button>
                </Link>
              </PopoverTrigger>
            </Popover>
          </Flex>
        </Flex>
      </Flex>
      {/* <Center display={["grid","grid","grid","none","none"]} width={"90%"}>
      {locate.length <=4 ? 
       <InputGroup   bgColor={"#ddd"} borderRadius={"100px"}>
                  <Input
                  borderRadius={"100px"}
                    type={"number"}
                    placeholder="Entrez votre code postal "
                    w={"15em"}
                    maxLength={5}
                    value={locate} 
                    onChange={(e)=>{localStorage.setItem("postal",e.target.value),setLocate(e.target.value)}}
                  />
                  <InputLeftElement as={Link} href={"#"} borderRaduis={"50%"}   _hover={{
                    textDecoration: "none",
                  
                  }} cursor={"pointer"} >
                    <MdLocationOn/>
                  </InputLeftElement>
                </InputGroup> : <><InputGroup   bgColor={"#ddd"} borderRadius={"100px"}>
                  <Input
                  borderRadius={"100px"}
                    type={"number"}
                    placeholder="Entrez votre code postal "
                    w={"15em"}
                    maxLength={5}
                    value={locate} 
                    onChange={(e)=>{localStorage.setItem("postal",e.target.value),setLocate(e.target.value)}}
                  />
                  <InputLeftElement as={Link} href={"#"} borderRaduis={"50%"}   _hover={{
                    textDecoration: "none",
                  
                  }} cursor={"pointer"} >
                    <MdLocationOn/>
                  </InputLeftElement>
                </InputGroup> </>} 
      </Center> */}
    </>
  );
};

export default InputBar;
