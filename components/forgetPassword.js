  import { app } from '@/FIREBASE/clientApp'
import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
  } from '@chakra-ui/react'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
  import {useState} from 'react'
export default function TransitionExample() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [email,setEmail] = useState()
    const auth = getAuth(app);

    const Reset=async ()=>{
       await sendPasswordResetEmail(auth,email).then(()=>{console.log('success')}).catch((error)=> {console.log('error',error)})
    }
    return (
      <>
        <Text onClick={onOpen} cursor={'pointer'} pt={20} fontSize={30}  _hover={{
                color: 'blue',
              }}>Mot de passe Oublié ? </Text>
        <Modal
          isCentered
          onClose={onClose}
          isOpen={isOpen}
          motionPreset='slideInBottom'
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader> <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            MOT DE PASSE OUBLIE
          </Heading></ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Flex
    
        align={'center'}
        justify={'center'}
        // bg={useColorModeValue('gray.50', 'gray.800')}
        >
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
         
          <Text
            fontSize={{ base: 'sm', sm: 'md' }}
            color={useColorModeValue('gray.800', 'gray.400')}>
            Veuillez entrer votre mail afin de recevoir le lien de reinitialisation
          </Text>
          <FormControl id="email">
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              onclick={()=>Reset()}>
              Demander lien de reinitialisation
            </Button>
          </Stack>
        </Stack>
      </Flex>
            </ModalBody>
            {/* <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button bgcolor={'red'}>DEMANDER</Button>
            </ModalFooter> */}
          </ModalContent>
        </Modal>
      </>
    )
  }