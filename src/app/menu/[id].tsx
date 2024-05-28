// app/page.tsx
'use client'
import { useRef, useEffect } from "react";
import Navbar from '../components/navbar';
import BreadcrumComponent from '../components/breadcrum';
import FormMenu from './FormMenu';
import FormSection from '../sections/formSection';
import SectionList from '../sections/sectionList';
import ProductsList from '../products/productList';
import ProductoModal from '../products/productModal';
import {Center, Grid, GridItem, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import { Flex, Spacer, Box, Divider, Image, Heading, ButtonGroup, Button, Stack, SimpleGrid, FormControl, FormLabel, FormHelperText, Textarea } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons';
 import { Field, Form, Formik } from 'formik';
 import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons';
import Head from "next/head";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react'
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.maxHeight = `${window.innerHeight}px`;
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