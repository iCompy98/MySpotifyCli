const axios = require('axios');
const mainUrl = 'http://localhost:8888';

var scopes = [
    "user-read-playback-state",
    "user-modify-playback-state",
    "playlist-read-private",
    "user-read-recently-played",
]

axios.get(`${mainUrl}/`)
    .then(res=> {
        console.log(res)
        axios.post(`${mainUrl}/generateToken`,
            {"scope": scopes.join(" ")}
        )
        .then(res=>console.log('La mera mera url: ',res.data.url))
        .catch(err=>console.log(err.response))
    })
	.catch(err=>{
        console.log(err)
    })
