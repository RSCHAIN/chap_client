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
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const SliderComponents = () => {
  const [slider, setSlider] = useState(null);
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });
  const cards = [
    "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slide%2FSac-attieke.jpg?alt=media&token=80064c15-2de7-480f-a760-01971cd91f74",
    "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slide%2FFB_IMG_1687365402653.jpg?alt=media&token=a6a9a293-5609-4f9a-a058-8164ad48146c",
    "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slide%2Fboules.jpg?alt=media&token=06833bbb-fabe-4b94-a212-60f020e157fe",
  ];
  const [isLagerThan768] = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <Box
        position={"relative"}
        height={"fit-content"}
        width={"100%"}
        overflow={"hidden"}
        mb={"2em"}
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
              colorScheme="messenger"
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
              colorScheme="messenger"
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
              height={{ base: "30vh", md: "70vh" }}
              width={"100%"}
              position="relative"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="contain"
              backgroundImage={url}
            ></Box>
          ))}
        </Slider>
      </Box>
    </>
  );
};

export default SliderComponents;
