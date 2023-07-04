import React, { FC, ChangeEvent, useEffect, useState } from "react";
import { ChakraProvider, Text } from "@chakra-ui/react";
import {
  Pagination,
  usePagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  PaginationContainer,
  PaginationPageGroup,
} from "@ajna/pagination";

const Minimal = () => {
  const {
    currentPage,
    setCurrentPage,
    pagesCount,
    pages
  } = usePagination({
    pagesCount: 12,
    initialState: { currentPage: 1 },
  });

  return (
    <ChakraProvider>
      <Pagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      >
         
        <PaginationContainer>
          <PaginationPrevious>Previous</PaginationPrevious>
          <PaginationPageGroup>
            {pages.map((page) => (
              <PaginationPage 
                key={`pagination_page_${page}`} 
                page={page} 
              />
            ))}
          </PaginationPageGroup>
          <PaginationNext>Next</PaginationNext>
        </PaginationContainer>
      </Pagination>
    </ChakraProvider>
  );
};

export default Minimal;