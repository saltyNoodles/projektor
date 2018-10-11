const { ipcMain } = require('electron');
const { exec } = require('child_process');

const registerEvents = () => {
  // Open project in favorite editor
  // @TODO Add ability to change editor preference
  // Currently hardcoded to use code-insiders
  ipcMain.on('open-editor', (_, project) => {
    exec(`code-insiders "${project.path}/"`, (_, out) => {
      console.log('launching in VSCode...');
    });
  });

  // Open project directory in Finder
  ipcMain.on('open-in-finder', (_, project) => {
    exec(`open ${project.path}/`, (_, out) => {
      console.log('Launching in Finder...');
    });
  });

  // Open new terminal window at the project's root
  // @TODO ALlow for a choice of terminal application
  ipcMain.on('open-terminal', (_, project) => {
    // Double-escape spaces in path
    const path = project.path.replace(/(\s+)/g, '\\\\$1');

    // Applescript that opens a new terminal window and CDs into the project's root directory
    const openTerminalAtPath = `
      tell application "iTerm2"
        set newWindow to (create window with default profile)
        tell current session of newWindow
            write text "cd ${path}"
        end tell
      end tell
    `;

    // Run the Applescript
    osascript(openTerminalAtPath);
  });

  // @TODO Run a script in package.json
  ipcMain.on('run-script', (_, { project, script }) => {});
};

// Execute some Applescript
// This was the best way I could find to manage terminal windows.
// @TODO Move into a separate file
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
