import React,{useEffect, useState}  from 'react'
import ProductModal from './productModal';
import { CardBody, Flex, Spacer, Box, List, ListItem, Stack, Heading, Text, CardFooter, ButtonGroup, Button, IconButton } from '@chakra-ui/react'
import Product from './Product';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import firebase_app from '@/firebase/config';

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
  const deleteProduct = async (product : any) => {
    const db = getFirestore(firebase_app);

    try {
        //const newSections = clonedSections.filter((item:any) => item.id !==  id);

        const menuDocRef = doc(db, 'menus', menu.id);
        const newSections = menu.sections;

        // Find the index of the object to update
        console.log("product", product)
        const index = newSections.findIndex((item:any) => item.id === product.section);
    
        const products = menu.sections[index].products.filter((item:any)=> item.id !== product.id)
          
        newSections[index] = { ...newSections[index], products: products };
        // Update the document with the modified array
        await updateDoc(menuDocRef, {
          sections: newSections
        });   
        console.log('Document updated successfully!');
        onRefreshMenu()
      console.log('Document updated successfully!');
    } catch (error) {
        console.error('Error updating document: ', error);
    }
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
