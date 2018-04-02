import {Client} from '../models/Client';

class ClientController {

  all(req, res) {
    console.log('GET /clients')
		Client.find(function(err, clients) {
      if(err) return res.status(500).send(err.message);
      res.status(200).jsonp(clients);
		});
	};

  find(req,res){
    console.log('GET /clients/' + req.params.id);
		Client.findById(req.params.id, function(err, client) {
	    if(err) return res.send(500, err.message);
			res.status(200).jsonp(client);
		});
  }

  store(req,res){
    console.log('POST /clients');

		var new_client = new Client({
			name:    req.body.name,
      applications: req.body.applications,
			gsbase_data: req.body.gsbase_data
		});


    new_client.save(function(err, client_created) {
  		if(err) return res.status(500).send(err.message);
      res.status(200).jsonp(client_created);
  	});

  }

  update(req,res){
    var clientUpdate = req.body;
    Client.findByIdAndUpdate(req.params.id, clientUpdate, function(err, client_updated) {
				if(err) return res.status(500).send(err.message);
	      res.status(200).jsonp({message:"Client user_updated!"});
		});
  }
}

export default new ClientController();
