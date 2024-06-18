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

const SectionModal = ({close, isOpen, section, menu}:any) => {
  const [initialValues, setInitialValues] = useState(null)
  
  const handleSubmit = async (values :any ) => {
    console.log('Form values:', values);
    const db = getFirestore(firebase_app);

    if(values.id){
      //updateRestaurant(db, values)
    }else{
      createSection(db, values)
    }
    close(); 
  };


  const createSection = async (db:any,values :any) => {
    console.log(menu)
    const menuDocRed = doc(db, 'menus', menu.id);
    const newSection = menu.sections;
    newSection.push(values);
    await updateDoc(menuDocRed, {sections: newSection});   
    console.log('Document updated successfully!');
    
    /* addDoc(collection(db, 'restaurants'), {
      ...values,
      delete: false,
    })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
      close();
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    }); */
  }

/*   const updateRestaurant = async (db:any, values :any) => {
    try {
        const db = getFirestore(firebase_app);
        const restaurantDocRed = doc(db, 'restaurants', restaurant.id);
        await updateDoc(restaurantDocRed, values);   
        console.log('Document updated successfully!');
    } catch (error) {
        console.error('Error updating document: ', error);
    }
  } */
  
  useEffect(() => {
    if(section==null){
      setInitialValues({ 
                id:null,
                name: '',
                description: ''
      })
    }else{
      setInitialValues({
        id: section.id,
        name: section.name,
        description: section.description
      })
    }


  },[section])

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
