var express = require('express');
var passport = require('passport')
var router = express.Router();
var Account = require('../models/account');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Bicycle App', user: req.user });
});

router.get('/register', function(req, res) {
	res.render('register', { title: 'Bicycle App Registration'});
});

router.post('/register', async function(req, res) {
  try {
    const existingUser = await Account.findOne({ username: req.body.username });
    if (existingUser != null) {
      console.log('exists ' + req.body.username);
      return res.render('register', {
        title: 'Registration',
        message: 'Existing User',
        account: req.body.username
      });
    }

    const newAccount = new Account({ username: req.body.username });
    const user = await Account.register(newAccount, req.body.password);

    if (!user) {
      console.log('db creation issue');
      return res.render('register', {
        title: 'Registration',
        message: 'Access Error',
        account: req.body.username
      });
    }

    console.log('Success, redirect');
    res.redirect('/');
  } catch (err) {
    console.log('db creation issue ' + err);
    return res.render('register', {
      title: 'Registration',
      message: 'Registration Error',
      account: req.body.username
    });
  }
});

router.get('/login', function(req, res) {
	res.render('login', { title: 'Bicycle App Login', user: req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
	res.redirect('/');
});

router.get('/logout', function(req, res) {
	req.logout(function(err) {
		if (err)
			return next(err);
		res.redirect('/');
	});
});

router.get('/ping', function(req, res) {
	res.status(200).send('pong');
});

module.exports = router;
