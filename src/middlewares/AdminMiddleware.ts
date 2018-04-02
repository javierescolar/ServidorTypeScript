import TokenService from '../services/TokenService';
import {ENV} from '../../environment';

export var isAdmin = function(req,res,next){
  var token = req.headers.authorization.replace(/['"]+/g,'');
  var user = TokenService.decodeToken(token,ENV.TOKEN_SECRET)

  if(user.role!='ADMIN'){
    return res.status(401).send({message:"Permiso denegado! No eres administrador del sistema"})
  }
  next();
};
