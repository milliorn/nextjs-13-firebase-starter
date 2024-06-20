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
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import firebase_app from '@/firebase/config';
import { v4 as uuidv4 } from 'uuid';
const SectionModal = ({close, isOpen, idSection, menu}:any) => {
  const [initialValues, setInitialValues] = useState(null)
  
  const handleSubmit = async (values :any ) => {
    console.log('Form values:', values);
    const db = getFirestore(firebase_app);

    if(values.id){
      updateRestaurant(db, values)
    }else{
      createSection(db, values)
    }
    close(); 
  };


  const createSection = async (db:any,values :any) => {
    console.log(menu)
    const newValues = {...values, id: uuidv4()}
    const menuDocRed = doc(db, 'menus', menu.id);
    const newSection = menu.sections;
    newSection.push(newValues);
    await updateDoc(menuDocRed, {sections: newSection});   
    console.log('Document updated successfully!');
    

  }

   const updateRestaurant = async (db:any, values :any) => {
    try {
        const menuDocRef = doc(db, 'menus', menu.id);
        const array = menu.sections;

        // Find the index of the object to update
        const index = array.findIndex((item:any) => item.id === values.id);

    
        // Update the object
        array[index] = { ...array[index], ...values };

        // Update the document with the modified array
        await updateDoc(menuDocRef, {
          sections: array
        });   
        console.log('Document updated successfully!');
    } catch (error) {
        console.error('Error updating document: ', error);
    }
  } 
  
  useEffect(() => {
    if(idSection==null){
      setInitialValues({ 
                id:null,
                name: '',
                description: ''
      })
    }else{
      const section = menu.sections.find((item) => item.id === idSection)
      setInitialValues({
        id: section.id,
        name: section.name,
        description: section.description
      })
    }


  },[idSection])

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
          <ModalHeader>Nueva Seccion</ModalHeader>
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
