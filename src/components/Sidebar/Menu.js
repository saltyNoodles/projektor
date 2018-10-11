import React from 'react';
import styled from 'styled-components';

import { Button, Alignment } from '@blueprintjs/core';

const Menu = ({ children }) => {
  return <MenuRoot>{children}</MenuRoot>;
};

const MenuRoot = styled.ul`
  list-style: none;
  margin: 0px;
  padding: 0px;
`;

const MenuItem = styled.li`
  border-bottom: 1px solid #00000023;
`;
const MenuButton = ({ children, ...props }) => (
  <MenuItem>
    <Button large fill minimal alignText={Alignment.LEFT} {...props}>
      {children}
    </Button>
  </MenuItem>
);

export { Menu, MenuItem, MenuButton };
