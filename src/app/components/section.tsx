'use client'

import { Heading, Flex, Spacer, Box } from "@chakra-ui/react";
import Product from "./product";

const Section = ({section} : any) => {

  const products = () => {
    if (section.products != null) {
      return section.products.map((product: any) => {
        return (
          <Product product={product} key={product.id}/>
        )
      })
    }
  }

  return (
    <div>
      <Heading size="md">{section.name}</Heading>
        { products() }
    </div>
  );
};

export default Section;