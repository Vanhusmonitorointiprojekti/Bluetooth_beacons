
const signals = ['receiver1 e2:e3:23:d1:b0:54 -23',
'receiver2 e2:e3:23:d1:b0:54 -61',
'receiver2 f2:36:00:21:c0:50 -20',
'receiver3 f2:36:00:21:c0:50 -54',
'receiver2 d6:2c:ca:c0:d4:9c -18',
'receiver3 d6:2c:ca:c0:d4:9c -77',
'receiver1 e2:e3:23:d1:b0:54 -17',
'receiver2 e2:e3:23:d1:b0:54 -78',
'receiver2 f2:36:00:21:c0:50 -35',
'receiver3 f2:36:00:21:c0:50 -19',
'receiver2 d6:2c:ca:c0:d4:9c -37',
'receiver1 d6:2c:ca:c0:d4:9c -28',
'receiver2 e2:e3:23:d1:b0:54 -61',
'receiver1 e2:e3:23:d1:b0:54 -17',
'receiver2 f2:36:00:21:c0:50 -70',
'receiver3 f2:36:00:21:c0:50 -29',
'receiver2 f2:36:00:21:c0:50 -25',
'receiver2 d6:2c:ca:c0:d4:9c -64',
'receiver1 d6:2c:ca:c0:d4:9c -19']

//i = -1

var giveSignal = function() {
    var privateCounter = 0;
    var signal = signals[privateCounter]
    function changeNumber() {      
      if (privateCounter === signals.length) {
          privateCounter = 0
      } else {
        privateCounter += 1;
      }
    }
    return {
      increment: function() {
        changeNumber();
      },
      value: function() {
        return signal;
      }
    }
  };

 module.exports = giveSignal

/*
(function f(){
i = (i + 1) % signals.length;
console.log(signals[i]);
setTimeout(f, 2000);
})();
*/
