import React, { useEffect, useState } from 'react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Flex,
} from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'

const BreadcrumComponent = () => {
  const [breadcrumItems, setBreadcrumItems] = useState([]);
  const router = useRouter();
  const currentUrl = usePathname();


  const breadcrum = () => {
    console.log(currentUrl)
    const wordsInTheUrl = currentUrl.split('/');
    const breadcrumItems = [
      {
        name: 'Restaurants',
        href: '/restaurants',
        current: false
      }
    ]

    console.log(wordsInTheUrl)
    if(wordsInTheUrl.includes('menu')){
      let hrefToMenus = wordsInTheUrl.slice(0, -2)
      hrefToMenus.push('menus')
      console.log(hrefToMenus.join('/'))
      breadcrumItems.push({
        name: 'Menus',
        href: hrefToMenus.join('/'),
        current: false
      })

    }
    setBreadcrumItems(breadcrumItems)
  }

  
  const handleClickHome = () => {
    router.push( "/restaurants" );
  }

  useEffect(() => {
    breadcrum()
  }, [])

  return (
    <>
      <Flex gap='1' marginLeft={6}>
          <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
          {breadcrumItems.map((item) => (
            <BreadcrumbItem key={item.name}>
              <BreadcrumbLink href={item.href}>{item.name}</BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </Flex>
    </>
  );
};

export default BreadcrumComponent;