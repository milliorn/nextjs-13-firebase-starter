import React, { useEffect, useState } from 'react';
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
import { getDatabase, ref, push, set } from 'firebase/database';
import { useAuthContext } from '@/context/AuthContext';
import { getFirestore } from 'firebase/firestore';
import firebase_app from '@/firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

const MenuModal: React.FC = ({isOpen, close, restaurantId}:any) => {
  const context = useAuthContext();
  const handleSubmit = async (values :any ) => {
    console.log('Form values:', values);

    console.log('User:', (context as any).user);
    const db = getFirestore(firebase_app);

    addDoc(collection(db, 'menus'), {
      ...values,
      restaurantId: restaurantId,
      sections:[],
      delete: false,
    })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
      close();
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
  };

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
                type: '',
                description: '',
              }}
              onSubmit={handleSubmit}
            >
          <Form>
          <ModalHeader>Nuevo Menu</ModalHeader>
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
                  <Field name="type">
                    {({ field }:any) => (
                      <FormControl>
                        <Input {...field} type="text" placeholder="Tipo" />
                      </FormControl>
                    )}
                  </Field>
                </Stack>
          </ModalBody>
          <ModalFooter>
            <Button  colorScheme='orange' mr={3} type="submit">
              Guardar
            </Button>
            <Button variant='ghost'>Cancelar</Button>
          </ModalFooter>
          </Form>
            </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MenuModal;