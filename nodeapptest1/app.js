const tools = require('./tools');
// create array of command line arguments
const cmdArgs = process.argv.splice(2);
// create array of files from command line arguments
const fileList = tools.createFileList(cmdArgs);
// create an array of unsorted person objects
const unsortedArr = fileList.reduce((accArr, fileName) => {
  const arrOfLines = tools.readEachFile(fileName);
  const arrOfObjs = arrOfLines.map(lineStr => tools.parseLineToObj(lineStr));
  return accArr.concat(arrOfObjs);
}, []);
// sort the arrays in the 3 types and output to a file
tools.sortArrs(unsortedArr);
