const axios = require('axios'); 
const fs = require('fs');
const urlMain = "https://api.spotify.com/v1"
const configFile = './.config.json'
const file = require(configFile)
const askQuestion = require('./services/ask.js')
const change = require('./services/change.js')
const CLI = require('clui');
const clc = require('cli-color');
const Line = CLI.Line;

const playPlaylist = () => {
    axios.get(`${urlMain}/me/playlists`,{
        headers: {
            "Authorization": `Bearer ${file.accessToken}`
        }
    })
    .then(res=>{
        const {items} = res.data;
        var header = new Line()
            .padding(2)
            .column('Id', 5, [clc.cyan])
            .padding(2)
            .column('Playlist', 25, [clc.cyan])
            .padding(2) 
            .column('Uri', 50, [clc.cyan])
            .fill()
            .output();

        res.data.items.forEach((playlist,index)=>{
            var line = new Line()
                .padding(2)
                .column(`${index+1}`, 5, [clc.cyan])
                .padding(2)
                .column(`${playlist.name}`, 25, [clc.cyan])
                .padding(2) 
                .column(`${playlist.uri}`, 50, [clc.cyan])
                .fill()
                .output();
        })
        askQuestion("Reproducir playlist: (Y/y or N/n)").then(res=>{
            if(res === "y" || res === "Y"){
                askQuestion("Id de playlist: ").then(res=>{
                    let index = res-1;
                    change("play", items[index].uri);
                })
            }
        })

    })
    .catch(err=>console.log(err)) }

const actions = {
    playlists: ()=> playPlaylist()
}

for (let key of Object.keys(actions)){
    if(key === process.argv[2]){
        actions[key]()
        break;
    }
}

