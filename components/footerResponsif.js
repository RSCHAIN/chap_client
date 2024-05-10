import {
  Box,
  chakra,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  Icon,
  IconButton,
  useColorModeValue,
  Heading,
  Button,
  Center,
  Image,
  Flex
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FaCcPaypal, FaFacebookF, FaInstagram, FaTwitter, FaYoutube,FaCcVisa, FaCcMastercard } from 'react-icons/fa';
import { BiMailSend } from 'react-icons/bi';
import Head from "next/head";


const Logo = () => {
  return (
    <Heading
    color={"#fbb614"}
    width={"152px"}
    fontSize={"32px"}
    lineHeight={"24px"}
    fontWeight={700}
    ml={"80px"}
  >
    Chap
  </Heading>
  );
};

const SocialButton = ({
  children,
  label,
  href,
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

export default function FooterR() {
  return (
    <Center w={"100%"} >
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
    <Box 
      bg={'#B0C4DE'}
      color={useColorModeValue('gray.700', 'gray.200')} w='full'>
      <Container as={Stack} maxW={'full'} py={10}>
        <SimpleGrid
          templateColumns={{ sm: '2fr 2fr', md: '2fr 2fr 2fr 2fr' }}
          spacing={8}>
          <Stack spacing={6}>
            <Flex>
            <Box>
              <Image alt={'logo'} src={"/logo1.png"} width={{base:100,md:300}}/>
            </Box>
            <Box>
              <Text
            
            
           
            fontSize={"15px"}
            lineHeight={1.1}
            // fontWeight={600}
            mt={'5px'}
            textAlign='justify'
            
          >
            14 Avenue De Bourgogne, 
            
            
           
           
          </Text>
          <Text >91300, Massy</Text>
          <Text>
          Tel : 0033(0)605799059
          </Text>
          <Text>
          E-mail : support@rschain.net
          </Text>
            </Box>
            
            </Flex>
           
          
            <Stack direction={'row'} spacing={6} pt={10}>
              <SocialButton label={'facebook'} href={'#'}>
                <FaFacebookF />
              </SocialButton>
              <SocialButton label={'YouTube'} href={'#'}>
                <FaYoutube />
              </SocialButton>
              <SocialButton label={'Instagram'} href={'#'}>
                <FaInstagram />
              </SocialButton>
            </Stack>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Information</ListHeader>
            <Link href={'/'}>Accueil</Link>
            {/* <Link href={'/services'}>Services</Link> */}
            <Link href='/Terms'>Termes et Conditions</Link>
            {/* <Link>Privacy Policy</Link> */}
       
            <Link href={'https://chapbackofficefournisseur.vercel.app/'}  isExternal>Devenir Fournisseur</Link>
            {/* <Link href={'https://chapbackofficelivreur-regz6oep6-josiassehi-rschainnet.vercel.app/'}   isExternal>Devenir Livreur</Link> */}
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Mode de paiement</ListHeader>
            <Flex>
          <Icon as={FaCcPaypal} fontSize={50} mr={5}/>
          <Icon as={FaCcVisa}  fontSize={50} mr={5}/>
          <Icon as={FaCcMastercard}  fontSize={50} mr={5}/>
          
            </Flex>
          
         
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>    Recevez des codes promo!</ListHeader>
            <Stack direction={'Column'}>
            {/* <Text width={"250px"} fontWeight={"700"} fontSize={"20px"}>
                  
          </Text> */}
          <Input
            type={"text"}
            placeholder="support@rschain.net"
            background={"#D9d9d9"}
            // width={"317px"}
          
            height="40px"     
            mt="10px"
          />
          <br />
          <Button
            background="#08566e"
            borderRadius={50}
            mt={1}
            color="white"
           _hover={{
            background:"#08566f"
           }}
           
          >
            {" "}
            valider
          </Button>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
    </Center>
  );
}
