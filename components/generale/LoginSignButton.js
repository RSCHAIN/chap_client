import { Flex, Link } from "@chakra-ui/react";

const LoginSignButton = () => {
    return (
        <>
            <Flex
                align={'center'} justifyContent={'center'}
                width={"auto"} height={'100%'} mr={'1em'}
            >
                <Link
                    mr={{ base: '3', md: '3' }}
                    href={"/Connexion"}
                >
                    Se connecter
                </Link>
                <Link href={"/Inscription"}>
                    Inscription
                </Link>
            </Flex>
        </>
    );
};

export default LoginSignButton;