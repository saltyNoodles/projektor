import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Card, Elevation } from '@blueprintjs/core';
import ReactJson from 'react-json-view';

import { ProjectCardList } from '../ProjectCardList';

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
      <div className="App bp3-dark">
        <div>
          {loading && <div>Loading...</div>}
          {projects && <ProjectCardList projects={projects} loading={loading} />}
          {/* Debug Panel */}
          {/* <div className="light">
            <ReactJson src={this.state.data} />
          </div> */}
        </div>
      </div>
    );
  }
}

export { App };
