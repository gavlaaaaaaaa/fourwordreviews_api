var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.locals.connection.query('SELECT * from user', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});



/* GET user by ID */
router.get('/:id', function(req, res, next) {
	res.locals.connection.query('SELECT * from user where id = ?', [req.params.id], function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});



/* POST update user */
router.post('/:id', function(req,res){
	if(req.body.username && req.body.email){
		var userdata = {
			username: req.body.username,
			email: req.body.email,
		}
		res.locals.connection.query('UPDATE user SET username = ?,  email = ? WHERE id = ?', [userdata.username, userdata.email, req.params.id] , function (error,results,fields){
			if (error){
				return res.status(409).send('Could not udpate user details: '+error)
			}
			res.send(JSON.stringify({"status":200, "error": null, "response": results}));
		})
	}
	else {
		return res.status(400).send('Please fill in all fields')
	}	
});


module.exports = router;
