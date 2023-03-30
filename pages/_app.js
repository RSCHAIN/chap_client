import { ChakraProvider } from '@chakra-ui/react'
import * as React from 'react'
export default function App({ Component, pageProps }) {
  return(
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  ) 
}
