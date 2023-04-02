import { Flex, Heading, Input, InputGroup, InputRightElement, Link, Text, useMediaQuery } from "@chakra-ui/react";
import { Search2Icon } from '@chakra-ui/icons';
import LoginSignButton from "./generale/LoginSignButton";
import InputLg from "./generale/InputLg";
import HeaderBar from "./inscription/HeaderBar";
import SearcheIcone from "./generale/SearcheIcone";
import ResponsiveMenu from "./generale/ResponsiveMenu";


const InputBar = () => {
    const [isLagerThan768] = useMediaQuery('(min-width: 768px)')
    return (
        <>

            <Flex
                width={'100%'} height={'4em'}
                align={'center'} justifyContent={'space-between'}
            >

                {/* la logo  */}
                <Flex
                    color={"#fbb614"} width={"auto"} height={'100%'}
                    align={'center'} justifyContent={'center'}
                    fontWeight={'bold'} ml={'.5em'}
                >
                    <Heading>FripChap</Heading>
                </Flex>

                {/* l'input et les button  */}
                <Flex
                    align={'center'} justifyContent={'center'}
                    width={"auto"} height={'100%'}
                >
                    {isLagerThan768 ? <InputLg /> : <SearcheIcone />}
                </Flex>

                {/* butons se connecter et s'inscrire  */}
                <Flex
                    align={'center'} justifyContent={'center'}
                    width={"auto"} height={'100%'}
                >
                    {isLagerThan768 ? <LoginSignButton /> : <ResponsiveMenu />}
                </Flex>
            </Flex>
        </>
    );
};

export default InputBar;