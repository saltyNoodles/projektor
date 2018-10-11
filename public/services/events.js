const { ipcMain } = require('electron');
const { exec } = require('child_process');
// const osascript = require('osascript');

const { on } = ipcMain;
const registerEvents = () => {
  ipcMain.on('open-editor', (_, project) => {
    exec(`code-insiders "${project.path}/"`, (_, out) => {
      console.log('launching in VSCode...');
    });
  });

  ipcMain.on('open-in-finder', (_, project) => {
    exec(`open ${project.path}/`, (_, out) => {
      console.log('Launching in Finder...');
    });
  });

  ipcMain.on('open-terminal', (_, project) => {
    // Escape spaces
    const path = project.path.replace(/(\s+)/g, '\\\\$1');

    // Open a new at the project's path
    // @TODO ALlow for a choice of terminal application
    const openTerminalAtPath = `
      tell application "iTerm2"
        set newWindow to (create window with default profile)
        tell current session of newWindow
            write text "cd ${path}"
        end tell
      end tell
    `;

    console.log('launching terminal', path);

    osascript(openTerminalAtPath);
  });
};

const osascript = script => {
  exec(`osascript -e '${script}'`, (error, stdout, stderr) => {
    if (error || stderr) {
      console.warn('Error running script:', error, stderr);
    } else {
      console.log('successfully ran script');
      console.log('result: \r\n', stdout);
    }
  });
};

module.exports = registerEvents;
