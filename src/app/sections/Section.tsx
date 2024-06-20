import { Flex,Heading,Spacer,IconButton, Box } from "@chakra-ui/react";
import { CloseIcon, EditIcon } from '@chakra-ui/icons';
const Section = ({section, onEdit}:any) => {
  
  const editHandle = () => {
    console.log("asd")
    onEdit(section.id)
  }

  return(
    <>
      <Box borderRadius='md' w='50%' px={4} border="1px solid grey" >
        <Flex>
          <Heading margin={1} size={'md'}>{section.name}</Heading>
          <Spacer/>
          <IconButton onClick={() => editHandle()} aria-label="Editar" margin='1' size={'sm'} icon={<EditIcon />} />
          <IconButton aria-label="Close" margin='1' size={'sm'} icon={<CloseIcon />} />
        </Flex>
      </Box>
    </>
  )
}

export default Section;
