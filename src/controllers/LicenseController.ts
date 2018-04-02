import {License} from '../models/License';

class LicenseController {
  all(req, res) {
    console.log('GET /licenses')
    License.find(function(err, licenses) {
      if(err) return res.status(500).send(err.message);
      res.status(200).jsonp(licenses);
    });
  };

  store(req,res) {
    console.log('POST /licenses');

    var new_license = new License()

    new_license.save((err,license)=>{
      if (err) return res.status(500).send(err.message);
      res.status(200).jsonp(license);
    });
  }

  find(req,res){
    License.findById(req.params.id,(err,license)=>{
      if (err) return res.status(500).send(err.message);
      res.status(200).jsonp(license);
    });
  }

  update(req,res) {
     console.log('PUT /licenses/'+req.params.id);
    var licenseUpdate = req.body;
    console.log(licenseUpdate);
    License.findByIdAndUpdate(req.params.id, licenseUpdate, function(err, license_updated) {
        if(err) return res.status(500).send(err.message);
        res.status(200).jsonp({message:"License license_updated!"});
    });
  }
  
}
 export default new LicenseController();
