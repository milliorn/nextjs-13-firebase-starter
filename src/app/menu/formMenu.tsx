import { Button, FormControl, Input, Textarea } from '@chakra-ui/react';
import React from 'react';

const FormMenu = () => {
  return (
    <div>
      <FormControl marginBottom={5} id="name">
        {/* <FormLabel>Nombre</FormLabel> */}
        <Input type="text" placeholder="Nombre" />
      </FormControl>
      <FormControl id="name" marginBottom={5}>
        {/* <FormLabel>Descripcion</FormLabel> */}
        <Textarea placeholder="Descripcion"/>
      </FormControl>
      <Button color="orange" variant={'solid'}>
        Guardar
      </Button>
    </div>
  );
};

export default FormMenu;
