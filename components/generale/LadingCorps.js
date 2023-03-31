import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Center, Flex, Heading, Link, SimpleGrid, Text } from '@chakra-ui/react';

// les items de la cartegorie children
const ChildrenItem = [
    {
        productName: "T-shirt",
        backgroundUrl: 'url(./images/t-shirt/shirt-1.png)',
        link: "",
    },
    {
        productName: "Chemise Enfant",
        backgroundUrl: 'url(./images/t-shirt/chemise.png)',
        link: "",
    },
    {
        productName: "Robe",
        backgroundUrl: 'url(./images/t-shirt/robe-enfant.png)',
        link: "",
    },
    {
        productName: "Short Enfant",
        backgroundUrl: 'url(./images/t-shirt/short.png)',
        link: "",
    },
    {
        productName: "Pull Over ",
        backgroundUrl: 'url(./images/t-shirt/pullOver.png)',
        link: "",
    },
]

const WomanItem = [
    {
        productName: "T-shirt",
        backgroundUrl: 'url(./images/t-shirt/shirt2.png)',
        link: "",
    },
    {
        productName: "Chemise Femme",
        backgroundUrl: 'url(./images/t-shirt/chemise2.png)',
        link: "",
    },
    {
        productName: "Short Femme",
        backgroundUrl: 'url(./images/t-shirt/short2.png)',
        link: "",
    },
    {
        productName: "Pentalon",
        backgroundUrl: 'url(./images/t-shirt/pentalon.png)',
        link: "",
    },
    {
        productName: "Robe",
        backgroundUrl: 'url(./images/t-shirt/robe.png)',
        link: "",
    },
    {
        productName: "Pull Over ",
        backgroundUrl: 'url(./images/t-shirt/pullOver2.png)',
        link: "",
    },
]


const ManItem = [
    {
        productName: "T-shirt",
        backgroundUrl: 'url(./images/t-shirt/shirt3.png)',
        link: "",
    },
    {
        productName: "Chemise Homme",
        backgroundUrl: 'url(./images/t-shirt/chemise3.png)',
        link: "",
    },
    {
        productName: "Short Homme",
        backgroundUrl: 'url(./images/t-shirt/short.png)',
        link: "",
    },
    {
        productName: "Pentalon",
        backgroundUrl: 'url(./images/t-shirt/pentalon2.png)',
        link: "",
    },
    {
        productName: "Pull Over ",
        backgroundUrl: 'url(./images/t-shirt/pullOver.png)',
        link: "",
    },
]

export function ItemCardChildren({ item }) {
    return (
        <>
            {/* card  */}
            <Link
                height={'40vh'} width={'30%'} mt={'5'} mr={'3.3%'}
                _hover={{ textDecoration: 'none' }}
            >
                <Flex
                    height={'100%'} width={'100%'}
                    alignItems={'center'} justifyContent={'center'}
                    backgroundImage={item.backgroundUrl}
                    backgroundPosition={'center'} backgroundSize={'contain'} backgroundRepeat={'no-repeat'}
                >
                    <Flex
                        alignItems={'center'} justifyContent={'center'}
                        borderRadius={'10px'}
                        height={'100%'} width={'100%'}
                        bg={'rgba(0, 0, 0, 0.277)'}
                    >
                        <Text
                            fontWeight={'bold'} fontSize={'2xl'} color={'#fff'}
                            textAlign={'center'}
                        >
                            {item.productName}
                        </Text>
                    </Flex>
                </Flex>
            </Link>
        </>
    )
}

const LadingCorps = () => {
    return (
        <>
            <Center
                width={'100%'} height={'auto'}
            >
                <Box
                    height={'95%'} width={'95%'}
                >
                    {/* l'entet principale */}
                    <Heading
                        textAlign={'start'} color={"#fbb614"} mb={5}
                    >
                        Nos Articles
                    </Heading>

                    {/* la box de toutes les cartegorie */}
                    <Flex
                        height={'auto'} width={'100%'} mt={10}
                        direction={'column'} alignItems={'center'}
                        justifyContent={'center'}
                    >
                        {/* cartegorie Enfants */}
                        <Flex
                            width={'95%'} height={'auto'}
                            direction={'column'} alignItems={'center'} justifyContent={'space-between'}
                        >
                            <Flex
                                alignItems={'center'} justifyContent={'center'}
                            >
                                <Heading
                                    height={'auto'} width={'100%'} display={'flex'}
                                    alignItems={'center'} justifyContent={'space-between'}
                                >
                                    Enfants
                                </Heading>
                            </Flex>


                            <Flex
                                height={'auto'} width={'100%'}
                                flexWrap={'wrap'}
                                direction={'row'}
                            >
                                {
                                    ChildrenItem.map((item, key) => (
                                        <ItemCardChildren key={key} item={item}></ItemCardChildren>
                                    ))
                                }
                            </Flex>
                        </Flex>

                        {/* cartegorie femme */}
                        <Flex
                            width={'95%'} height={'auto'} mt={10}
                            direction={'column'} alignItems={'center'} justifyContent={'space-between'}
                        >
                            <Flex
                                alignItems={'center'} justifyContent={'center'}
                            >
                                <Heading
                                    height={'auto'} width={'100%'} display={'flex'}
                                    alignItems={'center'} justifyContent={'space-between'}
                                >
                                    Femme
                                </Heading>
                            </Flex>


                            <Flex
                                height={'auto'} width={'100%'}
                                flexWrap={'wrap'}
                                direction={'row'}
                            >
                                {
                                    WomanItem.map((item, key) => (
                                        <ItemCardChildren key={key} item={item}></ItemCardChildren>
                                    ))
                                }
                            </Flex>
                        </Flex>

                        {/* cartegorie femme */}
                        <Flex
                            width={'95%'} height={'auto'} mt={10}
                            direction={'column'} alignItems={'center'} justifyContent={'space-between'}
                        >
                            <Flex
                                alignItems={'center'} justifyContent={'center'}
                            >
                                <Heading
                                    height={'auto'} width={'100%'} display={'flex'}
                                    alignItems={'center'} justifyContent={'space-between'}
                                >
                                    Homme
                                </Heading>
                            </Flex>


                            <Flex
                                height={'auto'} width={'100%'}
                                flexWrap={'wrap'}
                                direction={'row'}
                            >
                                {
                                    ManItem.map((item, key) => (
                                        <ItemCardChildren key={key} item={item}></ItemCardChildren>
                                    ))
                                }
                            </Flex>
                        </Flex>


                    </Flex>

                </Box>
            </Center>
        </>
    );
};

export default LadingCorps;