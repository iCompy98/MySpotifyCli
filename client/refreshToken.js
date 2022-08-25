const axios = require('axios')
const fs = require('fs');
const urlMain = "http://localhost:8888"
const configFile = `${process.env.HOME}/Documents/MySpotifyCli/client/services/.config.json`

const refreshToken = () => {
    const file = require(configFile)
    axios.post(`${urlMain}/refresh_token`,{"refreshToken":file.refreshToken})
    .then(res=>{
        console.log("Lo que recibo ",res.data)
    })
    .catch(err=>console.log(err))
}

module.exports = refreshToken;

