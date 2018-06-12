var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

/* POST register new user */
router.post('/', function(req,res){
	if(req.body.username && req.body.email && req.body.password){
		var userdata = {
			username: req.body.username,
			email: req.body.email,
			password: req.body.password
		}
		bcrypt.hash(userdata.password, 10, function(err, hash){
		 	if(err) throw err;
			userdata.password = hash
			res.locals.connection.query('INSERT INTO user (username, email, password) VALUES (?,?,?) ', [userdata.username, userdata.email, userdata.password] , function (error,results,fields){
	        	if (error){
				return res.status(409).send('Username or email is not unique: '+error)
			}
        		return res.send({ error: false, data:results, message: 'User has been registered successfully'});
        		});
		})
	
	}
	else {
		return res.status(400).send('Please fill in all fields')
	}	
});

module.exports = router;
