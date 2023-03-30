import HeaderBar from '@/components/inscription/HeaderBar';
import SignUpForm from '@/components/inscription/SignUpForm';
import { Box } from '@chakra-ui/react';
import React from 'react';

const Inscription = () => {
    return (
        <>
            <Box
                width={'100%'}
                height={'auto'}
            >
                <HeaderBar />
                <SignUpForm />
            </Box>
        </>
    );
};

export default Inscription;