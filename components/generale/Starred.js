import React, { useState } from "react";
import { Box, Icon, Stack } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

import Head from "next/head";

const Rating = () => {
  const [rating, setRating] = useState(0);

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <>
    <Head>
                <script
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-RFSVQTGJ87"
                ></script>
                <script strategy="lazyOnload">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date()); 
                gtag('config', 'G-RFSVQTGJ87');
                `}
                
                </script>
            </Head>
    <Stack direction="row" spacing={2}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Box
          key={star}
          as="button"
          onClick={() => handleRatingClick(star)}
        >
          <Icon
            as={StarIcon}
            w={6}
            h={6}
            color={star <= rating ? "yellow.400" : "gray.300"}
          />
        </Box>
      ))}
    </Stack>
    </>
  );
};

export default Rating;
