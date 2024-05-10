import { Box, Center, Flex, HStack, Link, Text, useMediaQuery, useToast } from '@chakra-ui/react';
import React from 'react';
import ResponsiveMenu from '../generale/ResponsiveMenu';
import MenuItem_Link from '../generale/MenuItem_Link';
import Head from 'next/head';

const HeaderBar = () => {
    const [isLagerThan768] = useMediaQuery('(min-width: 768px)')
    const toast = useToast()
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
            <Flex
           
                width={'100%'} height={'4em'} display={'flex'}
                align={'center'} justify={{ base: 'space-between', md: 'space-around' }}
            >
                <Center
                    height={'100%'} width={'auto'}
                    ml={{ base: 4, md: 0 }}
                >
                    <Text
                        color={'#ffc300'} fontSize={'2em'}
                        fontWeight={'bold'}
                    >
                        Chap
                    </Text>
                </Center>
                {isLagerThan768 ? <MenuItem_Link /> : <ResponsiveMenu />}
            </Flex>
        </>
    );
};

export default HeaderBar;