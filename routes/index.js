var express = require('express');
var router = express.Router();
var oauth = require('oauthio');
var requestTokenSecrets = {};

var provider = 'fitbit';

oauth.initialize('n6iUPSmcIFS7jyt_9dd40tpGKKk','Q23R54KF5eS-oko37EhSJDsZSS8');

router.get('/oauth/redirect', oauth.redirect(function(result, req, res) {
      result.get('/1/user/-/activities.json').then(function(d){
      console.log(d);
      res.send(d);
    });
}));
router.get('/signin', oauth.auth(provider, 'http://localhost:3000/oauth/redirect'));

router.get('/', function(req, res){

  res.redirect('/signin');
});

module.exports = router;
