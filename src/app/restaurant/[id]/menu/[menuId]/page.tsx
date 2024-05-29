// app/page.tsx
'use client'
import { useRef, useEffect, useState } from "react";
import BreadcrumComponent from '../../../../components/breadcrum';
import FormMenu from '../formMenu';
import FormSection from '../../../../sections/formSection';
import SectionList from '../../../../sections/sectionList';
import ProductsList from '../../../../products/productList';
import ProductoModal from '../../../../products/productModal';
import {Center, Grid, GridItem, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import { Flex, Spacer, Box, Divider, Image, Heading, ButtonGroup, Button, Stack, SimpleGrid, FormControl, FormLabel, FormHelperText, Textarea } from '@chakra-ui/react' 
import { Card, CardHeader, CardBody } from '@chakra-ui/react'
import { useParams, useRouter } from "next/navigation";
import { collection, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import firebase_app from "@/firebase/config";

export default function Page() {
  const menuId : any = useParams().menuId;
  const ref = useRef(null);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.maxHeight = `${window.innerHeight}px`;
    }
  }, []);

  useEffect(() => {
    const db = getFirestore(firebase_app);
    const menusRef = collection(db, 'menus');
    const q = query(menusRef, where("menuId", "==", menuId));

    const unsub = onSnapshot(q, (snapshot) => {
      const data :any = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
      console.log(data);
      setMenu(data || []);
    });

    return () => {
      unsub();
    }
  }, []);

  
  return (
    <div ref={ref} >
      <GridItem area={'nav'}  rowSpan={8} colSpan={5}>
        <BreadcrumComponent />
        <Heading marginLeft={6}>
          Cafe San Juan
        </Heading>
      <Card margin={5} height={'100%'}  overflowY="scroll">
        <Grid
          h='100%'
          templateRows='repeat(5, 1fr)'
          templateColumns='repeat(3, 1fr)'
          gap={4}
        >
          <GridItem rowSpan={1} colSpan={3} bg='tomato' >
            <CardHeader>
              <Heading as='h2' size='md'>Menu</Heading>
            </CardHeader>
        </GridItem>
        <GridItem colStart={1} rowSpan={1} colSpan={1} bg='papayawhip' >
          <FormMenu/>
        </GridItem>
        <GridItem colStart={3} rowSpan={1} colSpan={1} bg='papayawhip'>
          qr
        </GridItem>
        <GridItem colSpan={4} bg='tomato' >
          <CardBody>
            <Heading as='h2' size='md'>Secciones</Heading>
          </CardBody>
        </GridItem>
        <GridItem colSpan={4} bg='yellow:200' >
            <FormSection/>
            <SectionList/>
        </GridItem>
        <GridItem colSpan={4} bg='tomato' >
          <CardBody>
            <Heading as='h2' size='md'>Productos</Heading>
          </CardBody>
          <Button marginLeft={5} color="orange" variant="solid" >
            Nuevo Productos
          </Button>
          <ProductsList/>
        </GridItem>
        </Grid>
        </Card>
      </GridItem>  
    <ProductoModal/>
</div>
  )
}