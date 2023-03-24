const express = require('express');
const Tesseract = require('tesseract.js')
const stopword=require('stopword')
//Princeton University's popular Knowledge graph based English Dictionary
// const wordnet = require('wordnet');

async function recognizeImageText(file){
  //console.log(process.memoryUsage())
  let { data: { text } } = await Tesseract.recognize(file.buffer, 'eng');
  let txtArr = text.split(/\s/g);
  let newString = stopword.removeStopwords(txtArr);
  let newString2=[]
  for(let i=0;i<newString.length;i++){
      if(newString[i].length>2){
          let specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
          if(!specialChars.test(newString[i]))
              newString2.push(newString[i].toLowerCase())
      }   
  }
  return newString2;
}

const WordNet = require('node-wordnet');
const wordnet = new WordNet();

async function checkWordNet(word) {
  try {
    // Lookup the word in WordNet.
    const results = await wordnet.lookupAsync(word);
    
    if (results.length > 0) {
      // Return the first definition if available.
      return results[0].gloss;
    } else {
      // Return an empty string if no definition is found.
      return '';
    }
  } catch (err) {
    // Return an empty string if an error occurs.
    console.error(err);
    return '';
  }
}


module.exports = {recognizeImageText,checkWordNet};