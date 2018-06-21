# SmartLogic Apprenticeship Program Code Test

I would like to thank all those at SmartLogic who were involved in this code test and the program.  This proved to be a difficult yet educating code test.  As an entry level mostly React Front-End developer, I did not have much experience building a Node app from scratch, let alone with file I/O.  It was amazing though and Back-End is where I hope to go with education and experience.  I also admittedly have never tested my code.  After learning Mocha, I can't believe TDD isn't the norm and I want to test everything now.  If nothing else comes of this, it has been such an enormous learning experience.  It seems every time I turn around I bump into someone else who has applied to the program and I know the competition is stiff.  Please keep in mind that I am self-taught and hope that I can have the chance to grow with SmartLogic.  No laughing or pointing at my code :)  I am using every bit of the 11:59pm PDT as possible to try and polish as well as I know (I literally have a giant Los Angeles clock on my desktop and the extra 3 hours helped). I will include a section towards the end for improvements/known issues.  Thanks again for this great opportunity!!

## SmartLogic Code Test

### Introduction
This exercise will provide us with an initial gauge of your programming skills, and more importantly, your overall software development craftsmanship. It is not meant to be long, tricky, or complicated. It is not timed, so you can take as long as you need within the submission window.

### Goal

In a language of your choice, parse the following set of three input files found on the page linked below:

### Input File Information

Each file contains one person’s information per line. 
The properties of a person are delimited by the following:

* space (” “)
* comma (“,”)
* pipe (“|”)

You may assume that there are no delimiters in any of the properties themselves. Some properties (e.g. gender) are represented differently, depending on the delimiter. Dates are represented in American format (month, day, year)

#### The order of properties is different for each format.

The pipe-delimited file lists each record as follows:
```
LastName | FirstName | MiddleInitial | Gender | FavoriteColor | DateOfBirth
```
The comma-delimited file looks like this:
```
LastName, FirstName, Gender, FavoriteColor, DateOfBirth
```
The space-delimited file looks like this:
```
LastName FirstName MiddleInitial Gender DateOfBirth FavoriteColor
```

and produce the following output:

### Output File Information

### Create and display 3 different views of the recordset.

* Output 1 – sorted by gender (females before males) then by last name ascending
* Output 2 – sorted by birth date, ascending then by last name ascending
* Output 3 – sorted by last name, descending

Ensure that fields are displayed in the following order:

1. last name
2. first name
3. gender
4. date of birth
5. favorite color

Display dates in the format M/D/YYYY.
An example output file is included in the `outputfiles` directory named `target_output.txt`

### What you will be graded on

* Correct Output
* Simplicity
* Unit testing (output and input)
* Object Oriented Design Principles / Clean design
* Readability
* Ability to follow these instructions

### Include / Don't Include

* Include a README file that describes how to build and run the application and its tests.
* Your program may only use the standard libraries which accompany your chosen language’s runtime, with the following exceptions: 
  * Do use an existing unit testing framework (e.g., minitest, rspec, mocha, JUnit, etc.). If your language does not include tools for file I/O, use a package manager (such as npm or bundler) to include any required libraries.
  * You may also use a build tool (e.g. Ant, nmake, maven, gulp, rake, etc.) to build your project.
  * No other external libraries may be used.
* If you use a build tool to build your project, include the build file as well.
* Your program should be runnable from the command line.
* If you think the test or instructions could be improved, let us know.

### Your Submission

Solutions should be submitted using the upload link you received via email. If you did not receive an email with this link, please contact us.

Your solution should be sent in a zip archive, with the filename templated: 

```
{ your_last_name }-{ your_first_name }.zip
```

Questions and comments are welcome.

## Technologies

The following technologies where used for this project:

* Javascript ES6
* Node.js 10.3.0
* NPM 6.1.0
* Mocha 5.2.0

## Build

A `package.json` file is included in the project files and should be all that you need to build the app.  Simply run the following command to install the dependency (how many times do you get to say one dependency) and you will be on your way:

```
npm install
```

The app is two basic files `app.js` and `tools.js`.  `app.js` imports `tools.js` due to the need to export functions for testing purposes without using another library.  The input files `comma.txt`, `space.txt`, & `pipe.txt` are located in the `inputfiles` directory.

## Running the app

The app will run by issuing the following command in the root directory of the project:

```
node app.js inputfiles
```

The app will read all the files in the directory and process them out to the `outputfiles` directory.  You can run individual files as well as in:

```
node app.js inputfiles/comma.txt
```

or multiples as in:

```
node app.js inputfiles/comma.txt inputfiles/space.txt inputfiles/pipe.txt
```

## Testing

Unit testing for the app is handled by the Mocha test library along with Node's built in assertion library.  I've also included a diff test for the output files.  You can run the full test suit by issuing the following command:

```
npm run test
```

You can also just run an output test by issuing the following command:

```
npm run outputtest
```

#### During the unit tests the `output.txt` file is overwritten so testing has been linked together in the `package.json` otherwise the diff test will fail.

## Known Issues

### Windows Compatibility

This app will fail on Windows systems due the the hard coded file path handling.  Basically a `/` needs to become a `\` and it will work.  I would like to find a way to cleanly determine the client OS and provide correct file path handling based on such. 

### Input File Error Handling

The app will throw and error and stop when the file name or file path is incorrect and/or if the file provided is not one of the specific provided files.  I would have preferred to find a better way to scrub the command line arguments and handle the errors to continue without break (try/catch).

### Synchronous Code Execution

The app was originally written with the `fs.*Sync` methods to help with flow control getting to MVP and not using the `fs promise` library.  I simply ran out of time to move back to the asynchronous counter parts properly.

### Exporting Functions

This is not as much as a known issues as I didn't feel comfortable doing it.  I had to move all my functions to a separate `tools.js` files and export them, so they would be available to Mocha for testing.  This seemed a bit hacky to me and with time running out to get testing up, not having the ability to use an external library like `rewire`, felt it was my best option.  Not a good option, but an option.

### IT'S 11:08 PM PDT!!!

Gotta go, I have less than an hour to wrap this up in a pretty bow (read zip file) and ship it off to my private dropbox link :)  Thanks again SmartLogic!!  YOU GUYS ROCK!!!