const axios = require('axios');
const fs = require('fs');
const urlMain = "https://api.spotify.com/v1"
const configFile = './config.json'
const file = require(configFile)

const changeSong = ( actionEvent ) => {
				axios.post(`${urlMain}/me/player/${actionEvent}`,null,{
								headers:{"Authorization": `Bearer ${file.accessToken}`},
				params:{
								device_id: file.device
				}
				})
				.then(res=>{
								console.log("Sip ",res.data)
				})
				.catch(err=>console.log("Nop ",err.response.data))
}

const changePlayer = ( actionEvent ) => {
   axios.put(`${urlMain}/me/player/${actionEvent}`,null,
       {
           headers:{"Authorization": `Bearer ${file.accessToken}`},
           params:{device_id: file.device}
       })
    .then(()=>console.log("Hecho!"))
    .catch(err=>console.log("Error ",err.response.data))
}

switch (process.argv[2]){
    case "next":
        changeSong(process.argv[2]);
		break;
	case "prev":
	    changeSong("previous");
		break;
    case "play":
        changePlayer(process.argv[2])
        break;
    case "pause":
        changePlayer(process.argv[2])
        break;
    default:
	    console.log(`No hay opciones para '${process.argv[2]}'`)
}












