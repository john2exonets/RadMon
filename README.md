# RadMon

A very simple Radiation Monitor Reporting program written in Node.JS.

Uses the BlackCatSystems GM-10 Radiation Monitor (http://www.blackcatsystems.com/GM/products/GM10GeigerCounter.html) and counts the number of "clicks" over 60 seconds, and then sends that out using the MQTT protocol.  Useable with systems like Home Assistant.

I use this and send my readings out to an external IOT Graphing service from AT&T using my [RadReporter software](https://github.com/john2exonets/RadReporter).
