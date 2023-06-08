import { Flex, Heading,  Input,Image, InputGroup, InputRightElement, Link, Text, useMediaQuery, Box, Icon } from "@chakra-ui/react";
import { Search2Icon } from '@chakra-ui/icons';
import LoginSignButton from "./generale/LoginSignButton";
import InputLg from "./generale/InputLg";
import HeaderBar from "./inscription/HeaderBar";
import SearcheIcone from "./generale/SearcheIcone";
import ResponsiveMenu from "./generale/ResponsiveMenu";
import {Image as Ok} from 'next/image';
import { HiOutlineShoppingBag } from "react-icons/hi";
import { TfiHelpAlt } from "react-icons/tfi";
import { useState } from "react";

const InputBar = () => {
    const [total,setTotal]=useState('')
//     const numb=()=>{
   
   
//      const Cart = localStorage.getItem("Cart");
//      const All = JSON.parse(Cart);
//      let tot=0
//      if (All != null) {
//        All.map((data, index) => {
//          tot = parseInt(data.quantity) + tot;
//        });
//        setTotal(tot);
//      }
   
//      localStorage.setItem("total", total);
//    };
    const [isLagerThan768] = useMediaQuery('(min-width: 768px)')
    return (
        <>

            <Flex
                width={'full'} height={'4em'}
                align={'center'} justifyContent={'space-evenly'}
            >

                {/* le logo  */}
                <Flex
                    color={"yellow.400"} width={"auto"} height={'100%'}
                    align={'center'} justifyContent={'center'}
                    fontWeight={'bold'} ml={[0,0,'5em','5em','5em']}
                >
                   <Image src={"/logo1.png"} alt={"Chap"} width={{base:95,md:150}} mt={{base:0,md:10}}/>
                    {/* <Ok src={"./logo1.png"} /> */}
                </Flex>

                {/* l'input et les button  */}
                <Flex
                    align={'center'} justifyContent={'center'}
                    width={"auto"} height={'full'} 
                >
                    {isLagerThan768 ? <InputLg /> : <SearcheIcone />}
                </Flex>
               
                {/* butons se connecter et s'inscrire  */}
                <Flex
                    align={'center'} justifyContent={'center'}
                    width={"auto"} height={'full'} mt={5}
                >
                    
                    {isLagerThan768 ? <LoginSignButton /> : <ResponsiveMenu />}
                 

                <Link
              href={"/Cart"}
              
              mr={3}
              _hover={{ textDecoration: "none", color: "#3a07c4" }}
            >
           
           <Box display={['none','none','grid','grid','grid']}>
              
              <Icon as={TfiHelpAlt} fontSize={40} fontWeight={'thin'} color={'#303030'}/>
                <Text textAlign={'center'} alignContent={'center'} alignItems={'center'}>AIDE</Text>
               {/* <Text bgColor={'#08566E'} h={'fit-content'} padding={1} borderRadius={50} color={'white'}fontSize={20}>{total}</Text> */}
                </Box>
             
            </Link>

                    <Link
              href={"/Cart"}
              
              mr={3}
              _hover={{ textDecoration: "none", color: "#3a07c4" }}
            >
           
              <Box display={['none','none','grid','grid','grid']}>
              
              <Icon as={HiOutlineShoppingBag} fontSize={40} fontWeight={'thin'} color={'#303030'}/>
              <Text textAlign={'center'} alignContent={'center'} alignItems={'center'}>PANIER</Text>
             {/* <Text bgColor={'#08566E'} h={'fit-content'} padding={1} borderRadius={50} color={'white'}fontSize={20}>{total}</Text> */}
              </Box>
             
            </Link>
                </Flex>
            </Flex>
        </>
    );
};

export default InputBar;