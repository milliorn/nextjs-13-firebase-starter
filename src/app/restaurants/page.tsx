// app/page.tsx
'use client'
import { useRef, useEffect, useState,  useContext } from "react";
import Navbar from '../components/navbar';
import RestaurantCard from './restaurantCard';
import { Link } from '@chakra-ui/next-js'
import {Grid, GridItem, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import { Flex, Spacer, Box, Divider, Image, Heading, ButtonGroup, Button, Stack, SimpleGrid } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons';
import BreadcrumComponent from "../components/breadcrum";
import RestaurantModal from "./restaurantModal";
import firebase_app from "../../firebase/config";
import { getDatabase, ref, set } from "firebase/database";
import { collection, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { useAuthContext } from "../../context/AuthContext";
import { validateLocaleAndSetLanguage } from "typescript";

export default function Page() {
  const refScreen = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const context = useAuthContext();
  useEffect(() => {
    if (refScreen.current) {
      refScreen.current.style.maxHeight = `${window.innerHeight}px`;
    }
  }, []);
  
  const openModalForEdit = (id) => {
    console.log(restaurants)
    const restaurantForEdit:any= restaurants.find((restaurant) => restaurant.id == id );
    setRestaurant(restaurantForEdit)
    setIsOpen(!isOpen)
  }

  const changeIsOpenModal = () => {
    setRestaurant(null);
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const db = getFirestore(firebase_app);
    const restaurantsRef = collection(db, 'restaurants');
    const user = (context as any).user;
    const q = query(restaurantsRef, where("ownerId", "==", user?.uid));

    const unsub = onSnapshot(q, (snapshot) => {
      const data :any = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
      console.log(data);
      setRestaurants(data);
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
          Agregar resturant
        </Button>
        <Card margin={5} height={'100%'}>
          <SimpleGrid columns={[1, 3, 4]} scrollBehavior={'auto'} maxHeight={['100%','100%','100%','100%']}   overflowY="scroll">
            {restaurants.map((restaurantItem) => (
              <RestaurantCard restaurant={restaurantItem} openModalForEdit={openModalForEdit} />
            ))}
          </SimpleGrid>
        </Card>
      </GridItem>
      <RestaurantModal isOpen={isOpen} close={changeIsOpenModal} restaurant={restaurant}/>
    </div>
  )
}
