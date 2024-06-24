'use client'
import { useParams } from "next/navigation";
import firebase from 'firebase/app';
import { useEffect, useRef, useState } from "react";
import {Box, Card, Flex, GridItem, Heading, Input, InputGroup, InputLeftElement, Spacer, Stack, Text } from '@chakra-ui/react'
import { SearchIcon } from "@chakra-ui/icons";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import firebase_app from "@/firebase/config";
import { set } from "firebase/database";
import Section from "../components/section";


const replaceSpaces = (string: string) => string.replace(/%20/g, ' ');
export default function Menu() {
  const restaurantName : any = useParams().restaurantName;
  const refScreen = useRef(null);
  const [menu, setMenu] = useState(null)
  const [showErrorNotFound, setShowErrorNotFound] = useState(false);
  const  [loading, setLoading] = useState(true);

  useEffect(() => {
    if (refScreen.current) {
      refScreen.current.style.maxHeight = `${window.innerHeight}px`;
    }
  }, []);
  
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const db = getFirestore(firebase_app);
        const queryRestaurantName = replaceSpaces(restaurantName);

        console.log(queryRestaurantName);
        const q = query(collection(db, "menus"), where("restaurantName", "==", queryRestaurantName));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Assuming there's only one restaurant with the given name
          const restaurantData = querySnapshot.docs[0].data();
          console.log("Restaurant data:", restaurantData);
          setMenu(restaurantData)
          setLoading(false);
        } else {
          console.log("Restaurant not found");
          setShowErrorNotFound(true);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching restaurant:", error);
        setShowErrorNotFound(true);
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, []); 

  const sections = () => {
    if (menu != null && menu.sections != null) {
      return menu.sections.map((section: any) => {
        return (
          <Section section={section} key={section.id}/>
        )
      })
    }
  }

  return (
    <div ref={refScreen}>
      <GridItem area={'nav'} rowSpan={7} colSpan={5}>
        <Card margin={5} height={'100%'}>
          {loading ? <Text textAlign="center">Cargando...</Text> : 
          <>
          {showErrorNotFound || menu == null ? (
            <Text textAlign="center">Restaurante no encontrado</Text>
          ) : (
            <>
              <Flex minWidth="max-content" justifyContent="center" gap="2">
                <Heading size={'xl'}>{restaurantName}</Heading>
              </Flex>
              {/*}
              <Stack spacing="4">
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color="gray.300" />}
                  />
                  <Input type="text" placeholder="Buscar" />
                </InputGroup>
              </Stack> */}
              <Flex direction="column">
                {
                  sections()
                }
              </Flex>
            </>
          )}
        </>
        }
        
        </Card>
      </GridItem>
    </div>
  );
}

