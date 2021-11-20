const axios = require('axios');
const fs = require('fs');
const urlMain = "https://api.spotify.com/v1"
const configFile = './config.json'
const file = require(configFile)

const changeSong = ( actionEvent ) => {
				axios.post(`${urlMain}/me/player/${actionEvent}`,null,{
								headers:{"Authorization": `Bearer ${file.accessToken}`},
				params:{
								device_id: "878785bff5e98635f09a5423598c212cda61f644"
				}
				})
				.then(res=>{
								console.log("Sip ",res.data)
				})
				.catch(err=>console.log("Nop ",err.response.data))
}

switch (process.argv[2]){
				case "next":
								changeSong(process.argv[2]);
								break;
				case "prev":
								changeSong("previous");
								break;
				default:
								console.log(`No hay opciones para '${process.argv[2]}'`)
}












