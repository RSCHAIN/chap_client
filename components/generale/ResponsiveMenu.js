import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import MenuItem_Link from './MenuItem_Link';
import { HamburgerIcon } from "@chakra-ui/icons";

const ResponsiveMenu = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button
                onClick={onOpen} variant='outline' colorScheme='#08566e'
                rightIcon={<HamburgerIcon />} mr={{ base: 4, md: 0 }}
            >
                Menu
            </Button>
            <Drawer isOpen={isOpen} onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Menu</DrawerHeader>

                    <DrawerBody>
                        <MenuItem_Link />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default ResponsiveMenu;