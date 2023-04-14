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
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 2fr 2fr' }}
          spacing={8}>
          <Stack spacing={6}>
            <Box>
              <Logo color={useColorModeValue('gray.700', 'white')} />
            </Box>
            <Text
            width="350px"
            height={"105px"}
            ml={"56px"}
            fontSize={"15px"}
            lineHeight={"24px"}
            fontWeight={700}
            mt={'20px'}
            textAlign='justify'
          >
            Abidjan 01 Bp 
            <br /> Tel : (225)xxx-xxx-xxx
            <br />
            E-mail : infos@chap.com
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
            <Link href={'/services'}>Services</Link>
            <Link>Terms of service</Link>
            <Link>Privacy Policy</Link>
            <Link>Manage Cookies</Link>
          
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>    Recevez des codes promo!</ListHeader>
            <Stack direction={'Column'}>
            <Text width={"250px"} fontWeight={"700"} fontSize={"20px"}>
        
          </Text>
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
            background="#3e82d7"
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
  );
}