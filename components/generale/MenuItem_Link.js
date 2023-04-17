import { Flex, Link, Text } from '@chakra-ui/react';
import React from 'react';
import Showconnex from '../ShowConnexion';

const MenuItem_Link = () => {
    return (
        <>
            <Flex
                width={{ base: '100%', md: '70%' }} height={{ base: '50vh', md: '100%' }}
                direction={{ base: 'column', md: 'row' }}
                align={'center'} justify={{ base: 'space-around', md: 'space-between' }}
            >
                <Flex
                    width={{ base: '100%', md: '60%' }}
                    height={{ base: '80%', md: '100%' }}
                    align={'center'} justify={'space-between'}
                    direction={{ base: 'column', md: 'row' }}
                >
                    <Link href='/'>Home</Link>
                    <Link href=''>Services</Link>
                    <Link href='/Cart'>Panier</Link>
                    {/* <Link href='#'>Service</Link>
                    <Link href='#'>Paiement</Link> */}
                </Flex>

                <Flex
                    width={{ base: '100%', md: 'auto' }}
                    height={{ base: '20%', md: '100%' }}
                    align={'center'} 
                    justify={{ base: 'space-around', md: 'space-between' }}
                >
                    <Showconnex/>
                </Flex>
            </Flex>
        </>
    );
};

export default MenuItem_Link;