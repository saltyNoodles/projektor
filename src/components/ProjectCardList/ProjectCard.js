import React from 'react';
import styled from 'styled-components';
import {
  Button,
  Card,
  Elevation,
  Popover,
  Tooltip,
  Position,
  ButtonGroup,
  Menu,
  MenuItem
} from '@blueprintjs/core';

const ProjectCard = ({ project }) => {
  const { name, description, scripts } = project.package;

  return (
    <ProjectCardContainer interactive={true} elevation={Elevation.TWO}>
      <h1>{name}</h1>
      <p>{description}</p>

      {/* Control Buttons */}
      <>
        <ButtonGroup fill>
          <FunctionButton fill label="Open in Editor" icon="code" />
          <FunctionButton label="Open in Terminal" icon="console" />
          <FunctionButton label="Open in Finder" icon="folder-shared-open" />
          <Popover content={<ScriptsMenu scripts={scripts} />}>
            <Button disabled={!scripts} icon="function" rightIcon="caret-down">
              Scripts
            </Button>
          </Popover>
        </ButtonGroup>
      </>
    </ProjectCardContainer>
  );
};

export { ProjectCard };

const ProjectCardContainer = styled(Card)`
  height: 200px;
  overflow: scroll;
`;

// const ButtonsContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
//   width: 100%;
//   background: #00000034;
//   padding: 5px;
//   border-radius: 6px;
//   justify-content: space-between;
//   box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.12), inset 0 1px 2px rgba(0, 0, 0, 0.24);
// `;

const FunctionButton = ({
  label = '',
  showLabel = false,
  tooltip = '',
  tooltipPosition = Position.BOTTOM,
  ...props
}) => (
  <Tooltip content={tooltip || label} position={tooltipPosition}>
    <Button aria-label={label} {...props}>
      {showLabel ? label : ''}
    </Button>
  </Tooltip>
);

const ScriptsMenu = ({ scripts = {} }) => {
  return (
    <Menu>
      {Object.keys(scripts).map(name => (
        <Tooltip content={scripts[name]} position={Position.RIGHT}>
          <MenuItem text={name} />
        </Tooltip>
      ))}
    </Menu>
  );
};
