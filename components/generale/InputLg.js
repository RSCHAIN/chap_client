import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Collapse,
  Flex,
  Heading,
  Icon,
  Text,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverTrigger,
  Select,
  SimpleGrid,
  PopoverContent,
  useDisclosure,
  PopoverCloseButton,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
  Link,
} from "@chakra-ui/react";
import {
  child,
  equalTo,
  get,
  onValue,
  orderByChild,
  query,
  ref,
  startAt,
  update,
} from "@firebase/database";
import { db2 } from "@/FIREBASE/clientApp";
import React, { useEffect } from "react";
import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

function saveCart(product) {
  localStorage.setItem("Cart", JSON.stringify(product));
}
function getCart() {
  let Cart = localStorage.getItem("Cart");
  if (Cart == null) {
    return [];
  } else {
    return JSON.parse(Cart);
  }
}
function AddToCart(Product) {
  let Cart = getCart();
  let foundit = Cart.find((p) => p.id == Product.id);
  if (foundit != undefined) {
    foundit.quantite++;
    foundit.prix = foundit.quantite * parseInt(Product.pricprixe);
  } else {
    Product.quantite = 1;
    Cart.push(Product);
  }

  saveCart(Cart);
}
const InputLg = () => {
  const toast = useToast();
  const [inputContent, setInputContent] = useState([]);
  const [resutl, setResult] = useState([]);
  const [categories, setCategories] = useState("Alimentation");
  const [cat,setCat] = useState([])
  const [datos,setDatos]=useState([])
  const [fournisseur, setFournisseur] = useState("EasyShop");
  const [data, setData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [check,setCheck] = useState(0)









  const handleSearch =  () => {
    setCheck(check+1)
   setData([])
      const rec =  query(
        ref(db2,   "/All Products" ));
      get(rec)
        .then((snapshot) => {
          // data.push(snapshot.val())
          snapshot.forEach((childsnapsho) => {
            data.push(childsnapsho.val());
          });
        })
        .catch((error) => console.log(error));
  }
  const Research = (inputed) => {
  console.log("data",data)
   console.log(data.filter(inpute => inpute.nom.includes(inputed)))
  }

useEffect(()=>{
  if (check == 0 || check == 1) {
    handleSearch()
    console.log(data)
    console.log(check)
  }
  
})



  return (
   
    <>
    
      <Box display={"flex"}>
      
        <InputGroup>
          <Input
            type="search"
            placeholder="Que recherchez-vous ?"
            _placeholder={{ color: "black" }}
            variant={"filled"}
            borderRadius={"full"}
            onClick={onOpen}
            // w={{ md: "10em", lg: "20em" }}
            w={["15em","15em","15em","30em","30em"]}
          
          />
          <InputRightElement>
            <Search2Icon color={"#08566E"} onClick={onOpen} />
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>RECHERCHE DE PRODUIT</ModalHeader>
                <ModalCloseButton onClick={()=>setData([])}/>
                <ModalBody>
                  <Input type="search" width={"150px"} 
                  placeholder="Que recherchez-vous ?"
                  _placeholder={{ color: "black" }}
                  variant={"filled"}
                  borderRadius={"full"}
                  w={["15em","15em","15em","20em","20em"]}
                  onChange={(e) => {
                     Research(e.target.value);
                  }}
                  />
                  {/* {data.map((data, index) => { */}
                    {/* // if (data.nom != null || data.nom != undefined) { */}
                    {/* //   return (
                    //     <Flex
                    //       key={index}
                    //       bgColor={"#fbfbfbfc"}
                    //       width={{
                    //         base: "fit-content",
                    //         lg: "fit-content",
                    //         md: "fit-content",
                    //       }}
                    //       height={""}
                    //       border={"1px solid #e6e6e6"}
                    //       // boxShadow={"0px 2px 10px"}
                    //       boxSizing={"border-box"}
                    //       b
                    //       borderRadius={"9px"}
                    //       // pb={10}
                    //       mb={20}
                    //     >
                    //       <Box pr={5}>
                    //         <Image
                    //           src={data.imageUrl}
                    //           alt={data.nom}
                    //           width={"80px"}
                    //           height={"20px"}
                    //           ml={15}
                    //           my={3}
                    //         />
                    //       </Box>
                    //       <Box display={"COLUMN"}>
                    //         <Text
                    //           pb={5}
                    //           pt={5}
                    //           fontWeight={"bold"}
                    //           mt={2}
                    //           mr={10}
                    //         >
                    //           {data.nom}
                    //         </Text>

                    //         <Text pt={5}>{data.description}</Text>
                    //       </Box>
                    //       <Box>
                    //         <Text
                    //           mt={10}
                    //           fontWeight={"semibold"}
                    //           fontSize={"lg"}
                    //           pr={2}
                    //         >
                    //           {data.prix}€
                    //         </Text>
                    //         <Button
                    //           bgColor={"blue"}
                    //           mt={3}
                    //           borderRadius={"66px"}
                    //           as={"a"}
                    //           onClick={() => {
                    //             AddToCart(data),
                    //               toast({
                    //                 title: "PRODUIT AJOUTE",

                    //                 status: "success",
                    //                 duration: 9000,
                    //                 isClosable: true,
                    //               });
                    //           }}
                    //           color={"white"}
                    //           _hover={{
                    //             backgroundColor: " #00FFEF",
                    //             color: "#080904 ",
                    //           }}
                    //           leftIcon={<IoMdAddCircleOutline />}
                    //         >
                    //           {" "}
                    //           Ajouter au panier
                    //         </Button>
                    //       </Box>
                    //     </Flex>
                    //   );
                    // } else {
                    //   return <Box key={index}>PRODUIT INTROUVABLE</Box>;
                    // }
                  //   console.log(data)
                  // })} */}
                </ModalBody>
              </ModalContent>
            </Modal>
          </InputRightElement>
        </InputGroup>
      
      </Box>
    </>
  );
};

export default InputLg;
