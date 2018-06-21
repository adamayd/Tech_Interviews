const fs = require('fs');

function Person(lastName, firstName, gender, dateOfBirth, favoriteColor) {
  this.lastName = lastName;
  this.firstName = firstName;
  this.gender = gender;
  this.dateOfBirth = dateOfBirth;
  this.favoriteColor = favoriteColor;
}

createFileList = (cmdArgs) => {
  let fileList = [];
  cmdArgs.forEach(fileOrDir => {
    let stats = fs.statSync(fileOrDir);
    if (stats.isFile()) fileList.push(fileOrDir);
    if (stats.isDirectory()) {
      let filesInDir = fs.readdirSync(fileOrDir)
      const correctedPath = filesInDir.map(fileName => `${fileOrDir}/${fileName}`)
      fileList = [...fileList, ...correctedPath]
    }
  })
  return fileList;
}

readEachFile = (fileName) => {
  const fileData = fs.readFileSync(fileName, 'utf8');
  const arrOfLines = fileData.split(/\n/);
  return arrOfLines;
}

parseLineToObj = (lineStr) => {
  const genderObj = {'F': 'Female', 'M': 'Male'}
  const splitArr = lineStr.split(/\s*[\|,\s]\s*/)
  if (splitArr.length === 6) {
    splitArr.splice(2, 1)
  }
  let dob = splitArr[3];
  let favCol = splitArr[4];
  if (parseInt(favCol.charAt(0))) {
    [dob, favCol] = [favCol, dob]
  }
  return new Person(splitArr[0], splitArr[1], genderObj[splitArr[2].charAt(0)], dob.replace(/-/g, '/'), favCol)
}

formatOutput = (sortedArr) => {
  const keyNames = Object.keys(sortedArr[0]);
  let formattedText = sortedArr.map(obj => {
    const newLine = keyNames.reduce((accLine, curKey) => {
      return accLine + obj[curKey] + ' '
    },'')
    return newLine + '\n';
  }).join('');
  return formattedText;
}

sortArrs = (unsortedArr) => {
  const femaleArr = unsortedArr.filter(obj => obj.gender === 'Female').sort((a, b) => {
    return a.lastName > b.lastName ? 1 : a.lastName < b.lastName ? -1 : 0
  })
  const maleArr = unsortedArr.filter(obj => obj.gender === "Male").sort((a, b) => {
    return a.lastName > b.lastName ? 1 : a.lastName < b.lastName ? -1 : 0
  })
  let sortedArr = [...femaleArr, ...maleArr]
  const formattedText1 = formatOutput(sortedArr)
  sortedArr = unsortedArr.sort((a, b) => {
    let aDate = new Date(a.dateOfBirth)
    let bDate = new Date(b.dateOfBirth)
    if (aDate == bDate) {
      return a.lastName > b.lastName ? 1 : a.lastName < b.lastName ? -1 : 0
    } else {
      return aDate > bDate ? 1 : -1
    }
  })
  const formattedText2 = formatOutput(sortedArr)
  sortedArr = unsortedArr.sort((a, b) => {
    return a.lastName > b.lastName ? -1 : a.lastName < b.lastName ? 1 : 0
  });
  const formattedText3 = formatOutput(sortedArr)
  const textToOutput = 'Output 1:\n' +
                       formattedText1 +
                       '\nOutput 2:\n' +
                       formattedText2 +
                       '\nOutput 3:\n' +
                       formattedText3
  console.log(textToOutput);
  fs.writeFileSync('outputfiles/target.txt', textToOutput, 'utf8')
  return;
}

const cmdArgs = process.argv.splice(2);
const fileList = createFileList(cmdArgs);
const unsortedArr = fileList.reduce((accArr, fileName) => {
  const arrOfLines = readEachFile(fileName)
  const arrOfObjs = arrOfLines.map(lineStr => parseLineToObj(lineStr));
  return accArr.concat(arrOfObjs)
}, [])
sortArrs(unsortedArr)
