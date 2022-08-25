const getToken = require('./client/services/getToken.js')
const controlBar = require('./client/controlBar')
const refreshToken = require('./client/refreshToken')
const getUrl = require('./client/getUrl.js')
const dashboard = require('./client/dashboard')
const devices = require('./client/devices')
const search = require('./client/search')

const actions = {
    token: ()=>getToken(),
    refreshToken: ()=>refreshToken(),
    controlbar: ()=>controlBar(process.argv[3],process.argv[4]),
    url: ()=>getUrl(),
    dashboard: ()=>dashboard(process.argv[3]),
    devices: ()=>devices(),
    search: ()=>search(process.argv[3],process.argv[4])
}

const showManual = () => {
    const fs = require('fs')
    fs.readFile('./.man.txt', 'utf8', (err,data)=>{
        if(err){
            console.log("Error al leer archivo ", err)
            return
        }
        console.log(data)
    })
}

if (Object.keys(actions).includes(process.argv[2])){
    for (let key of Object.keys(actions)){
        if(key === process.argv[2]){
            actions[key]()
            break;
        }
    }
}else if (process.argv[2] === undefined){
    showManual()
}else{
    console.log(`Argument invalid '${process.argv[2]}'`)
}
