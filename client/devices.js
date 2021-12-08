const axios = require('axios');
const fs = require('fs');
const urlMain = "https://api.spotify.com/v1"
const configFile = `${process.env.PWD}/client/services/.config.json`
const file = require(configFile)
const readline = require('readline');
const CLI = require('clui');
const clc = require('cli-color');
const Line = CLI.Line;

var header = new Line()
    .padding(2)
    .column('Id', 5, [clc.cyan])
    .padding(2)
    .column('Device_Id', 25, [clc.cyan])
    .padding(2) 
    .column('Name', 20, [clc.cyan])
    .fill();

const getDevices = async () => {
    await axios.get(`${urlMain}/me/player/devices`,
        {headers:{"Authorization": `Bearer ${file.accessToken}`}})
    .then(res=>{
        //console.log(`IdDevice\t\tName`)
        const devices = res.data.devices;
        header.output();
        res.data.devices.forEach((device, index)=>{
            var line = new Line()
                .padding(2)
                .column(`${index+1}`,5)
                .padding(2)
                .column(`${device.id}`,25)
                .padding(2)               
                .column(`${device.name}`,20)
                .fill()
                .output();
        })
           
        askQuestion("Seleccione el dispositivo mediante ID: ")
            .then(res=>{
                let index = res-1
                file.device = devices[index].id
                fs.writeFileSync(configFile, JSON.stringify(file,null,2))
                console.log(`Estara usando el dispositivo: ${devices[index].name}`)
            })
            .catch(err=>console.log("Algo paso"))
    })
    .catch(err=>console.log("Nop ",err))
}

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

module.exports = getDevices;

