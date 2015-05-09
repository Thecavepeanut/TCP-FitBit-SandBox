var express = require('express');
var router = express.Router();
var oauth = require('oauthio');
var requestTokenSecrets = {};

var provider = 'fitbit';

oauth.initialize('n6iUPSmcIFS7jyt_9dd40tpGKKk', 'Q23R54KF5eS-oko37EhSJDsZSS8');

router.get('/oauth/redirect', oauth.redirect(function (result, req, res) {
  res.redirect('/');
}));

router.get('/signin', oauth.auth(provider, 'http://localhost:3000/oauth/redirect'));

router.get('/', function (req, res) {
  try {
    oauth.auth(provider, req.session).then(function (request_obj) {
      res.render('index', {title: {}})
    })
  }
  catch(e){
   res.redirect('/signin');
  }
});

function queryToStr(query){
  if(query && typeof query.query == 'string'){
    var q = query.query;
    if(q[0] === '/' && q[1] === '1' && q[2] === '/'){
      //valid enough for now
      return q;
    }
  }else{
    return '';
  }
}

router.get('/api/query', function (req, res) {
  console.log(req.query);
  var query = queryToStr;
  if(query) {
    oauth.auth(provider, req.session).then(function (request_obj) {
      request_obj.get(req.query.query).then(function (d) {
        console.log(d);
        res.send(d);
      });
    });
  }
  else{
    res.send({'Error': 'Bad Query: ' + query});
  }
});

module.exports = router;
