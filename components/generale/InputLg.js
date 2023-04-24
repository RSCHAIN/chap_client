import { Search2Icon } from '@chakra-ui/icons';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React from 'react';

const InputLg = () => {
    return (
        <>
            <InputGroup>
                <Input
                    type='text' placeholder='Que recherchez-vous ?'
                    _placeholder={{ color: 'black' }} variant={'filled'}
                    borderRadius={'full'} w={{md:'20em', lg:'30em'}}
                />
                <InputRightElement>
                    <Search2Icon color={'blue'} />
                </InputRightElement>
            </InputGroup>
        </>
    );
};

export default InputLg;