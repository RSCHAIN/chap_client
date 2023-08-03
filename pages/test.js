
import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Button,
  Flex,
  Text,
  chakra,
  Box,
  Switch,
  IconButton,
  HStack
} from '@chakra-ui/react';

import Favlist from '@/components/generale/FavLists';



export default function App() {
  return (
   <>
   <Favlist/>
   </>
  );
}


