import { Search2Icon } from '@chakra-ui/icons';
import { Button, IconButton, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
// fontawesone Icone 
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearcheIcone = (message) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
        <Input type='search' placeholder={Object.values(message)} w={{ md: "15em", lg: "20em" }}/>
            <IconButton
                variant='outline'
                color={"#08566E"}
                fontSize={'2xl'}
                aria-label='Send email'
                icon={<Search2Icon />}
                onClick={onOpen}
                border={'none'}
            />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader  color={"#08566E"}>{Object.values(message)}</ModalHeader>
                    <ModalCloseButton color={"#08566E"} />
                    <ModalBody>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                            >
                                <FontAwesomeIcon icon={faSearch} color={"#08566E"} />
                            </InputLeftElement>
                            <Input
                            
                                type='search'
                                
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
                        <Button background={'#08566E'} color={'#fff'} mr={3} onClick={onClose}>
                            Annuler
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default SearcheIcone;