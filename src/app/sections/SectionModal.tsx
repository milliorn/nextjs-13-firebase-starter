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

const SectionModal = ({isOpen}:any) => {
  const [initialValues, setInitalValues] = useState(null)
  
  const handleSubmit = () => {
    alert("asd")
  }

  const  handleOnClose = () => {
    close();
  }

  return(
    <>
       <Modal isOpen={isOpen} onClose={handleOnClose} >
        <ModalOverlay />
        <ModalContent>
        <Formik
              initialValues={initialValues}
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
  )
}

export default SectionModal;
