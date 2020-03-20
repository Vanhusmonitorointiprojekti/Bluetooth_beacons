const moment = require('moment');

function CurrentTime()
{

//Get current timestamp
let date_ob = new Date();

//rename date_ob to timestamp and prevent it getting new stamps
let ts = date_ob

//Timestamp year
let year = ts.getFullYear();

//Timestamp month, modify the format
let month = ("0" + (ts.getMonth() + 1)).slice(-2);

//Timestamp date
let date = ("0" + ts.getDate()).slice(-2);

//Timestamp hours
let hours = ts.getHours();

//Timestamp minutes NOTICE if value is between 1-10 format will be for example 12:1 instead of 12:01
let minutes = ts.getMinutes();

//Timestamp used
console.log(ts)
console.log(year + '-' + month + '-' + date + ' ' + hours + ':' + minutes)


/* TESTING
let test = new Date('2020-03-20 10:00:00')
let testTime = test.getMinutes()
console.log(ts)
console.log(test)

let erotus = ts - test
erotus = erotus / 1000
erotus = erotus / 3600
erotus = erotus * 60
erotus = erotus.toFixed(2)

console.log(erotus)
*/

}
CurrentTime();

exports.CurrentTime = CurrentTime;




