import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Center, Flex, Heading, Link, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';

const LadingCorps = () => {
    return (
        <>
            <Center>
                <Heading>Nos Articles</Heading>
            </Center>
            <Box>
                <Flex justifyContent={'space-between'} py={20}>
                    <Text fontSize={35}>Enfants</Text>
                    <Flex>
                        <Link href="/Enfants" fontSize={35}>Voir plus</Link>
                        <ChevronRightIcon height={65} fontSize={35} />
                    </Flex>
                </Flex>
                <SimpleGrid columns={[3, 3, 3, 4, 5]}></SimpleGrid>
            </Box>
        </>
    );
};

export default LadingCorps;