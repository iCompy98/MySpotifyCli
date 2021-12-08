const axios = require('axios');
const fs = require('fs');
const readline = require('readline');
const CLI = require('clui');
const clc = require('cli-color');
const ask = require('./services/ask.js')
const changePlayer = require('./services/change.js')
const urlMain = "https://api.spotify.com/v1"
const configFile = `${process.env.PWD}/client/services/.config.json`
const file = require(configFile)
const Line = CLI.Line;

const artistPrint = (items) => {
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
    ask("Seleccione mediante su ID: ")
        .then(res=>{
            changePlayer("play",items[res-1].uri)
        })
        .catch(err=>console.log(err))
}

const albumPrint = (items) => {
    var header = new Line()                                               
        .padding(2)
        .column('Id', 5, [clc.cyan])
        .padding(2)
        .column('Nombre', 30, [clc.cyan])
        .padding(2) 
        .column('Artista', 40, [clc.cyan])
        .fill()
        .output();
                                                                       
    let count = 0;
    for(let album of items){
        var trackLine = new Line()
            .padding(2)
            .column(`${++count}`, 5)
            .padding(2)
            .column(`${album.name}`, 30 )
            .padding(2)
            .column(`${album.artists[0].name}`)
            .fill()
            .output();
    }
    ask("Seleccione mediante su ID: ")
       .then(res=>{
           changePlayer("play",items[res-1].uri)
       })
       .catch(err=>console.log(err))
}

const trackPrint = (items) => {
    var header = new Line()
        .padding(2)
        .column('Id', 5, [clc.cyan])
        .padding(2)
        .column('Nombre', 30, [clc.cyan])
        .padding(2) 
        .column('Album y Artista', 40, [clc.cyan])
        .fill()
        .output();

    let count = 0;
    for(let track of items){
        var trackLine = new Line()
            .padding(2)
            .column(`${++count}`, 5)
            .padding(2)
            .column(`${track.name}`, 30 )
            .padding(2)
            .column(`${track.album.name} de ${track.artists[0].name}`)
            .fill()
            .output();
    }
    ask("Seleccione mediante su ID: ")
       .then(res=>{
           changePlayer("play",items[res-1].uri)
       })
       .catch(err=>console.log(err))
}

const playlistPrint = (items) => {
    var header = new Line()                                            
        .padding(2)
        .column('Id', 5, [clc.cyan])
        .padding(2)
        .column('Nombre', 35, [clc.cyan])
        .padding(2) 
        .column('Uri', 45, [clc.cyan])
        .fill()
        .output();
                                                                       
    let count = 0;
    for(let playlist of items){
        var trackLine = new Line()
            .padding(2)
            .column(`${++count}`, 5)
            .padding(2)
            .column(`${playlist.name}`, 35 )
            .padding(2)
            .column(`${playlist.uri}`,45)
            .fill()
            .output();
    }

    ask("Seleccione mediante su ID: ")
       .then(res=>{
           changePlayer("play",items[res-1].uri)
       })
       .catch(err=>console.log(err.response.data))
}

const getSearch = (query, type="album,artist,playlist,track,show,episode") => {
    const avaliableWords = "album,artist,playlist,track,show,episode";

    avaliableWords.includes(type) 
        ? axios.get(`${urlMain}/search`,
        {
            headers:{"Authorization": `Bearer ${file.accessToken}`},
            params:{q:query,type:type}
        })
        .then(res=>{
        let { items } = res.data.artists ?? res.data.albums ?? res.data.tracks
            ?? res.data.playlists;
        let action = {
            artist: ()=>artistPrint(items),
            album: ()=>albumPrint(items),
            track: ()=>trackPrint(items),
            playlist: ()=>playlistPrint(items),
            show: ()=>console.log("Show not supported, yet. Create me a issues"),
            episode: ()=>console.log("Episode not supported, yet. Create me a issues")
        }
        //Next issues
            //Anticipar estos else. Se puede preguntar antes de que se haga
            //la peticion a la API
        if(action[type] !== undefined){
            for (let key of Object.keys(action)){
                if(key === type){
                    action[key]()
                    break;
                }
            }
        }else if(type === avaliableWords){
            console.log("General search not supported yet. Please, "+
            "enter the type (e.g. track, artist)")
        }else{
            console.log(`Type invalid ${type}`)
        }
        })
        .catch(err=>console.log(err.response.data ?? err)) 
        : console.log(`Parametro desconocido: ${type}`);
}

const search = (variableData, optionalData) => optionalData === undefined
    ? getSearch(variableData)
    : getSearch(optionalData, variableData)

module.exports = search;

