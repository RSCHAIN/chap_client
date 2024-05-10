import { Button, Modal, ModalContent, ModalHeader, ModalOverlay, useDisclosure,ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react'
import React from 'react'
import Head from "next/head";



function Sold({prix}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
    <>
    <Head>
                <script
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-RFSVQTGJ87"
                ></script>
                <script strategy="lazyOnload">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date()); 
                gtag('config', 'G-RFSVQTGJ87');
                `}
                
                </script>
            </Head>
    <Button colorScheme={"blue"} onClick={onOpen}>Régler</Button>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Sold