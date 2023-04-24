import {
  Box,
  Center,
  Flex,
  Text,
  Image,
  Button,
  Input,
  Heading,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import FooterR from "./footerResponsif";
import { useRouter } from 'next/router'

export default function Carte() {
  const [cart, setCart] = useState();
  const [prix,setPrix]= useState();
  const router = useRouter()
  useEffect(() => {
    let PrixT=0
    const Cart = localStorage.getItem("Cart");
    const All = JSON.parse(Cart)
    console.log(All)
    setCart(JSON.parse(Cart))
    if (All != null){
      All.map((data,index)=>{
        PrixT=data.price*data.quantity+PrixT
    })
    setPrix(PrixT)
    }

    localStorage.setItem("prix",PrixT)
    console.log(PrixT)
  }, []);

  if (cart != undefined) {
    function saveCart(product){
        localStorage.setItem("Cart",JSON.stringify(product));
      }
    function getCart(){
        let Cart = localStorage.getItem("Cart");
        if (Cart == null){
          return []
        }else{
          return JSON.parse(Cart)
        }
      }
    const decrement = (Product,quantity) => {
        let Cart=getCart();
        let foundit = Cart.find((p) => p.name == Product.name);
        foundit.quantity-=quantity;
        saveCart(Cart)
        router.reload()
      };
      const increment = (Product,quantity) => {
        let Cart=getCart();
        let foundit = Cart.find((p) => p.name == Product.name);
        foundit.quantity+=quantity;
        saveCart(Cart)
        router.reload()
      };
      
    return (
      <>
        {cart.map((data, index) => (
          <Center key={data.id}>
            <Flex
              bgColor={"#F7C29E"}
              width={"full"}
              height={"205px"}
              border={"1px solid #e6e6e6"}
              boxShadow={"0px 2px 10px"}
              boxSizing={"border-box"}
              borderRadius={"9px"}
              // pb={10}
              mb={20}
            >
              <Box pr={5}>
                <Image
                  src={data.imageUrl}
                  alt={data.name}
                  width={"117px"}
                  height={"139px"}
                  ml={15}
                  mt={10}
                />
              </Box>
              <Box>
                <Text pb={5} pt={5} fontWeight={"bold"}>
                  {data.name}
                </Text>
                <Flex>
                  <Image src="./images/Star.svg" alt="robe" />
                  <Text as={"sup"} fontSize={12}>
                    (59)
                  </Text>
                </Flex>
                <Text pt={5}>{data.description}</Text>
                <Flex
                  borderColor={"#E37611"}
                  borderStyle={"solid"}
                  borderWidth={"0,5px"}
                  width={"full"}
                  borderRadius={"4px"}
                  // justifyContent={'space-between'}
                >
                  <Flex>
                    <Button onClick={()=> decrement(data,1)}>-</Button>
                    <Input
                      type={"number"}
                      color={"#E37611"}
                      w={"70px"}
                      value={data.quantity}
                      borderColor={"#F7C29E"}
                    />
                    <Button onClick={()=> increment(data,1)}>+</Button>
                  </Flex>
                  <Text color={"#E37611"} ml={"90%"}>
                    {data.price*data.quantity}
                    
                  </Text>
                </Flex>
              </Box>
            </Flex>
          </Center>
        ))}
        <Center>
        <Flex width={"621px"} mb={"70px"} justifyContent={'space-between'}>
            <Heading>Total</Heading>
            <Text fontSize={30}>{prix}</Text>
          <Button bgColor={"#816acd"} onClick={()=>router.push("/Sold")} borderRadius={50} width={100}>
            Valider
          </Button>
        </Flex>
        </Center>
       <FooterR/>
      </>
    );
  } else {
    return (
      <>
        <Center>
          <Flex
            bgColor={"#F7C29E"}
            width={"621px"}
            height={"205px"}
            border={"1px solid #e6e6e6"}
            boxShadow={"0px 2px 10px"}
            boxSizing={"border-box"}
            borderRadius={"9px"}
            // pb={10}
            mb={20}
          >
            <Text>VOTRE PANIER EST VIDE</Text>
          </Flex>
        </Center>
      </>
    );
  }
}
