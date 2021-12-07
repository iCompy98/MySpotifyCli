const axios = require('axios')
const fs = require('fs');
const getToken = require('./services/getToken.js')
const urlMain = "http://localhost:8888"
const configFile = '../.config.json'
const file = require(configFile)

const refreshToken = () => {
axios.post(`${urlMain}/refresh_token`,{"refreshToken":file.refreshToken})
    .then(res=>{
        console.log("Se refresco el token.")
        getToken();
    })
    .catch(err=>console.log(err))
}
refreshToken();
module.exports = refreshToken;
