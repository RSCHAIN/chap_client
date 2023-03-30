import { Box, Button, Center, Flex, Input, InputGroup, InputLeftElement, InputRightElement, Stack, Text } from '@chakra-ui/react';
// fontawesone Icone 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faPhone, faHome, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
// React icone
import { } from 'react-icons/fa';
import React, { useState } from 'react';

const SignUpForm = () => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    return (
        <Center
            width={'100%'}
            height={'80vh'}
            mt={'2em'}
        >
            <Box
                width={{ base: '95%', md: '50%', xl: '40%', '2xl': '30%' }}
                height={{ base: '95%' }}
            >
                <Text fontWeight={'bold'} fontSize={'2xl'} >Bonjour!</Text>
                <Text
                    fontWeight={'light'}
                >
                    Svp inscrivez vous pour poursuivre votre achat
                </Text>
                <Stack
                    spacing={5} mt={'1em'}
                    width={{ base: '100%' }}
                >
                    {/* le nom  */}
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                        >
                            <FontAwesomeIcon icon={faAdd} color={'gray'} />
                        </InputLeftElement>
                        <Input
                            type='text'
                            placeholder='Nom'
                            _placeholder={{ color: 'gray.400' }}
                            variant={'outline'}
                            color={'gray.400'}
                            borderRadius={'full'}
                        />
                    </InputGroup>

                    {/* le prenom */}
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                        >
                            <FontAwesomeIcon icon={faAdd} color={'gray'} />
                        </InputLeftElement>
                        <Input
                            type='text'
                            placeholder='Prenom'
                            _placeholder={{ color: 'gray.400' }}
                            variant={'outline'}
                            color={'gray.400'}
                            borderRadius={'full'}
                        />
                    </InputGroup>

                    {/* le telephone  */}
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                        >
                            <FontAwesomeIcon icon={faPhone} color={'gray'} />
                        </InputLeftElement>
                        <Input
                            type='text'
                            placeholder='Telephone'
                            _placeholder={{ color: 'gray.400' }}
                            variant={'outline'}
                            color={'gray.400'}
                            borderRadius={'full'}
                        />
                    </InputGroup>

                    {/* le adresse */}
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                        >
                            <FontAwesomeIcon icon={faHome} color={'gray'} />
                        </InputLeftElement>
                        <Input
                            type='text'
                            placeholder='Adresse'
                            _placeholder={{ color: 'gray.400' }}
                            variant={'outline'}
                            color={'gray.400'}
                            borderRadius={'full'}
                        />
                    </InputGroup>

                    {/* le Email  */}
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                        >
                            <FontAwesomeIcon icon={faEnvelope} color={'gray'} />
                        </InputLeftElement>
                        <Input
                            type='text'
                            placeholder='Email'
                            _placeholder={{ color: 'gray.400' }}
                            variant={'outline'}
                            color={'gray.400'}
                            borderRadius={'full'}
                        />
                    </InputGroup>

                    {/* mot de passe */}
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                        >
                            <FontAwesomeIcon icon={faLock} color={'gray'} />
                        </InputLeftElement>
                        <Input
                            type={show ? 'text' : 'password'}
                            placeholder='mot de passe'
                            _placeholder={{ color: 'gray.400' }}
                            variant={'outline'}
                            color={'gray.400'}
                            borderRadius={'full'}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>

                    {/* confimer mot de passe */}
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                        >
                            <FontAwesomeIcon icon={faLock} color={'gray'} />
                        </InputLeftElement>
                        <Input
                            type={show ? 'text' : 'password'}
                            placeholder='confimer votre mot de passe'
                            _placeholder={{ color: 'gray.400' }}
                            variant={'outline'}
                            color={'gray.400'}
                            borderRadius={'full'}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Stack>
                <Button
                    colorScheme='blue' variant='solid' mt={'2em'}
                    borderRadius={'full'} width={'100%'}
                >
                    Inscription
                </Button>
            </Box>
        </Center>
    );
};

export default SignUpForm;