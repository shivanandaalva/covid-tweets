const express = require('express')
const axios = require('axios');
const cheerio = require('cheerio');
const app = express()
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser')
app.set('view engine', 'ejs' ); 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/views'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-  With, Content-Type, Accept");
  res.header("Set-Cookie", "HttpOnly;Secure;SameSite=None");
  next();   
});
var Twit = require('twit');
app.get('/', (req, res) => {
      res.render('index');
})
app.use('/search', (req, res) => {

var T = new Twit({
  consumer_key:         '',
  consumer_secret:      '',
  access_token:         '',
  access_token_secret:  '',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})
T.get('search/tweets', { q:"verified"+" "+req.body.city+" "+req.body.res, count: 100,tweet_mode:'extended'}, function(err, data, resopnse) {
var sdata=data.statuses;
res.render('twitter',{sdata:sdata});
})
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
