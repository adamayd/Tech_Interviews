const fs = require('fs');

function Person(lastName, firstName, gender, dateOfBirth, favoriteColor) {
  this.lastName = lastName;
  this.firstName = firstName;
  this.gender = gender;
  this.dateOfBirth = dateOfBirth;
  this.favoriteColor = favoriteColor;
}

module.exports = {
  createFileList: (cmdArgs) => {
    let fileList = [];
    // for each command line argument determine if it's a file or dir
    cmdArgs.forEach(fileOrDir => {
      // determine if file or dir
      let stats = fs.statSync(fileOrDir);
      // if file, add it to the array
      if (stats.isFile()) fileList.push(fileOrDir);
      // if dir, read the files in the dir and add each to array
      if (stats.isDirectory()) {
        let filesInDir = fs.readdirSync(fileOrDir);
        // correct the file path to the directory
        // CHANGE NEXT LINE FOR WINDOWS FIX / becomes \
        const correctedPath = filesInDir.map(fileName => `${fileOrDir}/${fileName}`);
        fileList = [...fileList, ...correctedPath];
      }
    });
    return fileList;
  },

  readEachFile: (fileName) => {
    // read the file
    const fileData = fs.readFileSync(fileName, 'utf8');
    // split the file by lines
    const arrOfLines = fileData.split(/\n/);
    return arrOfLines;
  },

  parseLineToObj: (lineStr) => {
    // use object instead of if or case statement
    const genderObj = {'F': 'Female', 'M': 'Male'};
    // split the lines and remove the spaces
    const splitArr = lineStr.split(/\s*[\|,\s]\s*/);
    // chuck the middle initial if present
    if (splitArr.length === 6) {
      splitArr.splice(2, 1);
    }
    let dob = splitArr[3];
    let favCol = splitArr[4];
    // check the dob and favCol if out of order by checking
    // if the first character is a number
    if (parseInt(favCol.charAt(0))) {
      [dob, favCol] = [favCol, dob];
    }
    return new Person(splitArr[0], splitArr[1], genderObj[splitArr[2].charAt(0)], dob.replace(/-/g, '/'), favCol);
  },

  formatOutput: (sortedArr) => {
    // get a list of key names to iterate 
    const keyNames = Object.keys(sortedArr[0]);
    let formattedText = sortedArr.map(obj => {
      const newLine = keyNames.reduce((accLine, curKey) => {
        return accLine + obj[curKey] + ' ';
      },'');
      return newLine.trim() + '\n';
    }).join(''); // don't forget to join them back together
    return formattedText;
  },

  sortArrs: (unsortedArr) => {
    // filter out just females and sort ascending
    const femaleArr = unsortedArr.filter(obj => obj.gender === 'Female').sort((a, b) => {
      return a.lastName > b.lastName ? 1 : a.lastName < b.lastName ? -1 : 0;
    });
    // filter out just males and sort ascending
    const maleArr = unsortedArr.filter(obj => obj.gender === "Male").sort((a, b) => {
      return a.lastName > b.lastName ? 1 : a.lastName < b.lastName ? -1 : 0;
    });
    // join the males and females together 
    let sortedArr = [...femaleArr, ...maleArr];
    const formattedText1 = module.exports.formatOutput(sortedArr);
    // sort the array by date of birth
    sortedArr = unsortedArr.sort((a, b) => {
      let aDate = new Date(a.dateOfBirth);
      let bDate = new Date(b.dateOfBirth);
      // if date of birth matches, sort by last name
      if (aDate == bDate) {
        return a.lastName > b.lastName ? 1 : a.lastName < b.lastName ? -1 : 0;
      } else {
        return aDate > bDate ? 1 : -1;
      }
    })
    const formattedText2 = module.exports.formatOutput(sortedArr);
    // sort the array descending
    sortedArr = unsortedArr.sort((a, b) => {
      return a.lastName > b.lastName ? -1 : a.lastName < b.lastName ? 1 : 0;
    });
    const formattedText3 = module.exports.formatOutput(sortedArr);
    // bring it all together with the titles
    const textToOutput = 'Output 1:\n' +
                        formattedText1 +
                        '\nOutput 2:\n' +
                        formattedText2 +
                        '\nOutput 3:\n' +
                        formattedText3;
    // console.log(textToOutput);  // uncomment me to write to console as well
    // write to the file!!!
    fs.writeFileSync('outputfiles/output.txt', textToOutput, 'utf8');
    console.log('Application has finished, please check the outputfiles directory')
    return;
  }
};