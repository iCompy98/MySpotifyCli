const controlBar = require('./client/controlBar.js')
const refreshToken = require('./client/refreshToken')
const getUrl = require('./client/getUrl.js')
const dashboard = require('./client/dashboard')
const devices = require('./client/devices')
const search = require('./client/search')

const actions = {
    refreshToken: ()=>refreshToken(),
    controlbar: ()=>controlBar(process.argv[3],process.argv[4]),
    url: ()=>getUrl(),
    dashboard: ()=>dashboard(process.argv[3]),
    devices: ()=>devices(),
    search: ()=>search(process.argv[3],process.argv[4])
}

for (let key of Object.keys(actions)){
    if(key === process.argv[2]){
        actions[key]()
        break;
    }
}
