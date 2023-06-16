import { ChakraProvider } from '@chakra-ui/react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import * as React from 'react'
export default function App({ Component, pageProps }) {
  const initialOptions = {
    clientId: "AQJxbcrdNZKjU6mHuyC1q88-tQmj-Ghy097rriW2k3Gvs8QeD0sdRYUK-IWlAmvBrRE2TNvK9rN6U74o",
    currency: "EUR",
    intent: "capture",
};
  return(
    <ChakraProvider>
         <PayPalScriptProvider options={initialOptions}>
      <Component {...pageProps} />
      </PayPalScriptProvider>
    </ChakraProvider>
  ) 
}
