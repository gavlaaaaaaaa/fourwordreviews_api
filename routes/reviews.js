var express = require('express');
var router = express.Router();

/* GET all reviews. */
router.get('/', function(req, res, next) {
	res.locals.connection.query('SELECT * from review', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

/* GET review by ID */
router.get('/:id', function(req, res, next) {
	res.locals.connection.query('SELECT * from review where id = ?', [req.params.id], function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});


router.post('/', function(req,res){
	res.locals.connection.query('INSERT INTO review (product_id, product_name, word1, word2, word3, word4, rating, image_url, latitude, longitude, location_name, location_address) VALUES (?,?,?,?,?,?,?,?,?,?,?,?) ', [ req.body.product_id, req.body.product_name, req.body.word1, req.body.word2, req.body.word3, req.body.word4, req.body.rating, req.body.image_url,req.body.latitude, req.body.longitude, req.body.location_name, req.body.location_address ] , function (error,results,fields){
	if (error) throw error;
	return res.send({ error: false, data:results, message: 'Review has been added successfully.'});
	});
});

module.exports = router;
