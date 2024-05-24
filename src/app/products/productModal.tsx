import React from 'react';
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

const ProductModal: React.FC = () => {
  return (
    <>
      <Modal isOpen={false} onClose={() => console.log("aasd")} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nuevo Producto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Formik
              initialValues={{ seccion: "" }}
              onSubmit={(values) => {
                console.log(values.seccion);
                // Add your logic to save the section here
              }}
            >
              <Form>
              <Stack  >
                <Field name="name">
                  {({ field }:any) => (
                    <FormControl>
                      <Input  {...field} type="text" placeholder="Nombre" />
                    </FormControl>
                  )}
                </Field>
                <Field name="decripcion">
                  {({ field }:any) => (
                    <FormControl>
                      <Input  {...field} type="text" placeholder="Descripcion" />
                    </FormControl>
                  )}
                </Field>
                <Field name="price">
                  {({ field }:any) => (
                    <FormControl>
                      <Input  {...field} type="number" placeholder="Precio" />
                    </FormControl>
                  )}
                </Field>
                <Field name="price">
                  {({ field }:any) => (
                    <FormControl>
                      <Input  {...field} type="number" placeholder="Imagen" />
                    </FormControl>
                  )}
                </Field>
                </Stack>
              </Form>
            </Formik>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='orange' mr={3} >
              Guardar
            </Button>
            <Button variant='ghost'>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductModal;