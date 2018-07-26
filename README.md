nonin-3230-ble
============

A Node.js lib to abstract the Nonin 3230 BLE pulse oxymeter, using [noble-device](https://github.com/sandeepmistry/noble-device)

This library only supports the proprietary Nonin Oximetry Service, and not the standard Bluetooth SIG Pulse Oximeter Service.

## Install
```
npm install nonin-3230-ble --save
```

## Example usage

```javascript
const Nonin3230 = require('nonin-3230-ble');

Nonin3230.discover((pulseOximeter) => {
  pulseOximeter.connectAndSetup((error) => {
    if (error) {
      console.error(error);
    }
    let counter = 0;
    // receive a new measurement every second
    pulseOximeter.on('data', (data) => {
      counter++;
      console.log(data);
      // { counter: int, pulseRate: int, oxygenSaturation: int, status: object }
      if (counter > 15) {
        pulseOximeter.completeMeasurement(() => console.log('stopped'));
      }

    });
  });
});
```

For more examples, see [noble-device](https://github.com/sandeepmistry/noble-device).

Contributions are welcome.
