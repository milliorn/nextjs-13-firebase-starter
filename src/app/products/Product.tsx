import { Flex,Heading,Spacer,IconButton, Box } from "@chakra-ui/react";
import { CloseIcon, EditIcon } from '@chakra-ui/icons';
const Product = ({product, onEdit, onDelete}:any) => {
  
  const editHandle = () => {
    onEdit(product.id)
  }

  const handleDelete = () => {
    console.log("delete")
    onDelete(product.id)
  }

  return(
    <>
      <Box borderRadius='md' w='50%' px={4} border="1px solid grey" >
        <Flex>
          <Heading margin={1} size={'md'}>{product.name}</Heading>
          <Spacer/>
          <IconButton onClick={() => editHandle()} aria-label="Editar" margin='1' size={'sm'} icon={<EditIcon />} />
          <IconButton onClick={() => handleDelete()} aria-label="Close" margin='1' size={'sm'} icon={<CloseIcon />} />
        </Flex>
      </Box>
    </>
  )
}

export default Product;
