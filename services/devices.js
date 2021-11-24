const axios = require('axios');
const fs = require('fs');
const urlMain = "https://api.spotify.com/v1"
const configFile = './config.json'
const file = require(configFile)
const readline = require('readline');
//axios.get
//console.log(file)

const getDevices = async () => {
    await axios.get(`${urlMain}/me/player/devices`,
        {headers:{"Authorization": `Bearer ${file.accessToken}`}})
    .then(res=>{
        console.log(`IdDevice\t\tName`)
        res.data.devices.forEach(device=>console.log(`${device.id}\t\t${device.name}`))

        const deviceSelected = 
            askQuestion("Seleccione el dispositivo mediante ID");
        //console.log("Finish ",deviceSelected)
    })
    .catch(err=>console.log("Nop ",err.response.data))
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

getDevices();



