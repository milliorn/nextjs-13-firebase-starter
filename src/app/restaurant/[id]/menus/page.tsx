// app/page.tsx
'use client'
import { useRef, useEffect, useState,  useContext } from "react";
import Navbar from '../../../components/navbar';
import MenuCard from './MenuCard';
import { Link } from '@chakra-ui/next-js'
import {Grid, GridItem, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import { Flex, Spacer, Box, Divider, Image, Heading, ButtonGroup, Button, Stack, SimpleGrid } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons';
import BreadcrumComponent from "../../../components/breadcrum";
import MenuModal from "./MenuModal";
import firebase_app from "../../../../firebase/config";
import { getDatabase, ref, set } from "firebase/database";
import { collection, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { useAuthContext } from "../../../../context/AuthContext";
import Head from "next/head";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const id : any = useParams().id;
  const refScreen = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [menus, setMenus] = useState([]);
  const context = useAuthContext();
  useEffect(() => {
    if (refScreen.current) {
      refScreen.current.style.maxHeight = `${window.innerHeight}px`;
    }
  }, []);

  const changeIsOpenModal = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const db = getFirestore(firebase_app);
    const menusRef = collection(db, 'menus');
    console.log(id)
    const q = query(menusRef, where("restaurantId", "==", id));

    const unsub = onSnapshot(q, (snapshot) => {
      const data :any = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
      console.log(data);
      setMenus(data || []);
    });

    return () => {
      unsub();
    }
  }, []);

  return (
    <div ref={refScreen} >
      <GridItem area={'nav'}  rowSpan={7} colSpan={5}>
        <BreadcrumComponent/>
        <Button onClick={changeIsOpenModal} variant='solid' marginLeft={6} colorScheme='orange' width={['50%','50%','20%','20%']}>
          Agregar Menu
        </Button>
        <Card margin={5} height={'100%'}>
        {menus.length != 0 ?
          <SimpleGrid columns={[1, 3, 4]} scrollBehavior={'auto'} maxHeight={['100%','100%','100%','100%']}   overflowY="scroll">
             {menus.map((menu) => (
              <MenuCard menu={menu} key={menu.id} />
            ))} 
          </SimpleGrid>
          : <Heading >No hay menus</Heading>}
        </Card>
      </GridItem>
      <MenuModal isOpen={isOpen} close={changeIsOpenModal} restaurantId={id} />
    </div>
  )
}