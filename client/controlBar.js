const axios = require('axios');
const fs = require('fs');
const change = require('./services/change.js')
const urlMain = "https://api.spotify.com/v1"
const configFile = `${process.env.PWD}/client/services/.config.json`
const file = require(configFile)

const changeSong = ( actionEvent ) => {
    axios.post(`${urlMain}/me/player/${actionEvent}`,null,{
            headers:{"Authorization": `Bearer ${file.accessToken}`},
		    params:{device_id: file.device}
        })
	    .then(res=>console.log("Hecho! "))
		.catch(err=>console.log("Error ",err.response.data))
}

const changeShuffle = ( bool ) => {
    axios.put(`${urlMain}/me/player/shuffle`,null,
        {
            headers:{"Authorization": `Bearer ${file.accessToken}`},
            params:{state: bool,device_id: file.device}
        })
    .then(res=>console.log("Hecho!"))
    .catch(err=>console.log("Ocurrio un error ",err))
}

const currentSong = () => {
    axios.get(`${urlMain}/me/player/currently-playing`,
        {
            headers:{"Authorization": `Bearer ${file.accessToken}`},
        }
    ).then(res=>{
    console.log(`${!res.data.is_playing ? "(PAUSADO) " : ""}`+
    `Escuchando ${res.data.item.name} de ${sortString(res.data.item.artists)}`)

    })
    .catch(err=>console.log(err))
}

const controlBar = (action, randomState) =>{
switch (action){
    case "next":
        console.log("Cambiando cancion...")
        changeSong(action);
		break;
	case "prev":
	    console.log("Cambiando cancion...")
        changeSong("previous");
		break;
    case "play":
        change(action)
        break;
    case "pause":
        change(action)
        break;
    case "random":
        if(randomState === "true"){
            console.log("Activando random...")
            changeShuffle(true)
        }else if(randomState === "false"){
            console.log("Desactivando random ...")
            changeShuffle(false)
        }else{
            console.log(`No hay opciones para 'random ${randomState}'.`)
        }
        break;
    case "now":
        currentSong();
        break;
    default:
	    console.log(`No hay opciones para '${action}'`)
}
}

function sortString(arrayString){
    let result = '';
    arrayString.forEach((art, index, array)=>{
        result += `${art.name}`
        result += index !== array.length-2 ? index === array.length-1 ? "" : ", "
            : " y "
    })
    return result;
}

module.exports = controlBar;
