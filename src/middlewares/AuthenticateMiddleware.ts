import TokenService from '../services/TokenService';
import {ENV} from '../../environment';

export var authenticate = function(req,res,next){

  if(!req.headers.authorization) {
    return res.status(403).send({
      message: 'la petición no tiene la cabecera de autenticación'
    });
  }

  var token = req.headers.authorization.replace(/['"]+/g,'');

  var payload = TokenService.decodeToken(token,ENV.TOKEN_SECRET);
  if(payload==false){
    return res.status(401).send({message:"Token no válido"});
  }

  if (TokenService.checkTokenExpirate(token,ENV.TOKEN_SECRET)){
    return res.status(401).send({message:"El token ha expirado"});
  }


  next();
};
