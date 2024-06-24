import React,{useEffect, useState}  from 'react'
import ProductModal from './productModal';
import { CardBody, Flex, Spacer, Box, List, ListItem, Stack, Heading, Text, CardFooter, ButtonGroup, Button, IconButton } from '@chakra-ui/react'
import Product from './Product';

const Products = ({menu, onRefreshMenu}:any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([])
  const changeIsOpenModal = () => {
    console.log('new product')
    setIsOpen(!isOpen);
  }
  
  const handleRefreshProducts = () => {
    console.log("refresh")
    onRefreshMenu()
  }
  const deleteProduct = () => {
    console.log("delete product")
  }

  const editProduct = () => {
    console.log("edit product")
  }

  useEffect(() => {
    let newProducts :any= []
    menu.sections.forEach((section :any) => {
      newProducts = newProducts.concat(section.products) 
    });

    setProducts(newProducts)
  }, [menu])

  return(
    <>
      <CardBody>
        <Heading as='h2' size='md'>Productos</Heading>
      </CardBody>
      <Button 
        onClick={changeIsOpenModal}
        marginLeft={5} color="orange" variant="solid" >
        Nuevo Productos
      </Button>
      <Flex>        
        <List width={'100%'}>
          {products.map((product:any) => (
          <ListItem>
            <Product onEdit={editProduct} onDelete={deleteProduct} product={product}/> 
          </ListItem>
          ))} 
        </List>
      </Flex>
      <ProductModal isOpen={isOpen} close={changeIsOpenModal}  refreshList={handleRefreshProducts}  menu={menu}/>
    </>
  )
}

export default Products;
