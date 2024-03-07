import { Button, useDisclosure } from '@chakra-ui/react'
import React from 'react'

function Sold({prix}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
    <Button colorScheme={"blue"} onClick={onOpen}>Régler</Button>
    
    </>
  )
}

export default Sold