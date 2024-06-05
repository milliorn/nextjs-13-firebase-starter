import { Button, Flex, FormControl, Input } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { getFirestore, updateDoc, doc, addDoc, collection } from 'firebase/firestore';
import firebase_app from '@/firebase/config';
const FormSection = ({menuId, refreshList} : any) => {

  const handleSubmit = async (values :any ) => {

    const db = getFirestore(firebase_app);

    addDoc(collection(db, 'sections'), {
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
  };

  return (
    <>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={handleSubmit}
      >
      <Form>
        <Flex justifyContent={'center'} alignItems={'center'} flexDirection={"row"}>
            <FormControl>
                <Field as={Input}  name="name" type="text" placeholder="Nombre" />
              </FormControl>
          <Button marginLeft={5} color="orange" variant="solid" type="submit">
            Agregar
          </Button>
          </Flex>
        </Form>
      </Formik>
    </>
  );
}

export default FormSection;