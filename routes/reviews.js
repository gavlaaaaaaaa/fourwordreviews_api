var express = require('express');
var router = express.Router();

/* GET all reviews. */
router.get('/', function(req, res, next) {
	console.log("hello")
	res.locals.connection.query('SELECT * from review', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

/* GET search review */
router.get('/search', function (req,res,next){
	console.log("search")	
	res.locals.connection.query('SELECT * FROM review where lower(product_name) like CONCAT("%",lower(?),"%")', [req.query.term] , function(error,results,fields){
		if(error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});

});

/* GET review by ID */
router.get('/:id', function(req, res, next) {
	console.log("get id")
	res.locals.connection.query('SELECT * from review where id = ?', [req.params.id], function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

/* GET review by user ID */
router.get('/user/:user_id', function(req, res, next) {
	res.locals.connection.query('SELECT * from review where user_id = ?', [req.params.user_id], function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});


/* POST add review */
router.post('/', function(req,res){
	res.locals.connection.query('INSERT INTO review (product_id, product_name, user_id, word1, word2, word3, word4, rating, image_url, latitude, longitude, location_name, location_address) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?) ', [ req.body.product_id, req.body.product_name, req.body.user_id, req.body.word1, req.body.word2, req.body.word3, req.body.word4, req.body.rating, req.body.image_url,req.body.latitude, req.body.longitude, req.body.location_name, req.body.location_address ] , function (error,results,fields){
	if (error) throw error;
	return res.send({ error: false, data:results, message: 'Review has been added successfully.'});
	});
});


module.exports = router;
