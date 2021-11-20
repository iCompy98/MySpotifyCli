const axios = require('axios');
const mainUrl = 'http://localhost:8888';
let isUp;

axios.get(`${mainUrl}/`)
		.then(res=>
						isUp= true
		)
		.catch(err=>isUp=false)
				if(isUp){
				axios.post(`${mainUrl}/login`,
								{"scope": "user-read-private user-read-email"}
				)
								.then(res=>console.log('La mera mera url: ',res.data.url))
								.catch(err=>console.log(err.response))

				}

