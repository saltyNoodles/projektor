const { ipcMain } = require('electron');
const { exec } = require('child_process');

const { on } = ipcMain;
const registerEvents = () => {
  ipcMain.on('run-command', ({ command, callback }) => {
    exec(command);
  });
  ipcMain.on('open-editor', (_, project) => {
    exec(`code-insiders ${project.path}`, (_, out) => {
      console.log('launching in vscode');
      console.log(project);
    });
  });
};

module.exports = registerEvents;
