const fs = require('fs');
const path = require('path');

module.exports = {
  getCurrentDirectoryBase : () => {
    return path.basename(process.cwd());
  },

  directoryExists : (filePath) => {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  },

  fileExists: (filepath) => {
    try {
        if (fs.existsSync(filepath)) {
          return true;
        }
      } catch(err) {
       return false;
      }
    }
};