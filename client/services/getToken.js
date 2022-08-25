const axios = require('axios');
const fs = require('fs');
const urlMain = "http://localhost:8888"
const configFile = `${process.env.HOME}/Documents/MySpotifyCli/client/services/.config.json`

fs.exists(configFile, (exist)=>{
    if(exist){
        
    }else{
        const data = {
            "accessToken":""
        }
        fs.writeFile(configFile,JSON.stringify(data), (err)=>{
            if (err) throw err;
            console.log("Archivo creado")
        })
    }
})

const getToken = () =>{

axios.get(`${urlMain}/token`)
    .then(res=>{
	    console.log(res.data)
        let file = {};
		file.accessToken = res.data.accesToken;
		file.refreshToken = res.data.refreshToken;
		fs.writeFileSync(configFile, JSON.stringify(file,null,2))
    })
	.catch(err=>console.log(err))
}

module.exports = getToken;

