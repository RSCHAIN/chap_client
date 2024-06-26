import { EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';
import { BsInstagram, BsYoutube } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
import Head from "next/head";



const BarBleu = () => {
    return (
        <>
        <Head>
                <script
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-RFSVQTGJ87"
                ></script>
                <script strategy="lazyOnload">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date()); 
                gtag('config', 'G-RFSVQTGJ87');
                `}
                
                </script>
            </Head>
            {/* la bar bleue  */}
            <Flex
                bgColor={"#3e82d7"} w="100%" height={"2em"} color={"white"}
                align={'center'} justifyContent={'space-between'}
            >
                {/* emails et contact  */}
                <Flex
                    height={'100%'} width={'auto'} ml={'5'}
                    align={'center'} justifyContent={'space-between'}
                >

                    <Text mr={'5'}>
                        <EmailIcon /> contact@Chap.com
                    </Text>

                    <Text >
                        <PhoneIcon />+22502545810
                    </Text>

                </Flex>

                {/* reseaux sociaux */}
                <Flex
                    height={'100%'} width={'10em'} mr={'5'}
                    align={'center'} justifyContent={'space-between'}
                >

                    {/* <Text mr={1} color={'white'} mt={1}> Reseaux sociaux</Text> */}
                    <BsYoutube color="white" mt={3} />
                    <BsInstagram color="white" mt={3} />
                    <FaFacebookF color="white" mt={3} />
                </Flex>
            </Flex>
        </>
    );
};

export default BarBleu;