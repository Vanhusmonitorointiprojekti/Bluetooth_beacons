const signals = [
  'receiver1 d6:2c:ca:c0:d4:9c -18',
  'receiver2 d6:2c:ca:c0:d4:9c -68',
  'receiver1 e2:e3:23:d1:b0:54 -23',
  'receiver2 e2:e3:23:d1:b0:54 -61',
  'receiver2 f2:36:00:21:c0:50 -20',
  'receiver3 f2:36:00:21:c0:50 -54',
  'receiver2 e2:18:ef:c9:66:f4 -18',
  'receiver3 e2:18:ef:c9:66:f4 -77',
  'receiver1 d6:2c:ca:c0:d4:9c -59',
  'receiver2 d6:2c:ca:c0:d4:9c -13',
  'receiver1 e2:e3:23:d1:b0:54 -17',
  'receiver2 e2:e3:23:d1:b0:54 -78',
  'receiver2 f2:36:00:21:c0:50 -35',
  'receiver3 f2:36:00:21:c0:50 -19',
  'receiver2 e2:18:ef:c9:66:f4 -37',
  'receiver1 e2:18:ef:c9:66:f4 -28',
  'receiver1 d6:2c:ca:c0:d4:9c -24',
  'receiver2 d6:2c:ca:c0:d4:9c -72',
  'receiver2 e2:e3:23:d1:b0:54 -61',
  'receiver1 e2:e3:23:d1:b0:54 -17',
  'receiver2 f2:36:00:21:c0:50 -70',
  'receiver3 f2:36:00:21:c0:50 -29',
  'receiver2 f2:36:00:21:c0:50 -25',
  'receiver2 e2:18:ef:c9:66:f4 -64',
  'receiver1 e2:18:ef:c9:66:f4 -19',
]

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures

const giveSignal = () => {
  const signalArray = signals
  let privateCounter = 0;
  let signal = signalArray[privateCounter]
  let changeNumber = () => {      
    if (privateCounter === signalArray.length-1) {
        privateCounter = 0
    } else {
      privateCounter += 1;
    }
    signal = signalArray[privateCounter]
  }
  return {
    increment: () => {
      changeNumber();
    },
    value: () => {
      return signal;
    }
  }
}

module.exports = giveSignal
