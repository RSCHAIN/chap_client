'use client'
import { Box, Button, Center, Input, InputGroup, InputLeftElement, InputRightElement, Stack, Text, useToast } from '@chakra-ui/react';
// fontawesone Icone 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faPhone, faHome, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
// React icone
import { } from 'react-icons/fa';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { app } from '@/FIREBASE/clientApp';
import { getFirestore } from 'firebase/firestore';
import { doc } from '@firebase/firestore'; // for creating a pointer to our Document
import { setDoc } from 'firebase/firestore'; // for adding the Document to Collection

const SignUpForm = () => {
    const [name, setName] = useState();
    const [surname,setSurname]=useState()
    const [number,setNumber] = useState()
    const [address,setAdress] = useState()
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();
    const auth = getAuth(app);
    const router= useRouter();
    const toast = useToast()
    const firestore = getFirestore(app);
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    

    const createUSer = async () => {
      
        if(password==password2){
           
             
             // create a pointer to our Document
            const _user = doc(firestore, `Utilisateurs/${email}`);
            // structure the todo data
            const Users = {
                   name,
                   surname,
                   number,
                   address,
                   email,
                   email,
                   state:"active"
                };
            await setDoc(_user, Users);
            
            await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              console.log(userCredential.user);
              setEmail(userCredential.user.email);
              // router.back()
              toast({
                title: 'SUCCES.',
                description: "INSCRIPTION VALIDEE",
                status: 'success',
                duration: 3000,
                isClosable: true,
              })
              router.push("/")
            })
            .catch((error) => {
              // throw error;
              const errorCode = error.code;
              const errorMessage = error.message;
            //   console.log(errorMessage)
            //   console.log(errorCode)
              if (errorCode == "auth/email-already-in-use") {
                // console.log("VEUILLEZ VERIFIER VOS INFOS DE CONNEXION");
                toast({
                  title: 'VEUILLEZ VOUS CONNECTER',
                  description: "CET EMAIL EXISTE DEJA DANS NOTRE BASE DE DONNEE",
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                })
              }
            });
        }
        else{
            console.log("okay la")
            toast({
                title: 'MAUVAISE SAISIE',
                description: "MOT DE PASSE NON IDENTIQUE",
                status: 'error',
                duration: 7000,
                isClosable: true,
              })
        }
       
      };

    






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
                    BIENVENUE SUR LA PAGE D'INSCRIPTION
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
                            onChange={ev=>setName(ev.target.value)}
                            placeholder='Nom'
                            _placeholder={{ color: 'gray.400' }}
                            variant={'outline'}
                            color={'gray.400'}
                            borderRadius={'full'}
                            required
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
                        required
                            type='text'
                            onChange={ev=>setSurname(ev.target.value)}
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
                            type='number'
                            required
                            onChange={ev=>setNumber(ev.target.value)}
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
                            required
                            onChange={ev=>setAdress(ev.target.value)}
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
                            required
                            onChange={ev=>setEmail(ev.target.value)}
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
                        required
                            type={show ? 'text' : 'password'}
                            placeholder='mot de passe'
                            _placeholder={{ color: 'gray.400' }}
                            onChange={ev=>setPassword(ev.target.value)}
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
                        required
                        onChange={ev=>setPassword2(ev.target.value)}

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
                    onClick={()=>createUSer()}
                >
                    Inscription
                </Button>
            </Box>
        </Center>
    );
};

export default SignUpForm;