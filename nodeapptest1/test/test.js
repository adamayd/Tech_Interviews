const assert = require('assert');
const tools = require('../tools.js');

describe('App Functions', function() {
  describe('createFileList', function() {
    it('createFileList should return an array', function() {
      let result = tools.createFileList(['inputfiles']);
      assert.ok(result, 'array');
    });
    it('createFileList should return a list of files from a directory', function() {
      let result = tools.createFileList(['inputfiles']);
      assert.deepEqual(result, ['inputfiles/comma.txt','inputfiles/pipe.txt','inputfiles/space.txt']);
    });
  });
  describe('readEachFile', function() {
    it('readEachFile should return an array', function() {
      let result = tools.readEachFile('inputfiles/comma.txt');
      assert.ok(result, 'array');
    });
    it('readEachFile should return an array of lines from the file', function() {
      let result = tools.readEachFile('inputfiles/comma.txt');
      assert.deepEqual(result, [ 'Abercrombie, Neil, Male, Tan, 2/13/1943', 'Bishop, Timothy, Male, Yellow, 4/23/1967', 'Kelly, Sue, Female, Pink, 7/12/1959' ]);
    });
  });
  describe('parseLineToObj', function() {
    it('parseLineToObj should return an object', function() {
      let result = tools.parseLineToObj('Abercrombie, Neil, Male, Tan, 2/13/1943');
      assert.ok(result, 'object');
    });
    it('parseLineToObj should return a properly formatted object', function() {
      let result = tools.parseLineToObj('Bouillon | Francis | G | M | Blue | 6-3-1975');
      assert.deepEqual(result, {lastName: 'Bouillon', firstName: 'Francis', gender: 'Male', dateOfBirth: '6/3/1975', favoriteColor: 'Blue' });
    });
  });
  describe('formatOutput', function() {
    it('formatOutput should return a string', function() {
      let result = tools.formatOutput([{
        lastName: 'Kournikova', 
        firstName: 'Anna', 
        gender: 'Female', 
        dateOfBirth: '6/3/1975', 
        favoriteColor: 'Red' }]);
      assert.ok(result, 'string');
    });
    it('formatOutput should return 3 lines of strings', function() {
      let result = tools.formatOutput([{
        lastName: 'Kournikova',
        firstName: 'Anna',
        gender: 'Female',
        dateOfBirth: '6/3/1975',
        favoriteColor: 'Red' }, 
      {
        lastName: 'Kelly',
        firstName: 'Sue',
        gender: 'Female',
        dateOfBirth: '7/12/1959',
        favoriteColor: 'Pink' },
      {
        lastName: 'Hingis',
        firstName: 'Martina',
        gender: 'Female',
        dateOfBirth: '4/2/1979',
        favoriteColor: 'Green' }]);
      assert.equal(result, 'Kournikova Anna Female 6/3/1975 Red\nKelly Sue Female 7/12/1959 Pink\nHingis Martina Female 4/2/1979 Green\n');
    });
  });
  describe('sortArrs', function() {
    it('sortArrs should not return a string', function() {
      let result = tools.sortArrs([{
        lastName: 'Abercrombie',
        firstName: 'Neil',
        gender: 'Male',
        dateOfBirth: '2/13/1943',
        favoriteColor: 'Tan' },
      {
        lastName: 'Bishop',
        firstName: 'Timothy',
        gender: 'Male',
        dateOfBirth: '4/23/1967',
        favoriteColor: 'Yellow' },
      {
        lastName: 'Kelly',
        firstName: 'Sue',
        gender: 'Female',
        dateOfBirth: '7/12/1959',
        favoriteColor: 'Pink' }]);
      assert.notEqual(result, 'string');
    });
  });
});