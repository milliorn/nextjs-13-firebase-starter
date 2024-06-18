import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import { CloseButton, Flex, Spacer, Box, Card, CardBody, Stack, Heading, Text, CardFooter, ButtonGroup, Button, IconButton } from '@chakra-ui/react'
import SectionModal from './SectionModal'
import { useState } from 'react';

const Sections = ({menu}:any) => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return(
    <>
      <Button onClick={openModal}>Agregar Seccion</Button>
      <Flex>
        <Box w='15' h='10' />
        <Spacer />
        <Box borderRadius='md' w='50%' px={4} border="1px solid grey" >
          <Flex>
            <Heading margin={1} size={'md'}>seccion 1</Heading>
            <Spacer/>
            <IconButton aria-label="Editar" margin='1' size={'sm'} icon={<EditIcon />} />
            <IconButton aria-label="Close" margin='1' size={'sm'} icon={<CloseIcon />} />
          </Flex>
        </Box>
        <Spacer />
        <Box w='15' h='10' />
      </Flex>
      <SectionModal isOpen={isOpen} close={closeModal} menu={menu}/>
    </>
  )
}

export default Sections;
