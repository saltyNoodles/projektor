import React from 'react';
import styled from 'styled-components';
import { Button, Popover, Tooltip, Position, ButtonGroup, Menu, MenuItem } from '@blueprintjs/core';

const { ipcRenderer } = window.require('electron');

const ProjectCard = ({ project }) => {
  const { name, description, scripts } = project.package;

  return (
    <ProjectCardContainer>
      <ProjectCardHeader>
        <h1>{name}</h1>
      </ProjectCardHeader>
      <div className="cardBody">
        <p>{description}</p>
        <div>
          <pre>{project.path}</pre>
        </div>
      </div>

      {/* Control Buttons */}
      <ControlButtonGroup fill>
        <FunctionButton
          fill
          label="Open in Editor"
          icon="code"
          onClick={() => {
            ipcRenderer.send('open-editor', project);
          }}
        />
        <FunctionButton label="Open in Terminal!" icon="console" />
        <FunctionButton label="Open in Finder" icon="folder-shared-open" />
        <Popover content={<ScriptsMenu scripts={scripts} />} position={Position.BOTTOM}>
          <Button minimal disabled={!scripts} icon="function" rightIcon="caret-down">
            Scripts
          </Button>
        </Popover>
      </ControlButtonGroup>
    </ProjectCardContainer>
  );
};

export { ProjectCard };

const ProjectCardContainer = styled.div`
  height: 200px;
  overflow: scroll;
  background: #dedede;
  color: #dedede;
  padding: 0px;
  border-radius: 4px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  position: relative;
  display: grid;
  grid-template-rows: auto 1fr 50px;
  h1 {
    user-select: none;
    font-weight: normal;
    padding: 0px;
    margin: 0px;
    font-size: 1.8em;
    text-align: center;
  }
  .cardBody {
    padding: 10px;
    color: #343434;
  }
`;

const ProjectCardHeader = styled.div`
  width: 100%;
  background: #343434;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  padding: 10px;
  margin: 0px;
`;

const ControlButtonGroup = styled(ButtonGroup)`
  width: 100%;
  background: #343434;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  * {
    margin: auto auto;
  }
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
