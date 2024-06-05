import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import firebase_app from '@/firebase/config';

const ProductModal: React.FC = ({ menuId, refreshList, isOpen, close } : any) => {

  const[product, setProduct] = useState({name: '', description: ''})
  const handleSubmit = async (values: any) => {
    console.log('Form values:', values);
    const db = getFirestore(firebase_app);
    addDoc(collection(db, 'products'), {
      ...values,
      menuId: menuId,
    })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
      refreshList();
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
  } 
  const  handleOnClose = () => {
    close();
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={handleOnClose} >
        <ModalOverlay />
        <ModalContent>
        <Formik
              initialValues={{ 
                name: '',
                price: '',
                description: '',
              }}
              onSubmit={handleSubmit}
            >
          <Form>
          <ModalHeader>Nuevo Producto</ModalHeader>
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
                        <Input {...field} type="text" placeholder="Precio" />
                      </FormControl>
                    )}
                  </Field>
                </Stack>
          </ModalBody>
          <ModalFooter>
            <Button  colorScheme='orange' mr={3} type="submit">
              Guardar
            </Button>
            <Button onClick={() => handleOnClose} variant='ghost'>Cancelar</Button>
          </ModalFooter>
          </Form>
            </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductModal;