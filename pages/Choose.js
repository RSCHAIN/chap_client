import InputBar from "@/components/InputBar";
import Navbar from "@/components/Navbar";
import { Button, Center, Flex, Link, useMediaQuery } from "@chakra-ui/react";

export default function Intermediary() {
  const [isLagerThan768] = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <InputBar />
      {isLagerThan768 ? <Navbar></Navbar> : <></>}
      <Center mt={"15%"}>
        <Flex>
          <Link
            href={"/Connexion"}
            _hover={{
              textDecoration: "none",
            }}
          >
            <Button mr={10} bgColor={"cyan.50"} _hover={{
              bgColor:"cyan.700"
            }}>
              Connexion Client
            </Button>
          </Link>
          <Link
            href={"https://chapbackofficefournisseur.vercel.app/"}
            isExternal
            mr={10}
            _hover={{
                textDecoration: "none",
              }}
          >
            <Button bgColor={"cyan.50"} _hover={{
              bgColor:"cyan.700"
            }}>Connexion Fournisseur</Button>
          </Link>
          <Link
            href="https://chapbackofficelivreur-regz6oep6-josiassehi-rschainnet.vercel.app/"
            isExternal
            mr={10}
            _hover={{
                textDecoration: "none",
              }}
          >
            <Button bgColor={"cyan.50"} _hover={{
              bgColor:"cyan.700"
            }}>Connexion Livreur</Button>
          </Link>
        </Flex>
      </Center>
    </>
  );
}
