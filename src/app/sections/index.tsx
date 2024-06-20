import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import { CloseButton, Flex, Spacer, Box, List, ListItem, Stack, Heading, Text, CardFooter, ButtonGroup, Button, IconButton } from '@chakra-ui/react'
import SectionModal from './SectionModal'
import { useState } from 'react';
import Section from './Section';

const Sections = ({menu}:any) => {
  const [isOpen, setIsOpen] = useState(false)
  const [idSectionForEdit, setIdSectionForEdit] = useState();


  const edit = (id:any) => {
    setIdSectionForEdit(id)
    openModal()
  }

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
        <List width={'100%'}>
          {menu.sections.map((section:any) => (
          <ListItem>
            <Section onEdit={edit} section={section}/> 
          </ListItem>
          ))} 
        </List>
      </Flex>
      <SectionModal isOpen={isOpen} close={closeModal} menu={menu} idSection={idSectionForEdit} />
    </>
  )
}

export default Sections;
