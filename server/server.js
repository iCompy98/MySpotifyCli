const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const querystring = require('querystring');
const fs = require('fs')

const app = express();
const configFile = './.config.json'
const file = require(configFile)
const port = 8888;

var client_id = '12978879d72e4d719d45bf3b9c42dc33'; // Your client id
var client_secret = 'f5db843c3ba743c2b487a958023843f5'; // Your secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect ur

app.use(bodyParser.json());

app.get('/', (req,res)=>{
		res.send("Holaaaaa!")
})

app.get('/token', (req,res)=>{
				res.send({
								"accesToken" : file.accessToken,
								"refreshToken": file.refreshToken
				})
})

app.post('/generateToken', (req,res)=>{
		var url = getLink(req.body.scope);
		res.send({url:url});
})

app.get('/callback', function(req, res) {
		
		var {code, state }= req.query

    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

			  file.accessToken = access_token;
			  file.refreshToken = refresh_token;

			  fs.writeFileSync(configFile, JSON.stringify(file,null,2))

				res.redirect('/')

      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
});

app.post('/refresh_token', function(req, res) {

				var {refreshToken} = req.body
				if(refreshToken !== undefined ){
							 var authOptions = {
                 url: 'https://accounts.spotify.com/api/token',
                 headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
                 form: {
                   grant_type: 'refresh_token',
                   refresh_token: refreshToken
                 },
                 json: true
               };
                                                                                                                            
               request.post(authOptions, function(error, response, body) {
                 if (!error && response.statusCode === 200) {
                   var access_token = body.access_token;
                   //console.log("Despues del refresh ",access_token);
											file.accessToken = access_token;
                                                                                
                      fs.writeFileSync(configFile, JSON.stringify(file,null,2))
                 }
               });
								res.status(200).send({"message": "Si se encontro"})
				} else {
								res.status(404).send({"message": "Lo se encontro el token"})
				}
});

const getLink = (textScope) => {
  var state = generateRandomString(16);
  var scope = textScope;
    var test = querystring.stringify({
      response_type: 'code',                              
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    });
		return `https://accounts.spotify.com/authorize?${test}`;
}

/**
* Generates a random string containing numbers and letters
* @param  {number} length The length of the string
* @return {string} The generated string
*/
   var generateRandomString = function(length) {
     var text = '';
     var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   
     for (var i = 0; i < length; i++) {
       text += possible.charAt(Math.floor(Math.random() * possible.length));
     }
     return text;
   };

app.listen(port, ()=> console.log(`Listening on port ${port}`));

