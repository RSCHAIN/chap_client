import React, { useEffect, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Text,
    Link,
    Image,
    Center,
  } from '@chakra-ui/react'


 
function PopupAppMobile() {
    const { isOpen, onOpen, onClose } = useDisclosure()
   
    useEffect(()=>{
        if (JSON.parse(localStorage.getItem("showed")) && JSON.parse(localStorage.getItem("showed")) == true) {
           
        }else{
            onOpen()  // Show the modal when component loads for the first time
        }
        localStorage.setItem("showed",true) 
        
    },[])
  return (
   <>
    <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent borderRadius={"5px"} >
          <ModalHeader><Center>Disponible sur  APPSTORE</Center></ModalHeader>
          <ModalCloseButton />
          <ModalBody >
          <Text textAlign={"center"} fontWeight={600} mx={10} mb={5} > Profiter de nos services à travers notre application mobile</Text>

            <Center display={"grid"}>
            <Link href='https://play.google.com/store/apps/details?id=com.rschain.Chapapp'><Image src='./playstore.png' width={"200px"} height={'50px'}/></Link>
            </Center>
          </ModalBody>

          
        </ModalContent>
      </Modal>
   </>
  )
}

export default PopupAppMobile