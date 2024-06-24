import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Input,
  Stack,
  Select
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { updateDoc, getFirestore,doc } from 'firebase/firestore';
import firebase_app from '@/firebase/config';
import { m } from 'framer-motion';
const ProductModal: React.FC = ({ product, menu, refreshList, isOpen, close } : any) => {
const [initialValues, setInitialValues] = useState(null)

  const handleSubmit = async (values: any) => {
    /*console.log('Form values:', values);
    const db = getFirestore(firebase_app);
    addDoc(collection(db, 'products'), {
      ...values,
      menuId: menu.id,
    })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
      close()
      refreshList();
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });*/
    const db = getFirestore(firebase_app);
 
    try {
        const menuDocRef = doc(db, 'menus', menu.id);
        const newSections = menu.sections;

        // Find the index of the object to update
        console.log(values)
        const index = newSections.findIndex((item:any) => item.id === values.section);
        const newValues =  {...values, id: uuidv4()}
    
        // Update the object
        //newSections[index] = { ...newSections[index], newValues };
        const products = menu.sections[index].products
        products.push(newValues)
        newSections[index] = { ...newSections[index], products: products };
        // Update the document with the modified array
        await updateDoc(menuDocRef, {
          sections: newSections
        });   
        console.log('Document updated successfully!');
        close()
        refreshList();
    } catch (error) {
        console.error('Error updating document: ', error);
    }
    
  } 

  useEffect(()=>{
    if(product==null){
      setInitialValues({
        id:null,
        name:'',
        price:'',
        description: '',
        section: null
      })
    }else{
      setInitialValues({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        section: product.section
      })
    }
  }, [product])

  const  handleOnClose = () => {
    close();
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={handleOnClose} >
        <ModalOverlay />
        <ModalContent>
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            >
          <Form>
          <ModalHeader>Nuevo Producto1</ModalHeader>
          <ModalCloseButton onClick={() => handleOnClose} />
          <ModalBody>
                <Stack spacing={4}>
                  <Field name="name">
                    {({ field }:any) => (
                      <FormControl>
                        <Input {...field} type="text" placeholder="Nombre" />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="description">
                    {({ field }:any) => (
                      <FormControl>
                        <Input {...field} type="text" placeholder="Descripcion" />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="price">
                    {({ field }:any) => (
                      <FormControl>
                        <Input {...field} type="text" placeholder="Preciao" />
                      </FormControl>
                    )}
                  </Field>
                 <Field name="section">
                  {({ field }:any) => (
                  <FormControl>
                    <Select {...field} placeholder="Seleccione una seccion">
                          {
                            menu.sections.map((section) => (
                              <option value={section.id}>{section.name}</option>
                            ))
                          }
                    </Select>
                  </FormControl>
                  )}
                </Field>
                </Stack>
          </ModalBody>
          <ModalFooter>
            <Button  colorScheme='orange' mr={3} type="submit">
              Guardar
            </Button>
            <Button onClick={handleOnClose} variant='ghost'>Cancelar</Button>
          </ModalFooter>
          </Form>
            </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductModal;
