import {User} from '../models/User';
import * as bcrypt from 'bcrypt';

class UserController {

  all(req, res) {
    console.log('GET /users')
		User.find(function(err, users) {
      if(err) return res.status(500).send(err.message);
      res.status(200).jsonp(users);
		});
	};

  find(req, res) {
    console.log('GET /users/' + req.params.id);
		User.findById(req.params.id, function(err, user) {
	    if(err) return res.send(500, err.message);
			res.status(200).jsonp(user);
		});
	};

  store(req,res){
    console.log('POST /users');
		console.log(req.body);

		var new_user = new User({
			name:    req.body.name,
			last_name: req.body.last_name,
			username:  req.body.username,
			email:   req.body.email,
			active:  req.body.active,
      //gsbase_data: req.body.gsbase_data
		});
	  bcrypt.hash(req.body.password,10,(err,hash) => {
	    new_user.password = hash;
	    new_user.save(function(err, user_created) {
	  		if(err) return res.status(500).send(err.message);
	      res.status(200).jsonp(user_created);
	  	});
	  });
  }

  update(req, res) {
	  console.log('PUT /users/'+req.params.id);
    var userUpdate=req.body
    if (userUpdate.password){
      bcrypt.hash(userUpdate.password,10,(err,hash) => {
  	    userUpdate.password = hash;
      });
    }
		User.findByIdAndUpdate(req.params.id, userUpdate, function(err, user_updated) {
				if(err) return res.status(500).send(err.message);
	      res.status(200).jsonp({message:"User user_updated!"});
		});
	};



  delete(req, res) {
	  console.log('DELETE /users/'+req.params.id);
		User.findByIdAndRemove(req.params.id, function(err) {
				if(err) return res.status(500).send(err.message);
	      res.status(200).send({message:"User removed!"});
		});
	};
}

export default new UserController();
