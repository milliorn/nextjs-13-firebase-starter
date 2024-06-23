import React,{useState}  from 'react'
import { CardBody, Heading, Button } from "@chakra-ui/react";
import ProductModal from './productModal';

const Products = ({menu, onRefreshMenu}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const changeIsOpenModal = () => {
    console.log('new product')
    setIsOpen(!isOpen);
  }
  
  const handleRefreshProducts = () => {
    onRefreshMenu()
  }

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
      <ProductModal isOpen={isOpen} close={changeIsOpenModal}  refreshList={handleRefreshProducts}  menu={menu}/>
    </>
  )
}

export default Products;
