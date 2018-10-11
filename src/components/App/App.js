import React, { Component } from 'react';
import styled from 'styled-components';

import { ProjectCardList } from '../ProjectCardList';
import { Sidebar } from '../Sidebar';

import './App.css';

// This is so we can get data from Electron
const { ipcRenderer } = window.require('electron');

class App extends Component {
  state = {
    data: {
      projects: []
    },
    loading: false
  };

  constructor() {
    super();

    ipcRenderer.on('data', (_, data) => this.setState({ data }));
    ipcRenderer.on('loading', (_, loading) => {
      console.log('loading:', loading);
      this.setState({ loading });
    });
  }

  render() {
    const {
      data: { projects },
      loading
    } = this.state;
    return (
      <>
        <TitleBar />
        <Layout className="App bp3-dark">
          <Sidebar projects={projects} />
          <MainArea>
            {loading && <div>Loading...</div>}
            {projects && <ProjectCardList projects={projects} loading={loading} />}
          </MainArea>
        </Layout>
      </>
    );
  }
}

export { App };

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
`;

const MainArea = styled.div`
  display: inline-block;
  height: 100vh;
  width: 100%;
  overflow: scroll;
  padding: 10px;
  background: #222;
  color: #dedede;
`;

const TitleBar = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  background: #000;
  height: 23px;
  -webkit-app-region: drag;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;
