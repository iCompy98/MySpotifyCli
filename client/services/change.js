const axios = require('axios');
const fs = require('fs');
const urlMain = "https://api.spotify.com/v1"
const configFile = `${process.env.PWD}/client/services/.config.json` 
const file = require(configFile)

const changePlayer = ( actionEvent, uri = null) => {
    console.log("Cambiando ...")
    var body;
    if(uri !== null ){
        if(uri.includes("track")){
            body = {
                "uris":[uri]
            }
        }else{
            body = {
                "context_uri":uri
            }
        }
    }else{
        body = uri
    }
   axios.put(`${urlMain}/me/player/${actionEvent}`,body,
       {
           headers:{"Authorization": `Bearer ${file.accessToken}`},
           params:{device_id: file.device}
       })
    .then(()=>console.log(formatString(actionEvent)))
    .catch(err=>console.log("Error ",err.response.data))
}

const formatString = (word) => 
     `${word[0].toUpperCase()}${word.substring(1)}!`;

module.exports = changePlayer;

