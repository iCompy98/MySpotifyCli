const axios = require('axios')
const fs = require('fs');
const urlMain = "http://localhost:8888"
const configFile = './config.json'
const file = require(configFile)

axios.post(`${urlMain}/refresh_token`,{"refreshToken":file.refreshToken})
    .then(res=>console.log("Se refresco el token. Favor de volver a pedirlo."))
    .catch(err=>console.log(err))
