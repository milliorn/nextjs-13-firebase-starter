'use client'
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import {Box, Card, Flex, GridItem, Heading, Input, InputGroup, InputLeftElement, Spacer, Stack, Text } from '@chakra-ui/react'
import { SearchIcon } from "@chakra-ui/icons";

export default function HelloWorld() {
  const restaurantName : any = useParams().restaurantName;
  const refScreen = useRef(null);

  useEffect(() => {
    if (refScreen.current) {
      refScreen.current.style.maxHeight = `${window.innerHeight}px`;
    }
  }, []);

  return(
    <div ref={refScreen} >
      <GridItem area={'nav'}  rowSpan={7} colSpan={5}>
        <Card margin={5} height={'100%'}>
          <Flex minWidth='max-content' justifyContent='center' gap='2'>
            <Heading size={'xl'}>{restaurantName}</Heading>
          </Flex>
          <Stack spacing='4'>
            <InputGroup>
              <InputLeftElement pointerEvents='none' children={<SearchIcon color='gray.300' />} />
              <Input type='text' placeholder='Buscar' />
            </InputGroup>
          </Stack>
          <Flex direction={'column'}>
            <Heading size={'md'}>Seccions 1</Heading>
            <Flex>
              <Box p='4' bg='red.400'>
                Producto 1
              </Box>
              <Spacer />
              <Box p='4' bg='green.400'>
                $ 20.00
              </Box>
            </Flex>
            <Flex>
              <Box p='4' bg='red.400'>
                Producto 1
              </Box>
              <Spacer />
              <Box p='4' bg='green.400'>
                $ 20.00
              </Box>
            </Flex>
          </Flex>
        </Card>
      </GridItem>
    </div>
  );
}

