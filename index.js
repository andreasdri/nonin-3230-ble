const NobleDevice = require('noble-device');

const SERVICE_UUID = '46a970e00d5f11e28b5e0002a5d5c51b';
const NOTIFY_CHAR  = '0aad7ea00d6011e28e3c0002a5d5c51b';

const Nonin3230 = function(peripheral)  {
  NobleDevice.call(this, peripheral);
};

Nonin3230.SCAN_UUIDS = [SERVICE_UUID];

Nonin3230.is = (peripheral) => (
    peripheral.advertisement.localName.indexOf('Nonin3230_') > -1
);

NobleDevice.Util.inherits(Nonin3230, NobleDevice);

NobleDevice.Util.mixin(Nonin3230, NobleDevice.BatteryService);
NobleDevice.Util.mixin(Nonin3230, NobleDevice.DeviceInformationService);

Nonin3230.prototype.onMeasurement = function(data) {
  const counter = data.readInt16BE(5);
  const oxygenSaturation = data.readInt8(7);
  const pulseRate = data.readInt16BE(8);
  this.emit('data', { counter, oxygenSaturation, pulseRate });
};

Nonin3230.prototype.connectAndSetup = function(callback) {
  NobleDevice.prototype.connectAndSetup.call(this, function(error) {
    this.notifyCharacteristic(SERVICE_UUID, NOTIFY_CHAR, true,
      this.onMeasurement.bind(this), callback);
  }.bind(this));
};

module.exports = Nonin3230;
