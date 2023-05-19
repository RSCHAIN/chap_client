import { Flex, Heading,  Input,Image, InputGroup, InputRightElement, Link, Text, useMediaQuery } from "@chakra-ui/react";
import { Search2Icon } from '@chakra-ui/icons';
import LoginSignButton from "./generale/LoginSignButton";
import InputLg from "./generale/InputLg";
import HeaderBar from "./inscription/HeaderBar";
import SearcheIcone from "./generale/SearcheIcone";
import ResponsiveMenu from "./generale/ResponsiveMenu";
import {Image as Ok} from 'next/image';

const InputBar = () => {
    const [isLagerThan768] = useMediaQuery('(min-width: 768px)')
    return (
        <>

            <Flex
                width={'full'} height={'4em'}
                align={'center'} justifyContent={'space-between'}
            >

                {/* le logo  */}
                <Flex
                    color={"yellow.400"} width={"auto"} height={'100%'}
                    align={'center'} justifyContent={'center'}
                    fontWeight={'bold'} ml={'5em'}
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
                    width={"auto"} height={'full'}
                >
                    {isLagerThan768 ? <LoginSignButton /> : <ResponsiveMenu />}
                </Flex>
            </Flex>
        </>
    );
};

export default InputBar;