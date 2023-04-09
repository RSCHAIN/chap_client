import HeaderBar from '@/components/inscription/HeaderBar';
import Navbar from "@/components/Navbar";
import InputBar from "@/components/InputBar";
import { useMediaQuery } from "@chakra-ui/react";
import SignUpForm from '@/components/inscription/SignUpForm';
import { Box } from '@chakra-ui/react';
import React from 'react';

const Inscription = () => {
    
    const [isLagerThan768] = useMediaQuery('(min-width: 768px)')
    return (
        <>
            <Box
                width={'100%'}
                height={'auto'}
                pb={20}
            >
                {/* <HeaderBar /> */}
                <InputBar />
      {isLagerThan768 ? <Navbar></Navbar> : <></>}
                <SignUpForm />
            </Box>
        </>
    );
};

export default Inscription;