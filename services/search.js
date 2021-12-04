const axios = require('axios');
const fs = require('fs');
const urlMain = "https://api.spotify.com/v1"
const configFile = './config.json'
const file = require(configFile)
const readline = require('readline');
const CLI = require('clui');
const clc = require('cli-color');
const Line = CLI.Line;

//console.log(process.argv)

const artistPrint = (items) => {
    console.log(items)
    var header = new Line()
        .padding(2)
        .column('Id', 5, [clc.cyan])
        .padding(2)
        .column('Nombre', 30, [clc.cyan])
        .padding(2) 
        .column('Uri', 40, [clc.cyan])
        .fill()
        .output();

    var count=0;
    for(let art of items){
        var artLine = new Line ()
            .padding(2)
            .column(`${++count}`,5)
            .padding(2)
            .column(`${art.name}`,30)
            .padding(2)
            .column(`${art.uri}`,40)
            .fill()
            .output();
    }
    askQuestion("Seleccione mediante su ID: ")
        .then(res=>{
            console.log("Seleccionado ", items[res])
            changePlayer("play",items[res-1].uri)
        })
        .catch(err=>console.log(err))
}

const albumPrint = () => {

}

const trackPrint = () => {

}

const playlistPrint = () => {

}

const changePlayer = ( actionEvent, uri ) => {
    const body =  {
        "context_uri": uri,   
        "position_ms": 0      
    };

   axios.put(`${urlMain}/me/player/${actionEvent}`,body,
       {
           headers:{"Authorization": `Bearer ${file.accessToken}`},
           params:{device_id: file.device}
       })
    .then((res)=>console.log("Hecho! "))
    .catch(err=>console.log("Error ",err.response))
}

const getSearch = (query, type="album,artist,playlist,track,show,episode") => {
    /*console.log(query)
    console.log(type)*/
    axios.get(`${urlMain}/search`,
        {
            headers:{"Authorization": `Bearer ${file.accessToken}`},
            params:{q:query,type:type}
        })
    .then(res=>{
        console.log(res.data)
        /*let { items } = res.data.artists ?? res.data.albums ?? res.data.tracks
            ?? res.data.playlists;
        //console.log(items)
        let action = {
            artist: ()=>artistPrint(items),
            album: ()=>console.log("Metodo albums"),
            track: ()=>console.log("Metodo track"),
            playlist: ()=>console.log("Metodo playlist"),
        }
        action.artist()*/
    })
    .catch(err=>console.log(err));
}

//Cambiar al modulo que existe
/*function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}*/

process.argv[3] !== undefined ? getSearch(process.argv[3],process.argv[2])
    : getSearch(process.argv[2]);

