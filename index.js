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
    // var city=req.body.city;
    // var res=req.body.res;

    // axios.get('https://twitter.com/search?q=verified%20'+req.body.city+'%20&f=live').then((response) => {
    //   // Load the web page source code into a cheerio instance
    //   const $ = cheerio.load(response.data)
    //   console.log(response.data);
    //   var data=$().each((i,e)=>{
    //       $
    //   })
      
    //   res.render('twitter',{data:data});
    // })

var T = new Twit({
  consumer_key:         'HtEDKh2BlBOlywTH64UsY3XxG',
  consumer_secret:      '5q6HdyJnqtusvbMBfdsENVVhBRvrnY2mwm1Rm0sZax9VQFuEPe',
  access_token:         '768512896384983040-AtOZCdSH07020RVHBmrVQyQOXIlhAi3',
  access_token_secret:  'JQ0WjwKV6Ed8i4EWj1ggTdfJ5KI3VhX0DjoZOPwOSLgZ8',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

T.get('search/tweets', { q:"verified"+" "+req.body.city+" "+req.body.res, count: 100,tweet_mode:'extended'}, function(err, data, resopnse) {
  console.log(data.statuses);
var sdata=data.statuses;
  // console.log(data.statuses[1].id_str);
  console.log(data.statuses[1].user); 
  // console.log(data.statuses[1].full_text); 
  //  console.log(data.statuses[1].entities); 
res.render('twitter',{sdata:sdata});
})
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })