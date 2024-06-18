import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import { CloseButton, Flex, Spacer, Box, Card, CardBody, Stack, Heading, Text, CardFooter, ButtonGroup, Button, IconButton } from '@chakra-ui/react'

const Sections = () => {  
  return(
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
  )
}

export default Sections;