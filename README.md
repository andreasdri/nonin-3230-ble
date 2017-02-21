nonin-3230-ble
============

A Node.js lib to abstract the Nonin 3230 BLE pulse oxymeter, using [noble-device](https://github.com/sandeepmistry/noble-device)

## Install
```
npm install nonin-3230-ble --save
```

## Example usage

```javascript
const Nonin3230 = require('nonin-3230-ble');

Nonin3230.discover((pulseOxymeter) => {
  pulseOxymeter.connectAndSetup((error) => {
    if (error) {
      console.error(error);
    }
    // receive a new measurement every second
    pulseOxymeter.on('data', (data) => {
      console.log(data);
      // data: { counter: int, pulseRate: int, oxygenSaturation: int }
    });
  });
});
```

For more examples, see [noble-device](https://github.com/sandeepmistry/noble-device).

Contributions are welcome.
