var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

/* POST login user */
router.post('/', function(req,res){
	if(req.body.email && req.body.password){
		var userdata = {
			email: req.body.email,
			password: req.body.password
		}
		res.locals.connection.query('SELECT * FROM user WHERE email = ?', [userdata.email], function(err,rows,fields){
			if(err) return res.status(400).send(err);
			
			if (rows.length > 0){
				/* User exists in db */
				bcrypt.compare(userdata.password, rows[0].password, function(err, result){
					if(result === true){
						res.locals.connection.query('SELECT id from user where email = ?' , [userdata.email], function(error,result,fields){
							return res.status(200).send({error: false, user_id:result[0].id, message: 'Login successful'});
                                		})
					}
					else{
						return res.status(401).send({error: true, data:result, message: 'Unauthorized: Incorrect username or password'});	
					}
				})
			}
			else{
				return res.status(401).send({error: true, message: 'Email address does not exist'});
			}
		
		})
	}
	else {
		return res.status(400).send('Please fill in all fields')
	}	
});

module.exports = router;

