import Navbar from "@/components/Navbar";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Label,
  FormControl,
  Flex,
  FormLabel,
  Input,
  Link,
  Stack,
  Checkbox,
  Box,
  Image,
  Alert,
  useToast,
  Toast,
  Center,
  Heading,
  Text,
} from "@chakra-ui/react";

export default function Connexion() {
  return (
    <>
      <Navbar />
      <Center>
        <Flex
          bgColor={"white"}
          borderRadius={5}
          mt={5}
          w={"90%"}
          h={500}
          mx={[5, 5, 5, 5, 12]}
          my={20}
          boxShadow={'0px 4px 24px '}
          box
        >
          <Box h={500}>
            <Image
              height={500}
              width={650}
              src="./images/Banniere.png"
              display={["none", "none", "flex", "flex", "flex"]}
            />
          </Box>
          <Center>
            <Box width={'full'} color={'black'} ml={20}>
              <Stack spacing={4}>
                <Heading>Bienvenue</Heading>
                <Text>Connectez-vous á votre compte</Text>
                <Input type={'text'} placeholder='Email' border={'2px solid gray'} borderRadius={'50px'} width={'350px'} color={'gray.500'} />
                <Input type={'password'} placeholder={'Mot de passe'} border={'2px solid gray'} borderRadius={'50px'} width={'350px'} />
                <Button borderRadius={'50px'} bgColor={'blue.400'} color={'white'}>Connexion </Button>
              </Stack>

            </Box>
          </Center>
        </Flex>
      </Center>
    </>
  );
}
