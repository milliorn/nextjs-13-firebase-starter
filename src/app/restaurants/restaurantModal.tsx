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

const RestaurantModal: React.FC = ({isOpen, close}:any) => {
  const context = useAuthContext();
  const handleSubmit = async (values :any ) => {
    console.log('Form values:', values);

    console.log('User:', (context as any).user);
    const db = getFirestore(firebase_app);
    const user = (context as any).user;

    addDoc(collection(db, 'restaurants'), {
      ...values,
      ownerId: user?.uid,
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
                description: '',
                address: '',
                phone: '',
                instagram: ''
              }}
              onSubmit={handleSubmit}
            >
              <Form>
          <ModalHeader>Nuevo Restaurant</ModalHeader>
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
                  <Field name="address">
                    {({ field }:any) => (
                      <FormControl>
                        <Input {...field} type="text" placeholder="Direccion" />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="phone">
                    {({ field }:any) => (
                      <FormControl>
                        <Input {...field} type="phone" placeholder="Telefono" />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="instagram">
                    {({ field }:any) => (
                      <FormControl>
                        <Input {...field} type="text" placeholder="Instagram usuario" />
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

export default RestaurantModal;