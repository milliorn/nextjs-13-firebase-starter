// app/page.tsx
'use client'
import { useRef, useEffect, useState } from "react";
import BreadcrumComponent from '../../../../components/breadcrum';
import FormMenu from '../formMenu';
import FormSection from '../../../../sections/formSection';
import SectionList from '../../../../sections/sectionList';
import ProductsList from '../../../../products/productList';
import ProductModal from '../../../../products/productModal';
import {Center, CloseButton, Grid, GridItem, IconButton, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import { Flex, Spacer, Box, Divider, Image, Heading, ButtonGroup, Button, Stack, SimpleGrid, FormControl, FormLabel, FormHelperText, Textarea } from '@chakra-ui/react' 
import { Card, CardHeader, CardBody } from '@chakra-ui/react'
import { useParams, useRouter } from "next/navigation";
import { collection, doc, getDoc, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import firebase_app from "@/firebase/config";
import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import Sections from "@/app/sections";
import Products from "@/app/products";

export default function Page() {
  const menuId : any = useParams().menuId;
  const ref = useRef(null);
  const [menu, setMenu] :any = useState(null);
  const [sections, setSections] : any = useState([]);
  const [products, setProducts] : any = useState([]);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.maxHeight = `${window.innerHeight}px`;
    }
  }, []);

  async function getMenu(menuId : any) {
    console.log(menuId)
    const db = getFirestore(firebase_app);
    const menuDocRef = doc(db, 'menus', menuId);
    const menuDocSnap = await getDoc(menuDocRef);
  
    if (menuDocSnap.exists()) {
      console.log("Menu data:", menuDocSnap.data());
      const newMenu = {...menuDocSnap.data(), id: menuDocSnap.id}
      setMenu(newMenu); // Specify the type of `menu` as `null`
    } else {
      console.log("No such menu!");
    }
  }

  const getSections = () => {
    const db = getFirestore(firebase_app);
    const sectionQuery = query(collection(db, 'sections'), where('menuId', '==', menuId));
    onSnapshot(sectionQuery, (querySnapshot) => {
      const sections = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSections(sections);
    });
  }

  const getProducts = () => {
    const db = getFirestore(firebase_app);
    const productQuery = query(collection(db, 'products'), where('menuId', '==', menuId));
    onSnapshot(productQuery, (querySnapshot) => {
      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(products);
    });
  }

  const handleRefreshSections = () => {
    getSections()
  }

  const handleRefreshProducts = () => {
    getProducts()
  }
  const refreshMenu = ()=> {
    getMenu(menuId)
  }
  useEffect(() => {
    getMenu(menuId);
    getSections();
    getProducts();
  }, []);

  
  return (
    <div ref={ref} >
      <GridItem area={'nav'}  rowSpan={8} colSpan={5}>
        {menu ? (
          <>
            <BreadcrumComponent />
            <Heading marginLeft={6}>
              {menu.name} 
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
                  <FormMenu menu={menu} menuId={menuId} />
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
                  <Sections menu={menu} onGetMenu={refreshMenu}/>
                </GridItem>
                <GridItem colSpan={4} bg='tomato' >
                  <Products menu={menu} onRefreshMenu={refreshMenu} />
                </GridItem>
              </Grid>
            </Card>
          </>
        ) : (
          <Center>
            <Text>Cargando...</Text>
          </Center>
        )}
      </GridItem>  
    </div>
  )
}
