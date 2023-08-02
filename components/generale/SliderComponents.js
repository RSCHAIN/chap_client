import React, { useState } from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";

const settings = {
  dots: false,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  
  speed: 500,
  autoplaySpeed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const settings2 = {
  dots: true,
  arrows: true,
  fade: true,
  infinite: true,
  autoplay: true,
  
  speed: 500,
  autoplaySpeed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const SliderComponents = () => {
  const [slider, setSlider] = useState(null);
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });
  const cards = [
    "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slide%2FBakery.png?alt=media&token=574eecdf-7fc8-449f-a8d0-e5f9e14f9325",
    "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slide%2FGueye%20grillade.png?alt=media&token=88ff8558-406c-4762-9462-e050349ca3e0",
    "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slide%2FMicrosoftTeams-image1.png?alt=media&token=58788349-42b9-4b70-ae4e-6de227c5cb04",
    "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slider%2F3.png?alt=media&token=e5393663-2adf-4ea1-96be-a097839ec561",
    "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slider%2F4.png?alt=media&token=7eaa7ac6-28cb-4d7b-877f-e2014116b87a",
    "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slider%2F5.png?alt=media&token=51387807-493e-4457-b4e4-f4217d7fba8c",
    "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slider%2F7.png?alt=media&token=9938ab34-a4eb-4fa5-9527-d1e741f048c3",
    "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slider%2F1.png?alt=media&token=b6f83978-875d-429f-88ab-1dd2d962b49e",
    "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slider%2F2.png?alt=media&token=caa391bd-bffb-491f-9679-a655d3fee05f",
    "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slider%2F6.png?alt=media&token=11b0ef49-fc5e-44bd-b104-bb750053d133"
  ];
  const [isLagerThan768] = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <Box
        overflow="-moz-hidden-unscrollable"
        position={"relative"}
        height={{ base: "auto", md: "auto", lg: "auto" }}
        width={{ base: "auto", md: "auto", lg: "auto" }}
      >
        {/* CSS files for react-slick */}
        <link
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

        {isLagerThan768 ? (
          <>
            <IconButton
              aria-label="left-arrow"
              // colorScheme="messenger"
              borderRadius="full"
              position="absolute"
              left={side}
              top={top}
              transform={"translate(0%, -50%)"}
              zIndex={2}
              onClick={() => slider?.slickPrev()}
              bg={"#fff"}
            >
              <BiLeftArrowAlt color="#000" />
            </IconButton>

            <IconButton
              aria-label="right-arrow"
              // colorScheme="messenger"
              borderRadius="full"
              position="absolute"
              right={side}
              top={top}
              transform={"translate(0%, -50%)"}
              zIndex={2}
              onClick={() => slider?.slickNext()}
              bg={"#fff"}
            >
              <BiRightArrowAlt color="#000" />
            </IconButton>
          </>
        ) : (
          <></>
        )}

        {/* Slider */}
     <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {cards.map((url, index) => (
            <Box
              key={index}
              overflow={"auto"}
              height={{ base: "xs", md: "xs", lg: "xl" }}
              minw={{ base: "auto", md: "xs", lg: "xl" }}
              position="relative"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="contain"
              backgroundImage={url}
            ></Box>
          ))}</Slider> 
      
        
      </Box>
    </>
  );
};

export default SliderComponents;
