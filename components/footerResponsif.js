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
  IconButton,
  useColorModeValue,
  Heading,
  Button,
  Center,
  Image
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { BiMailSend } from 'react-icons/bi';

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
    <Center>
    <Box
      bg={'#B0C4DE'}
      color={useColorModeValue('gray.700', 'gray.200')} w='full'>
      <Container as={Stack} maxW={'full'} py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 2fr 2fr' }}
          spacing={8}>
          <Stack spacing={6}>
            <Box>
              <Image alt={'logo'} src={"/logo1.png"} width={{base:200,md:300}}/>
            </Box>
            <Text
            
            height={"105px"}
            ml={"56px"}
            fontSize={"15px"}
            lineHeight={"24px"}
            fontWeight={700}
            mt={'20px'}
            textAlign='justify'
            
          >
            14,Avenue De Bourgogne,91300,Massy
            <br /> Tel : (33)060-057-990-59
            <br />
            E-mail : support@rschain.net
          </Text>
          <Text>
            {/* {new Date} */}
          </Text>
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
            <Link href={'/'}>Home</Link>
            {/* <Link href={'/services'}>Services</Link> */}
            <Link href='/Terms'>Termes et Conditions</Link>
            {/* <Link>Privacy Policy</Link> */}
            <Link>Manage Cookies</Link>
            <Link >Devenir Fournisseur</Link>
            <Link >Devenir Livreur</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>    Recevez des codes promo!</ListHeader>
            <Stack direction={'Column'}>
            {/* <Text width={"250px"} fontWeight={"700"} fontSize={"20px"}>
        
          </Text> */}
          <Input
            type={"text"}
            placeholder="infos@chap.com"
            background={"#D9d9d9"}
            // width={"317px"}
          
            height="40px"
            mt="10px"
          />
          <br />
          <Button
            background="#08566e"
            borderRadius={50}
          
            color="white"
           
           
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