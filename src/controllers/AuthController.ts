import {User} from '../models/User';
import * as bcrypt from 'bcrypt';
import TokenService  from '../services/TokenService';
import {ENV} from '../../environment';

class AuthController {


  login(req,res){
    var username = (req.body.username) ? req.body.username:'';
    var password = (req.body.password) ? req.body.password:'';

    if (username!='' && password!=''){
      User.findOne({username:username},(err,user)=>{
          if(err) return res.status(500).send(err.message);
          console.log(user);
          bcrypt.compare(password, user.password, function(err, result) {
            if(result) {
              //falta comprobar si tiene una licencia válida asignada asignada
              //generamos el token con el usuario logeado y lo enviamos
              var token = TokenService.createToken(user,ENV.TOKEN_SECRET);
              res.status(200).jsonp({token:token});
            } else {
              res.status(401).send({
                message:"Contraseña incorrecta",
              });
            }
          });
      });
    }
  }


}

export default new AuthController();
