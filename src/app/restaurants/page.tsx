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
import { getDatabase } from "firebase/database";
import firebase_app from "../../firebase/config";
import { useAuthContext } from "../../context/AuthContext";
import { ref } from "firebase/database";

export default function Page() {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
const user = useContext(useAuthContext);
  useEffect(() => {
    if (ref.current) {
      ref.current.style.maxHeight = `${window.innerHeight}px`;
    }
  }, []);

  const changeIsOpenModal = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const db = getDatabase(firebase_app);

    const userRestaurantsRef = db.ref(`users/${user?.uid}/restaurants`);
    userRestaurantsRef.once('value', (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setRestaurants(data);
    });
  }, []);

  const restaurant1 = {
    name: 'Restaurante 1',
    description: 'Descripcion del restaurante 1',
    address: 'Direccion del restaurante 1',
    phone: '123456789',
    instagram: 'instagram1',
  }

  return (
    <div ref={ref} >
      <GridItem area={'nav'}  rowSpan={7} colSpan={5}>
        <BreadcrumComponent/>
        <Button onClick={changeIsOpenModal} variant='solid' marginLeft={6} colorScheme='orange' width={['50%','50%','20%','20%']}>
          Agregar resturant
        </Button>
        <Card margin={5} height={'100%'}>
          <SimpleGrid columns={[1, 3, 4]} scrollBehavior={'auto'} maxHeight={['100%','100%','100%','100%']}   overflowY="scroll">
            {restaurants.map((restaurant) => (
              <RestaurantCard restaurant={restaurant} key={restaurant.id} />
            ))}
          </SimpleGrid>
        </Card>
      </GridItem>
      <RestaurantModal isOpen={isOpen} close={changeIsOpenModal} />
    </div>
  )
}