import InputBar from "@/components/InputBar";
import Navbar from "@/components/Navbar";
import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";

export default function Who() {
  const [isLagerThan768] = useMediaQuery("(min-width: 768px)");
  const a1 = "L’App";

  const a2 = "d’offrir";
  return (
    <>
      <InputBar />
      <Navbar></Navbar>
      <Center>
        <Box width={"80%"} mx={"25%"} display={"flex"}>
          <Box width={"50%"}>
          <Image src="./logo1.png" alt="logo de chap" />
          </Box>
          
          <Box ml={10} mt={20}>
            <Heading>Qui Sommes Nous?</Heading>
            <Text textAlign={"justify"} fontSize={"1em"} mt={5}>
              {a1} Chap est un produit français qui a été conçu en France et
              développé en Côte d’Ivoire par notre partenaire RSCHAIN. Née(crée)
              dans l’objectif d’améliorer le quotidien des africains de la
              diaspora, {a1} Chap propose le rapprochement de cette dernière
              (Diaspora) par la mise en vente de produits alimentaires,
              esthétiques, de vêtements et d’objet d’arts africains, tout en
              faisant la promotion de la diversité culinaire africaine. Chap
              agit ainsi comme intermédiaire entre les commerçants et les
              clients dans le but de booster le commerce des moyens artisans,
              afin {a2} aux clients plus de choix de sorte à maximiser ses
              économies.{" "}
            </Text>
          </Box>
        </Box>
      </Center>
    </>
  );
}
