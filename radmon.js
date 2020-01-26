//
//  radmon.js  -- Monitor the GM-10 Geiger Counter from BlackCat Systems for Radiation Counts
//
//  John D. Allen
//  Sept. 2016
//

//----------------[ Constants ]--------------------
var USBPORT = '/dev/ttyUSB0';
var BROKER = 'mqtt://10.1.1.28/';
var SENSORNAME = 'radmon';

//--------------[ Modules ]-------------------
var SerialPort = require('serialport');
var mqtt = require('mqtt');

//--------------[ Variables ]----------------
var port = new SerialPort(USBPORT, { baudRate: 38400 });  // open a port to the GM-10
var cnt = 0;            // Keeps track of the 'clicks' of the Rad Monitor
var copts = {
  clientId: SENSORNAME,
  keepalive: 20000
};                      // MQTT connection options
var client = mqtt.connect(BROKER, copts);

//-------[  Functions & Event Processors ]--------
client.on('connect', function() {
  // Do nothing...here in case we want to subscribe to a
  // topic to listen for commands.
});

client.on('message', function(topic, message) {
  // Do nothing...Here just in case we want to process
  // messages from topics we subscribed to.
});

port.on('data', function (data) {
  //  This is where all the work happens.  Each time the GM-10 registers a 'click'
  //  this function will fire and increment the click counter by one.
  cnt += 1;
  //console.log('.');
});

//--------------------------------
// Function: GetCPM()
//   Reports the number of clicks since last called (which should be 1 minute.)
//--------------------------------
function getCPM() {
  //console.log("CPM: " + cnt);
  var out = "{ \"name\": \"" + SENSORNAME + "\", \"radlvl\": " + cnt.toString() +"}";
  //console.log("radlvl/read: " + out);
  client.publish('radlvl/read', out);
  cnt = 0;
  setTimeout(getCPM, 60000);	// Resets the timer to call us again in a minute.
}


//-----------[ MAIN ]------------
port.on('open', function() {
  setTimeout(getCPM, 60000);    // Start counting clicks
});
