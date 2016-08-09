var wikiRouter = require('./wiki.js');
var express = require('express')
var router = express.Router()



router.use('/wiki', wikiRouter);

router.get('/', function(req, res){
	res.render('index')
})


module.exports = router;

