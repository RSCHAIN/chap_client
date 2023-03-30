import { Search2Icon } from '@chakra-ui/icons';
import { Button, IconButton, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
// fontawesone Icone 
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearcheIcone = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <IconButton
                variant='outline'
                color={"#fbb614"}
                fontSize={'2xl'}
                aria-label='Send email'
                icon={<Search2Icon />}
                onClick={onOpen}
                border={'none'}
            />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color={"#fbb614"}>Recharcher un article</ModalHeader>
                    <ModalCloseButton color={"#fbb614"} />
                    <ModalBody>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                            >
                                <FontAwesomeIcon icon={faSearch} color={"#fbb614"} />
                            </InputLeftElement>
                            <Input
                                type='text'
                                placeholder='Nom'
                                _placeholder={{ color: '#000' }}
                                variant={'outline'}
                                color={"#000"}
                                borderRadius={'full'}
                                outline={'none'}
                            />
                        </InputGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button background={'#fbb614'} color={'#fff'} mr={3} onClick={onClose}>
                            Annuler
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default SearcheIcone;