const axios = require('axios');
const mainUrl = 'http://localhost:8888';
//Hi
axios.get(`${mainUrl}/`)
		.then(res=>console.log(res.data))
		.catch(err=>console.log(err.response))

axios.post(`${mainUrl}/login`,{"scope": "user-read-private user-read-email"})
		.then(res=>console.log('La mera mera url: ',res.data.url))
		.catch(err=>console.log(err.response))
