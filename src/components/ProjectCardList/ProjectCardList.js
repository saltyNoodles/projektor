import React from 'react';
import styled from 'styled-components';

import { ProjectCard } from './ProjectCard';

const ProjectCardList = ({ projects = [], loading = false }) => {
  if (projects.length === 0) {
    if (loading) {
      return <div>Loading...</div>;
    } else {
      return <div>Please open a folder.</div>;
    }
  }
  return (
    <CardContainer>
      {projects && projects.map(project => <ProjectCard project={project} />)}
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 1fr;
  margin: 30px;
`;

export { ProjectCardList };
