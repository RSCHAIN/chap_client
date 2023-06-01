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
} from "@chakra-ui/react";
import {
  child,
  equalTo,
  get,
  orderByChild,
  query,
  ref,
  startAt,
} from "@firebase/database";
import { db2 } from "@/FIREBASE/clientApp";
import React from "react";
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
      foundit.quantity++;
      foundit.price = foundit.quantity * parseInt(Product.price);
    } else {
      Product.quantity = 1;
      Cart.push(Product);
    }
  
    saveCart(Cart);
  }
const InputLg = () => {
    const toast =useToast()
  const [inputContent, setInputContent] = useState([]);
  const [resutl, setResult] = useState([]);
  const [categories, setCategories] = useState("Alimentation");
  const [fournisseur, setFournisseur] = useState("Garba");
  const [data, setData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearch = () => {
    if(categories != null || categories != undefined && fournisseur!= null  || fournisseur != undefined){
        const rec = query(
            ref(db2, categories + "/" + fournisseur),
            orderByChild("nom"),
            equalTo(inputContent)
          );
          get(rec).then((snapshot) => {
            snapshot.forEach((childsnapsho) => {
              setData([childsnapsho.val()]);
            });
          }).catch((error)=>console.log(error));
      
          console.log("recherche");
    }
    else{
        setData([])
    }
    
  };
  return (
    <>
      <Box>
        <InputGroup>
          <Input
            type="text"
            placeholder="Que recherchez-vous ?"
            _placeholder={{ color: "black" }}
            variant={"filled"}
            borderRadius={"full"}
            w={{ md: "20em", lg: "30em" }}
            onChange={(e) => {
              setInputContent(e.target.value), handleSearch();
            }}
          />
          <InputRightElement>
            <Search2Icon color={"blue"} onClick={onOpen} />
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>ZONE DE RECHERCHE</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  {data.map((data, index) => {
                    if(data.nom != null || data.nom !=undefined){
                        return (
                            <Flex
                            key={index}
                              bgColor={"#fbfbfbfc"}
                              width={{
                                base: "fit-content",
                                lg: "400px",
                                md: "400px",
                              }}
                              height={""}
                              border={"1px solid #e6e6e6"}
                              // boxShadow={"0px 2px 10px"}
                              boxSizing={"border-box"}
                              b
                              borderRadius={"9px"}
                              // pb={10}
                              mb={20}
                            >
                              <Box pr={5}>
                                <Image
                                  src={data.imageUrl}
                                  alt={data.nom}
                                  width={"117px"}
                                  height={"139px"}
                                  ml={15}
                                  my={3}
                                />
                              </Box>
                              <Box display={"COLUMN"}>
                                <Text
                                  pb={5}
                                  pt={5}
                                  fontWeight={"bold"}
                                  mt={2}
                                  mr={10}
                                >
                                  {data.nom}
                                </Text>
                                
                                <Text pt={5}>{data.description}</Text>
                              </Box>
                              <Box>
                              <Text mt={10} fontWeight={'semibold'} fontSize={"lg"} pr={2}>{data.price}€</Text>
                              <Button
                              bgColor={"blue"}
                              mt={3}
                              borderRadius={"66px"}
                              as={"a"}
                              onClick={() => {
                                AddToCart(data),
                                  toast({
                                    title: "PRODUIT AJOUTE",
      
                                    status: "success",
                                    duration: 9000,
                                    isClosable: true,
                                  });
                              }}
                              color={"white"}
                             _hover={{
                              backgroundColor:' #00FFEF',
                              color:'#080904 '
                             }}
                             leftIcon={<IoMdAddCircleOutline/>}
                            >
                              {" "}
                              Ajouter au panier
                            </Button>
                              </Box>
                              
                            </Flex>
                          );
                    }
                    else{
                        return(<Box key={index}>PRODUIT INTROUVABLE</Box>)
                    }
                   
                  })}
                </ModalBody>

               
              </ModalContent>
            </Modal>
          </InputRightElement>
        </InputGroup>
        <Box display={"flex"}>
          <Select
            name="colors"
            defaultValue={"Alimentation"}
            closeMenuOnSelect={true}
            onChange={(e) => {
              setCategories(e.target.value)
            }}
            size="sm"
          >
            <option>Alimentation</option>
            <option>Restauration</option>
            <option>Esthetique</option>
          </Select>
          <Select
            name="colors"
            closeMenuOnSelect={true}
            onChange={(e) => {
              setFournisseur(e.target.value)
            }}
            size="sm"
          >
            <option>Garba</option>
            <option>MAGASIN 2</option>
            <option>SEVEN 7</option>
          </Select>
        </Box>
      </Box>
    </>
  );
};

export default InputLg;
