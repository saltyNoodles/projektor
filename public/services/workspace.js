const { dialog, app } = require('electron');
const fs = require('fs');
const path = require('path');

// Handles workspaces
class Workspace {
  constructor(mainWindow) {
    this.mainWindow = mainWindow;
    this.data = {
      projects: []
    };

    this.openWorkspace = this.openWorkspace.bind(this);
    this.sendData = this.sendData.bind(this);
    this.send = this.send.bind(this);
  }

  // Open a new workspace folder and load the projects
  openWorkspace() {
    // Show the open dialog
    const folders = dialog.showOpenDialog(this.mainWindow, {
      properties: ['openDirectory']
    });

    // If no folder is selected, return and do nothing.
    if (!folders) return;

    // Tell the renderer that we're loading the information
    this.send('loading', true);

    // Get the first selected folder
    // @TODO: Allow for multiple folders to be selected
    const workingDirectory = folders[0];
    console.log(workingDirectory);

    // Get all of the projects from the working directory
    const projects = this.getProjects(workingDirectory);

    // Add the projects and any relevent information to the data object
    this.data.projects = projects.map(path => ({
      path,
      package: this.getPackageInfo(path)
    }));

    // Send the data to the renderer
    this.sendData();

    // Tell the renderer we are no longer loading
    this.send('loading', false);
  }

  // Check if a path is a directory
  isDirectory(filePath) {
    return fs.lstatSync(filePath).isDirectory();
  }

  // Check if a path is a Node project
  isNodeProject(path) {
    return fs.existsSync(`${path}/package.json`);
  }

  // Get info from the package.json file of a node project
  getPackageInfo(path) {
    if (!this.isNodeProject(path)) {
      return console.warn('Trying to get package.json from a non-Node project');
    }

    const packageJson = fs.readFileSync(`${path}/package.json`);
    return JSON.parse(packageJson);
  }

  // Get a list of all projects in a directory.
  getProjects(directory) {
    const projects = fs
      .readdirSync(directory)
      .map(name => path.join(directory, name))
      .filter(this.isDirectory)
      .filter(this.isNodeProject);
    return projects;
  }

  // Just a wrapper over webContents.send();
  send(e, data) {
    this.mainWindow.webContents.send(e, data);
  }

  // Send data to the renderer
  sendData() {
    this.send('data', this.data);
  }
}

module.exports = Workspace;
