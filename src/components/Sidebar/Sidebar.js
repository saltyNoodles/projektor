import React from 'react';
import styled from 'styled-components';
import { Button, Icon } from '@blueprintjs/core';

import { MenuItem, Menu, MenuButton } from './Menu';
const Sidebar = ({ projects }) => {
  return (
    <div>
      <SidebarContainer className="bp3-elevation-2">
        <SearchField />
        <Menu>
          {projects.map(project => (
            <MenuButton>{project.package.name}</MenuButton>
          ))}
        </Menu>
      </SidebarContainer>
    </div>
  );
};

export { Sidebar };

const SidebarContainer = styled.div`
  height: 100vh;
  width: 100%;
  overflow: scroll;
  background-color: #000000de;
  box-shadow: inset 0 14px 28px rgba(0, 0, 0, 0.25), inset 0 10px 10px rgba(0, 0, 0, 0.22);
  display: inline-block;
  padding: 10px;
`;

const SearchField = () => (
  <div class="bp3-input-group">
    <Icon icon="search" />
    <input
      style={{ background: '#343434' }}
      class="bp3-input"
      type="search"
      placeholder="Search projects"
      dir="auto"
    />
  </div>
);
