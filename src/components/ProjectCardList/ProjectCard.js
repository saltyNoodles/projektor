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
          <Popover content={<ScriptsMenu scripts={scripts} />} position={Position.BOTTOM}>
            <Button minimal disabled={!scripts} icon="function" rightIcon="caret-down">
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

const FunctionButton = ({
  label = '',
  showLabel = false,
  tooltip = '',
  tooltipPosition = Position.BOTTOM,
  ...props
}) => (
  <Tooltip content={tooltip || label} position={tooltipPosition}>
    <Button minimal aria-label={label} {...props}>
      {showLabel ? label : ''}
    </Button>
  </Tooltip>
);

const ScriptsMenu = ({ scripts = {} }) => {
  return (
    <Menu vertical>
      {Object.keys(scripts).map((name, i) => (
        <MenuItem
          key={`scripts-menu-item-${i}-${name}`}
          rightIcon="caret-down"
          style={{ display: 'block' }}
          text={name}
        />
      ))}
    </Menu>
  );
};
