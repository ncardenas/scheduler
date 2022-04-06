// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require("electron");
const { readFileSync } = require('fs')

// As an example, here we use the exposeInMainWorld API to expose the browsers
// and node versions to the main window.
// They'll be accessible at "window.versions".
//process.once("loaded", () => {
  //contextBridge.exposeInMainWorld(
    //"api", {
    //send: (channel, data) => {
      //const validChannels = ["toMain"]
      //if (validChannels.includes(channel)) {
        //ipcRenderer.send(channel, data);
      //}
    //},
    //receive: (channel, func) => {
      //const validChannels = ["fromMain"]
      //if (validChannels.includes(channel)) {
        //ipcRenderer.on(channel, (event, ...args) => func(...args));
      //}
    //}
  //});
//});

contextBridge.exposeInMainWorld(
  "api", {
  send: (channel, data) => {
    const validChannels = ["toMain"]
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    const validChannels = ["fromMain"]
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  }
});

contextBridge.exposeInMainWorld("myApp", {
  sayHello: (arg) => ipcRenderer.invoke("say-hello", arg)
})