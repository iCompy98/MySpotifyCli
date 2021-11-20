const axios = require('axios');
const fs = require('fs');
const urlMain = "http://localhost:8888"
const configFile = './config.json'
const file = require(configFile)


axios.get(`${urlMain}/token`)
				.then(res=>{
								console.log(res.data)
							  file.accessToken = res.data.accesToken;
							  file.refreshToken = res.data.refreshToken;
								
								fs.writeFileSync(configFile, JSON.stringify(file,null,2))

				})
				.catch(err=>console.log(err))
