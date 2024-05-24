import { Button, Flex, FormControl, Input } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React from 'react';

const FormSection = () => {

  return (
    <>
      <Formik
        initialValues={{ seccion: "" }}
        onSubmit={(values) => {
          console.log(values.seccion);
          // Add your logic to save the section here
        }}
      >
      <Form>
        <Flex justifyContent={'center'} alignItems={'center'} flexDirection={"row"}>
          <Field name="seccion">
            {({ field }:any) => (
              <FormControl width={['40%','20%','20%']}>
                <Input  {...field} type="text" placeholder="Seccion" />
              </FormControl>
            )}
          </Field>
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