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
  }

  // Open a new workspace folder and load the projects
  openWorkspace() {
    const folders = dialog.showOpenDialog(this.mainWindow, {
      properties: ['openDirectory']
    });

    if (!folders) return;

    const workingDirectory = folders[0];
    console.log(workingDirectory);

    const projects = this.getProjects(workingDirectory);
    this.data.projects = projects.map(path => ({
      path,
      package: this.getPackageInfo(path)
    }));
    console.log(this.data.projects);
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
}

module.exports = Workspace;
