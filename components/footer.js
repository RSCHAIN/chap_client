import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <>
      <Flex justifyContent={"space-between"}>
        <Box>
          <Heading
            color={"#fbb614"}
            width={"152px"}
            fontSize={"32px"}
            lineHeight={"24px"}
            fontWeight={700}
            ml={"80px"}
          >
            FripChap
          </Heading>
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
            Abidjan 01 Bp , Contre allée Côte d’Ivoire Telecom, Immeuble Western
            Union, Aile droite 2ème et 3ème étages 10 BP 991 Abidjan, Côte
            d’Ivoire
            <br /> Tel : (225)xxx-xxx-xxx
            <br />
            E-mail : infos@fripchap.com
          </Text>
        </Box>
        <Box>
          <Text fontWeight={500} fontSize="20px">
            Information
          </Text>
          <Text mt={'10px'}>Home</Text>
          <Text>Services</Text>
        </Box>
        <Box>
          <Text fontWeight={500} fontSize="20px">
            Categories
          </Text>
          <Text mt={'10px'}>Homme</Text>
          <Text>Femme</Text>
          <Text>Enfants</Text>
        </Box>
        <Box>
          <Text width={"250px"} fontWeight={"700"} ml="30px" fontSize={"20px"}>
            Recevez des codes promo!
          </Text>
          <Input
            type={"text"}
            placeholder="infos@fripchap.com"
            background={"#D9d9d9"}
            width={"317px"}
            mr="50px"
            height="40px"
            mt="10px"
          />
          <br />
          <Button
            background="#3e82d7"
            borderRadius={50}
            padding={"8px 30px"}
            color="white"
            ml={"25%"}
            mt={"10px"}
          >
            {" "}
            valider
          </Button>
        </Box>
      </Flex>
    </>
  );
}
