
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
import { CSSTransition } from 'react-transition-group';

import { MdChevronLeft, MdChevronRight, MdMenu } from 'react-icons/md';

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <DropdownMenu />
    </div>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height + 20);
  }

  return (
    <>
      <Menu className="dropdown" closeOnSelect={false}>
        <MenuButton as={Button} rightIcon={<MdChevronRight />}>
          Actions
        </MenuButton>
        <MenuList style={{ height: menuHeight }} className="dropdown">
          <CSSTransition
            in={activeMenu === 'main'}
            timeout={500}
            classNames="menu-primary"
            unmountOnExit
            onEnter={calcHeight}
          >
            <div className="main-menu">
              <MenuItem onClick={() => setActiveMenu('settings')}>
                <Text>Settings</Text>
                <Box pos="absolute" ml="80%">
                  <MdChevronRight />
                </Box>
              </MenuItem>
              <MenuItem onClick={() => setActiveMenu('animals')}>
                Animals
                <Box pos="absolute" ml="80%">
                  <MdChevronRight />
                </Box>
              </MenuItem>
              <MenuItem>
                Coding
                <Box pos="absolute" ml="80%">
                  <MdChevronRight />
                </Box>
              </MenuItem>
            </div>
          </CSSTransition>

          <CSSTransition
            in={activeMenu === 'settings'}
            timeout={500}
            classNames="menu-secondary"
            unmountOnExit
            onEnter={calcHeight}
          >
            <div className="menu-container">
              <HStack mb="8" spacing="60%">
                <Box>
                  <IconButton
                    variant="outlined"
                    icon={<MdChevronLeft />}
                    onClick={() => setActiveMenu('main')}
                  />
                </Box>
                <Switch />
              </HStack>
              <Box>
                <Text>Generate your words here</Text>
              </Box>
            </div>
          </CSSTransition>

          <CSSTransition
            in={activeMenu === 'animals'}
            timeout={500}
            classNames="menu-secondary"
            unmountOnExit
            onEnter={calcHeight}
          >
            <div className="menu-container">
              <MenuItem onClick={() => setActiveMenu('main')}>Go back</MenuItem>
              <MenuItem>
                <p>Dog</p>
              </MenuItem>
              <MenuItem>
                <p>Cat</p>
              </MenuItem>
              <MenuItem>
                <p>Bird</p>
              </MenuItem>
            </div>
          </CSSTransition>
        </MenuList>
      </Menu>
    </>
  );
}

// function SubMenus() {
//   return (

//   )
// }
