//const axios=require('axios');
//const express = require('express')
const querystring = require('querystring');

var client_id = '12978879d72e4d719d45bf3b9c42dc33'; // Your client id
var client_secret = 'f5db843c3ba743c2b487a958023843f5'; // Your secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect ur

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

  var state = generateRandomString(16);
  var scope = 'user-read-private user-read-email';
  //res.redirect('https://accounts.spotify.com/authorize?' +
    var test = querystring.stringify({
      response_type: 'code',                              
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    });
	//))

console.log(`La URL es: https://accounts.spotify.com/authorize?${test}`);

