import React, { useState } from "react";
import { Box, IconButton, useBreakpointValue, } from "@chakra-ui/react";
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
    const cards = ["https://images.unsplash.com/photo-1585914924626-15adac1e6402?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80", "https://images.unsplash.com/photo-1544691560-1f6e977730a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZHJlc3Npbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"];

    return (
        <>
            <Box
                position={"relative"} height={"600px"} width={"100%"}
                overflow={"hidden"} py={10} mb={20}
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

                {/* Left Icon */}
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
                    bg={'#fff'}
                >
                    <BiLeftArrowAlt color="#000"/>
                </IconButton>


                {/* Right Icon */}
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
                    bg={'#fff'}
                >
                    <BiRightArrowAlt color="#000"/>
                </IconButton>

                {/* Slider */}
                <Slider {...settings} ref={(slider) => setSlider(slider)}>
                    {cards.map((url, index) => (
                        <Box
                            key={index} height={{base:"50vh", md:'70vh'}} width={'100%'}
                            position="relative"
                            backgroundPosition="center" backgroundRepeat="no-repeat"
                            backgroundSize="cover" backgroundImage={`url(${url})`}
                        ></Box>
                    ))}
                </Slider>

            </Box>



        </>
    );
};

export default SliderComponents;