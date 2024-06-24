import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <title>AppChap</title>
        <meta
          property="description"
          content="SITE DE VENTE EN LIGNE DE PRODUIT AFRICAIN"
        />
         <meta property="og:type" content="Online market"/>
         <meta property="og:site_name" content="AppChap"/>
         <meta property="og:url" content="https://www.appchap.fr"/>
        <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/logo1.png?alt=media&token=67f99355-60b3-4b10-a38a-6a52dd89b107"></meta>
        <meta property="og:title" content="AppChap"></meta>
        <meta
          property="og:description"
          content="SITE DE VENTE EN LIGNE DE PRODUIT AFRICAIN"
        />
        <meta property="og:url" content=""></meta>
      </Head>

      <body className="relative">
       
        <Main />
        <NextScript />
        
      </body>
    </Html>
  );
}
