var express = require('express');
var router = express.Router();

/* GET all follows for user  */
router.get('/:user_id', function(req, res, next) {
	res.locals.connection.query('SELECT user.* from user inner join follow on user.id = follow.follows_user_id where user_id = ?', [req.params.user_id], function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

/* GET check if one user follows another */
router.get('/:user_id1/follow/:user_id2', function(req, res, next) {
	res.locals.connection.query('SELECT * from follow where user_id = ? and follows_user_id = ?', [req.params.user_id1, req.params.user_id2], function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results.length>0}));
	});
});

/* GET suggested */
router.get('/suggested/:user_id', function(req, res, next) {
	res.locals.connection.query('select user.* from user left join follow on user.id = follow.follows_user_id where user.id != ? and (follow.user_id != ? or follow.user_id is null)', [req.params.user_id, req.params.user_id], function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});


/* POST Add follow for user */
router.post('/', function(req,res){
	res.locals.connection.query('INSERT INTO follow (user_id, follows_user_id) VALUES (?,?) ', [ req.body.user_id, req.body.follows_user_id ] , function (error,results,fields){
	if (error) throw error;
	return res.send({ error: false, data:results, message: 'Follow has been added successfully.'});
	});
});


/* DELETE follow */
router.delete('/', function(req,res){
        res.locals.connection.query('DELETE FROM follow where user_id = ? and follows_user_id = ?  ', [ req.body.user_id, req.body.follows_user_id ] , function (error,results,fields){
        if (error) throw error;
        return res.send({ error: false, data:results, message: 'Unfollowed successfully.'});
        });
});

module.exports = router;
