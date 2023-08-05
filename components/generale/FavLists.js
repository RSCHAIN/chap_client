import { db2 } from "@/FIREBASE/clientApp";
import { Box, Image, SimpleGrid, Text,Link } from "@chakra-ui/react";
import { ref, onValue  } from "@firebase/database";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState,} from "react";
import { useEffect } from "react";
import ReactDOM from 'react-dom';
import Slider from "react-slick";
import { useRouter } from "next/router";


const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 7
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2
  }
};


export default function Favlist() {
  const [data,setData] = useState([])
  const [tout,setTout] = useState()
  const route = useRouter()



  const Fav = () => {
   
    // const db = getDatabase();
    const starCountRef = ref(db2, "Epicerie/Massy Market");
    onValue(starCountRef, (snapshot) => {
      setData(snapshot.val());
      console.log(snapshot.val())
    });
  };
  const Up =()=>{
    
  }
  useEffect(()=>{
    Fav()
    // setTout(data.length())
  })
  const [slider, setSlider] = useState(null);
  return <>
  {/* <SimpleGrid columns={[2,2,2,4,5]} spacing={2}>
     {/* CSS files for react-slick */}
     {/* <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
    {Object.values(data).splice(0,5).map((data,index)=>(
      <Box
      key={index} my={10}bgColor={"#eee2"} borderRadius={"25px"} pb={5} boxShadow={"grey 1px 1px  5px"} width={"200px"}>
        <Box
     
        borderRadius={"25px 25px 0px 0px"}
        width={"full"} 
        height={"100px"}
        bgImage={data.imageUrl}
        backgroundPosition={"center"}
        backgroundSize={"cover"}
        backgroundRepeat={"no-repeat"}
        >
      
        </Box>
        
        <Text fontWeight={"bold"}>{data.nom}</Text>
      </Box>
    ))}
    </SimpleGrid> */}
    <Box ml={[5,5,5,10,10]} width={"90%"}>
    <Carousel  responsive={responsive} style={"marginLeft='10px'"}
  >
          {Object.values(data).splice(0,8).map((data, index) => (
            <Link key={index} onClick={()=>{localStorage.setItem("Fav",data.organisation)}}
            href={"/FavInt"}
            _hover={{
              textDecoration:"none"
            }}
            >
            <Box
            
            key={index} my={10}bgColor={"#eee2"} borderRadius={"25px"} pb={5} boxShadow={"grey 1px 1px  5px"} width={["100px","100px","100px","150px","150px"]}>
              <Box
             
              borderRadius={"25px 25px 0px 0px"}
              width={"full"} 
              height={"100px"}
              bgImage={data.imageUrl}
              backgroundPosition={"center"}
              backgroundSize={"cover"}
              
              backgroundRepeat={"no-repeat"}
              >
               
            
              </Box>
              
              <Text fontWeight={"bold"} width={["100px","100px","100px","150px","150px"]} noOfLines={1} pl={2}>{data.nom}</Text>
              <Text color={"green"} ml={["60%","60%","60%","70%","70%"]} fontWeight={"semibold"} >{data.prix}€</Text>
            </Box>
            </Link>
          ))}</Carousel>
    </Box>
   
  </>;
}
