var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.locals.connection.query('SELECT * from review', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

router.post('/', function(req,res){
	res.locals.connection.query('INSERT INTO review (product_id, product_name, word1, word2, word3, word4, rating, image_url) VALUES (?,?,?,?,?,?,?,?) ', [ req.body.product_id, req.body.product_name, req.body.word1, req.body.word2, req.body.word3, req.body.word4, req.body.rating, req.body.image_url ] , function (error,results,fields){
	if (error) throw error;
	return res.send({ error: false, data:results, message: 'Review has been added successfully.'});
	});
});

module.exports = router;
