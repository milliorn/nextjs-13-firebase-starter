'use client'

import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";

const Product = ({product} : any) => {
  return (
    <div>
        <Flex>
          <Box p="4" bg="red.400">
            {product.name}
          </Box>
          <Spacer />
          <Box p="4" bg="green.400">
            {product.price}
        </Box>
      </Flex>
    </div>
  );
}

export default Product;