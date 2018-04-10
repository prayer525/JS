cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "custom-inappbrowser-plugin.inappbrowser",
    "file": "plugins/custom-inappbrowser-plugin/www/inappbrowser.js",
    "pluginId": "custom-inappbrowser-plugin",
    "clobbers": [
      "cordova.InAppBrowser.open",
      "window.open"
    ]
  },
  {
    "id": "cordova-plugin-sim.Sim",
    "file": "plugins/cordova-plugin-sim/www/sim.js",
    "pluginId": "cordova-plugin-sim",
    "merges": [
      "window.plugins.sim"
    ]
  },
  {
    "id": "cordova-plugin-app-version.AppVersionPlugin",
    "file": "plugins/cordova-plugin-app-version/www/AppVersionPlugin.js",
    "pluginId": "cordova-plugin-app-version",
    "clobbers": [
      "cordova.getAppVersion"
    ]
  },
  {
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  },
  {
    "id": "com.lampa.startapp.startapp",
    "file": "plugins/com.lampa.startapp/www/startApp.js",
    "pluginId": "com.lampa.startapp",
    "merges": [
      "startApp"
    ]
  },
  {
    "id": "call-number.CallNumber",
    "file": "plugins/call-number/www/CallNumber.js",
    "pluginId": "call-number",
    "clobbers": [
      "call"
    ]
  },
  {
    "id": "aes.encrypt.aesEncrypt",
    "file": "plugins/aes.encrypt/www/aesEncrypt.js",
    "pluginId": "aes.encrypt",
    "clobbers": [
      "aesEncrypt"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "custom-inappbrowser-plugin": "0.0.7",
  "cordova-plugin-sim": "1.3.3",
  "cordova-plugin-app-version": "0.1.9",
  "cordova-plugin-device": "2.0.1",
  "com.lampa.startapp": "0.1.4",
  "call-number": "1.0.4",
  "aes.encrypt": "1"
};
// BOTTOM OF METADATA
});