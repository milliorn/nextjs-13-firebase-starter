import { AuthContextProvider } from '@/context/AuthContext';
import { Inter } from 'next/font/google';
import Navbar from './components/navbar'
import { ChakraProvider, Grid, GridItem } from '@chakra-ui/react'
import './globals.css';

// Load the Inter font with 'latin' subset
const inter = Inter( { subsets: [ 'latin' ] } );

// Metadata for the application
export const metadata = {
  title: 'Next.js + Firebase Starter',
  description: 'Template to use Next.js with Firebase',
};

// Root layout component for the application
export default function RootLayout( { children }: { children: React.ReactNode } ): JSX.Element {
  return (
    <html lang="en">
      {/*
        The <head /> component will contain the components returned by the nearest parent
        head.js. It can be used to define the document head for SEO, metadata, and other purposes.
        Learn more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {/* Wrap the children with the AuthContextProvider to provide authentication context */}
        <AuthContextProvider>
          <ChakraProvider>
            <Grid
                  templateAreas={`"header header"
                                  "nav main"`}
                  color='blackAlpha.700'
                  templateRows='repeat(10, 1fr)'
                  templateColumns='repeat(5, 1fr)'
                  height="100vh"
                  >
                <GridItem rowSpan={1} colSpan={5} area={'header'}>
                  <Navbar />
                </GridItem>
                <GridItem area={'nav'} rowSpan={6} colSpan={5}>
                  {children}
                </GridItem>
                {/* <GridItem  bg='red.300' area={'header'} rowSpan={3} colSpan={5}>
                  footer
                </GridItem> */}
              </Grid>
            </ChakraProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
