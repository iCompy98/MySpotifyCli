const axios = require('axios');
const fs = require('fs');
const urlMain = "https://api.spotify.com/v1"
const configFile = './config.json'
const file = require(configFile)

//console.log(process.argv)

const getSearch = (type, query) => {
    axios.get(`${urlMain}/search`,
        {
            headers:{"Authorization": `Bearer ${file.accessToken}`},
            params:{q:query,type:type}
        })
    .then(res=>{
        console.log(res.data.albums.items)
        console.log(res.data.artists.items 
            ?? res.data.albums.items
            ?? res.data.playlists.items)
    })
    .catch(err=>console.log(err));
}

getSearch(process.argv[2],process.argv[3]);
